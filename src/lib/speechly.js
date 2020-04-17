import Speechly from '@speechly/browser-client';

// Create a new Client. appId and language are configured in the dashboard.
export const client = new Speechly.Client({
  appId: process.env.SPEECHLY_APP_ID,
  language: process.env.SPEECHLY_APP_LANG,
});
