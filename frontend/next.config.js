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
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['turringrust.ru', '127.0.0.1:3000'],
            allowedOrigins: ["http://turringrust.ru","turringrust.ru",'127.0.0.1:3000', "http://localhost:3000", "http://127.0.0.1:3000"]
        }
    }
}

module.exports = nextConfig
