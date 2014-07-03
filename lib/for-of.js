// for-of.js

'use strict';

/*
// Object.prototype.__defineGetter__ 定義
if (!Object.prototype.__defineGetter__ && Object.defineProperty) {
  Object.defineProperty(Object.prototype, '__defineGetter__', {
    value: function (name, func) {
      Object.defineProperty(this, name,
        {get: func, enumerable: true, configurable: true});
    }, enumerable: false, configurable: true});
}

// Object.prototype.__defineSetter__ 定義
if (!Object.prototype.__defineSetter__ && Object.defineProperty) {
  Object.defineProperty(Object.prototype, '__defineSetter__', {
    value: function (name, func) {
      Object.defineProperty(this, name,
        {set: func, enumerable: true, configurable: true});
    }, enumerable: false, configurable: true});
}

// Function.prototype.name 定義
if (!('name' in Function.prototype)) {
  Function.prototype.__defineGetter__('name', function () {
    return ('' + this).replace(/^\s*function\s*\**\s*([^\(]*)[\S\s]+$/im, '$1');
  });
}
*/

function Range(from, to, step, incl) {
  if (from === undefined) to = from = 0;
  if (to === undefined) incl = false, to = from, from = 0;
  if (typeof to === 'boolean') incl = to, to = from, from = incl? 1: 0;
  if (typeof step === 'boolean') incl = step, step = undefined;

  if (from <= to) {
    if (step === undefined) step = 1;
    if (step <= 0) throw new Error('step must be 1 or more');
  }
  else {
    if (step === undefined) step = -1;
    if (step >= 0) throw new Error('step must be -1 or less');
  }

  if (!(this instanceof Range))
    return new Range(from, to, step, incl);

  var len = Math.floor((to - from + (incl? step: 0))/ step);

  this._from   = from;
  this._to     = to;
  this._step   = step;
  this._incl   = incl;
  this._length = len;
  this._index  = 0;
  this._value  = from;
}

Range.prototype.next = function next() {
  if (this._index >= this._length)
    return {done: true};

  var obj = {done: false, value: this._value};
  this._value = this._value + this._step;
  this._index++;
  return obj;
}

var _context = {};
function next() {
  var x = new Error().stack;
  var self = _context[x];

  if (self && self._this !== this) {
    self = undefined;
    delete _context[x];
  }

  if (!self) {
    var len = this.length;
    if (len === undefined) len = Math.floor(Number(this));
    if (len === 0) return {done: true};

    _context[x] = self = new Range(len);
    self._this = this;
  }

  var obj = self.next();
  if (obj.done) delete _context[x];

  if (this.constructor !== Number)
    obj.value = this[obj.value];

  return obj;
/*
  if (self._index >= self._length) {
    delete self._index;
    delete self._length;
    if (typeof this === 'string' || typeof this === 'number')
      delete _context[x];
    return {done: true};
  }

  if (this.constructor === Number)
    return {done: false, value: self._index++};
  return {done: false, value: this[self._index++]};
*/
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

// 10              -> 0..9
// 0, 10           -> 0..9
// 0, 10, 1        -> 0..9
// 10, 0           -> 10..1
// 10, 0, -1       -> 10..1
// 10, true        -> 1..10
// 1, 10, true     -> 1..10
// 1, 10, 1, true  -> 1..10
// 10, 1, true     -> 10..1
// 10, 1, -1, true -> 10..1
function range(from, to, step, incl) {
  if (from === undefined) return [];
  if (to === undefined) incl = false, to = from, from = 0;
  if (typeof to === 'boolean') incl = to, to = from, from = incl? 1: 0;
  if (typeof step === 'boolean') incl = step, step = undefined;
  if (from <= to) {
    if (step === undefined) step = 1;
    if (step <= 0) throw new Error('step must be 1 or more');
  }
  else {
    if (step === undefined) step = -1;
    if (step >= 0) throw new Error('step must be -1 or less');
  }
  var len = Math.floor((to - from + (incl? step: 0))/ step);
  if (len <= 0) return [];
  var ary = new Array(len);
  for (var i = 0; i < len; ++i) {
    ary[i] = from;
    from += step;
  }
  return ary;
}

var ary = range(3);

for (var i in ary)
  console.log('i in ary: ary[%s] = %s', i, ary[i]);

for (var i of ary)
  console.log('i of ary: i = %s', i);

for (var gen = ary, n; n = gen.next(), !n.done; )
  console.log('ary.next: = %s', n.value);

for (var gen = range(1, 3), n; n = gen.next(), !n.done; )
  console.log('range(1,3).next: = %s', n.value);

for (var i of range(1, 3))
  console.log('i of range(1,3): = %s', i);

for (var gen = range(1, 4, true), n; n = gen.next(), !n.done; )
  console.log('range(1,4,true).next: = %s', n.value);

for (var i of range(1, 4, true))
  console.log('i of range(1,4,true): = %s', i);

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
