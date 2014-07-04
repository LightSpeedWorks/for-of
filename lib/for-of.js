// for-of.js

'use strict';

var Generator = require('new-generator');

/**
 * _for_of_next_context: global context for primitives, number and string.
 */
var _for_of_next_context = {};

/**
 * next: returns next value object. for ES6 Harmony Iteration.
 */
function next() {
  var x = new Error().stack;
  var context = _for_of_next_context;
  if (typeof this === 'object') {
    if (!this._for_of_next_context) {
      Object.defineProperty(this, '_for_of_next_context',
        {enumerable: false, configurable: true, value: {}, writable: true});
    }
    context = this._for_of_next_context;
  }

  var self = context[x];

  if (self && self._this !== this) {
    self = undefined;
    delete context[x];
  }

  if (!self) {
    context[x] = self = new Generator(this);
    self._this = this;
  }

  var obj = self.next();
  if (obj.done) {
    delete context[x];
    if (typeof this === 'object')
      delete this._for_of_next_context;
  }

  return obj;
}

// Array.prototype.next 定義
if (!('next' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'next', {
    value: next, enumerable: false, configurable: true});
}

// String.prototype.next 定義
if (!('next' in String.prototype)) {
  Object.defineProperty(String.prototype, 'next', {
    value: next, enumerable: false, configurable: true});
}

// Number.prototype.next 定義
if (!('next' in Number.prototype)) {
  Object.defineProperty(Number.prototype, 'next', {
    value: next, enumerable: false, configurable: true});
}

for (var v of new Generator(3))
  console.log('for v of new Generator(3): v = %s', v);

for (var v of 3)
  console.log('for v of 3: v = %s', v);

var ary = [0, 1, 2];

for (var i in ary)
  console.log('i in ary: ary[%s] = %s', i, ary[i]);

for (var i of ary)
  console.log('i of ary: i = %s', i);

for (var gen = ary, n; n = gen.next(), !n.done; )
  console.log('ary.next: = %s', n.value);

for (var gen = new String('abc'), n; n = gen.next(), !n.done; )
  console.log('new String(\'abc\').next = %s', n.value);

for (var i of new String('abc'))
  console.log('i of new String(\'abc\') = %s', i);

for (var i of new String('abc'))
  for (var j of new String('xyz'))
    console.log('i, j of new String(\'abc\')(\'xyz\') = %s, %s', i, j);

for (var gen = 'abc', n; n = gen.next(), !n.done; )
  console.log('\'abc\'.next = %s', n.value);

for (var i of 'abc')
  console.log('i of \'abc\' = %s', i);

for (var i of 'abc')
  for (var j of 'abc')
    console.log('i, j of \'abc\', \'abc\' = %s, %s', i, j);

for (var gen = new Number(3), n; n = gen.next(), !n.done; )
  console.log('new Number(3).next = %s', n.value);

for (var i of new Number(3))
  console.log('new Number(3): = %s', i);

for (var i of new Number(3))
  for (var j of new Number(3))
    console.log('new Number(3)(3): = %s, %s', i, j);

for (var gen = 3, n; n = gen.next(), !n.done; )
  console.log('3.next = %s', n.value);

for (var i of 3)
  console.log('i of 3: = %s', i);

for (var i of 3)
  for (var j of 3)
    console.log('i, j of 3,3: = %s, %s', i, j);
