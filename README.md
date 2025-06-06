# e2e-starter

Template repo for e2e tests using Playwright  
Have a look at the [playwright documentation](https://playwright.dev/docs/intro) for more information.

## Getting Started

### Setup

1. **Install dependencies**:

   ```bash
   npm install
   npx playwright install
   ```

2. **Define test users**:

   - The test users are defined in `playwright/config/test-users.const.ts`:

     ```ts
     export const testUser: TestUser = {
       username: 'test_user',
       password: 'TEST_USER_PASSWORD',
     };

     export const admin: TestUser = {
       username: 'admin',
       password: 'ADMIN_PASSWORD',
     };
     ```

### Running Tests

To run the end-to-end tests, use the following command:

```bash
npm run e2e
```

This will:

1. Prompt you to set up the base URL and test user passwords if not already configured.
2. Execute the Playwright tests.

To run the tests in headed mode (view test run in browser), use:

```bash
npm run test:headed
```

To debug the tests in ui mode (step through test execution), use:

```bash
npm run test:ui
```

### Additional Information

- Test results are saved in `test-results/test-results.xml`.
- Authentication states are stored in `playwright/.auth/`.

Happy testing! 🧪🥳
