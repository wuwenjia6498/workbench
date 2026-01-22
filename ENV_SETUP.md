# 环境变量配置指南

## 故事会方案助手 - API 配置

为了使用"故事会方案助手"功能，你需要配置 AIHubMix API Key。

### 配置步骤

1. **获取 API Key**
   - 访问 [AIHubMix](https://aihubmix.com)
   - 注册账号并获取 API Key

2. **创建环境变量文件**
   
   在项目根目录创建 `.env.local` 文件：
   
   ```bash
   touch .env.local
   ```

3. **添加配置**
   
   在 `.env.local` 文件中添加：
   
   ```env
   AIHUBMIX_API_KEY=your_actual_api_key_here
   ```
   
   > ⚠️ 请将 `your_actual_api_key_here` 替换为你的真实 API Key

4. **重启开发服务器**
   
   ```bash
   npm run dev
   ```

### 模型配置

当前使用的模型：`gemini-1.5-pro`

如果 AIHubMix 平台已支持 `gemini-2.5-pro`，可以在以下文件中修改：

📁 `app/api/analyze-story/route.ts`

```typescript
const completion = await client.chat.completions.create({
  model: 'gemini-2.5-pro', // 修改这里
  // ...
})
```

### 安全说明

- ✅ `.env.local` 文件已自动添加到 `.gitignore`，不会被提交到 Git
- ✅ 请勿将 API Key 硬编码在代码中
- ✅ 生产环境请在部署平台配置环境变量

### 故障排查

**问题：提示"服务配置错误：未找到 API Key"**
- 检查 `.env.local` 文件是否存在
- 确认变量名为 `AIHUBMIX_API_KEY`
- 重启开发服务器

**问题：AI 服务请求超时**
- 检查网络连接
- 确认 API Key 有效且有足够额度
- 稍后重试

**问题：AI 返回格式错误**
- 确认使用的模型版本是否正确
- 检查文档内容是否完整

---

## 📄 支持的文档格式

- ✅ `.docx` (推荐) - Word 2007 及以上版本
- ✅ `.doc` - Word 97-2003 版本

> 💡 **注意**：`.doc` 格式为旧版二进制格式，解析可能不完整。如遇问题，建议：
> 1. 使用 Word 打开文件，另存为 `.docx` 格式
> 2. 或使用在线转换工具（如 [Zamzar](https://www.zamzar.com) 或 [CloudConvert](https://cloudconvert.com)）

---

💡 配置完成后，即可在"故事会方案助手"中上传 Word 文档进行智能分析！

