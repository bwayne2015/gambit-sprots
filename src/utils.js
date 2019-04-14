const config = require('../config');
const DEFAULT_LANGUAGE = config.const.defaultLanguage;

// Generate error message
const getErrorMessage = (error = {}, message = 'Something went wrong.') => {
  const result = {};

  result.status = false;
  result.message = message;
  result.data = null;
  result.error = error;

  return result;
};

// Generate success message
const getSuccessMessage = (data = {}, message = 'Request completed successfully.') => {
  const result = {};

  result.status = true;
  result.message = message;
  result.data = data;
  result.error = null;

  return result;
};

/**
 * Convert expression to query
 */

const exp2Query = json => {
  let {
    p1, p2, op
  } = json;

  if (typeof p1 !== 'string') {
    p1 = exp2Query(p1);
  }

  if (typeof p2 !== 'string') {
    p2 = exp2Query(p2);
  }

  return `(${p1} ${op} ${p2})`;
}

const copyMissingKeys = (source, destination) => {
  return {
    ...source,
    ...destination,
  };
}

const fillMissingParts = (destination, source) => {
  Object.keys(destination).forEach(key => {
    const value = destination[key];

    // Handle arrays
    if (Array.isArray(value)) {
      const filled = fillMissingParts(destination[key], source[key]);
      /**
       * `filled` is an object.
       * But `destination[key]` was an array earlier.
       * so we need to convert `filled` back into an array.
       */
      destination[key] = Object.keys(filled).map(index => filled[index]);
    }
    // Handle objects
    else if (typeof value === 'object') {
      destination[key] = fillMissingParts(destination[key], source[key]);
    }
  });

  destination = copyMissingKeys(source, destination);

  return destination;
};

/**
 *  Fill out the missing keys and data
 */

const preProcess = record => {
  const {
    multi_lang, ...defaultLang
  } = record;

  const data = multi_lang;
  
  Object.keys(data).forEach(language => {
    data[language] = fillMissingParts(data[language], defaultLang);
  });

  data[DEFAULT_LANGUAGE] = defaultLang;

  return data;
};

module.exports = {
  getErrorMessage,
  getSuccessMessage,
  exp2Query,
  preProcess
}