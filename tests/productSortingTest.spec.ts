import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage.ts'
import { ProductPage } from './pages/productPage.ts';
import * as testData from './testData/sauceDemoTestData.json'
import { sortAndCompareStringArray, sortAndCompareNumberArray } from './helper/utils.ts';

let loginPage: LoginPage;
let productPage: ProductPage;

test.beforeEach('Sauce demo login', async ({ page }) => {
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
})

test('Verify product page default sorting order', async ({ page }) => {
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'ascending')).toBe(true);
});

test('Verify product page is sorted from A-Z', async ({ page }) => {
    await productPage.selectDropdown('za', 'value');
    await productPage.selectDropdown('az', 'value');
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'ascending')).toBe(true);
});

test('Verify product page is sorted from Z-A', async ({ page }) => {
    await productPage.selectDropdown('za', 'value');
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'descending')).toBe(true);
});

test('Verify product page is sorted from low-high', async ({ page }) => {
    await productPage.selectDropdown('lohi', 'value');
    const allItemPrice = await productPage.getAllItemPrice();
    expect(sortAndCompareNumberArray(allItemPrice, 'ascending')).toBe(true);
});

test('Verify product page is sorted from high-low', async ({ page }) => {
    await productPage.selectDropdown('hilo', 'value');
    const allItemPrice = await productPage.getAllItemPrice();
    expect(sortAndCompareNumberArray(allItemPrice, 'descending')).toBe(true);
});
