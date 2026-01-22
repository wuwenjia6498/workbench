'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Upload, Download, X, ImageIcon, Clock, Trash2 } from 'lucide-react'

/**
 * 历史记录数据接口
 */
interface HistoryItem {
  id: string
  imageData: string
  timestamp: number
  width: number
  height: number
}

/**
 * 二维码合成器组件
 * 功能：将用户上传的图片与预设的二维码合成，二维码位于右下角
 */
export default function QrComposer() {
  // Canvas 引用
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // 状态管理
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null)
  const [composedImage, setComposedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])

  /**
   * 从 localStorage 加载历史记录
   */
  useEffect(() => {
    const savedHistory = localStorage.getItem('qr-composer-history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('加载历史记录失败:', error)
      }
    }
  }, [])

  /**
   * 保存历史记录到 localStorage
   */
  const saveToHistory = useCallback((imageData: string, width: number, height: number) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      imageData,
      timestamp: Date.now(),
      width,
      height,
    }

    const updatedHistory = [newItem, ...history].slice(0, 20) // 最多保存 20 条记录
    setHistory(updatedHistory)
    localStorage.setItem('qr-composer-history', JSON.stringify(updatedHistory))
  }, [history])

  /**
   * 处理图片合成逻辑
   * @param baseImage 用户上传的底图
   */
  const composeImage = useCallback(async (baseImage: HTMLImageElement) => {
    setIsProcessing(true)

    try {
      // 加载二维码图片
      const qrImage = new Image()
      qrImage.crossOrigin = 'anonymous'
      
      await new Promise<void>((resolve, reject) => {
        qrImage.onload = () => resolve()
        qrImage.onerror = reject
        qrImage.src = '/qrcode.png'
      })

      // 获取 Canvas 和上下文
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 设置 Canvas 尺寸为底图尺寸
      canvas.width = baseImage.width
      canvas.height = baseImage.height

      // 绘制底图
      ctx.drawImage(baseImage, 0, 0)

      // 计算二维码尺寸和位置
      const baseWidth = baseImage.width
      const baseHeight = baseImage.height
      
      // 二维码宽度为底图宽度的 8%，但至少 80px，最大 200px
      const qrSize = Math.min(Math.max(baseWidth * 0.08, 80), 200)
      
      // 边距为底图宽度的 3%
      const padding = baseWidth * 0.03
      
      // 计算二维码位置（右下角）
      const qrX = baseWidth - qrSize - padding
      const qrY = baseHeight - qrSize - padding

      // 绘制二维码
      ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize)

      // 导出合成后的图片
      const composedDataUrl = canvas.toDataURL('image/png', 1.0)
      setComposedImage(composedDataUrl)
      
      // 保存到历史记录
      saveToHistory(composedDataUrl, baseWidth, baseHeight)
    } catch (error) {
      console.error('图片合成失败:', error)
      alert('图片合成失败，请确保二维码文件存在于 public/qrcode.png')
    } finally {
      setIsProcessing(false)
    }
  }, [saveToHistory])

  /**
   * 处理文件选择
   */
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setUploadedImage(img)
        composeImage(img)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [composeImage])

  /**
   * 处理文件输入框变化
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  /**
   * 处理拖拽相关事件
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  /**
   * 下载合成后的图片
   */
  const handleDownload = (imageData?: string) => {
    const dataUrl = imageData || composedImage
    if (!dataUrl) return

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `二维码合成图_${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /**
   * 删除单条历史记录
   */
  const handleDeleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem('qr-composer-history', JSON.stringify(updatedHistory))
  }

  /**
   * 清空所有历史记录
   */
  const handleClearHistory = () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      setHistory([])
      localStorage.removeItem('qr-composer-history')
    }
  }

  /**
   * 格式化时间
   */
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`
    
    return date.toLocaleString('zh-CN', { 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="space-y-6">
      {/* 主操作区域 */}
      <div className="grid lg:grid-cols-2 gap-6">
      {/* 左侧：操作区域 */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            上传底图
          </h2>

          {/* 上传区域 - 始终显示 */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center
              transition-all duration-200 cursor-pointer
              ${isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }
            `}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="pointer-events-none">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-base font-medium text-gray-700 mb-1">
                {uploadedImage ? '继续上传新图片' : '点击选择或拖拽图片'}
              </p>
              <p className="text-xs text-gray-500">
                支持 JPG、PNG、GIF 等格式
              </p>
            </div>
          </div>
        </div>

        {/* 当前图片信息和操作按钮 */}
        {uploadedImage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">当前图片</p>
                <p className="text-xs text-gray-600">
                  {uploadedImage.width} × {uploadedImage.height} px
                </p>
              </div>
            </div>

            {/* 下载按钮 */}
            {composedImage && (
              <button
                onClick={() => handleDownload()}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                下载合成图片
              </button>
            )}
          </div>
        )}
      </div>

      {/* 右侧：预览区域 */}
      {composedImage ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            合成预览
          </h2>
          
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={composedImage}
              alt="合成预览"
              className="w-full h-auto"
            />
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">
            ✓ 二维码已添加到右下角
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3">📸</div>
            <p className="text-gray-500 text-sm">上传图片后，合成预览将显示在这里</p>
          </div>
        </div>
      )}

        {/* 隐藏的 Canvas（用于图片合成） */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 处理中提示 */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-lg font-medium text-gray-900">正在合成图片...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 历史记录区域 */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              历史记录
              <span className="text-sm font-normal text-gray-500">({history.length})</span>
            </h2>
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              清空
            </button>
          </div>

          {/* 历史记录网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all"
              >
                {/* 缩略图 - 横向 2:1 比例，显示完整图片 */}
                <div className="aspect-[2/1] relative bg-gray-100">
                  <img
                    src={item.imageData}
                    alt="历史记录"
                    className="w-full h-full object-contain"
                  />
                  
                  {/* 悬停操作层 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDownload(item.imageData)}
                      className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all transform scale-90 group-hover:scale-100"
                      title="下载"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHistoryItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all transform scale-90 group-hover:scale-100"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 信息栏 */}
                <div className="p-1.5 bg-white">
                  <p className="text-[10px] text-gray-500 truncate leading-tight">
                    {item.width} × {item.height}
                  </p>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    {formatTime(item.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

