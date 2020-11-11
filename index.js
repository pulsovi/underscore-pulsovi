const underscore = require("underscore");

const { isUndefined } = underscore;

Object.assign(exports, underscore);

function get(object, path) {
  let trail = null;

  if ("" === path) trail = [];
  else if ("string" === typeof path) trail = path.split(".");
  else if (Array.isArray(path)) trail = path;
  else throw new TypeError(`path must be a String or an Array, ${typeof path} found.`);

  return trail.reduce(
    (reduced, next) => (reduced && reduced[next] ? reduced[next] : null),
    object
  );
}
exports.get = get;

exports.int = val => val | 0;

exports.isDefined = (...args) => !isUndefined(...args);

exports.sortBy = (array, key) => array.sort((item1, item2) => {
  if (get(item1, key) > get(item2, key)) return 1;
  if (get(item2, key) > get(item1, key)) return -1;
  return 0;
});
