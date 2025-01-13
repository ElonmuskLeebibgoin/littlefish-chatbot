import { prisma } from '../prisma'
import { User, Profile, MBTIResult } from '@prisma/client'

export class UserService {
    // 创建用户
    static async createUser(data: {
        email: string;
        name?: string;
        avatar?: string;
    }) {
        return prisma.user.create({
            data: {
                ...data,
                profile: {
                    create: {} // 创建空的个人资料
                }
            },
            include: {
                profile: true
            }
        })
    }

    // 获取用户信息
    static async getUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                mbtiResults: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1 // 只获取最新的 MBTI 结果
                }
            }
        })
    }

    // 更新用户资料
    static async updateProfile(userId: string, data: Partial<Profile>) {
        return prisma.profile.update({
            where: { userId },
            data
        })
    }

    // 保存 MBTI 测试结果
    static async saveMBTIResult(data: {
        userId: string;
        type: string;
        answers: any;
        dimensions: any;
    }) {
        return prisma.mBTIResult.create({
            data
        })
    }

    // 获取用户的聊天历史
    static async getChatHistory(userId: string) {
        return prisma.chatMessage.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    // 保存聊天消息
    static async saveChatMessage(data: {
        userId: string;
        role: string;
        content: string;
    }) {
        return prisma.chatMessage.create({
            data
        })
    }

    // 获取用户的支付记录
    static async getPaymentHistory(userId: string) {
        return prisma.payment.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    // 创建支付记录
    static async createPayment(data: {
        userId: string;
        amount: number;
        type: string;
        orderId: string;
    }) {
        return prisma.payment.create({
            data: {
                ...data,
                status: 'pending'
            }
        })
    }

    // 更新支付状态
    static async updatePaymentStatus(orderId: string, status: string) {
        return prisma.payment.update({
            where: { orderId },
            data: { status }
        })
    }

    // 通过邮箱获取用户
    static async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
            include: {
                profile: true
            }
        })
    }
} 