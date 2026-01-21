/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 允许优化本地图片
    unoptimized: false,
  },
}

module.exports = nextConfig
