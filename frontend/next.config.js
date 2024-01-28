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
        allowedOrigins: ["localhost:5000", "localhost:3000"]
      }
    },
    distDir: 'build',
    env: env
}

module.exports = nextConfig
