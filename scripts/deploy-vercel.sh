#!/usr/bin/env bash
# Deploy the full MedBridge app (accounts, practice notes, admin console) to Vercel,
# with the database on Turso. Both have free tiers and neither needs a payment card.
#
#   1. turso auth login        <- you do this once, in a browser
#   2. ./scripts/deploy-vercel.sh
#
# Safe to re-run: it reuses the database and secrets that already exist.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.turso:$PATH"

DB="${TURSO_DB:-medbridge}"
say()  { printf "\n\033[1m%s\033[0m\n" "$*"; }
fail() { printf "\n\033[31m%s\033[0m\n" "$*" >&2; exit 1; }

say "1/6  Checking the tools"
command -v vercel >/dev/null || fail "vercel CLI missing. Run: npm i -g vercel"
vercel whoami >/dev/null 2>&1 || fail "Not logged into Vercel. Run: vercel login"
echo "  vercel: $(vercel whoami 2>/dev/null)"

if ! command -v turso >/dev/null 2>&1; then
  echo "  installing the turso CLI…"
  curl -sSfL https://get.tur.so/install.sh | bash >/dev/null 2>&1 || fail "Could not install the turso CLI."
  export PATH="$HOME/.turso:$PATH"
fi
turso auth whoami >/dev/null 2>&1 || fail "Not logged into Turso.

  Run this, finish it in the browser, then run this script again:
    turso auth login

  Turso is free and needs no payment card."
echo "  turso:  $(turso auth whoami 2>/dev/null)"

say "2/6  Checking the data"
node scripts/check-data.js || fail "Data check failed."

say "3/6  Creating the database if it does not exist"
if turso db list 2>/dev/null | awk '{print $1}' | grep -qx "$DB"; then
  echo "  database '$DB' already exists"
else
  turso db create "$DB" || fail "Could not create the database."
fi
DB_URL="$(turso db show "$DB" --url)"
DB_TOKEN="$(turso db tokens create "$DB")"
echo "  url: $DB_URL"

say "4/6  Linking the Vercel project"
[ -d .vercel ] || vercel link --yes >/dev/null || fail "Could not link the project."
echo "  linked: $(node -e 'try{console.log(JSON.parse(require("fs").readFileSync(".vercel/project.json")).projectId)}catch(e){console.log("?")}')"

say "5/6  Setting environment variables"
set_env() {                      # name value  — replaces any existing value
  local n="$1" v="$2"
  for env in production preview; do
    vercel env rm "$n" "$env" --yes >/dev/null 2>&1 || true
    printf '%s' "$v" | vercel env add "$n" "$env" >/dev/null 2>&1 || true
  done
  echo "  set $n"
}
set_env TURSO_DATABASE_URL "$DB_URL"
set_env TURSO_AUTH_TOKEN   "$DB_TOKEN"
set_env NODE_ENV           "production"
if vercel env ls production 2>/dev/null | grep -q MB_ADMIN_PASSWORD; then
  echo "  MB_ADMIN_PASSWORD already set — leaving it alone"
  ADMIN_PW=""
else
  ADMIN_PW="$(LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c 24)"
  ADMIN_EMAIL="${MB_ADMIN_EMAIL:-nahomtekola95@gmail.com}"
  set_env MB_ADMIN_EMAIL    "$ADMIN_EMAIL"
  set_env MB_ADMIN_PASSWORD "$ADMIN_PW"
fi

say "6/6  Deploying"
URL="$(vercel deploy --prod --yes 2>&1 | tee /dev/stderr | grep -Eo 'https://[a-zA-Z0-9./-]+\.vercel\.app' | tail -1)"
[ -n "$URL" ] || fail "Deploy finished but no URL was returned. Run: vercel logs"

say "Checking the live app"
for i in $(seq 1 24); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$URL/api/healthz" || true)
  [ "$code" = "200" ] && break
  sleep 5
done
[ "${code:-}" = "200" ] || fail "The app did not answer /api/healthz. Run: vercel logs $URL"

echo
echo "  health : $(curl -s "$URL/api/healthz")"
echo "  drugs  : $(curl -s "$URL/js/drugs-data.js" | grep -c '^  id: \"') entries served"
say "Live at $URL"
if [ -n "$ADMIN_PW" ]; then
  echo
  echo "  ADMINISTRATOR ACCOUNT — save this now, it is not shown again:"
  echo "    email    : ${ADMIN_EMAIL}"
  echo "    password : ${ADMIN_PW}"
  echo
  echo "  Sign in at $URL/#/account and change it."
fi
