const webpack = require('webpack');

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|mjs|ts)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    config.devtool = false;
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.fs = false;
    config.module.rules.forEach((rule) => {
      if ('a.tsx'.match(rule.test)) {
        //console.log(rule.use);
        rule.use = [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              // Or 'ts' if you don't need tsx
              target: 'es2015',
            },
          },
        ];
      }
    });
    config.plugins.push(
      new webpack.SourceMapDevToolPlugin({
        append: '\n//# sourceMappingURL=[url]',
        fileContext: './',
        filename: '[file].map',
      }),
    );
    return config;
  },
};
export default config;
