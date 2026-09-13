#!/usr/bin/env bash
# Deploy the full MedBridge app (accounts, practice notes, admin console) to fly.io.
#
#   1. fly auth login          <- you do this once, in a browser
#   2. ./scripts/deploy-fly.sh <- this script does the rest
#
# Safe to re-run: it skips anything that already exists and redeploys the code.
set -euo pipefail

export FLYCTL_INSTALL="${FLYCTL_INSTALL:-$HOME/.fly}"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
cd "$(dirname "$0")/.."

APP="${FLY_APP:-medbridge-et}"
REGION="${FLY_REGION:-jnb}"          # Johannesburg — closest fly region to Ethiopia
VOLUME="medbridge_data"
SIZE_GB="${FLY_VOLUME_GB:-1}"

say()  { printf "\n\033[1m%s\033[0m\n" "$*"; }
fail() { printf "\n\033[31m%s\033[0m\n" "$*" >&2; exit 1; }

command -v flyctl >/dev/null || fail "flyctl is not installed. Run: curl -L https://fly.io/install.sh | sh"

say "1/6  Checking your fly.io login"
if ! flyctl auth whoami >/dev/null 2>&1; then
  fail "Not logged in.

  Run one of these first, finish it in the browser, then run this script again:
    flyctl auth login     (you already have a fly.io account)
    flyctl auth signup    (you need to create one)

  A payment card is required for the persistent volume, about \$3-5 a month."
fi
echo "  logged in as $(flyctl auth whoami)"

say "2/6  Checking the data"
node scripts/check-data.js || fail "Data check failed — fix the errors above before deploying."

say "3/6  Creating the app if it does not exist"
if flyctl apps list 2>/dev/null | awk '{print $1}' | grep -qx "$APP"; then
  echo "  app '$APP' already exists"
else
  if ! flyctl apps create "$APP" 2>/dev/null; then
    APP="${APP}-$(node -e "process.stdout.write(require('crypto').randomBytes(3).toString('hex'))")"
    echo "  name was taken, using '$APP' instead"
    flyctl apps create "$APP" || fail "Could not create the app."
    sed -i '' "s/^app = .*/app = \"$APP\"/" fly.toml
    echo "  fly.toml updated to app = \"$APP\""
  fi
  echo "  created '$APP'"
fi

say "4/6  Creating the 1 GB volume for the database"
if flyctl volumes list -a "$APP" 2>/dev/null | grep -q "$VOLUME"; then
  echo "  volume '$VOLUME' already exists"
else
  flyctl volumes create "$VOLUME" -a "$APP" --region "$REGION" --size "$SIZE_GB" --yes \
    || fail "Could not create the volume. A payment card on the fly.io account is usually what is missing."
fi

say "5/6  Setting the administrator secret"
if flyctl secrets list -a "$APP" 2>/dev/null | grep -q MB_ADMIN_PASSWORD; then
  echo "  MB_ADMIN_PASSWORD already set — leaving it alone"
  ADMIN_PW=""
else
  ADMIN_PW="$(node -e "process.stdout.write(require('crypto').randomBytes(18).toString('base64url'))")"
  ADMIN_EMAIL="${MB_ADMIN_EMAIL:-nahomtekola95@gmail.com}"
  flyctl secrets set -a "$APP" MB_ADMIN_EMAIL="$ADMIN_EMAIL" MB_ADMIN_PASSWORD="$ADMIN_PW" --stage
  echo "  staged for this deploy"
fi

say "6/6  Building and deploying (fly builds it remotely, no Docker needed here)"
flyctl deploy -a "$APP" --remote-only --ha=false || fail "Deploy failed. Run: flyctl logs -a $APP"

URL="https://${APP}.fly.dev"
say "Checking the live app"
for i in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$URL/api/healthz" || true)
  [ "$code" = "200" ] && break
  sleep 5
done
[ "${code:-}" = "200" ] || fail "The app did not come up. Run: flyctl logs -a $APP"

echo
echo "  health : $(curl -s "$URL/api/healthz")"
echo "  drugs  : $(curl -s "$URL/js/drugs-data.js" | grep -c '^  id: "') entries served"
say "Live at $URL"
if [ -n "$ADMIN_PW" ]; then
  echo
  echo "  ADMINISTRATOR ACCOUNT — save this now, it is not shown again:"
  echo "    email    : ${ADMIN_EMAIL}"
  echo "    password : ${ADMIN_PW}"
  echo
  echo "  Sign in at $URL#/account and change it."
fi
echo
echo "  Useful later:"
echo "    flyctl logs -a $APP          follow the logs"
echo "    flyctl ssh console -a $APP   shell into the machine"
echo "    ./scripts/deploy-fly.sh      redeploy after changes"
