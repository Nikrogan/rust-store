/** @type {import('next').NextConfig} */
const fs = require('fs');


const dotenv = require('dotenv');

const env = dotenv.parse(fs.readFileSync('.env'));

const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    experimental: {
      serverActions: {
        allowedOrigins: ["https://localhost:5000", "http://localhost:5000", "localhost:3000", 'www.sandbox.paypal.com']
      }
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bwrust.ru',
          port: '',
          pathname: '/uploads/**',
        },
        {
          protocol: 'https',
          hostname: 'avatars.steamstatic.com',
        },
      ],
    },
    async headers () {
      return [{
      source: "/api",
      headers: [{
        key: 'Access-Control-Allow-Origin',
        value: "https://localhost:5000",
      }]
    }]},
    compiler: {
      styledComponents: true,
    },
    distDir: 'build',
    env: env
}

module.exports = nextConfig
