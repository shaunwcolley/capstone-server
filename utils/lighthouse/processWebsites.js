const launchChromeAndRunLighthouse = require('./lighthouseFetch');
const opts = require('./opts');
const desktopConfig = require('./lr-desktop-config');
const mobileConfig = require('./lr-mobile-config');
const baseConfig = require('./baseConfig');

const processWebsites = async (array) => {
 for(const item of array) {
   const { id, url } = item;
    await launchChromeAndRunLighthouse(url, opts, desktopConfig, id, 'desktop');
    // mobile is only off in accessibility by 15, rest by 1%
    await launchChromeAndRunLighthouse(url, opts, mobileConfig, id, 'mobile');
    // More accurate in the following: paints, speed index, performance, bestPractices and seo,
    // but still not as accurate as it should be for seo (BestPractices were off by 7 instead of 14)
    // Seo off by 19,
    // await launchChromeAndRunLighthouse(url, opts, baseConfig, id);
 }
};

module.exports = processWebsites;
