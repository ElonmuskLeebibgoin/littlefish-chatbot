import { NextResponse } from 'next/server'
import { generateChatResponse } from '@/app/utils/ai'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userId } = body

    if (!message) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: '用户未登录' },
        { status: 401 }
      )
    }

    // 检查用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    // 保存用户消息
    await prisma.chatMessage.create({
      data: {
        userId,
        role: 'user',
        content: message
      }
    })

    // 创建流式响应
    const encoder = new TextEncoder()
    const stream = new TransformStream()
    const writer = stream.writable.getWriter()

    // 异步处理AI响应和数据库存储
    const processAIResponse = async () => {
      try {
        console.log('开始生成 AI 响应...')
        const aiResponse = await generateChatResponse(message)
        console.log('AI 响应生成完成:', aiResponse)

        // 将响应按句子或标点符号分割，保持emoji完整
        const sentences = aiResponse.match(/[^。！？.!?]+[。！？.!?]+|[^\s]+/g) || [aiResponse]

        for (const sentence of sentences) {
          // 使用Array.from确保正确处理emoji等Unicode字符
          const chars = Array.from(sentence)
          for (const char of chars) {
            await writer.write(encoder.encode(char))
            // 添加较短的延迟使输出更自然
            await new Promise(resolve => setTimeout(resolve, 30))
          }
          // 句子之间添加稍长的停顿
          await new Promise(resolve => setTimeout(resolve, 200))
        }

        // 保存完整的AI响应到数据库
        await prisma.chatMessage.create({
          data: {
            userId,
            role: 'assistant',
            content: aiResponse
          }
        })

        await writer.close()
      } catch (error) {
        console.error('处理AI响应时出错:', error)
        await writer.abort(error)
      }
    }

    // 开始异步处理
    processAIResponse()

    // 返回流式响应
    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      }
    })

  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: error.message || '聊天失败' },
      { status: 500 }
    )
  }
} 