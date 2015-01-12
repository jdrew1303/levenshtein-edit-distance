(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
'use strict';

/*
 * Dependencies.
 */

var levenshteinEditDistance = require('wooorm/levenshtein-edit-distance@0.1.4');

/*
 * DOM nodes.
 */

var $input = document.getElementsByTagName('input')[0];
var $reference = document.getElementsByTagName('input')[1];
var $output = document.getElementsByTagName('output')[0];

/*
 * Handler.
 */

function onchange() {
    $output.textContent = levenshteinEditDistance(
        $input.value, $reference.value
    );
}

/*
 * Attach handlers.
 */

$input.addEventListener('input', onchange);
$reference.addEventListener('input', onchange);

/*
 * Initial answer.
 */

onchange();

}, {"wooorm/levenshtein-edit-distance@0.1.4":2}],
2: [function(require, module, exports) {
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

}, {}]}, {}, {"1":""})
