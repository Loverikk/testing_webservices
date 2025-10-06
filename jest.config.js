module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  verbose: true,
  reporters: ['default', [
    './node_modules/jest-html-reporter',
    {
      pageTitle: 'Test Report',
      outputPath: 'reports/test-report.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
    }
  ]]
};
