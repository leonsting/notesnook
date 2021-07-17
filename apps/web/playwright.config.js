const { devices } = require("@playwright/test");
const IS_CI = !!process.env.CI;

module.exports = {
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: "__e2e__",

  // Each test is given 30 seconds
  timeout: 30000,
  workers: IS_CI ? 3 : 4,
  reporter: "list",
  retries: IS_CI ? 3 : 0,
  use: {
    headless: true,
    acceptDownloads: true,

    // Artifacts
    trace: IS_CI ? "off" : "retain-on-failure",
    screenshot: IS_CI ? "off" : "only-on-failure",
    video: IS_CI ? "off" : "retry-with-video",
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "WebKit",
      use: { browserName: "webkit" },
    },
  ],
};