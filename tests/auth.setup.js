const { test: setup, expect } = require('@playwright/test')
const LoginPage = require('./pages/LoginPage')

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(process.env.ORANGEHRM_USERNAME, process.env.ORANGEHRM_PASSWORD)
    await expect(page).toHaveURL(/dashboard/)
    await page.context().storageState({ path: authFile })
})