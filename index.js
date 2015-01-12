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
