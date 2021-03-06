# levenshtein-edit-distance [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Levenshtein edit distance][wiki] (by [Vladimir Levenshtein][vlad]).
No cruft.  Real fast.

## API

Install:

```bash
npm install levenshtein-edit-distance
```

Use:

```js
var levenshtein = require('levenshtein-edit-distance');

levenshtein('levenshtein', 'levenshtein'); // 0
levenshtein('sitting', 'kitten'); // 3
levenshtein('gumbo', 'gambol'); // 2
levenshtein('saturday', 'sunday'); // 3

/* Case sensitive! */
levenshtein('DwAyNE', 'DUANE') !== levenshtein('dwayne', 'DuAnE');
// true

/* Insensitive: */
levenshtein('DwAyNE', 'DUANE', true) === levenshtein('dwayne', 'DuAnE', true); // true

/* Order insensitive */
levenshtein('aarrgh', 'aargh') === levenshtein('aargh', 'aarrgh');
// true
```

## CLI

Install:

```sh
npm install -g levenshtein-edit-distance
```

Use:

```txt
Usage: levenshtein-edit-distance [options] word word

Levenshtein edit distance. No cruft. Real fast.

Options:

  -h, --help           output usage information
  -v, --version        output version number
  -i, --insensitive    ignore casing

Usage:

# output distance
$ levenshtein-edit-distance sitting kitten
# 3

# output distance from stdin
$ echo "saturday,sunday" | levenshtein-edit-distance
# 3
```

## Related

*   [`levenshtein.c`](https://github.com/wooorm/levenshtein.c)
    — C API
*   [`levenshtein`](https://github.com/wooorm/levenshtein)
    — C CLI
*   [`levenshtein-rs`](https://github.com/wooorm/levenshtein-rs)
    — Rust API

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/levenshtein-edit-distance.svg

[travis]: https://travis-ci.org/wooorm/levenshtein-edit-distance

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/levenshtein-edit-distance.svg

[codecov]: https://codecov.io/github/wooorm/levenshtein-edit-distance

[license]: LICENSE

[author]: http://wooorm.com

[wiki]: http://en.wikipedia.org/wiki/Levenshtein_distance

[vlad]: http://en.wikipedia.org/wiki/Vladimir_Levenshtein
