FROM node:22-alpine
WORKDIR /app
COPY . .
RUN rm -rf server/data .git
ENV NODE_ENV=production PORT=8080 MB_DATA=/data
RUN mkdir -p /data
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/api/healthz || exit 1
CMD ["node", "server/server.js"]
