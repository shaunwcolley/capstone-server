const db = require('../../models');

const postLighthouseResult = async (result, websiteId, method) => {
  if (result.lhr) {
    const { lhr: { runtimeError } } = result;
    if (runtimeError) {
      const { lhr: { runtimeError: { code, message } } } = result;
      await db.Stat.create({
        method,
        website_id: websiteId,
        performance: null,
        accessibility: null,
        best_practices: null,
        seo: null,
        time_fetch: null,
        time_to_first_byte: null,
        first_contentful_paint: null,
        first_meaningful_paint: null,
        speed_index: null,
        time_to_interactive: null,
        estimated_input_latency: null,
        error_code: code,
        error_message: message,
      });
    } else {
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
    }
  } else {
    const { LHError } = result;
    await db.Stat.create({
      method,
      website_id: websiteId,
      performance: null,
      accessibility: null,
      best_practices: null,
      seo: null,
      time_fetch: null,
      time_to_first_byte: null,
      first_contentful_paint: null,
      first_meaningful_paint: null,
      speed_index: null,
      time_to_interactive: null,
      estimated_input_latency: null,
      error_code: 'LHError',
      error_message: LHError,
    });
  }
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
