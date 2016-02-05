import {
  buildTheme,
  generateContext
}
from '../lib';
import test from 'ava';

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

const scheme = {
  scheme: 'OceanicNext',
  author: 'https://github.com/voronianski/oceanic-next-color-scheme',
  base00: '1B2B34',
  base01: '343D46',
  base02: '4F5B66',
  base03: '65737E',
  base04: 'A7ADBA',
  base05: 'C0C5CE',
  base06: 'CDD3DE',
  base07: 'D8DEE9',
  base08: 'EC5f67',
  base09: 'F99157',
  base0A: 'FAC863',
  base0B: '99C794',
  base0C: '5FB3B3',
  base0D: '6699CC',
  base0E: 'C594C5',
  base0F: 'AB7967'
};

test('generateContext returns correct metadata ', function(t) {
  const actual = generateContext(scheme);

  t.is(actual.scheme, scheme.scheme);
  t.is(actual.author, scheme.author);
});

test('scheme ', function(t) {
  const actual = generateContext(scheme);

  t.is(actual.base['00'].hex, scheme.base00);
  t.is(actual.base['01'].hex, scheme.base01);
  t.is(actual.base['02'].hex, scheme.base02);
  t.is(actual.base['03'].hex, scheme.base03);
  t.is(actual.base['04'].hex, scheme.base04);
  t.is(actual.base['05'].hex, scheme.base05);
  t.is(actual.base['06'].hex, scheme.base06);
  t.is(actual.base['07'].hex, scheme.base07);
  t.is(actual.base['08'].hex, scheme.base08);
  t.is(actual.base['09'].hex, scheme.base09);
  t.is(actual.base['0A'].hex, scheme.base0A);
  t.is(actual.base['0B'].hex, scheme.base0B);
  t.is(actual.base['0C'].hex, scheme.base0C);
  t.is(actual.base['0D'].hex, scheme.base0D);
  t.is(actual.base['0E'].hex, scheme.base0E);
  t.is(actual.base['0F'].hex, scheme.base0F);
});

test('srgb', function(t) {
  const actual = generateContext(scheme);

  t.same(actual.base['00'].srgb, [0.10588235294117647, 0.16862745098039217, 0.20392156862745098]);
  t.same(actual.base['01'].srgb, [0.20392156862745098, 0.23921568627450981, 0.27450980392156865]);
  t.same(actual.base['02'].srgb, [0.30980392156862746, 0.3568627450980392, 0.4]);
  t.same(actual.base['03'].srgb, [0.396078431372549, 0.45098039215686275, 0.49411764705882355]);
  t.same(actual.base['04'].srgb, [0.6549019607843137, 0.6784313725490196, 0.7294117647058823]);
  t.same(actual.base['05'].srgb, [0.7529411764705882, 0.7725490196078432, 0.807843137254902]);
  t.same(actual.base['06'].srgb, [0.803921568627451, 0.8274509803921568, 0.8705882352941177]);
  t.same(actual.base['07'].srgb, [0.8470588235294118, 0.8705882352941177, 0.9137254901960784]);
  t.same(actual.base['08'].srgb, [0.9254901960784314, 0.37254901960784315, 0.403921568627451]);
  t.same(actual.base['09'].srgb, [0.9764705882352941, 0.5686274509803921, 0.3411764705882353]);
  t.same(actual.base['0A'].srgb, [0.9803921568627451, 0.7843137254901961, 0.38823529411764707]);
  t.same(actual.base['0B'].srgb, [0.6, 0.7803921568627451, 0.5803921568627451]);
  t.same(actual.base['0C'].srgb, [0.37254901960784315, 0.7019607843137254, 0.7019607843137254]);
  t.same(actual.base['0D'].srgb, [0.4, 0.6, 0.8]);
  t.same(actual.base['0E'].srgb, [0.7725490196078432, 0.5803921568627451, 0.7725490196078432]);
  t.same(actual.base['0F'].srgb, [0.6705882352941176, 0.4745098039215686, 0.403921568627451]);
});

test('rgb', function(t) {
  const actual = generateContext(scheme);

  t.same(actual.base['00'].rgb, [27, 43, 52]);
  t.same(actual.base['01'].rgb, [52, 61, 70]);
  t.same(actual.base['02'].rgb, [79, 91, 102]);
  t.same(actual.base['03'].rgb, [101, 115, 126]);
  t.same(actual.base['04'].rgb, [167, 173, 186]);
  t.same(actual.base['05'].rgb, [192, 197, 206]);
  t.same(actual.base['06'].rgb, [205, 211, 222]);
  t.same(actual.base['07'].rgb, [216, 222, 233]);
  t.same(actual.base['08'].rgb, [236, 95, 103]);
  t.same(actual.base['09'].rgb, [249, 145, 87]);
  t.same(actual.base['0A'].rgb, [250, 200, 99]);
  t.same(actual.base['0B'].rgb, [153, 199, 148]);
  t.same(actual.base['0C'].rgb, [95, 179, 179]);
  t.same(actual.base['0D'].rgb, [102, 153, 204]);
  t.same(actual.base['0E'].rgb, [197, 148, 197]);
  t.same(actual.base['0F'].rgb, [171, 121, 103]);
});
