// アプリアイコン (PNG) を作ります。 使い方: node tools/make-icons.js
const { chromium } = require("playwright");
const path = require("path");

const html = (size) => `<!doctype html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Klee+One:wght@600&display=swap">
<style>
html,body{margin:0;width:${size}px;height:${size}px;overflow:hidden}
body{background:#F5F8FB;background-image:linear-gradient(#DCE6F0 2px,transparent 2px),linear-gradient(90deg,#DCE6F0 2px,transparent 2px);
 background-size:${size / 8}px ${size / 8}px;background-position:-1px -1px;display:grid;place-items:center}
.m{position:relative;width:${size * 0.62}px;height:${size * 0.62}px;background:#fff;border:${size * 0.03}px solid #D6453A;border-radius:${size * 0.03}px;
 display:grid;place-items:center;font-family:"Klee One",serif;font-weight:600;font-size:${size * 0.48}px;line-height:1;color:#22314A}
.m::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:${size * 0.012}px dashed #F0B4AE}
.m::after{content:"";position:absolute;top:50%;left:0;right:0;border-top:${size * 0.012}px dashed #F0B4AE}
.m span{position:relative;z-index:1}
.s{position:absolute;right:${size * 0.08}px;top:${size * 0.06}px;font-size:${size * 0.2}px;color:#EFAE00;font-family:sans-serif;line-height:1}
</style></head><body><div class="m"><span>ア</span></div><div class="s">★</div></body></html>`;

(async () => {
  const browser = await chromium.launch();
  for (const size of [180, 192, 512]) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(html(size), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(__dirname, "..", "docs", `icon-${size}.png`) });
    await page.close();
  }
  await browser.close();
  console.log("icons done");
})();
