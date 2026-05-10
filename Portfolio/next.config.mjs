/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
  // Ensure exported pages become folder/index.html so gh-pages serves them correctly
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
