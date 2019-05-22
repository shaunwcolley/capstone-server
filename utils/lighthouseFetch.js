const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
// const postResult = require('./postLighthouseResult');
const websiteFetch = require('./websiteFetch');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(result => chrome.kill()
          .then(() => websiteFetch(url))
          .then((url) => console.log(url)
          // postResult(result, id)
          ));
    });
}

module.exports = launchChromeAndRunLighthouse;
