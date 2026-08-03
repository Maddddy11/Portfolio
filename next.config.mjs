/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/Portfolio',  // Commented for development - uncomment for GitHub Pages deployment
  // assetPrefix: '/Portfolio/',  // Commented for development - uncomment for GitHub Pages deployment
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
