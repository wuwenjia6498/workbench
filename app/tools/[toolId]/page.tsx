import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SMALL_TOOLS } from '../config'
import { notFound } from 'next/navigation'
import QrComposer from '../_components/QrComposer'
import StoryExtractor from '../_components/StoryExtractor'

/**
 * 动态工具页面
 * 根据 toolId 参数渲染对应的工具组件
 */
export default function ToolPage({ params }: { params: { toolId: string } }) {
  const { toolId } = params
  
  // 查找对应的工具配置
  const tool = SMALL_TOOLS.find(t => t.id === toolId)
  
  // 如果工具不存在，返回 404
  if (!tool) {
    notFound()
  }

  // 根据 toolId 渲染对应的组件
  const renderToolComponent = () => {
    switch (toolId) {
      case 'qr-composer':
        return <QrComposer />
      case 'story-extractor':
        return <StoryExtractor />
      default:
        // 其他工具显示"开发中"
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">功能开发中</h3>
            <p className="text-gray-500">该工具正在紧锣密鼓地开发中，敬请期待...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header 头部区域 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-6">
            {/* 返回按钮 */}
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">返回工作台</span>
            </Link>

            {/* 分隔线 */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* 工具标题 */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {tool.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderToolComponent()}
      </main>
    </div>
  )
}

