import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse(
      "http://127.0.0.1:3000",
      {
        port: chrome.port,
        output: ["json", "html"],
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
      mode === "desktop" ? desktopConfig : undefined,
    );
    if (result.lhr.configSettings.formFactor !== mode)
      throw new Error(`Unexpected Lighthouse profile for ${mode}`);
    await writeFile(`artifacts/lighthouse-${mode}.json`, result.report[0]);
    await writeFile(`artifacts/lighthouse-${mode}.html`, result.report[1]);
    console.log(
      mode,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
      ),
    );
    console.log(
      "Metrics",
      JSON.stringify(
        Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
            "speed-index",
          ].map((key) => [key, result.lhr.audits[key].displayValue]),
        ),
      ),
    );
    console.log(
      "Actionable findings",
      JSON.stringify(
        Object.values(result.lhr.audits)
          .filter(
            (audit) =>
              audit.score !== null &&
              audit.score < 0.9 &&
              ["opportunity", "metricSavings"].includes(audit.details?.type),
          )
          .map((audit) => ({
            id: audit.id,
            title: audit.title,
            description: audit.description,
          })),
      ),
    );
  }
} finally {
  await chrome.kill();
}
