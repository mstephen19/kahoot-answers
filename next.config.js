const withPWA = require('next-pwa');

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
    },
    reactStrictMode: true,
    swcMinify: false,
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: false,
// };

// module.exports = nextConfig;
