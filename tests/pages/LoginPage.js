class LoginPage {
    constructor(page) {
        this.page = page
        this.usernameInput = page.getByPlaceholder('Username')
        this.passwordInput = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: "Login"} )
        this.errorMessage = page.locator('.oxd-alert-content-text')
        this.requiredFieldError = page.locator('.oxd-input-group__message').first()
    }

    async goto(){
        await this.page.goto('/')
    }

    async login(username, password) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    getErrorMessage() {
         return this.errorMessage
    }

    getRequiredFieldError() {
        return this.requiredFieldError
    }
}

module.exports = LoginPage