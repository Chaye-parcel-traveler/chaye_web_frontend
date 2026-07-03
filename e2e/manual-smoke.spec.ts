import { expect, test } from "@playwright/test";

test("home page renders from the E2E stack", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#root")).toBeVisible();
  await expect(page.locator("body")).toContainText("Chaye");
});
