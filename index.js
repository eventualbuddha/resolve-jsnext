import resolve from 'resolve';

/**
 * Use the jsnext:main entry as main if present.
 *
 * @param {object} pkg
 * @returns {object}
 */
export function packageFilter(pkg) {
  pkg.main = pkg['jsnext:main'] || pkg.main;
  return pkg;
}

/**
 * Resolves a path to an absolute file path by looking in node_modules folders.
 *
 * @param {string} path
 * @param {object=} options
 * @param {function(Error?, string?)=} callback
 * @returns {Promise} If no callback is given and promises are available.
 */
export default function resolveJSNext(path, options={}, callback=undefined) {
  if (typeof options === 'function') {
    callback = /** @type {function(Error?, string?)} */options;
    options = {};
  }

  let result;

  if (typeof callback === 'undefined') {
    if (typeof Promise === 'undefined') {
      throw new Error('callback is required when Promise is unavailable');
    }

    result = new Promise((fulfil, reject) => {
      callback = (err, resolved) => {
        if (err) {
          reject(err);
        } else {
          fulfil(resolved);
        }
      };
    });
  }

  if (options.packageFilter) {
    const oldPackageFilter = options.packageFilter;
    options.packageFilter = (pkg) => oldPackageFilter(packageFilter(pkg));
  } else {
    options.packageFilter = packageFilter;
  }

  resolve(path, options, callback);

  return result;
}
