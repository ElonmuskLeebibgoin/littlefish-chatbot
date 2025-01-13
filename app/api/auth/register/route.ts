import { NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, name } = body

        // 检查必要字段
        if (!email) {
            return NextResponse.json(
                { error: '邮箱是必需的' },
                { status: 400 }
            )
        }

        // 创建用户
        const user = await UserService.createUser({
            email,
            name
        })

        return NextResponse.json({
            message: '注册成功',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error: any) {
        console.error('注册失败:', error)
        return NextResponse.json(
            { error: error.message || '注册失败' },
            { status: 500 }
        )
    }
} 