import { NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json(
                { error: '用户ID是必需的' },
                { status: 400 }
            )
        }

        const messages = await UserService.getChatHistory(userId)

        return NextResponse.json({ messages })

    } catch (error: any) {
        console.error('获取聊天历史失败:', error)
        return NextResponse.json(
            { error: error.message || '获取聊天历史失败' },
            { status: 500 }
        )
    }
} 