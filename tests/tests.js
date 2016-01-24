import {
  buildTheme
}
from '../lib';
import test from 'ava';

test('sut exports a function', function(t) {
  const actual = typeof(buildTheme);
  const expected = 'function';

  t.is(actual, expected);
});

test('buildTemplate returns correct result', function(t) {
  const scheme = `
    scheme: "OceanicNext"
    author: "https://github.com/voronianski/oceanic-next-color-scheme"
    base00: "1B2B34"
    base01: "343D46"
    base02: "4F5B66"
    base03: "65737E"
    base04: "A7ADBA"
    base05: "C0C5CE"
    base06: "CDD3DE"
    base07: "D8DEE9"
    base08: "EC5f67"
    base09: "F99157"
    base0A: "FAC863"
    base0B: "99C794"
    base0C: "5FB3B3"
    base0D: "6699CC"
    base0E: "C594C5"
    base0F: "AB7967"
  `;
  const template = `
    {{ scheme }}
    {{ author }}
    {{ base["00"]["hex"] }}
    {{ base["01"]["hex"] }}
    {{ base["02"]["hex"] }}
    {{ base["03"]["hex"] }}
    {{ base["04"]["hex"] }}
    {{ base["05"]["hex"] }}
    {{ base["06"]["hex"] }}
    {{ base["07"]["hex"] }}
    {{ base["08"]["hex"] }}
    {{ base["09"]["hex"] }}
    {{ base["0A"]["hex"] }}
    {{ base["0B"]["hex"] }}
    {{ base["0C"]["hex"] }}
    {{ base["0D"]["hex"] }}
    {{ base["0E"]["hex"] }}
    {{ base["0F"]["hex"] }}
  `;
  const expected = `
    OceanicNext
    https://github.com/voronianski/oceanic-next-color-scheme
    1B2B34
    343D46
    4F5B66
    65737E
    A7ADBA
    C0C5CE
    CDD3DE
    D8DEE9
    EC5f67
    F99157
    FAC863
    99C794
    5FB3B3
    6699CC
    C594C5
    AB7967
  `;

  const actual = buildTheme(scheme, template);
  t.is(actual, expected);
});
