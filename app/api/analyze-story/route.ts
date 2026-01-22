import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

/**
 * 故事会方案分析 API
 * 使用 Gemini 模型通过 AIHubMix 平台分析文档内容
 */
export async function POST(request: NextRequest) {
  try {
    // 读取请求体
    const { content } = await request.json()

    // 验证输入
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的文档内容' },
        { status: 400 }
      )
    }

    // 验证 API Key
    const apiKey = process.env.AIHUBMIX_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: '服务配置错误：未找到 API Key' },
        { status: 500 }
      )
    }

    // 初始化 OpenAI 客户端（兼容 AIHubMix）
    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.aihubmix.com/v1',
    })

    // 系统提示词
    const systemPrompt = `你是一名资深的儿童阅读推广策划人。请根据用户上传的故事会方案内容，提取并生成以下两部分信息，返回严格的 JSON 格式：

**任务一：生成"主旨/导语" (introduction)**
* 字数限制：严格控制在 80 字以内（含标点符号）
* 风格要求：类似微信朋友圈的文案，温馨、有感染力、富有画面感
* 参考语气：
    * "夏日是什么味道？甜甜的、酸酸的。甜蜜七月，尽情享受夏日的美味..."
    * "充满活力的外婆，喜欢去世界各地旅行...打开'阅读'这扇大门..."
* 内容：提炼活动核心亮点，吸引家长报名，语言简洁有力

**任务二：提取"活动流程" (process)**
* 格式要求：使用"数字+顿号"编号，环节名称+冒号+具体内容
* 简洁原则：只保留核心活动名称和内容，不要时间、不要操作步骤、不要过多解释
* 内容：准确提取方案中的执行环节，去除冗余描述
* 书名使用《》，游戏/活动名称使用""
* 标准格式示例：
  1、暖场活动："小胖熊，找朋友"
  2、绘本分享：《大熊抱抱》
  3、分享互动：做一个会表达爱的孩子
  4、手工制作：硕果累累

请严格返回 JSON 格式：{ "introduction": string, "process": string }`

    // 调用 AI 模型
    // AIHubMix 平台已支持 gemini-2.5-pro
    const completion = await client.chat.completions.create({
      model: 'gemini-2.5-pro', // 使用最新的 Gemini 2.5 Pro 模型
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `请分析以下故事会方案：\n\n${content}` },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }, // 强制返回 JSON
    })

    // 提取响应内容
    const responseContent = completion.choices[0]?.message?.content

    if (!responseContent) {
      return NextResponse.json(
        { error: 'AI 响应为空' },
        { status: 500 }
      )
    }

    // 解析 JSON 响应
    let result
    try {
      result = JSON.parse(responseContent)
    } catch (parseError) {
      console.error('JSON 解析失败:', parseError)
      return NextResponse.json(
        { error: 'AI 返回格式错误' },
        { status: 500 }
      )
    }

    // 验证响应格式
    if (!result.introduction || !result.process) {
      return NextResponse.json(
        { error: 'AI 返回数据不完整' },
        { status: 500 }
      )
    }

    // 返回成功响应
    return NextResponse.json({
      introduction: result.introduction,
      process: result.process,
    })

  } catch (error: any) {
    console.error('分析失败:', error)

    // 处理超时错误
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return NextResponse.json(
        { error: 'AI 服务请求超时，请稍后重试' },
        { status: 504 }
      )
    }

    // 处理 API 错误
    if (error.status) {
      return NextResponse.json(
        { error: `AI 服务错误: ${error.message}` },
        { status: error.status }
      )
    }

    // 通用错误
    return NextResponse.json(
      { error: '分析过程出错，请稍后重试' },
      { status: 500 }
    )
  }
}

