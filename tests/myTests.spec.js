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


test('Add task-0items left', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  //locate input
  let userInput = await page.locator('#text-input');

  //fill input
  await userInput.fill('drink');
  await page.keyboard.press('Enter');

  //locate items left
  let itemCounter = await page.locator('#number-of-items');

  await expect(itemCounter).toHaveText('1');

  //check task
  let taskCheck = await page.locator('#list');

  await taskCheck.click(); //click to check task

  await expect(itemCounter).toHaveText('0')

});

test('Add 3task, check 1 item and show 0 items left', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  //locate input
  let userInput = await page.locator('#text-input');

  //fill input
  await userInput.fill('drink');
  await page.keyboard.press('Enter');

  await userInput.fill('lunch');
  await page.keyboard.press('Enter');

  await userInput.fill('dinner');
  await page.keyboard.press('Enter');


  //locate items left
  let itemCounter = await page.locator('#number-of-items');

  await expect(itemCounter).toHaveText('3');

  //check task
  let taskCheck = await page.locator('#list');

  await taskCheck.click(); //click to check task

  await expect(itemCounter).toHaveText('2')

});