/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("wooorm~levenshtein-edit-distance@0.1.2", function (exports, module) {
var cache,
    codes;

cache = [];
codes = [];

function levenshtein(value, other) {
    var length,
        lengthOther,
        code,
        result,
        distance,
        distanceOther,
        index,
        indexOther;

    if (value === other) {
        return 0;
    }

    length = value.length;
    lengthOther = other.length;

    if (length === 0) {
        return lengthOther;
    }

    if (lengthOther === 0) {
        return length;
    }

    index = 0;

    while (index < length) {
        codes[index] = value.charCodeAt(index);
        cache[index] = ++index;
    }

    indexOther = 0;

    while (indexOther < lengthOther) {
        code = other.charCodeAt(indexOther);

        result = distance = indexOther++;

        index = -1;

        while (++index < length) {
            distanceOther = code === codes[index] ? distance : distance + 1;

            distance = cache[index];

            cache[index] = result = distance > result
                ? distanceOther > result
                    ? result + 1
                    : distanceOther
                : distanceOther > distance
                    ? distance + 1
                    : distanceOther;
        }
    }

    return result;
}

module.exports = levenshtein;

});

require.register("levenshtein-edit-distance-gh-pages", function (exports, module) {
var levenshteinEditDistance = require('wooorm~levenshtein-edit-distance@0.1.2');
var inputElement = document.getElementsByTagName('input')[0];
var referenceElement = document.getElementsByTagName('input')[1];
var outputElement = document.getElementsByTagName('output')[0];

function getDistance() {
    outputElement.textContent = levenshteinEditDistance(inputElement.value, referenceElement.value);
}

inputElement.addEventListener('input', getDistance);
referenceElement.addEventListener('input', getDistance);

getDistance();

});

require("levenshtein-edit-distance-gh-pages");
