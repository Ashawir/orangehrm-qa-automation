const { test, expect } = require('@playwright/test')
const LoginPage = require('./pages/LoginPage')

test('Login avec identifiants valides', async({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'admin123')

    await expect(page).toHaveURL(/dashboard/)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('Login avec mot de passe incorrect', async({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('Admin', 'fauxmotdepasse')

    await expect(page).toHaveURL(/login/)

    const errorMessage = loginPage.getErrorMessage()
    await expect(errorMessage).toHaveText('Invalid credentials')
})

test('Login avec champs vides', async({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('', '')

    await expect(page).toHaveURL(/login/)

    const requiredFieldError = loginPage.getRequiredFieldError()
    await expect(requiredFieldError).toHaveText('Required')
})