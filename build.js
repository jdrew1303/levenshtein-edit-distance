(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var levenshtein = require('levenshtein-edit-distance');

var $input = document.getElementsByTagName('input')[0];
var $reference = document.getElementsByTagName('input')[1];
var $output = document.getElementsByTagName('output')[0];

$input.addEventListener('input', oninputchange);
$reference.addEventListener('input', oninputchange);

oninputchange();

function oninputchange() {
  $output.textContent = levenshtein($input.value, $reference.value);
}

},{"levenshtein-edit-distance":2}],2:[function(require,module,exports){
var cache,
    codes;

cache = [];
codes = [];

function levenshtein(value, other, insensitive) {
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

    if (insensitive) {
        value = value.toLowerCase();
        other = other.toLowerCase();
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

},{}]},{},[1]);
