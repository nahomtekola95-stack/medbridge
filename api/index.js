/* Vercel serverless entry. All /api/* requests route here via vercel.json.
   Static files are served from the CDN, so serveStatic is never reached. */
const handle = require("../server/server.js");
module.exports = (req, res) => handle(req, res);
