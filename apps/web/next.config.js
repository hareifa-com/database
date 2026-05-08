/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@platform/ui', '@platform/config', '@platform/api-client'],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
