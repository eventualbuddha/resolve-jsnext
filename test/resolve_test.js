import resolve from '../index';
import { join, normalize } from 'path';
import { strictEqual } from 'assert';

const MAIN = normalize(join(__dirname, '..', 'index.js'));

/**
 * Get the absolute path to a path assumed to be in node modules.
 *
 * @param {string} path
 * @returns {string}
 */
function nodeModulePath(path) {
  return normalize(join(__dirname, '..', 'node_modules', path));
}

/** @alias nodeModulePath */
const n = nodeModulePath;

describe('resolve', function() {
  it('resolves relative paths as usual', () =>
    resolve('../index.js', { basedir: __dirname })
      .then(path => strictEqual(path, MAIN))
  );

  it('resolves using a callback if a callback is given', (done) =>
    resolve('../index.js', { basedir: __dirname }, (err/*, resolved */) => done(err))
  );

  it('resolves jsnext packages correctly', () =>
    resolve('magic-string')
      .then(path => strictEqual(path, n('magic-string/src/MagicString/index.js')))
  );

  it('resolves inside jsnext packages correctly', () =>
    resolve('magic-string/src/utils/btoa')
      .then(path => strictEqual(path, n('magic-string/src/utils/btoa.js')))
  );

  it('resolves normal packages correctly', () =>
    resolve('mocha')
      .then(path => strictEqual(path, n('mocha/index.js')))
  );

  it('resolves inside normal packages correctly', () =>
    resolve('mocha/lib/test')
      .then(path => strictEqual(path, n('mocha/lib/test.js')))
  );

  it('resolves with a custom packageFilter', () =>
    resolve('mocha', {
      packageFilter(pkg) {
        pkg.main = 'lib/test.js';
        return pkg;
      }
    }).then(path => strictEqual(path, n('mocha/lib/test.js')))
  );
});
