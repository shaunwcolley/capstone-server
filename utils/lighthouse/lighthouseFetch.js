const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const postResult = require('./postLighthouseResult');


function checkMethod(config) {
  let method = '';
  if (config === 'desktop') {
    method = 'desktop';
    return method;
  }
  method = 'mobile';
  return method;
}

function launchChromeAndRunLighthouse(url, opts, config, websiteId, method) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(async (result) => {
          await chrome.kill().then(async () => {
            await postResult(result, websiteId, method).catch(error => console.log(`Error in posting result to db; error log: ${error}`));
          }).catch(error => console.log(`Error in closing chrome; error log: ${error}`));
        }).catch(async (error) => {
          await chrome.kill().then(async () => {
            await postResult(error, websiteId, method).catch(postError => console.log(`Error in posting result to db; error log: ${postError}`));
            console.log(`Error in running lighthouse api; error log: ${error}`);
          }).catch(chromeError => console.log(`Error in closing chrome; error log: ${chromeError}`));
        });
    });
}

module.exports = launchChromeAndRunLighthouse;
