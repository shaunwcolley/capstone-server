const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const postResult = require('./postLighthouseResult');
const db = require('../models');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config)
        .then(result => chrome.kill()
          .then(() => db.Website.findOne({ where: { url } })
            .then((website) => {
              const { id } = website;
              postResult(result, id);
            })));
    });
}

module.exports = launchChromeAndRunLighthouse;
