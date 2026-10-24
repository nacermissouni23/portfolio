import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const repoRoot = process.cwd();
const outDir = path.join(repoRoot, "public", "diagrams");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { category: "ai", file: "app/work/ai/[slug]/page.tsx" },
  { category: "data-science", file: "app/work/data-science/[slug]/page.tsx" },
  { category: "web-dev", file: "app/work/web-dev/[slug]/page.tsx" },
];

const themeVariables = {
  primaryColor: "#F6EE7C",
  primaryTextColor: "#1a1a1a",
  primaryBorderColor: "#556B2F",
  lineColor: "#556B2F",
  secondaryColor: "#E8D5A3",
  tertiaryColor: "#F5F0E8",
  background: "#F5F0E8",
  mainBkg: "#F5F0E8",
  nodeBorder: "#556B2F",
};

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setContent("<!doctype html><html><body></body></html>");
await page.addScriptTag({
  path: path.join(repoRoot, "node_modules", "mermaid", "dist", "mermaid.min.js"),
});

let count = 0;
let failed = 0;

for (const { category, file } of pages) {
  const src = fs.readFileSync(path.join(repoRoot, file), "utf8");
  const block = src.match(/const diagrams: Record<string, string> = \{([\s\S]*?)\n\};/);
  if (!block) throw new Error(`No diagrams block in ${file}`);

  const re = /"([^"]+)":\s*`([\s\S]*?)`/g;
  let m;
  while ((m = re.exec(block[1])) !== null) {
    const slug = m[1];
    const code = m[2];
    const id = `${category}-${slug}`.replace(/[^a-z0-9-]/gi, "-");

    const svg = await page.evaluate(
      async (id, code, themeVariables) => {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          fontFamily: "Poppins, sans-serif",
          themeVariables,
        });
        const { svg } = await window.mermaid.render(id, code);
        return svg;
      },
      id,
      code,
      themeVariables
    );

    fs.writeFileSync(path.join(outDir, `${id}.svg`), svg, "utf8");
    console.log(`generated ${id}.svg`);
    count++;
  }
}

await browser.close();

if (failed) {
  console.log(`Done: ${count} SVGs, ${failed} failed`);
  process.exitCode = 1;
} else {
  console.log(`Done: ${count} SVGs`);
}
