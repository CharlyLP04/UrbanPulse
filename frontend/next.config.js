/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key',
  },
}

module.exports = nextConfig
