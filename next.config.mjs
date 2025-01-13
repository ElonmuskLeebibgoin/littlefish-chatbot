/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    WECHAT_APP_ID: process.env.WECHAT_APP_ID,
    WECHAT_MCH_ID: process.env.WECHAT_MCH_ID,
    WECHAT_API_KEY: process.env.WECHAT_API_KEY,
    ALIPAY_APP_ID: process.env.ALIPAY_APP_ID,
    ALIPAY_PRIVATE_KEY: process.env.ALIPAY_PRIVATE_KEY,
    ALIPAY_PUBLIC_KEY: process.env.ALIPAY_PUBLIC_KEY,
  },
}

export default nextConfig
