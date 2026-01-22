'use client'

import { useState, useCallback } from 'react'
import { Upload, Copy, FileText, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import mammoth from 'mammoth'

/**
 * 故事会方案助手组件
 * 功能：上传 Word 文档，AI 自动提取活动导语与流程
 */
export default function StoryExtractor() {
  // 状态管理
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [introduction, setIntroduction] = useState('')
  const [process, setProcess] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  /**
   * 处理文件上传
   */
  const handleFileUpload = useCallback(async (file: File) => {
    // 验证文件类型
    const isDocx = file.name.endsWith('.docx')
    const isDoc = file.name.endsWith('.doc')
    
    if (!isDocx && !isDoc) {
      setError('请上传 .doc 或 .docx 格式的 Word 文档')
      return
    }

    setError(null)
    setIsAnalyzing(true)
    setFileName(file.name)
    setIntroduction('')
    setProcess('')

    try {
      // 使用 mammoth 解析 Word 文档
      const arrayBuffer = await file.arrayBuffer()
      let result
      
      try {
        result = await mammoth.extractRawText({ arrayBuffer })
      } catch (parseError: any) {
        // 检测是否是 .doc 格式解析错误
        if (isDoc || parseError.message?.includes('zip file') || parseError.message?.includes('central directory')) {
          throw new Error(
            '❌ .doc 格式无法解析\n\n' +
            '📝 该文件使用了旧版 Word 格式，请转换为新格式：\n\n' +
            '方法一：使用 Word 转换\n' +
            '1️⃣ 用 Microsoft Word 打开文件\n' +
            '2️⃣ 点击"文件" → "另存为"\n' +
            '3️⃣ 选择格式为 "Word 文档 (.docx)"\n\n' +
            '方法二：在线转换\n' +
            '• 访问 https://www.zamzar.com\n' +
            '• 或 https://cloudconvert.com\n' +
            '• 上传 .doc 文件，转换为 .docx\n\n' +
            '💡 转换后重新上传即可使用'
          )
        }
        throw parseError
      }
      
      const content = result.value

      if (!content || content.trim().length < 50) {
        throw new Error('文档内容过短或为空，请检查文件是否完整')
      }

      // 调用后端 API 分析
      const response = await fetch('/api/analyze-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'AI 分析失败，请稍后重试')
      }

      const data = await response.json()
      setIntroduction(data.introduction)
      setProcess(data.process)

    } catch (err: any) {
      console.error('分析错误:', err)
      setError(err.message || '文档分析失败，请重试')
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  /**
   * 处理文件输入框变化
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  /**
   * 复制文本到剪贴板
   */
  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      alert('复制失败，请手动选择复制')
    }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* 左侧：上传区域 (40% = 2/5) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            上传方案文档
          </h2>

          {/* 上传区域 */}
          <div className="relative border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-8 text-center transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50">
            <input
              type="file"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleInputChange}
              disabled={isAnalyzing}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            
            <div className="pointer-events-none">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-base font-medium text-gray-700 mb-2">
                {fileName || '点击选择 Word 文档'}
              </p>
              <p className="text-xs text-gray-500">
                推荐使用 .docx 格式
              </p>
              {!fileName && (
                <p className="text-[10px] text-gray-400 mt-1.5">
                  ⚠️ .doc 格式可能无法解析，建议先转换为 .docx
                </p>
              )}
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-900">分析失败</p>
              </div>
              <div className="text-xs text-red-800 leading-relaxed whitespace-pre-line pl-7">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            AI 助手说明
          </h3>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span>上传故事会活动方案（Word 格式）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span>AI 将自动分析并生成故事会核心内容</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span>提取结构化的活动流程</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">4.</span>
              <span>支持手动编辑和一键复制</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 右侧：结果展示区域 (60% = 3/5) */}
      <div className="lg:col-span-3 space-y-4">
        {/* 故事会介绍 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              📝 故事会介绍
            </h2>
            {introduction && (
              <button
                onClick={() => handleCopy(introduction, 'introduction')}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copiedField === 'introduction' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制
                  </>
                )}
              </button>
            )}
          </div>

          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder={isAnalyzing ? "AI 正在阅读方案并撰写文案..." : "上传文档后，AI 将自动生成故事会核心内容"}
            disabled={isAnalyzing}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed disabled:bg-gray-50 disabled:text-gray-500"
          />
          
          <p className="text-xs text-gray-500 mt-2">
            💡 可手动编辑文案，使其更符合您的风格
          </p>
        </div>

        {/* 活动流程 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              📋 活动流程
            </h2>
            {process && (
              <button
                onClick={() => handleCopy(process, 'process')}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copiedField === 'process' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制
                  </>
                )}
              </button>
            )}
          </div>

          <textarea
            value={process}
            onChange={(e) => setProcess(e.target.value)}
            placeholder={isAnalyzing ? "正在提取流程信息..." : "活动执行流程将在这里显示"}
            disabled={isAnalyzing}
            className="w-full h-36 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed font-mono disabled:bg-gray-50 disabled:text-gray-500"
          />
          
          <p className="text-xs text-gray-500 mt-2">
            ✅ 已自动格式化为清晰的执行步骤
          </p>
        </div>
      </div>

      {/* 分析中全局提示 */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-purple-600 animate-pulse" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">AI 分析中</p>
                <p className="text-sm text-gray-600">正在阅读方案并生成文案...</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

