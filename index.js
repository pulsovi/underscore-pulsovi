const underscore = require('underscore');

const { isObject, isUndefined } = underscore;

Object.assign(exports, underscore);

function get(object, path, defaultValue = null) {
  let trail = null;
  const eject = {};

  if ('' === path) trail = [];
  else if ('string' === typeof path) trail = path.split('.');
  else if (Array.isArray(path)) trail = path;
  else throw new TypeError(`path must be a String or an Array, ${typeof path} found.`);

  const reducedValue = trail.reduce(
    (reduced, next) => {
      if (reduced !== eject && reduced && next in reduced) return reduced[next];
      return eject;
    },
    object
  );

  return reducedValue === eject ? defaultValue : reducedValue;
}
exports.get = get;

exports.int = val => val | 0;

exports.isDefined = (...args) => !isUndefined(...args);

function set(object, path, value) {
  const trail = parseTrail(path);
  const propertyName = trail.pop();
  const owner = trail.reduce(
    (reduced, next) => {
      if (!isObject(reduced))
        throw new TypeError(`Unable to set property ${next} on non Object value ${reduced}.`);
      if (Object.keys(reduced).includes(next)) return reduced[next];
      reduced[next] = {};
      return reduced[next];
    },
    object
  );

  owner[propertyName] = value;

  return object;
}
function parseTrail(path) {
  if ('' === path) return [];
  if ('string' === typeof path) return path.split('.');
  if (Array.isArray(path)) return path.slice();
  throw new TypeError(`path must be a String or an Array, ${typeof path} found.`);
}
exports.set = set;

exports.sortBy = (array, key) => array.sort((item1, item2) => {
  if (get(item1, key) > get(item2, key)) return 1;
  if (get(item2, key) > get(item1, key)) return -1;
  return 0;
});
