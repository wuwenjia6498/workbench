import { FileText, Image, Calendar, Clapperboard, Film, Sun, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SMALL_TOOLS, SmallTool } from './tools/config'

interface Tool {
  id: string
  name: string
  description: string
  url: string
  icon: LucideIcon
  color: string
  bgColor: string
  gradient: string
}

const TOOLS: Tool[] = [
  {
    id: 'copywriting',
    name: '文案生成助手',
    description: '批量生成加油365社群文案',
    url: 'https://text.skyline666.top/',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    id: 'image-generator',
    name: '智能配图工具',
    description: '基于文案自动匹配插图',
    url: 'https://image.skyline666.top/',
    icon: Image,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
  {
    id: 'morning-evening-poster',
    name: '早晚安海报生成',
    description: '根据预设模板快速生成早晚安海报',
    url: 'https://poster.skyline666.top/',
    icon: Sun,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    id: 'material-upload',
    name: '每日素材归档',
    description: '按日期有序存储每日社群素材',
    url: 'https://daily.skyline666.top/',
    icon: Calendar,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    id: 'poster-generator',
    name: '周末放映室海报',
    description: '输入链接自动提取信息，同步生成宣传海报',
    url: 'https://cinema.skyline666.top/',
    icon: Clapperboard,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradient: 'from-orange-500/10 to-orange-600/5',
  },
  {
    id: 'video-collection',
    name: '短片资源库',
    description: '汇集周末放映室精选短片',
    url: 'https://shortfilm.skyline666.top/',
    icon: Film,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    gradient: 'from-rose-500/10 to-rose-600/5',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-md" />
              <img
                src="/logo.jpg"
                alt="老约翰绘本馆"
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-white shadow-lg"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-1"
                  style={{
                    color: '#2D415E',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                老约翰工作台
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                内部工具集中导航
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-20 mb-12">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 bg-gradient-to-b from-slate-400 to-slate-300 rounded-full" />
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                日常小工具
              </h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
          </div>
          <p className="text-slate-500 text-sm mt-3 ml-6 pl-3">
            轻量实用工具集合
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMALL_TOOLS.map((tool) => (
            <SmallToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>

      <footer className="relative bg-white/60 backdrop-blur-sm border-t border-slate-200/60 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-500 text-sm font-medium">
            © 2026 老约翰儿童阅读
          </p>
        </div>
      </footer>
    </div>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon

  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 p-5 h-full border border-slate-200/60 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <div className={`${tool.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm ring-1 ring-slate-900/5`}>
            <Icon className={`${tool.color} w-7 h-7`} strokeWidth={1.5} />
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
            {tool.name}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

function SmallToolCard({ tool }: { tool: SmallTool }) {
  const Icon = tool.icon

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group"
    >
      <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 p-4 border border-slate-200/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100/50 transition-all duration-300 ring-1 ring-slate-900/5">
            <Icon className="w-6 h-6 text-slate-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-500 truncate font-medium">
              {tool.description}
            </p>
          </div>

          <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
