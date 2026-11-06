const http = require("http");
const port = process.env.PORT || 3000;
const e = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Styled to match Mayfly: same colours, font, card and buttons, light and dark.
// The font files are served by Mayfly itself, because this page is shown through Mayfly's preview link.
const page = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sample app · PR #${e(process.env.PREVIEW_PR)}</title>
<style>
@font-face{font-family:"IBM Plex Sans";font-weight:400;font-display:swap;src:url("/fonts/IBMPlexSans-Regular.woff2") format("woff2")}
@font-face{font-family:"IBM Plex Sans";font-weight:600;font-display:swap;src:url("/fonts/IBMPlexSans-SemiBold.woff2") format("woff2")}
@font-face{font-family:"IBM Plex Sans";font-weight:700;font-display:swap;src:url("/fonts/IBMPlexSans-Bold.woff2") format("woff2")}
:root{color-scheme:light;--bg:#efece4;--surface:#f7f5ef;--ink:#1c1915;--muted:#6f685e;--line:#ddd6c8;--soft:#e7e1d4;--on-ink:#f7f5ef;--accent:#ef6b42;--band:#1f5c4a;--radius:6px;--radius-lg:14px}
html[data-theme="dark"]{color-scheme:dark;--bg:#0f1c19;--surface:#17302b;--ink:#e8f0ea;--muted:#9bb0a8;--line:#2a4540;--soft:#1f3a34;--on-ink:#0f1c19;--band:#2e7d63}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;justify-items:center;align-content:start;gap:1rem;padding:1.25rem 1rem 2rem;background:var(--bg);color:var(--ink);font-family:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;font-size:16px;line-height:1.45}
.strip{width:min(36rem,100%);display:flex;align-items:center;gap:.5rem;padding:.65rem .9rem;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);color:var(--ink);text-decoration:none;font-weight:700;letter-spacing:-.03em}
.strip svg{width:1.35rem;height:1.2rem;color:var(--accent);flex:none}
.card{width:min(36rem,100%);overflow:hidden;border:2px solid var(--band);border-radius:var(--radius-lg);background:var(--surface)}
.band{padding:.9rem 1.1rem;background:var(--band);color:#fff}
.band .word{margin:0;color:#fff;font-size:.78rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.band .note{margin:.2rem 0 0;color:#fff;font-size:.95rem}
.body{padding:1.15rem 1.15rem 1.25rem}
h1{margin:0;font-size:22px;font-weight:600;letter-spacing:-.02em}
p{margin:.5rem 0 0;color:var(--muted)}
dl{display:grid;grid-template-columns:7.5rem 1fr;gap:.45rem .75rem;margin:1rem 0 0}
dt{color:var(--muted);font-size:.9rem}
dd{margin:0;font-family:ui-monospace,monospace;font-size:.9rem;word-break:break-all}
.back{display:inline-flex;align-items:center;justify-content:center;min-height:44px;margin-top:1.1rem;padding:.5rem .85rem;border:1px solid var(--ink);border-radius:var(--radius);background:var(--ink);color:var(--on-ink);font-weight:600;text-decoration:none}
</style>
<script>
try{var t=localStorage.getItem("mayfly-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(x){}
</script>
</head>
<body>
<a class="strip" href="/board"><svg viewBox="0 0 40 36" aria-hidden="true"><path d="M19 30V13M20 18C-1 13 1-5 16 9l4 9C41-3 43 12 21 20M20 20C1 15 6 31 18 25M22 20c19-8 13 12 0 5M17 7l-3-5m8 5 4-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>Mayfly</a>
<main class="card">
<div class="band"><p class="word">Live PR preview</p><p class="note">Built from this pull request's own code, in its own container.</p></div>
<div class="body">
<h1>Hello again from the pull request</h1>
<p>This is the sample app. Every pull request gets its own copy of it, built by Mayfly.</p>
<dl>
<dt>Repository</dt><dd>${e(process.env.PREVIEW_REPOSITORY)}</dd>
<dt>Pull request</dt><dd>#${e(process.env.PREVIEW_PR)}</dd>
<dt>Branch</dt><dd>${e(process.env.PREVIEW_BRANCH)}</dd>
<dt>Commit</dt><dd>${e(process.env.PREVIEW_SHA)}</dd>
</dl>
<a class="back" id="back" href="/board">Back to board</a>
<script>(function(){var a=document.getElementById("back");try{var r=document.referrer?new URL(document.referrer):null;if(r&&r.host===location.host&&r.pathname.indexOf("/admin")===0){a.href="/admin";a.textContent="Back to admin";}}catch(e){}})();</script>
</div>
</main>
</body>
</html>`;

http.createServer((req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(page());
}).listen(port, "0.0.0.0");
