interface PaymentConfig {
    price: number;
    qrCodes: {
        wechat: string;
        alipay: string;
    };
    testDuration: number; // 测试时长（分钟）
}

export const paymentConfig: PaymentConfig = {
    price: 29.9, // MBTI测试价格
    qrCodes: {
        wechat: '/images/payment/wechat-pay.jpg',  // 微信收款码路径
        alipay: '/images/payment/alipay.jpg',      // 支付宝收款码路径
    },
    testDuration: 30 // 测试有效期30分钟
}; 