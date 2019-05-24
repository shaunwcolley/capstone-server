const db = require('../models');

const postLighthouseResult = async (result, websiteId, method) => {
  const {
    lhr:
    {
      categories: {
        performance: { score: performance },
        accessibility: { score: accessibility },
        'best-practices': { score: bestPractices },
        seo: { score: seo },
      },
      fetchTime,
      audits: {
        'first-contentful-paint': { displayValue: firstContentfulPaint },
        'first-meaningful-paint': { displayValue: firstMeaningfulPaint },
        'time-to-first-byte': { displayValue: timeToFirstByte },
        'speed-index': { displayValue: speedIndex },
        interactive: { displayValue: timeToInteractive },
        'estimated-input-latency': { displayValue: estimatedInputLatency },
      },
    },
  } = result;

  await db.Stat.create({
    method,
    website_id: websiteId,
    performance,
    accessibility,
    best_practices: bestPractices,
    seo,
    time_fetch: fetchTime,
    time_to_first_byte: timeToFirstByte,
    first_contentful_paint: firstContentfulPaint,
    first_meaningful_paint: firstMeaningfulPaint,
    speed_index: speedIndex,
    time_to_interactive: timeToInteractive,
    estimated_input_latency: estimatedInputLatency,
  });
};

module.exports = postLighthouseResult;

/* const { lhr: { runtimeError} } = result
  if(runtimeError.length > 0) {
    const { lhr: { runtimeError: { code, message } } }
    console.log(code, message)
  } else {
    Here will be code for continuing the result, we may need a column for runtimeError in stats DB.
  }
 */
