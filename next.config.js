/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude scripts directory from build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Don't analyze scripts folder
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = nextConfig
