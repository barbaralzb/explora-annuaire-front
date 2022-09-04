/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['explora-proj-annuaire.s3.eu-west-3.amazonaws.com', 'demos.creative-tim.com', 'explora-proj-annuaire.s3.amazonaws.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}
