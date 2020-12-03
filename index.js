const { get } = require('dot-prop');
const indentString = require('indent-string');
const underscore = require('underscore');

const { isUndefined } = underscore;

Object.assign(exports, underscore);

// eslint-disable-next-line no-magic-numbers
function indent(string, count = 4, options = {}) {
  return indentString(string, count, options);
}
exports.indent = indent;

exports.int = val => val | 0;

exports.isDefined = (...args) => !isUndefined(...args);

exports.sortBy = (array, key) => array.sort((item1, item2) => {
  if (get(item1, key) > get(item2, key)) return 1;
  if (get(item2, key) > get(item1, key)) return -1;
  return 0;
});

['get', 'set'].forEach(key => Reflect.defineProperty(exports, key, {
  get() {
    throw new Error(`DEPRECATED: underscorePulsovi.${key} is deprecated\n    use dotProp.${
      key} instead`);
  },
}));
