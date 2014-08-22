// test-for-of.js

'use strict';

try {
  var forOf = require('../lib/for-of');
} catch (e) {
  var forOf = require('for-of');
}

// forOf(Array, String, Number);
forOf(Object);

for (var n of 3)
  console.log('for n of 3: n = %s', n);

var ary = [0, 1, 2];

for (var i in ary)
  console.log('for i in ary: ary[%s] = %s', i, ary[i]);

for (var v of ary)
  console.log('for v of ary: v = %s', v);

for (var gen = ary, res; res = gen.next(), !res.done; )
  console.log('ary.next: = %s', res.value);

for (var gen = new String('abc'), res; res = gen.next(), !res.done; )
  console.log('new String(\'abc\').next = %s', res.value);

for (var c of new String('abc'))
  console.log('for c of new String(\'abc\') = %s', c);

for (var c of new String('abc'))
  for (var d of new String('xyz'))
    console.log('for c, d of new String(\'abc\')(\'xyz\') = %s, %s', c, d);

for (var gen = 'abc', res; res = gen.next(), !res.done; )
  console.log('\'abc\'.next = %s', res.value);

for (var c of 'abc')
  console.log('for c of \'abc\' = %s', c);

for (var c of 'abc')
  for (var d of 'abc')
    console.log('for c, d of \'abc\', \'abc\' = %s, %s', c, d);

for (var gen = new Number(3), res; res = gen.next(), !res.done; )
  console.log('new Number(3).next = %s', res.value);

for (var n of new Number(3))
  console.log('for n of new Number(3): = %s', n);

for (var n of new Number(3))
  for (var m of new Number(3))
    console.log('for n, m of new Number(3)(3): = %s, %s', n, m);

for (var gen = 3, res; res = gen.next(), !res.done; )
  console.log('3.next = %s', res.value);

for (var n of 3)
  console.log('for n of 3: = %s', n);

for (var n of 3)
  for (var m of 3)
    console.log('for n, m of 3,3: = %s, %s', n, m);

for (var gen = {x:1, y:'s2'}, res; res = gen.next(), !res.done; )
  console.log('{x:1, y:\'s2\'}.next = %j', res.value);

for (var e of {x:1, y:'s2'})
  console.log('for e of {x:1, y:\'s2\'}: = %j', e);
