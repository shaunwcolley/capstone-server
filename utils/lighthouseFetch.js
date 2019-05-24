const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const postResult = require('./postLighthouseResult');
const db = require('../models');

function launchChromeAndRunLighthouse(url, opts, config, websiteId) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(async (result) => {
          await chrome.kill().then(async () => {
            let method = ''
            if (config.settings.emulatedFormFactor === 'desktop') {
              method = 'desktop';
            } else {
              method = 'mobile';
            }
            await postResult(result, websiteId, method);
          });
        });
    });
}

module.exports = launchChromeAndRunLighthouse;
