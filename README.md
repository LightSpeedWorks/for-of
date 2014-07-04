[for-of](https://www.npmjs.org/package/for-of) - for-of extention for ES6 Harmony iteration
=========================

  This **for-of** is prototype extension for ES6 Harmony iteration.

  **for-of** does not directly use any ES6 Harmony features, 
  but it is designed to work well with `ES6 iteration`.

Installation
------------

```bash
$ npm install for-of
```

[![npm][npm-for-of.png]][npm-for-of]

Usage
-----

  The following example requires `node 0.11.x` (unstable)
  and must be run with the `--harmony-iteration`
  or `--harmony` flag.
  Future stable versions of node.js will include support for iteration.

# example using 'for-of' extension

```js
var forOf = require('for-of');
forOf();

// new Generator with ES6 iteration feature (node v0.11.x)
for (var value of [11, 22, 33])
  console.log(value);
// -> 11, 22, 33

for (var value of 'abc')
  console.log(value);
// -> 'a', 'b', 'c'

for (var value of 3)
  console.log(value);
// -> 0, 1, 2

// new Generator without ES6 feature (node v0.10.x, v0.8.x)
for (var gtor = [11, 22, 33],
         res = gtor.next(); !res.done; res = gtor.next())
  console.log(res.value);
// -> 11, 22, 33
```

# 'for-of' extension for Array, String, Number

```js
var forOf = require('for-of');

forOf(Array);

forOf(String);

forOf(Number);

forOf(Array, String, Number);
// or
forOf();
```

# etc

License
-------

  MIT

Git Repository
--------------

  LightSpeedWorks/[for-of](https://github.com/LightSpeedWorks/for-of#readme)

[npm-for-of]: https://nodei.co/npm/for-of
[npm-for-of.png]: https://nodei.co/npm/for-of.png
