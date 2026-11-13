// src/app.html から、iPhone/iPad の「ホーム画面に追加」で使える PWA 版 docs/index.html を作ります。
// 使い方: node tools/build.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "src/app.html"), "utf8");
const [head, body] = src.split("<!--/head-->");
if (body === undefined) throw new Error("src/app.html に <!--/head--> の区切りがありません");

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="ぐんぐん">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#F5F8FB" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111925" media="(prefers-color-scheme: dark)">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${head.replace(/<meta name="claude:[^>]*>\n?/g, "").trim()}
</head>
<body>
${body.trim()}
<script>
if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(root, "docs/index.html"), html);
console.log("docs/index.html を書き出しました (" + html.length + " bytes)");
