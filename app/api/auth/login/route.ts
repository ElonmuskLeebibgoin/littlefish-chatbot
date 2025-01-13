import { NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email } = body

        // 检查必要字段
        if (!email) {
            return NextResponse.json(
                { error: '邮箱是必需的' },
                { status: 400 }
            )
        }

        // 查找用户
        const user = await UserService.getUserByEmail(email)
        if (!user) {
            return NextResponse.json(
                { error: '用户不存在' },
                { status: 404 }
            )
        }

        // TODO: 实现完整的身份验证逻辑（如密码验证）
        // 这里简化处理，直接返回用户信息

        return NextResponse.json({
            message: '登录成功',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error: any) {
        console.error('登录失败:', error)
        return NextResponse.json(
            { error: error.message || '登录失败' },
            { status: 500 }
        )
    }
} 