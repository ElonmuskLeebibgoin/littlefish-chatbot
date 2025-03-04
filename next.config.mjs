/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  },
  images: {
    domains: ['localhost', 'littlefish-chatbot.vercel.app'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // 添加Vercel特定配置
  serverRuntimeConfig: {
    projectRoot: process.cwd(),
  },
  // 公共运行时配置
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
}

export default nextConfig
