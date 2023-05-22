/** @type {import('next').NextConfig} */
nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 50,
    };
    return config;
  },
};

module.exports = nextConfig;
