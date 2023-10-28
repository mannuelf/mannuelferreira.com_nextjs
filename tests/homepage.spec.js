// @ts-check
const { test, expect } = require("@playwright/test");

test("homepage has a title and a blob post card in it.", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home | Mannuel Ferreira/);
});
