const db = require('../models');

const postLighthouseResult = (result, websiteId) => {
  const {
    lhr:
    {
      categories: {
        performance: { score: performance },
        accessibility: { score: accessibility },
        'best-practices': { score: bestPractices },
        seo: { score: seo},
      },
      fetchTime,
      audits: {
        'first-contentful-paint': { displayValue: firstContentfulPaint },
        'first-meaningful-paint': { displayValue: firstMeaningfulPaint },

      },
    },
  } = result;
  console.log(`bestPractices score: ${bestPractices}`);
  console.log(`performance score: ${performance}`);
  console.log(`accessibility score: ${accessibility}`);
  console.log(`seo score: ${seo}`);
  console.log(`fetchTime score: ${fetchTime}`);
  console.log(`firstContentfulPaint score: ${firstContentfulPaint}`);
  // db.Stat.create({
  //   website_id: websiteId,
  //   performance,
  //   accessibility,
  //   best_practices: bestPractices,
  //   seo,
  //   time_fetch: timeFetch,
  //   time_to_first_byte: timeToFirstByte,
  //   first_contentful_paint: firstContentfulPaint,
  //   first_meaningful_paint: firstMeaningfulPaint,
  //   speed_index: speedIndex,
  //   time_to_interactive: timeToInteractive,
  //   estimated_input_latency: estimatedInputLatency,
  // });
};

module.exports = postLighthouseResult;
