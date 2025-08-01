import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',  // 启用静态导出
  trailingSlash: true,  // URL 末尾添加斜杠
  reactStrictMode: true,
  images: {
    unoptimized: true,  // 禁用图片优化（静态导出必需）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
};

export default withMDX(config);
