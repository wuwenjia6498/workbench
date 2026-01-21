# 老约翰工作台 (Lao John Workbench)

## 项目简介

老约翰工作台是一个内部导航门户，用于集中管理和访问分散在不同链接的运营工具，提升团队工作效率。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **认证**: Next.js Middleware (Basic Auth)

## 功能特性

- 🎨 **现代化界面**: 采用 Apple 风格设计，简约优雅
- 🔐 **访问保护**: HTTP Basic Auth 验证机制
- 📱 **响应式布局**: 完美适配手机、平板、桌面端
- 🚀 **快速导航**: 一站式访问所有运营工具

## 工具列表

1. **文案生成助手** - 一键生成每日朋友圈、社群文案
2. **配图生成工具** - 早安/晚安海报及活动配图制作
3. **每日素材上传** - 按日期归档整理每日运营素材
4. **放映室海报生成** - 自动抓取视频信息生成预告海报
5. **短片集合平台** - 周末放映室往期视频汇总展示

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 [http://localhost:3000](http://localhost:3000)

默认账号：
- 用户名: `admin`
- 密码: `laojohn2026`

## 目录结构

```
workbench/
├── app/
│   ├── page.tsx          # 主页面组件
│   ├── layout.tsx        # 根布局
│   └── globals.css       # 全局样式
├── middleware.ts         # 认证中间件
├── tailwind.config.ts    # Tailwind 配置
└── package.json          # 项目依赖
```

## 开发说明

- 修改工具链接请编辑 `app/page.tsx` 中的 `TOOLS` 常量数组
- 修改认证信息请编辑 `middleware.ts` 中的用户名和密码

## 版权信息

© 2026 老约翰儿童阅读推广中心
