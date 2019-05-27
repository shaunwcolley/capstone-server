const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const postResult = require('./postLighthouseResult');

function launchChromeAndRunLighthouse(url, opts, config, websiteId) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(async (result) => {
          await chrome.kill().then(async () => {
            let method = '';
            if (config.settings.emulatedFormFactor === 'desktop') {
              method = 'desktop';
            } else {
              method = 'mobile';
            }
            await postResult(result, websiteId, method).catch(error => console.log(`Error in posting result to db; error log: ${error}`));
          }).catch(error => console.log(`Error in closing chrome; error log: ${error}`));
        }).catch(error => console.log(`Error in running lighthouse api; error log: ${error}`));
    });
}

module.exports = launchChromeAndRunLighthouse;
