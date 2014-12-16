# levenshtein-edit-distance [![Build Status](https://img.shields.io/travis/wooorm/levenshtein-edit-distance.svg?style=flat)](https://travis-ci.org/wooorm/levenshtein-edit-distance) [![Coverage Status](https://img.shields.io/coveralls/wooorm/levenshtein-edit-distance.svg?style=flat)](https://coveralls.io/r/wooorm/levenshtein-edit-distance?branch=master)

[Levenshtein edit distance](http://en.wikipedia.org/wiki/Levenshtein_distance) (by [Vladimir Levenshtein](http://en.wikipedia.org/wiki/Vladimir_Levenshtein)). No cruft. Real fast.

## Installation

npm:
```bash
$ npm install levenshtein-edit-distance
```

Component:
```bash
$ component install wooorm/levenshtein-edit-distance
```

Bower:
```bash
$ bower install levenshtein-edit-distance
```

## Usage

```js
var levenshteinDistance = require('levenshtein-edit-distance');

levenshteinDistance('levenshtein', 'levenshtein'); // 0
levenshteinDistance('sitting', 'kitten'); // 3
levenshteinDistance('gumbo', 'gambol'); // 2
levenshteinDistance('saturday', 'sunday'); // 3

/* Case sensitive! */
levenshteinDistance('DwAyNE', 'DUANE') !== levenshteinDistance('dwayne', 'DuAnE'); // true

/* Order insensitive */
levenshteinDistance('aarrgh', 'aargh') === levenshteinDistance('aargh', 'aarrgh'); // true
```

## CLI

Install:
```bash
$ npm install --global levenshtein-edit-distance
```

Use:
```
Usage: levenshtein-edit-distance [options] words...

Levenshtein edit distance. No cruft. Real fast.

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output distance between values
$ levenshtein-edit-distance sitting kitten
# 3

# output distance between values from stdin
$ echo "saturday,sunday" | levenshtein-edit-distance
# 3
```
## Other Levenshtein libraries

- [sindresorhus/leven](https://github.com/sindresorhus/leven) — Supports a CLI;
- [hiddentao/fast-levenshtein](http://github.com/hiddentao/fast-levenshtein) — Supports async functionality;
- [NaturalNode/natural](http://github.com/NaturalNode/natural) — Supports settings weight of substitutions, insertions, and deletions.
- [gf3/Levenshtein](http://github.com/gf3/Levenshtein) — Supports inspecting the matrix.
- [levenshtein-component](https://www.npmjs.org/package/levenshtein-component);
- [chrisdew/levenshtein-deltas](https://github.com/chrisdew/levenshtein-deltas);

## Benchmark

On a MacBook Air, it runs about 1,909,000 op/s.

```
              Levenshtein — to be fair, it lets you inspect a matrix
     113 op/s » op/s * 1,000

              natural — to be fair, it offers more options
     183 op/s » op/s * 1,000

              levenshtein-deltas
     237 op/s » op/s * 1,000

              levenshtein-component
     305 op/s » op/s * 1,000

              fast-levenshtein
   1,141 op/s » op/s * 1,000

              Leven — fast.
   2,076 op/s » op/s * 1,000

              levenshtein-edit-distance — this module
   1,909 op/s » op/s * 1,000
```

## License

MIT © [Titus Wormer](http://wooorm.com)
