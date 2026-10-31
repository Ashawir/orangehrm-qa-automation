# OrangeHRM QA Automation

![CI](https://github.com/Ashawir/orangehrm-qa-automation/actions/workflows/playwright.yml/badge.svg)

## Project Overview

This project demonstrates a complete QA Automation framework built with Playwright.

It includes:

- End-to-End (E2E) tests for the OrangeHRM demo application
- API tests using JSONPlaceholder
- Page Object Model (POM)
- Session reuse with `storageState`
- Smoke test tagging
- Continuous Integration with GitHub Actions
- HTML test reports

The goal of this project is to showcase industry-standard QA Automation practices and serve as a portfolio project.

---

## Tech Stack

- JavaScript
- Playwright
- Playwright API Testing
- Page Object Model (POM)
- dotenv (environment variables)
- Git & GitHub
- GitHub Actions (CI/CD)
- HTML Reporter

---

## Project Structure

```text
orangehrm-qa-automation
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── tests/
│   ├── api/
│   │   └── users.api.spec.js
│   │
│   ├── pages/
│   │   ├── LoginPage.js
│   │   └── DashboardPage.js
│   │
│   ├── auth.setup.js
│   ├── login.spec.js
│   └── dashboard.spec.js
│
├── .env.example
├── .gitignore
├── playwright.config.js
├── package.json
└── README.md
```

---

## Test Coverage

### End-to-End Tests (OrangeHRM)

- Login with valid credentials
- Login with invalid password
- Login with empty fields
- Dashboard title verification
- Dashboard widget visibility
- Navigation menu visibility

### API Tests (JSONPlaceholder)

- Get an existing user
- Get a non-existing user
- Create a new user
- Update a user
- Delete a user

### Authentication Setup

- One login performed before the dashboard tests, with the session saved and reused

---

## Test Strategy

The suite is organized in two layers:

- **E2E tests (OrangeHRM):** validate real user journeys through the browser (login, dashboard).
- **API tests (JSONPlaceholder):** validate endpoint behavior directly (status codes, response body, error handling), without the UI.

Key design choices:

- **Page Object Model:** selectors live in one place (`tests/pages/`), so a UI change means one fix instead of many.
- **Smoke tests:** critical tests are tagged `@smoke` for a fast sanity check (`npm run test:smoke`). The full suite acts as regression.
- **Session reuse with `storageState`:** a setup project logs in once and saves the session, which the dashboard tests reuse instead of logging in before every test.
- **Retries and traces in CI:** failed tests are retried up to 2 times in CI, and a trace is recorded on the first retry to help diagnose failures.

---

## Run the Project Locally

Clone the repository:

```bash
git clone https://github.com/Ashawir/orangehrm-qa-automation.git
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create your environment file from the provided template:

```bash
cp .env.example .env
```

Then fill in the credentials. The OrangeHRM demo credentials are public (displayed on the login page of the demo): `Admin` / `admin123`.

Run all tests:

```bash
npm test
```

Open the HTML report:

```bash
npx playwright show-report
```

### Run smoke tests only

Critical tests are tagged with `@smoke`. To run only these:

```bash
npm run test:smoke
```

---

## Continuous Integration

This project uses GitHub Actions to automatically execute all Playwright tests on every push and pull request.

Credentials are managed using GitHub Secrets.

Current test suite:

- ✅ 6 End-to-End tests
- ✅ 5 API tests
- ✅ 1 authentication setup

**Total: 12 automated tests**

---

## HTML Report

The project generates a Playwright HTML report after each test execution.

Screenshot of the generated report:

![Playwright Report](images/playwright-report.png)

---

## Known Limitations

- OrangeHRM and JSONPlaceholder are public demo services: they can be slow or temporarily unavailable, which is why retries are enabled in CI.
- JSONPlaceholder simulates write operations (POST, PUT, DELETE) without persisting anything, so these tests verify the response format, not data persistence.
- Tests currently run on Chromium only. Cross-browser testing is a possible next step.

---

## Author

Developed by **Andhume** as part of a QA Automation learning journey.