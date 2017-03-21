# resolve-jsnext

[![Greenkeeper badge](https://badges.greenkeeper.io/eventualbuddha/resolve-jsnext.svg)](https://greenkeeper.io/)

It's [resolve], but resolves [jsnext] entry points for packages annotated with
`jsnext:main` values in `package.json`.

[jsnext]: https://github.com/lukehoban/es6features
[resolve]: https://github.com/substack/node-resolve

## Installation

```
$ npm install resolve-jsnext
```

## Usage

```js
// Use with a callback.
resolve('some-module-name', (err, resolved) => console.log(resolved));

// Or use with a promise if promises are available.
resolve('some-module-name').then(resolved => console.log(resolved));

// Pass any options you'd pass to the normal `resolve`.
resolve('some-module-name', { basename: __dirname });
```

## Packaging for the Future

To configure your package written using jsnext to work with this resolver, add a
`jsnext:main` entry to your `package.json` file referencing the jsnext entry
point:

```json
  "main": "dist/mypackage.js",
  "jsnext:main": "src/index.js",
```

Typically such packages have the original source written in jsnext and a
transpiled version (i.e. using [babel]) for use in non-jsnext environments.
Make sure that your `files` or `npmignore` settings allow the original jsnext
files to be included in your npm package. For an example see this own project's
`package.json` file.

[babel]: https://babeljs.io/

## Contributions

File an [issue] with steps to reproduce the problem, or submit a pull request
that fixes the bug or adds the feature you want. Please add and update tests as
appropriate for the bug/feature. To install required dependencies, run
`npm install`. To run tests, run `npm test`.

[issue]: https://github.com/eventualbuddha/resolve-jsnext/issues/new
