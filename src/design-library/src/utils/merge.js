const { isArray } = Array;

const isObject = (item) => item && typeof item === 'object' && !isArray(item);

const merge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    Object.entries(source).reduce((obj, [key, value]) => {
      if (isObject(value) || isArray(value)) {
        if (!obj[key]) {
          const defaultValue = isArray(value) ? [] : {};
          Object.assign(obj, { [key]: defaultValue });
        }
        merge(obj[key], value);
      } else {
        Object.assign(obj, { [key]: value });
      }
      return obj;
    }, target);
  } else if (isArray(target) && isArray(source)) {
    const n = Math.max(target.length, source.length);
    const arr = Array(n)
      .fill(true)
      .map((e, i) => (isArray(source[i]) || isObject(source[i]) ? merge(target[i], source[i]) : source[i]));
    return arr;
  }

  return merge(target, ...sources);
};

export default merge;
