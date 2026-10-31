const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    },
    reporter: 'html',
    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.js/
        },
        {
            name: 'authenticated',
            testMatch: /dashboard\.spec\.js/,
            use: { storageState: 'playwright/.auth/user.json' },
            dependencies: ['setup']
        },
        {
            name: 'public',
            testIgnore: [/auth\.setup\.js/, /dashboard\.spec\.js/]
        }
    ]
})