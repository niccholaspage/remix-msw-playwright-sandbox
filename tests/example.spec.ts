import { test, expect } from "@playwright/test";

test("displays Pokemon info", async ({ page }) => {
  await page.goto("/");

  await page.waitForResponse("https://pokeapi.co/api/v2/pokemon/ditto");

  // Expect a title "to contain" a substring.
  await expect(page.getByText("id: 1337").first()).toBeVisible();
  await expect(page.getByText("Name: mock-pokemon").first()).toBeVisible();

  await expect(page.getByText("id: 1337").last()).toBeVisible();
  await expect(page.getByText("Name: mock-pokemon").last()).toBeVisible();
});

test("fails gracefully when API 404s", async ({ page }) => {
  await page.goto("/");

  await page.waitForResponse("https://pokeapi.co/api/v2/pokemon/ditto");

  // Expect a title "to contain" a substring.
  await expect(
    page
      .getByText("Failed to fetch data from server, blame the PokeAPI people")
      .first()
  ).toBeVisible();

  await expect(
    page.getByText("Error: Error while fetching from API :(")
  ).toBeVisible();
});
