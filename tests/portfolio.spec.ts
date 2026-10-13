import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, readFileSync } from "node:fs";

test.beforeEach(async ({ page }) => {
  // Deterministic offline fallback; the live API is verified separately.
  await page.route("**/api/github", (route) =>
    route.fulfill({ json: { repos: [] } }),
  );
  await page.goto("/");
});

test("French-first portfolio, filtering, complete directory and honest case studies", async ({
  page,
}) => {
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Mehdi");
  await expect(page.locator(".project-card")).toHaveCount(8);
  await page
    .getByRole("button", { name: "Data Engineering", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Tous", exact: true }).click();
  await page.getByRole("button", { name: /Voir tous les projets/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(13);
  await page
    .getByRole("button", { name: "Développement", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(5);
  await page.getByRole("button", { name: "Tous", exact: true }).click();
  const trigger = page.getByRole("button", {
    name: "Explorer le projet",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("infrastructure");
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /Code source/ }),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  const downloadPromise = page.waitForEvent("download");
  await page.locator(".header-cv").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Mehdi-Chmiti-CV.pdf");
  const downloadedPath = await download.path();
  expect(readFileSync(downloadedPath!).subarray(0, 5).toString()).toBe("%PDF-");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("English translation and light theme persist across reloads", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Passer en anglais" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Mehdi");
  await page.getByRole("button", { name: "Switch theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Explore the case study" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Evaluation & limitations",
  );
});

test("mobile navigation, responsive widths and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 850 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  const nav = page.getByRole("navigation", { name: "Navigation mobile" });
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "Projets", exact: true }).click();
  await expect(nav).toHaveCount(0);
  expect(await page.evaluate(() => location.hash)).toBe("#projects");
  await expect(page.locator("#projects")).toBeFocused();
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ouvrir le menu" }),
  ).toBeFocused();
});

test("WCAG AA audit in both themes and project dialog", async ({ page }) => {
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.getByRole("button", { name: "Changer de thème" }).click();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page
    .getByRole("button", { name: "Explorer le projet", exact: true })
    .click();
  const dialogResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogResults.violations).toEqual([]);
});

test("render evidence and valid links without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  mkdirSync("artifacts", { recursive: true });
  await page.screenshot({ path: "artifacts/desktop-dark.png", fullPage: true });
  await page.getByRole("button", { name: "Changer de thème" }).click();
  await page.screenshot({
    path: "artifacts/desktop-light.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Changer de thème" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/mobile-dark.png", fullPage: true });
  for (const href of await page
    .locator("a[href^='#']")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    expect(await page.locator(href!).count()).toBe(1);
  }
  expect(errors).toEqual([]);
});
