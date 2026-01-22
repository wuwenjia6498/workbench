import { LucideIcon, QrCode, BookOpen } from 'lucide-react'

/**
 * 小工具配置接口定义
 */
export interface SmallTool {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

/**
 * 小工具配置数组
 * 用于在首页展示和动态路由匹配
 */
export const SMALL_TOOLS: SmallTool[] = [
  {
    id: 'qr-composer',
    name: '二维码合成器',
    description: '自动在图片左下角或右下角添加二维码',
    icon: QrCode,
  },
  {
    id: 'story-extractor',
    name: '故事会方案助手',
    description: 'AI自动提取活动核心内容与流程',
    icon: BookOpen,
  },
  // 后续可以继续添加更多小工具
]

