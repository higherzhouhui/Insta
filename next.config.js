/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'scpic.chinaz.net',
      'pd1.oss-us-west-1.aliyuncs.com',
      'pd1.oss-accelerate.aliyuncs.com',
      'gible-nft.hibootstrap.com',
      'oss.pd-1st.com',
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {},
        },
        {
          loader: 'svgo-loader',
          options: {},
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
