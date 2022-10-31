/* eslint-disable @typescript-eslint/no-var-requires */
const IgnorePlugin = require('webpack');

module.exports = function (options) {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  return {
    ...options,
    plugins: [
      ...options.plugins,
      new IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
    // output: {
    //   ...options.output,
    //   libraryTarget: 'commonjs2',
    // },
  };
};
