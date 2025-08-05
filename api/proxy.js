// /api/proxy.js (Vercel/Next.js API route)

const https = require("https");
const http = require("http");
const { URL } = require("url");

module.exports = (req, res) => {
  const urlParam = req.query.url || req.url?.split("?url=")[1];

  if (!urlParam) {
    return res.status(400).send("Missing URL");
  }

  const targetUrl = decodeURIComponent(urlParam);
  const parsedUrl = new URL(targetUrl);

  const client = parsedUrl.protocol === "https:" ? https : http;

  client
    .get(targetUrl, (response) => {
      if (response.statusCode !== 200) {
        res.status(response.statusCode).send("Failed to fetch resource");
        return;
      }

      res.setHeader(
        "Content-Type",
        response.headers["content-type"] || "application/octet-stream"
      );
      res.setHeader("Cache-Control", "public, max-age=86400"); // cache 1 ngày

      response.pipe(res);
    })
    .on("error", (err) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy error");
    });
};
