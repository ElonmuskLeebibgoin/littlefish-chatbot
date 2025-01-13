import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // 创建测试用户
        const user = await prisma.user.create({
            data: {
                id: 'test-user-id',
                email: 'test@example.com',
                name: 'Test User',
                profile: {
                    create: {}
                }
            }
        })

        return NextResponse.json({
            message: '测试用户创建成功',
            user
        })
    } catch (error: any) {
        console.error('Setup error:', error)
        return NextResponse.json(
            { error: error.message || '设置失败' },
            { status: 500 }
        )
    }
} 