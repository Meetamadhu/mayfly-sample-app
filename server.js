const http = require("http");
const port = process.env.PORT || 3000;
const e = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
http.createServer((req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sample app · PR preview</title>
<style>body{margin:0;font-family:system-ui,sans-serif;background:#0f1115;color:#e9eaee;display:grid;place-items:center;min-height:100vh}
.card{max-width:560px;margin:24px;padding:36px;border-radius:18px;background:#171a21;border:1px solid #262b36}
.tag{display:inline-block;background:#f5a524;color:#1c1915;border-radius:999px;padding:4px 14px;font-weight:700;font-size:13px}
h1{font-size:34px;margin:16px 0 8px}p{color:#bfc5cf;line-height:1.5}dl{display:grid;grid-template-columns:110px 1fr;gap:8px;margin-top:22px}
   dt{color:#8ab4ff}dd{margin:0;font-family:ui-monospace,monospace;word-break:break-all}
   .back{display:inline-block;margin-bottom:18px;color:#8ab4ff;text-decoration:none;font-weight:600}.back:hover{text-decoration:underline}</style></head><body><div class="card"><span class="tag">Live PR preview</span>
<h1>Hello again from the pull request</h1>
<p>This page is built from this pull request's own code, in its own container, by Mayfly.</p>
<dl><dt>Repository</dt><dd>${e(process.env.PREVIEW_REPOSITORY)}</dd><dt>Pull request</dt><dd>#${e(process.env.PREVIEW_PR)}</dd>
<dt>Branch</dt><dd>${e(process.env.PREVIEW_BRANCH)}</dd><dt>Commit</dt><dd>${e(process.env.PREVIEW_SHA)}</dd></dl></div></body></html>`);
}).listen(port, "0.0.0.0");
