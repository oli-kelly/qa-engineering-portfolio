import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'test-results/cypress-[hash].xml',
    toConsole: true
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:4173',
    specPattern: 'tests/cypress/e2e/**/*.cy.js',
    supportFile: 'tests/cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true
  }
});
