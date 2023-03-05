// @ts-check
const { test, expect } = require('@playwright/test');

test('Task addition', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  //locate input
  let userInput = await page.locator('#text-input');

  //fill input
  await userInput.fill('food');
  await page.keyboard.press('Enter');

  //await list 
  let taskList = await page.locator('#list li');

  //check result
  await expect(taskList).toHaveText('food❌');
});
