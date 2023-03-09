// @ts-check
const { test, expect } = require('@playwright/test');

test('Ad Task', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let userInput = await page.locator('#text-input');

  await userInput.fill('food');
  await page.keyboard.press('Enter');

  
  let taskList = await page.locator('#list li');
  await expect(taskList).toHaveText('food');
});


test('Add Task(0items left)', async ({ page }) => {

  await page.goto('http://127.0.0.1:5500/');

  let userInput = await page.locator('#text-input');


  await userInput.fill('drink');
  await page.keyboard.press('Enter');

  let itemCounter = await page.locator('#number-of-items');
  await expect(itemCounter).toHaveText('1');


  let taskCheck = await page.locator('#list input');
  await taskCheck.click(); //click to check task
  await expect(itemCounter).toHaveText('0');

});

test('Add 3task, check 1 item and show 0 items left', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let userInput = await page.locator('#text-input');

  await userInput.fill('breakfast');
  await page.keyboard.press('Enter');

  await userInput.fill('lunch');
  await page.keyboard.press('Enter');

  let dinner = await userInput.fill('dinner');
  await page.keyboard.press('Enter');


  let itemCounter = await page.locator('#number-of-items');
  await expect(itemCounter).toHaveText('3');

  //check task
  let taskCheck = await page.locator('#list input').first();
  await taskCheck.click(); //click to check task
  await expect(itemCounter).toHaveText('2');
});