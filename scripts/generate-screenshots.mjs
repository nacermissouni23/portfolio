import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const repoRoot = process.cwd();
const outDir = path.join(repoRoot, "public", "screenshots");
fs.mkdirSync(outDir, { recursive: true });

const sites = [
  { slug: "al-djisr", url: "https://al-djisr.vercel.app" },
  { slug: "chifa", url: "https://chifa-five.vercel.app" },
  { slug: "clinic", url: "https://clinic-nine-kappa.vercel.app" },
  { slug: "maskulino", url: "https://maskulino.vercel.app" },
  { slug: "real-estate", url: "https://real-estate-eight-opal.vercel.app" },
  { slug: "techmotordz", url: "https://techmotordz.vercel.app" },
];

const only = process.argv.slice(2);
const selected = only.length ? sites.filter((s) => only.includes(s.slug)) : sites;

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

let failed = 0;

for (const { slug, url, waitMs = 3500 } of selected) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, waitMs));
    await page.screenshot({
      path: path.join(outDir, `${slug}-desktop.png`),
      type: "png",
    });

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({
      path: path.join(outDir, `${slug}-mobile.png`),
      type: "png",
    });

    console.log(`captured ${slug}`);
  } catch (err) {
    failed++;
    console.error(`failed ${slug}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();

if (failed) {
  console.log(`Done with ${failed} failure(s)`);
  process.exitCode = 1;
} else {
  console.log("Done");
}
