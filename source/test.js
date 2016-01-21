import sut from './';
import test from 'ava';

test('sut exports an object', function(t) {
  const actual = typeof (sut);
  const expected = 'object';

  t.is(actual, expected);
});
