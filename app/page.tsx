import { FileText, Image, Calendar, Clapperboard, Film, Sun, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SMALL_TOOLS, SmallTool } from './tools/config'

// 工具数据类型定义
interface Tool {
  id: string
  name: string
  description: string
  url: string
  icon: LucideIcon
  color: string
  bgColor: string
}

// 工具配置常量
// 注意：URL 目前使用占位符，后续需要替换为实际链接
const TOOLS: Tool[] = [
  {
    id: 'copywriting',
    name: '文案生成助手',
    description: '批量生成加油365社群文案',
    url: 'https://text.skyline666.top/', // TODO: 替换为实际 URL
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'image-generator',
    name: '智能配图工具',
    description: '基于文案自动匹配插图',
    url: 'https://image.skyline666.top/', // TODO: 替换为实际 URL
    icon: Image,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'morning-evening-poster',
    name: '早晚安海报生成',
    description: '根据预设模板快速生成早晚安海报',
    url: 'https://poster.skyline666.top/', // TODO: 替换为实际 URL
    icon: Sun,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    id: 'material-upload',
    name: '每日素材归档',
    description: '按日期有序存储每日社群素材',
    url: 'https://daily.skyline666.top/', // TODO: 替换为实际 URL
    icon: Calendar,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'poster-generator',
    name: '周末放映室海报',
    description: '输入链接自动提取信息，同步生成宣传海报',
    url: 'https://cinema.skyline666.top/', // TODO: 替换为实际 URL
    icon: Clapperboard,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'video-collection',
    name: '短片资源库',
    description: '汇集周末放映室精选短片',
    url: 'https://shortfilm.skyline666.top/', // TODO: 替换为实际 URL
    icon: Film,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header 头部区域 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Logo 商标 */}
            <div className="flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="老约翰绘本馆"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              />
            </div>
            
            {/* 标题区域 */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#2D415E' }}>
                老约翰工作台
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                内部工具集中导航
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 主业务工具卡片网格布局：手机1列、平板2列、桌面3列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* 分割线区域 */}
        <div className="mt-16 mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
              🛠️ 日常用小工具
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">轻量级实用小工具</p>
        </div>

        {/* 小工具网格布局：更紧凑的卡片设计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMALL_TOOLS.map((tool) => (
            <SmallToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>

      {/* Footer 页脚区域 */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 老约翰儿童阅读
          </p>
        </div>
      </footer>
    </div>
  )
}

// 工具卡片组件
// 功能：展示单个工具的信息，支持点击跳转和悬停动画效果
function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon

  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 p-6 h-full border border-gray-100">
        {/* 图标容器 */}
        <div className={`${tool.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`${tool.color} w-7 h-7`} strokeWidth={2} />
        </div>

        {/* 工具标题 */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>

        {/* 工具描述 */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {tool.description}
        </p>
      </div>
    </Link>
  )
}

// 紧凑版小工具卡片组件
// 功能：展示小工具的信息，采用更紧凑的横向布局设计
function SmallToolCard({ tool }: { tool: SmallTool }) {
  const Icon = tool.icon

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group"
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 p-4 h-20 border border-gray-100 flex items-center gap-4">
        {/* 小图标 */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          <Icon className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" strokeWidth={2} />
        </div>

        {/* 文字信息 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
