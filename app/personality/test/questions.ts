export interface Question {
    id: number;
    text: string;
    dimension: 'EI' | 'SN' | 'TF' | 'JP';  // 对应MBTI的四个维度
    options: {
        a: string;
        b: string;
    };
}

export const questions: Question[] = [
    // E (外向) vs I (内向)
    {
        id: 1,
        text: "在社交场合中，你通常会：",
        dimension: "EI",
        options: {
            a: "积极主动地与他人交谈，享受社交活动",
            b: "倾向于与少数熟悉的人交谈，保持安静"
        }
    },
    {
        id: 2,
        text: "当你需要充电时，你会选择：",
        dimension: "EI",
        options: {
            a: "和朋友一起出去活动，感受群体氛围",
            b: "独自待着，享受独处的时光"
        }
    },
    // S (感觉) vs N (直觉)
    {
        id: 3,
        text: "在解决问题时，你更倾向于：",
        dimension: "SN",
        options: {
            a: "关注具体的事实和细节",
            b: "思考整体概念和可能性"
        }
    },
    {
        id: 4,
        text: "��学习新知识时，你更喜欢：",
        dimension: "SN",
        options: {
            a: "循序渐进，掌握每个细节",
            b: "先了解整体框架，再深入细节"
        }
    },
    // T (思维) vs F (情感)
    {
        id: 5,
        text: "在做决定时，你通常会：",
        dimension: "TF",
        options: {
            a: "依据逻辑和客观分析",
            b: "考虑他人的感受和价值观"
        }
    },
    {
        id: 6,
        text: "当朋友遇到问题时，你会：",
        dimension: "TF",
        options: {
            a: "帮助分析问题，提供解决方案",
            b: "倾听和理解他们的感受"
        }
    },
    // J (判断) vs P (知觉)
    {
        id: 7,
        text: "对于计划和安排，你更喜欢：",
        dimension: "JP",
        options: {
            a: "提前制定详细的计划",
            b: "保持灵活，随机应变"
        }
    },
    {
        id: 8,
        text: "你的工作环境通常是：",
        dimension: "JP",
        options: {
            a: "井井有条，每样东西都有固定位置",
            b: "灵活多变，根据需要随时调整"
        }
    },
    // 更多EI维度的问题
    {
        id: 9,
        text: "在团队项目中，你倾向于：",
        dimension: "EI",
        options: {
            a: "主动承担领导角色，组织团队",
            b: "专注于自己的任务，深入思考"
        }
    },
    {
        id: 10,
        text: "参加派对时，你通常会：",
        dimension: "EI",
        options: {
            a: "成为活动的组织者或焦点",
            b: "找到一两个人进行深入交谈"
        }
    },
    // 更多SN维度的问题
    {
        id: 11,
        text: "在阅读时，你更关注：",
        dimension: "SN",
        options: {
            a: "文字描述的具体细节",
            b: "文字背后的深层含义"
        }
    },
    {
        id: 12,
        text: "在工作中，你更喜欢：",
        dimension: "SN",
        options: {
            a: "处理具体的、实际的问题",
            b: "探索新的可能性和创新方向"
        }
    },
    // 更多TF维度的问题
    {
        id: 13,
        text: "在评价他人的工作时，你更注重：",
        dimension: "TF",
        options: {
            a: "工作的效率和成果",
            b: "付出的努力和态度"
        }
    },
    {
        id: 14,
        text: "在处理矛盾时，你会：",
        dimension: "TF",
        options: {
            a: "寻找最合理的解决方案",
            b: "考虑各方的感受和需求"
        }
    },
    // 更多JP维度的问题
    {
        id: 15,
        text: "对于截止日期，你通常会：",
        dimension: "JP",
        options: {
            a: "提前完成，避免压力",
            b: "在最后期限前完成，保持灵活"
        }
    },
    {
        id: 16,
        text: "你更喜欢的生活方式是：",
        dimension: "JP",
        options: {
            a: "有规律，按计划进行",
            b: "随性，根据心情决定"
        }
    },
    // 新增的EI维度问题
    {
        id: 17,
        text: "在网上社交时，你更倾向于：",
        dimension: "EI",
        options: {
            a: "积极参与群聊，分享生活动态",
            b: "主要浏览他人内容，较少发言"
        }
    },
    {
        id: 18,
        text: "周末早上醒来，你更希望：",
        dimension: "EI",
        options: {
            a: "立即约朋友出门活动",
            b: "独自安静地享受早晨时光"
        }
    },
    // 新增的SN维度问题
    {
        id: 19,
        text: "在做决策时，你更相信：",
        dimension: "SN",
        options: {
            a: "过往的经验和实际数据",
            b: "直觉和预感"
        }
    },
    {
        id: 20,
        text: "在讨论问题时，你更喜欢：",
        dimension: "SN",
        options: {
            a: "关注具体的实施步骤",
            b: "探讨未来的可能性"
        }
    },
    // 新增的TF维度问题
    {
        id: 21,
        text: "在给予反馈时，你更倾向于：",
        dimension: "TF",
        options: {
            a: "直接指出问题，提供建设性意见",
            b: "先肯定优点，委婉表达建议"
        }
    },
    {
        id: 22,
        text: "在选择职业时，你更看重：",
        dimension: "TF",
        options: {
            a: "职位的发展前景和薪资",
            b: "工作环境和人际关系"
        }
    },
    // 新增的JP维度问题
    {
        id: 23,
        text: "面对新的机会，你会：",
        dimension: "JP",
        options: {
            a: "仔细评估利弊后再做决定",
            b: "抓住机会，边做边调整"
        }
    },
    {
        id: 24,
        text: "在安排旅行时，你更倾向于：",
        dimension: "JP",
        options: {
            a: "制定详细的行��计划",
            b: "只订好主要行程，其他随意"
        }
    },
    // 新增更多EI维度的问题
    {
        id: 25,
        text: "在进行小组讨论时，你通常会：",
        dimension: "EI",
        options: {
            a: "积极发表观点，引导讨论方向",
            b: "先倾听他人意见，仔细思考后再发言"
        }
    },
    {
        id: 26,
        text: "当遇到困难时，你倾向于：",
        dimension: "EI",
        options: {
            a: "立即寻求他人帮助和建议",
            b: "自己先思考和尝试解决"
        }
    },
    {
        id: 27,
        text: "在新的工作环境中，你会：",
        dimension: "EI",
        options: {
            a: "主动认识新同事，建立人际网络",
            b: "专注于工作，让关系自然发展"
        }
    },
    {
        id: 28,
        text: "在休息日，你更喜欢：",
        dimension: "EI",
        options: {
            a: "参加社交活动，认识新朋友",
            b: "在家看书、看电影或做自己的事"
        }
    },
    {
        id: 29,
        text: "当有好消息时，你会：",
        dimension: "EI",
        options: {
            a: "立即分享给身边的人",
            b: "等待合适的时机再告诉他人"
        }
    },
    {
        id: 30,
        text: "在团队合作中，你更擅长：",
        dimension: "EI",
        options: {
            a: "组织协调，促进团队交流",
            b: "独立完成分配的任务"
        }
    },
    // 新增更多SN维度的问题
    {
        id: 31,
        text: "在观察事物时，你更注重：",
        dimension: "SN",
        options: {
            a: "当前的实际状况",
            b: "未来的发展可能"
        }
    },
    {
        id: 32,
        text: "在解决问题时，你更依赖：",
        dimension: "SN",
        options: {
            a: "已经证实的方法和经验",
            b: "创新的想法和直觉"
        }
    },
    {
        id: 33,
        text: "你更喜欢的老师是：",
        dimension: "SN",
        options: {
            a: "讲解清晰，重视实践的",
            b: "启发思维，鼓励创新的"
        }
    },
    {
        id: 34,
        text: "在阅读新闻时，你更关注：",
        dimension: "SN",
        options: {
            a: "具体的事实和数据",
            b: "事件背后的含义和趋势"
        }
    },
    {
        id: 35,
        text: "在学习新技能时，你更喜欢：",
        dimension: "SN",
        options: {
            a: "按部就班，掌握标准流程",
            b: "尝试不同方法，寻找捷径"
        }
    },
    {
        id: 36,
        text: "对于未来，你更倾向于：",
        dimension: "SN",
        options: {
            a: "做切实可行的规划",
            b: "想象各种可能性"
        }
    },
    // 新增更多TF维度的问题
    {
        id: 37,
        text: "在处理人际关系时，你更重视：",
        dimension: "TF",
        options: {
            a: "公平和规则",
            b: "和谐与关怀"
        }
    },
    {
        id: 38,
        text: "在评价一个决定时，你更看重：",
        dimension: "TF",
        options: {
            a: "是否符合逻辑和效率",
            b: "是否照顾到每个人的感受"
        }
    },
    {
        id: 39,
        text: "当团队成员表现不佳时，你会：",
        dimension: "TF",
        options: {
            a: "直接指出问题，要求改进",
            b: "了解原因，给予支持和鼓励"
        }
    },
    {
        id: 40,
        text: "在做重要决定时，你更依靠：",
        dimension: "TF",
        options: {
            a: "理性分析和客观事实",
            b: "个人价值观和他人感受"
        }
    },
    {
        id: 41,
        text: "在处理分歧时，你更倾向于：",
        dimension: "TF",
        options: {
            a: "坚持原则，讲求公平",
            b: "寻求共识，维护关系"
        }
    },
    {
        id: 42,
        text: "在给予建议时，你会：",
        dimension: "TF",
        options: {
            a: "直接指出问题的关键",
            b: "考虑对方的接受程度"
        }
    },
    // 新增更多JP维度的问题
    {
        id: 43,
        text: "对待日程安排，你更喜欢：",
        dimension: "JP",
        options: {
            a: "提前规划，按计划执行",
            b: "随机应变，保持灵活"
        }
    },
    {
        id: 44,
        text: "在项目管理中，你更注重：",
        dimension: "JP",
        options: {
            a: "遵循流程，按时完成",
            b: "灵活调整，追求最优"
        }
    },
    {
        id: 45,
        text: "面对变化，你通常会：",
        dimension: "JP",
        options: {
            a: "谨慎评估后再接受",
            b: "迅速适应新情况"
        }
    },
    {
        id: 46,
        text: "在工作中，你更喜欢：",
        dimension: "JP",
        options: {
            a: "明确的任务和期限",
            b: "自由发挥的空间"
        }
    },
    {
        id: 47,
        text: "对待规则，你的态度是：",
        dimension: "JP",
        options: {
            a: "严格遵守既定规则",
            b: "根据情况灵活处理"
        }
    },
    {
        id: 48,
        text: "在准备考试时，你会：",
        dimension: "JP",
        options: {
            a: "制定复习计划并严格执行",
            b: "根据状态随时调整学习内容"
        }
    },
    // 继续添加更多EI维度的问题
    {
        id: 49,
        text: "在演讲时，你会：",
        dimension: "EI",
        options: {
            a: "享受与观众的互动",
            b: "感到紧张和不自在"
        }
    },
    {
        id: 50,
        text: "在群体活动中，你通常：",
        dimension: "EI",
        options: {
            a: "很快融入并活跃气氛",
            b: "需要时间来适应环境"
        }
    },
    // 继续添加更多SN维度的问题
    {
        id: 51,
        text: "在处理细节时，你更倾向于：",
        dimension: "SN",
        options: {
            a: "仔细检查每个环节",
            b: "关注整体效果"
        }
    },
    {
        id: 52,
        text: "在描述事物时，你更喜欢：",
        dimension: "SN",
        options: {
            a: "使用具体的例子",
            b: "使用比喻和象征"
        }
    },
    // 继续添加更多TF维度的问题
    {
        id: 53,
        text: "在面对批评时，你会：",
        dimension: "TF",
        options: {
            a: "客观分析批评的合理性",
            b: "关注批评的方式和语气"
        }
    },
    {
        id: 54,
        text: "在团队合作中，你更重视：",
        dimension: "TF",
        options: {
            a: "任务的完成质量",
            b: "团队的合作氛围"
        }
    },
    // 继续添加更多JP维度的问题
    {
        id: 55,
        text: "对待deadline，你通常会：",
        dimension: "JP",
        options: {
            a: "提前完成以确保万无一失",
            b: "在最后期限前赶工完成"
        }
    },
    {
        id: 56,
        text: "在整理物品时，你会：",
        dimension: "JP",
        options: {
            a: "按照特定的系统分类",
            b: "随手放在方便的地方"
        }
    },
    // 更多场景相关的问题
    {
        id: 57,
        text: "在玩游戏时，你更喜欢：",
        dimension: "EI",
        options: {
            a: "组队和他人一起玩",
            b: "独自一人游戏"
        }
    },
    {
        id: 58,
        text: "在解决技术问题时，你更倾向于：",
        dimension: "SN",
        options: {
            a: "查看官方文档和教程",
            b: "尝试自己摸索解决方案"
        }
    },
    {
        id: 59,
        text: "在处理情感问题时，你会：",
        dimension: "TF",
        options: {
            a: "理性分析利弊",
            b: "跟随内心感受"
        }
    },
    {
        id: 60,
        text: "对待生活琐事，你通常：",
        dimension: "JP",
        options: {
            a: "建立规律的作息和习惯",
            b: "随性处理，不拘泥于规律"
        }
    },
    // 工作场景相关的问题
    {
        id: 61,
        text: "在开会时，你更倾向于：",
        dimension: "EI",
        options: {
            a: "积极参与讨论和发言",
            b: "专注听取他人观点"
        }
    },
    {
        id: 62,
        text: "面对工作变动，你更关注：",
        dimension: "SN",
        options: {
            a: "具体的变化内容",
            b: "变化带来的机会"
        }
    },
    {
        id: 63,
        text: "在处理工作矛盾时，你会：",
        dimension: "TF",
        options: {
            a: "依据规章制度处理",
            b: "考虑各方立场和感受"
        }
    },
    {
        id: 64,
        text: "对待工作任务，你习惯：",
        dimension: "JP",
        options: {
            a: "按步骤有条不紊地完成",
            b: "灵活机动地处理"
        }
    },
    // 学习场景相关的问题
    {
        id: 65,
        text: "在课堂讨论中，你更喜欢：",
        dimension: "EI",
        options: {
            a: "主动发表自己的见解",
            b: "仔细记录他人的观点"
        }
    },
    {
        id: 66,
        text: "在学习新概念时，你更注重：",
        dimension: "SN",
        options: {
            a: "概念的实际应用",
            b: "概念间的关联性"
        }
    },
    {
        id: 67,
        text: "在小组作业中，你更看重：",
        dimension: "TF",
        options: {
            a: "完成任务的效率",
            b: "组员间的配合"
        }
    },
    {
        id: 68,
        text: "在准备报告时，你会：",
        dimension: "JP",
        options: {
            a: "提前规划并分步完成",
            b: "在截止日期前集中精力完成"
        }
    },
    // 生活场景相关的问题
    {
        id: 69,
        text: "在购物时，你通常会：",
        dimension: "EI",
        options: {
            a: "喜欢和朋友一起逛街",
            b: "更愿意自己独自购物"
        }
    },
    {
        id: 70,
        text: "在选择产品时，你更关注：",
        dimension: "SN",
        options: {
            a: "产品的实际功能和评价",
            b: "产品的创新设计和理念"
        }
    },
    {
        id: 71,
        text: "在处理家庭事务时，你更重视：",
        dimension: "TF",
        options: {
            a: "效率和实用性",
            b: "家人的感受和需求"
        }
    },
    {
        id: 72,
        text: "对待家居布置，你倾向于：",
        dimension: "JP",
        options: {
            a: "保持固定的摆放位置",
            b: "根据心情随时调整"
        }
    },
    // 人际关系场景相关的问题
    {
        id: 73,
        text: "在社交媒体上，你会：",
        dimension: "EI",
        options: {
            a: "经常更新动态分享生活",
            b: "主要浏览他人的内容"
        }
    },
    {
        id: 74,
        text: "在建立新关系时，你更看重：",
        dimension: "SN",
        options: {
            a: "当前的共同话题和兴趣",
            b: "未来发展的可能性"
        }
    },
    {
        id: 75,
        text: "在处理友谊问题时，你会：",
        dimension: "TF",
        options: {
            a: "讲求公平和相互理解",
            b: "注重情感和包容"
        }
    },
    {
        id: 76,
        text: "在社交约定中，你通常：",
        dimension: "JP",
        options: {
            a: "准时赴约，讨厌迟到",
            b: "比较随性，不太计较时间"
        }
    }
]; 