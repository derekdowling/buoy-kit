module.exports = function (api) {
  // cache per environment because we vary config by environment
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/env",
    "@babel/preset-typescript"
  ];

  const plugins = [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ];

  return {
    presets,
    plugins
  };
};
