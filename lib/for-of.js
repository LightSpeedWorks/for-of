// for-of.js

'use strict';

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

// Array.prototype.next 定義
if (!('next' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'next', {
    value: function () {
      if (this.length === 0)
        return {done: true, value: undefined};

      if (typeof this._index === 'undefined') {
        Object.defineProperty(this, '_index', {value: 0, writable: true, enumerable: false, configurable: true});
      }

      if (this._index >= this.length) {
        delete this._index;
        return {done: true, value: undefined};
      }

      return {done: false, value: this[this._index++]};
    }, enumerable: false, configurable: true});
}

function range(from, to) {
  var ary = Array(to - from + 1);
  for (var i = from; i <= to; ++i)
    ary[i - from] = i;
  return ary;
}

var ary = range(1, 10);

for (var i in ary) {
  console.log('ary[%d] = %d', i, ary[i]);
}

function *gen() {
  yield 1;
  yield 2;
  yield 3;
  return;
}

for (var g = gen(), n = g.next(); !n.done; n = g.next()) {
  console.log('gen1 = %d', n.value);
}

for (var i of gen()) {
  console.log('gen2 = %d', i);
}

for (var i of ary) {
  console.log('gen3 = %d', i);
}

for (var g = range(1, 4), n = g.next(); !n.done; n = g.next()) {
  console.log('gen4 = %d', n.value);
}
