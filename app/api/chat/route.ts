import { NextResponse } from 'next/server'
import { generateChatResponse } from '@/app/utils/ai'

export async function POST(request: Request) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: 'DeepSeek API 密钥未配置' },
      { status: 500 }
    )
  }

  try {
    const { message } = await request.json()

    // 使用 DeepSeek API 生成回复
    const response = await generateChatResponse(message)

    return NextResponse.json({ text: response })
  } catch (error) {
    console.error('聊天 API 错误:', error)
    return NextResponse.json(
      { error: '处理聊天消息失败' },
      { status: 500 }
    )
  }
} 