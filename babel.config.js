module.exports = {
  env: {
    es5: {
      // ES5 browsers for CJS and UMD builds
      presets: [
        // NOTE: With no targets specified, @babel/preset-env will transform all
        //  ECMAScript 2015+ code by default, which is the original preset prior
        //  to upgrading to Babel 7
        // @see https://babeljs.io/docs/en/babel-preset-env#targets
        '@babel/preset-env',
      ],
    },
    esm: {
      // ESM browsers for ESM builds
      presets: [
        [
          // NOTE: With no targets specified, @babel/preset-env will transform all
          //  ECMAScript 2015+ code by default, which is the original preset prior
          //  to upgrading to Babel 7
          // @see https://babeljs.io/docs/en/babel-preset-env#targets
          '@babel/preset-env',
          {
            modules: false, // preserve ES modules
          },
        ],
      ],
    },
  },
};
