'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, Star, Wrench, Brain, Sparkles, Bot, Code, Camera, Music, MessageSquare, Zap, Clock, ChevronUp } from 'lucide-react'

// 加载组件
const LoadingComponent = () => (
    <div className="min-h-screen pt-[60px] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
        </div>
    </div>
)

// 回到顶部按钮组件
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// AI工具卡片组件
const ToolCard = ({ title, description, icon, link, tags }: {
    title: string
    description: string
    icon: React.ReactNode
    link: string
    tags: string[]
}) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 group"
    >
        <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    {title}
                    <Link href={link} target="_blank" className="text-blue-500 hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <motion.span
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
)

// 知识卡片组件
const KnowledgeCard = ({ title, content, image }: {
    title: string
    content: string
    image: string
}) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group"
    >
        <div className="relative h-48">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={false}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-gray-600 line-clamp-3 group-hover:line-clamp-none transition-all">{content}</p>
        </div>
    </motion.div>
)

// 时间线组件
const TimelineItem = ({ year, title, description, isLeft = true }: {
    year: string
    title: string
    description: string
    isLeft?: boolean
}) => (
    <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`flex w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
        <div className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8'}`}>
            <div className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100
                ${isLeft ? 'mr-4' : 'ml-4'}`}>
                <h3 className="text-xl font-bold text-blue-600 mb-2">{year}</h3>
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
        <div className="relative flex items-center justify-center w-12">
            <div className="h-full w-1 bg-blue-200"></div>
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <div className="w-1/2"></div>
    </motion.div>
)

export default function AIWorldPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const [searchDebounce, setSearchDebounce] = useState('')

    // 防抖搜索
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchDebounce(searchQuery)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchQuery])

    // 加载状态
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // AI工具数据
    const aiTools = [
        {
            title: 'ChatGPT',
            description: '强大的语言模型，可以进行自然对话、写作和编程等任务',
            icon: <MessageSquare className="w-6 h-6" />,
            link: 'https://chat.openai.com',
            tags: ['对话', '写作', '编程'],
            category: 'chat'
        },
        {
            title: 'Midjourney',
            description: 'AI艺术创作工具，可以生成高质量的图像和艺术作品',
            icon: <Sparkles className="w-6 h-6" />,
            link: 'https://www.midjourney.com',
            tags: ['图像生成', '艺术创作'],
            category: 'image'
        },
        {
            title: 'Claude',
            description: 'Anthropic开发的AI助手，擅长分析和长文本处理',
            icon: <Brain className="w-6 h-6" />,
            link: 'https://claude.ai',
            tags: ['分析', '写作', '研究'],
            category: 'chat'
        },
        {
            title: 'DALL-E 3',
            description: 'OpenAI的最新图像生成模型，可根据文本描述创建逼真图像',
            icon: <Camera className="w-6 h-6" />,
            link: 'https://openai.com/dall-e-3',
            tags: ['图像生成', '创意设计'],
            category: 'image'
        },
        {
            title: 'GitHub Copilot',
            description: '智能编程助手，提供代码建议和自动完成功能',
            icon: <Code className="w-6 h-6" />,
            link: 'https://github.com/features/copilot',
            tags: ['编程', '代码生成'],
            category: 'code'
        },
        {
            title: 'Stable Diffusion',
            description: '开源图像生成模型，支持本地部署和自定义训练',
            icon: <Camera className="w-6 h-6" />,
            link: 'https://stability.ai',
            tags: ['图像生成', '开源'],
            category: 'image'
        },
        {
            title: 'Anthropic Claude 2',
            description: '更强大的Claude版本，支持更长的上下文和更准确的响应',
            icon: <Bot className="w-6 h-6" />,
            link: 'https://www.anthropic.com/claude-2',
            tags: ['对话', '分析', '研究'],
            category: 'chat'
        },
        {
            title: 'Mubert',
            description: 'AI音乐生成工具，可创作各种风格的音乐',
            icon: <Music className="w-6 h-6" />,
            link: 'https://mubert.com',
            tags: ['音乐生成', '创意'],
            category: 'music'
        },
        {
            title: 'AutoGPT',
            description: '自主AI代理，可以独立完成复杂任务',
            icon: <Zap className="w-6 h-6" />,
            link: 'https://autogpt.net',
            tags: ['自主代理', '任务自动化'],
            category: 'automation'
        }
    ]

    // AI知识文章数据
    const aiKnowledge = [
        {
            title: 'AI发展简史',
            content: '从图灵测试到深度学习，探索人工智能的发展历程，了解AI如何改变世界...',
            image: '/images/ai-history.jpg'
        },
        {
            title: '机器学习基础',
            content: '了解机器学习的核心概念、算法原理和应用场景，开启AI学习之旅...',
            image: '/images/machine-learning.jpg'
        },
        {
            title: 'AI的未来展望',
            content: '探讨AI技术的发展趋势、潜在影响和未来可能性，预见AI的无限可能...',
            image: '/images/ai-future.jpg'
        },
        {
            title: '深度学习革命',
            content: '深入了解深度学习如何推动AI技术突破，改变传统行业和生活方式...',
            image: '/images/deep-learning.jpg'
        }
    ]

    // AI发展时间线数据
    const timeline = [
        {
            year: '1950',
            title: '图灵测试提出',
            description: 'Alan Turing提出著名的图灵测试，开创了人工智能研究的新纪元'
        },
        {
            year: '1956',
            title: 'AI术语诞生',
            description: '达特茅斯会议上首次提出"人工智能"这一术语，标志着AI作为一个独立学科的诞生'
        },
        {
            year: '1964',
            title: 'ELIZA问世',
            description: '第一个聊天机器人ELIZA诞生，开创了人机对话的先河'
        },
        {
            year: '1997',
            title: 'Deep Blue战胜国际象棋冠军',
            description: 'IBM的Deep Blue战胜国际象棋世界冠军卡斯帕罗夫，展示了AI的潜力'
        },
        {
            year: '2012',
            title: '深度学习突破',
            description: 'AlexNet在ImageNet竞赛中取得突破性成功，掀起深度学习革命'
        },
        {
            year: '2016',
            title: 'AlphaGo击败人类冠军',
            description: 'DeepMind的AlphaGo击败围棋世界冠军李世石，展示AI在复杂策略游戏中的能力'
        },
        {
            year: '2018',
            title: 'BERT模型发布',
            description: 'Google发布BERT模型，推动自然语言处理技术发展'
        },
        {
            year: '2022',
            title: 'ChatGPT发布',
            description: 'OpenAI发布ChatGPT，引发全球AI应用热潮，开启生成式AI新时代'
        },
        {
            year: '2023',
            title: 'GPT-4发布',
            description: 'OpenAI发布GPT-4，展示出更强大的多模态能力和推理能力'
        }
    ]

    const categories = [
        { id: 'all', name: '全部', icon: <Brain className="w-4 h-4" /> },
        { id: 'chat', name: '对话', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'image', name: '图像', icon: <Camera className="w-4 h-4" /> },
        { id: 'code', name: '编程', icon: <Code className="w-4 h-4" /> },
        { id: 'music', name: '音乐', icon: <Music className="w-4 h-4" /> },
        { id: 'automation', name: '自动化', icon: <Zap className="w-4 h-4" /> }
    ]

    // 使用 useMemo 优化过滤逻辑
    const filteredTools = useMemo(() =>
        aiTools.filter(tool =>
            (activeCategory === 'all' || tool.category === activeCategory) &&
            (searchDebounce === '' ||
                tool.title.toLowerCase().includes(searchDebounce.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchDebounce.toLowerCase()) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchDebounce.toLowerCase())))
        ),
        [activeCategory, searchDebounce])

    // 处理分类切换
    const handleCategoryChange = useCallback((categoryId: string) => {
        setActiveCategory(categoryId)
    }, [])

    if (isLoading) {
        return <LoadingComponent />
    }

    return (
        <div className="min-h-screen pt-[60px] bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* 头部区域 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                        探索 AI 世界
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">发现最新AI工具和知识，开启你的人工智能之旅</p>

                    {/* 搜索框 */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="搜索AI工具和知识..."
                            className="w-full px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12 shadow-sm"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>

                    {/* 分类选项 */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
                        {categories.map(category => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                                    ${activeCategory === category.id
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-sm'}`}
                            >
                                {category.icon}
                                {category.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* AI工具区域 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Wrench className="w-6 h-6 text-blue-600" />
                        AI 工具推荐
                        <span className="text-sm font-normal text-gray-500">({filteredTools.length}个工具)</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredTools.map((tool, index) => (
                                <motion.div
                                    key={tool.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.1 }}
                                    layout
                                >
                                    <ToolCard {...tool} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* AI发展时间线 */}
                <section className="mb-16 overflow-hidden">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-600" />
                        AI 发展时间线
                    </h2>
                    <div className="relative space-y-8 before:absolute before:inset-0 before:left-[50%] before:w-px before:bg-blue-200">
                        {timeline.map((item, index) => (
                            <TimelineItem
                                key={item.year}
                                {...item}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </section>

                {/* AI知识区域 */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-blue-600" />
                        AI 知识探索
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {aiKnowledge.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <KnowledgeCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* 回到顶部按钮 */}
            <ScrollToTop />
        </div>
    )
} 