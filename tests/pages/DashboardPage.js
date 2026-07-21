class DashboardPage {
    constructor(page) {
        this.page = page
        this.title = page.getByRole('heading', { name: "Dashboard" })
        this.widget = page.locator('.orangehrm-dashboard-widget-body')
        this.menu = page.locator('.oxd-sidepanel-body')
    }

    getTitle() {
        return this.title 
    }

    getWidget() {
        return this.widget
    }

    getMenu() {
        return this.menu
    }

}

module.exports = DashboardPage 