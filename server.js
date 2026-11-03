const http = require("node:http");

const port = Number(process.env.PORT) || 3000;
const sha = process.env.PREVIEW_SHA || "unknown";
const heading = "Hello from the pull request";

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sample app</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f7f5ef; color: #1c1915; font-family: system-ui, sans-serif; }
      main { max-width: 32rem; padding: 2rem; }
      p.eyebrow { margin: 0 0 0.4rem; color: #6f685e; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; }
      code { background: #e7e1d4; padding: 0.15rem 0.45rem; border-radius: 999px; }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Sample app</p>
      <h1>${heading}</h1>
      <p>Commit <code>${sha}</code></p>
    </main>
  </body>
</html>`;

http
  .createServer((_req, res) => {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    res.end(page);
  })
  .listen(port, process.env.HOST || "0.0.0.0");
