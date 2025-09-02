/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Note: rewrites don't work with static export
  // API routes will be handled by Netlify redirects in netlify.toml
};

module.exports = nextConfig;