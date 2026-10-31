const { test, expect } = require('@playwright/test')
const DashboardPage = require('./pages/DashboardPage')

test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index')
})

test('Titre visible sur le dashboard @smoke', async({ page }) =>{
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