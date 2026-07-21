const { test, expect } = require('@playwright/test')
const LoginPage = require('./pages/LoginPage')
const DashboardPage = require('./pages/DashboardPage')

test.beforeEach('login avec identifiants valides', async({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('Admin', 'admin123')
})

test('Titre visible après login', async({ page }) =>{
    const dashboardPage = new DashboardPage(page)
    const title = dashboardPage.getTitle()
    await expect(title).toBeVisible()
})

test('Au moins un widget visible', async({ page }) =>{
    const dashboardPage = new DashboardPage(page)
    const widget = dashboardPage.getWidget()
    await expect(widget.first()).toBeVisible()
})

test('Présence du menu navigateur', async({ page }) =>{
    const dashboardPage = new DashboardPage(page)
    const menu = dashboardPage.getMenu()
    await expect(menu).toBeVisible()
})