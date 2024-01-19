/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    distDir: 'build',
    output: "standalone",
    serverActions: {
        allowedForwardedHosts: ['turringrust.ru', 'localhost:3000'],
        allowedOrigins: ["http://turringrust.ru", "http://localhost:3000"]
    }
}

module.exports = nextConfig
