**角色**：资深全栈工程师 (Next.js & LLM集成专家)
**任务**：在“老约翰工作台”中开发第二个内嵌小工具——“故事会方案助手”。
**核心目标**：继承现有工作台的架构风格，利用 Gemini 模型（通过 aihubmix 渠道）智能分析上传的文档，并按指定风格生成导语和流程。

**项目环境**：
- 框架：Next.js App Router + Tailwind CSS
- UI风格：与现有 `QrComposer` 工具保持高度一致（Compact Card, 简洁表单）。
- 依赖库：`mammoth` (解析Word), `openai` (调用兼容接口)。

**详细需求**：

### 1. 后端 API 开发 (`app/api/analyze-story/route.ts`)
请创建一个 POST 接口，用于连接 AIHubMix 平台。
* **配置**：
    * Base URL: `https://api.aihubmix.com/v1`
    * API Key: 读取环境变量 `AIHUBMIX_API_KEY`
    * Model: `gemini-2.5-pro` (如平台未上线该别名，请默认使用 `gemini-1.5-pro` 并注释说明位置)。
* **处理逻辑**：
    1. 接收前端发送的 `{ content: string }` (文档纯文本)。
    2. **System Prompt (关键)**：
       你是一名资深的儿童阅读推广策划人。请根据用户上传的故事会方案内容，提取并生成以下两部分信息，返回严格的 JSON 格式：
       
       **任务一：生成“主旨/导语” (`introduction`)**
       * 风格要求：类似微信朋友圈的文案，温馨、有感染力、富有画面感。
       * 参考语气：
           * “夏日是什么味道？甜甜的、酸酸的。甜蜜七月，尽情享受夏日的美味...”
           * “充满活力的外婆，喜欢去世界各地旅行...打开‘阅读’这扇大门...”
       * 内容：提炼活动核心亮点，吸引家长报名。
       
       **任务二：提取“活动流程” (`process`)**
       * 格式要求：保留清晰的序号（1、2、3...）或环节名称。
       * 内容：准确提取方案中的执行环节，去除冗余描述。
    
    3. **Response Format**：强制返回 JSON Object `{ "introduction": string, "process": string }`。

### 2. 前端组件开发 (`app/tools/_components/StoryExtractor.tsx`)
* **功能流程**：
    1.  **文件上传**：提供文件选择框，支持 `.docx` 格式。
    2.  **本地解析**：使用 `mammoth.js` 将 Word 文档转为纯文本 (Raw Text)。
    3.  **AI 分析**：显示“AI 正在阅读方案并撰写文案...”的 Loading 状态，将文本发送给上述 API。
    4.  **结果回显**：
        * 将 API 返回的 `introduction` 填入“故事会主旨/导语”多行文本框。
        * 将 `process` 填入“活动流程”多行文本框。
        * 文本框支持用户手动修改。
* **UI 布局**：
    * **左侧 (40%)**：上传区 + 操作指引。请设计一个带有虚线边框的优雅上传区域。
    * **右侧 (60%)**：两个结果卡片（主旨、流程），每个卡片右上角提供“复制”按钮。

### 3. 工具注册 (`app/tools/config.ts`)
* 添加新配置项：
    * ID: `story-extractor`
    * Name: `故事会方案助手`
    * Description: `AI自动提取活动导语与流程`
    * Icon: 使用 Lucide React 的 `BookOpen` 或 `FileText`。

### 4. 路由页面 (`app/tools/[toolId]/page.tsx`)
* 在现有的 Switch 逻辑中增加对 `story-extractor` 的支持，渲染 `<StoryExtractor />` 组件。

**交付物**：
请生成完整的 API Route 代码、前端组件代码 (`StoryExtractor.tsx`) 以及更新后的配置文件。确保代码具备错误处理（如解析失败、API 超时）。