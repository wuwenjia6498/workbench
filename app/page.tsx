import { Image, Calendar, PenLine, GraduationCap, MessagesSquare, ClipboardCheck, BookMarked, Scale, TrendingUp, Compass, Library, Languages, LucideIcon } from 'lucide-react'
import Link from 'next/link'

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
    id: 'writing-assistant',
    name: '写作助手',
    description: '自动化写作工作流',
    url: 'https://write.skyline666.top/',
    icon: PenLine,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    gradient: 'from-teal-500/10 to-teal-600/5',
  },
  {
    id: 'student-work-poster',
    name: '学生习作展示海报生成器',
    description: '上传学生手写稿，自动识别内容并生成评语，支持下载保存',
    url: 'https://stuwork.skyline666.top/',
    icon: GraduationCap,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    gradient: 'from-cyan-500/10 to-cyan-600/5',
  },
  {
    id: 'group-share-review',
    name: '读书会群分享回顾',
    description: '读书会社群分享内容回顾',
    url: 'https://teachhub.skyline666.top/',
    icon: MessagesSquare,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    gradient: 'from-indigo-500/10 to-indigo-600/5',
  },
  {
    id: 'sync-writing-grader',
    name: '同步习作批改助手',
    description: '老约翰同步习作 AI 批改',
    url: 'https://grader.skyline666.top/',
    icon: ClipboardCheck,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    gradient: 'from-sky-500/10 to-sky-600/5',
  },
]

const PERSONAL_TOOLS: Tool[] = [
  {
    id: 'sbr-sprint',
    name: 'SBR 冲刺',
    description: 'Strategic Business Reporting 冲刺复习',
    url: 'https://sbr-stu.skyline666.top/',
    icon: BookMarked,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    gradient: 'from-violet-500/10 to-violet-600/5',
  },
  {
    id: 'sbr-review',
    name: 'SBR 复习台',
    description: '准则速查与情景定位',
    url: 'https://acca-sbr.skyline666.top/',
    icon: Scale,
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
    gradient: 'from-fuchsia-500/10 to-fuchsia-600/5',
  },
  {
    id: 'dividend-dashboard',
    name: '高股息投资看板',
    description: '高股息标的跟踪看板',
    url: 'https://ggxkb.skyline666.top/',
    icon: TrendingUp,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    gradient: 'from-red-500/10 to-red-600/5',
  },
  {
    id: 'fishbowl-etf',
    name: '鱼盆·ETF 趋势罗盘',
    description: '基于鱼盆模型的 ETF 轮动与大势择时',
    url: 'https://fishbowl.skyline666.top/',
    icon: Compass,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    id: 'home-library',
    name: '家庭图书管理系统',
    description: '家里藏书登记与管理',
    url: 'https://library.skyline666.top/',
    icon: Library,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    id: 'tech-english',
    name: 'Tech English Trainer',
    description: '技术英语练习',
    url: 'https://tech-trainer.skyline666.top/',
    icon: Languages,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-1"
                  style={{
                    color: '#2D415E',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                我的工作台
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                内部工具集中导航
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader title="公司" subtitle="老约翰儿童阅读工作工具" className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <SectionHeader title="个人" subtitle="学习、投资与生活" className="mt-20 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PERSONAL_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
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

function SectionHeader({ title, subtitle, className = '', small = false }: { title: string; subtitle: string; className?: string; small?: boolean }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 ${small ? 'h-6' : 'h-7'} bg-gradient-to-b from-slate-400 to-slate-300 rounded-full`} />
          <h2 className={`${small ? 'text-lg' : 'text-xl'} font-bold text-slate-800 tracking-tight`}>
            {title}
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
      </div>
      <p className="text-slate-500 text-sm mt-3 ml-6 pl-3">
        {subtitle}
      </p>
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
