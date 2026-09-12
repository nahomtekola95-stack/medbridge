# node:sqlite is only usable without an experimental flag from Node 23.4 onward,
# so this must stay on Node 24 to match development.
FROM node:24-alpine

WORKDIR /app
COPY . .
RUN rm -rf server/data .git dist

ENV NODE_ENV=production \
    PORT=8080 \
    MB_DATA=/data

# the fly volume is mounted over this at runtime
RUN mkdir -p /data

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:8080/api/healthz || exit 1

CMD ["node", "server/server.js"]
