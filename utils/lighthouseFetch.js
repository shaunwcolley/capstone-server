const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const postResult = require('./postLighthouseResult');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(result => chrome.kill().then(() => postResult(result)));
    });
}

module.exports = launchChromeAndRunLighthouse;
