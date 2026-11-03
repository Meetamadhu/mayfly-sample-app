import os
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT = int(os.environ.get("PORT", "3000"))
SHA = os.environ.get("PREVIEW_SHA", "unknown")
UID = os.getuid()

PAGE = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Sample app</title></head>
<body style="font-family: system-ui, sans-serif; margin: 3rem">
<p>Sample app</p>
<h1>Hello from Python</h1>
<p>Commit <code>{SHA}</code> running as uid {UID}</p>
</body></html>""".encode()


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("content-type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(PAGE)

    def log_message(self, *args):
        pass


HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
