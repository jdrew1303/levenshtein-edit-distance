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
require.register("wooorm~levenshtein-edit-distance@0.1.0", function (exports, module) {
'use strict';

function levenshtein(value, alternative) {
    var previousRow, previousRowIterator, columnIterator,
        character, next, current, length, alternativeLength, temporary;

    /* Convert both values to string. */
    value = String(value);
    alternative = String(alternative);

    /* Basic cases. */
    if (value === alternative) {
        return 0;
    }

    length = value.length;
    alternativeLength = alternative.length;

    if (!length) {
        return alternativeLength;
    }

    if (!alternativeLength) {
        return length;
    }

    /* Initialise the previous row, this just creates an array from 0..N */
    previousRow = [];
    previousRowIterator = -1;

    while (++previousRowIterator <= alternativeLength) {
        previousRow[previousRowIterator] = previousRowIterator;
    }

    previousRowIterator = -1;

    while (++previousRowIterator < length) {
        character = value.charAt(previousRowIterator);
        next = previousRowIterator + 1;
        columnIterator = -1;

        while (++columnIterator < alternativeLength) {
            current = next;

            next = previousRow[columnIterator];

            if (character !== alternative.charAt(columnIterator)) {
                next += 1;
            }

            temporary = current + 1;

            if (next > temporary) {
                next = temporary;
            }

            temporary = previousRow[columnIterator + 1] + 1;

            if (next > temporary) {
                next = temporary;
            }

            previousRow[columnIterator] = current;
        }

        previousRow[alternativeLength] = next;
    }

    return next;
}

module.exports = levenshtein;

});

require.register("levenshtein-edit-distance-gh-pages", function (exports, module) {
var levenshteinEditDistance = require("wooorm~levenshtein-edit-distance@0.1.0");
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

require("levenshtein-edit-distance-gh-pages")
