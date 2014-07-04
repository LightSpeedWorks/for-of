// for-of.js

'use strict';

var Generator = require('new-generator');

/**
 * forOf: extension.
 */
function forOf() {
  var args = Array.prototype.slice.call(arguments);

  if (args.length === 0)
    args = [Array, String, Number];

  for (var i in args) {
    var clazz = args[i];

    // clazz.prototype.next definition 定義
    if (!('next' in clazz.prototype)) {
      Object.defineProperty(clazz.prototype, 'next', {
        value: next, enumerable: false, configurable: true});
    }

  }
}

exports = module.exports = forOf;


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
