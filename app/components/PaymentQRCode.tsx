'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { paymentConfig } from '@/config/payment';

interface PaymentQRCodeProps {
    onPaymentConfirm: () => void;
}

export default function PaymentQRCode({ onPaymentConfirm }: PaymentQRCodeProps) {
    const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');
    const [countdown, setCountdown] = useState(paymentConfig.testDuration * 60); // 转换为秒

    // 倒计时逻辑
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">支付测试费用</h2>
            <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600">¥{paymentConfig.price}</span>
            </div>

            {/* 支付方式选择 */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-lg ${paymentMethod === 'wechat'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                        }`}
                    onClick={() => setPaymentMethod('wechat')}
                >
                    微信支付
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${paymentMethod === 'alipay'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                        }`}
                    onClick={() => setPaymentMethod('alipay')}
                >
                    支付宝
                </button>
            </div>

            {/* 二维码显示 */}
            <div className="flex justify-center mb-6">
                <div className="relative w-64 h-64">
                    <Image
                        src={paymentConfig.qrCodes[paymentMethod]}
                        alt={`${paymentMethod === 'wechat' ? '微信' : '支付宝'}收款码`}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* 倒计时显示 */}
            <div className="text-center mb-6 text-gray-600">
                <p>二维码有效期：{minutes}:{seconds.toString().padStart(2, '0')}</p>
            </div>

            {/* 确认支付按钮 */}
            <button
                onClick={onPaymentConfirm}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
                我已完成支付
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
                支付完成后，请点击上方按钮开始测试
            </p>
        </div>
    );
} 