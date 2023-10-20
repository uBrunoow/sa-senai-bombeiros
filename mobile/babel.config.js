module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      '@babel/plugin-transform-flow-strip-types',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'module-resolver',
        {
          alias: {
            '@app': './app',
            '@src': './src',
            '@assets': './assets',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  }
}
