import { Question as ImportedQuestion } from './questions';

export interface Answer {
    questionId: number;
    answer: 'a' | 'b';
}

export interface Question extends ImportedQuestion {
    dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

export interface DimensionResult {
    dimension: string;
    percentage: number;
    value: string;
}

export type MBTIType =
    | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
    | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
    | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
    | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export interface MBTIResult {
    type: MBTIType;
    dimensions: DimensionResult[];
}

export const typeDescriptions: Record<MBTIType, { name: string; description: string }> = {
    'ISTJ': {
        name: '尽责的检查者',
        description: '安静、严肃、通过全面性和可靠性获得成功。实际、有序、注重事实、有责任心和决断力。'
    },
    'ISFJ': {
        name: '温暖的守护者',
        description: '安静、友善、有责任心和谨慎。致力于履行义务，并为他人的福祉而努力工作。'
    },
    'INFJ': {
        name: '富有洞察的理想主义者',
        description: '寻求思想、关系、物质等之间的意义和联系。希望了解什么能够激励人，对他人有很强的洞察力。'
    },
    'INTJ': {
        name: '战略性思考者',
        description: '在实现自己的想法和达成目标时有创新的想法和非凡的动力。能很快洞察到事物的规律。'
    },
    'ISTP': {
        name: '灵活的分析者',
        description: '宽容、灵活，安静地观察直到问题出现，然后迅速行动找到可行的解决方案。'
    },
    'ISFP': {
        name: '敏感的艺术家',
        description: '安静、友善、敏感、善良。享受当前。喜欢自己的空间，喜欢按自己的时间表工作。'
    },
    'INFP': {
        name: '和谐的理想者',
        description: '理想主义者，忠于自己的价值观和重要的人。对外在的期望很敏感，寻求内在和外在生活的和谐。'
    },
    'INTP': {
        name: '逻辑的思考者',
        description: '寻求在解释他们感兴趣的事物时，找到合理的解释。理论性思维，更感兴趣于思想而不是社交活动。'
    },
    'ESTP': {
        name: '活跃的探险家',
        description: '灵活、宽容，采用实用的方法以达到即时的效果。专注于即时的结果，不喜欢理论性的解释。'
    },
    'ESFP': {
        name: '活力的表演者',
        description: '外向、友善、接受性强。热爱生活、人类和物质上的享受。喜欢与他人一起将事情做成。'
    },
    'ENFP': {
        name: '热情的创新者',
        description: '热情洋溢、富有想象力。认为生活充满可能性。能很快地将事情和信息联系起来，并自信地根据自己的判断行事。'
    },
    'ENTP': {
        name: '大胆的思想家',
        description: '反应快、睿智，能激励他人，警觉性强，直言不讳。在解决新的、具有挑战性的问题时机智灵活。'
    },
    'ESTJ': {
        name: '高效的组织者',
        description: '实际、现实主义者，具有自然的商业和机械能力。喜欢组织和管理活动，关注最有效率地把事情做好。'
    },
    'ESFJ': {
        name: '友善的协调者',
        description: '热心肠、有责任心、合作性强。希望他人的生活和谐，并为创造和谐而努力工作。'
    },
    'ENFJ': {
        name: '富有同情心的引导者',
        description: '热情、为他人着想、反应灵敏而负责。非常注意他人的感受、需求和动机，善于发现他人的潜能。'
    },
    'ENTJ': {
        name: '果断的领导者',
        description: '坦率、果断，天生的领导者。能很快看到公司/组织程序和政策中的不合理性和低效性，发展和实施全面的系统来解决问题。'
    }
};

type DimensionCounts = {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
};

export function calculateMBTIResult(answers: Answer[], questions: Question[]): MBTIResult {
    // 初始化计数器
    const counts: DimensionCounts = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };

    // 统计每个维度的答案
    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (!question) return;

        const dimension = question.dimension;
        const firstLetter = dimension[0] as keyof DimensionCounts;
        const secondLetter = dimension[1] as keyof DimensionCounts;

        if (answer.answer === 'a') {
            counts[firstLetter]++;
        } else {
            counts[secondLetter]++;
        }
    });

    // 计算每个维度的结果和百分比
    const dimensions: DimensionResult[] = [
        {
            dimension: 'E-I',
            percentage: (counts.E / (counts.E + counts.I)) * 100,
            value: counts.E >= counts.I ? 'E' : 'I'
        },
        {
            dimension: 'S-N',
            percentage: (counts.S / (counts.S + counts.N)) * 100,
            value: counts.S >= counts.N ? 'S' : 'N'
        },
        {
            dimension: 'T-F',
            percentage: (counts.T / (counts.T + counts.F)) * 100,
            value: counts.T >= counts.F ? 'T' : 'F'
        },
        {
            dimension: 'J-P',
            percentage: (counts.J / (counts.J + counts.P)) * 100,
            value: counts.J >= counts.P ? 'J' : 'P'
        }
    ];

    // 组合MBTI类型
    const type = `${dimensions[0].value}${dimensions[1].value}${dimensions[2].value}${dimensions[3].value}` as MBTIType;

    return {
        type,
        dimensions
    };
} 