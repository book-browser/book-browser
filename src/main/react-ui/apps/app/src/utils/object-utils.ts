export const flatten = (obj: any, out = {}, path = '') => {
  if (Array.isArray(obj)) {
    for (const i in obj) {
      if (typeof obj[i] === 'object') {
        flatten(obj[i], out, path ? `${path}[${i}]` : `[${i}]`);
      } else {
        out[path ? `${path}[${i}]` : `[${i}]`] = obj[i];
      }
    }
  } else {
    for (const i in obj) {
      if (typeof obj[i] === 'object') {
        flatten(obj[i], out, path ? `${path}.${i}` : i);
      } else {
        out[path ? `${path}.${i}` : i] = obj[i];
      }
    }
  }
  return out as { [key: string]: any };
};
