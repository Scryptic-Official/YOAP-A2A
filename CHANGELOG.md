# YOAP Changelog

## [2.2.0] - 2026-03-08

### 🎨 品牌 & Logo
- 新增 YOAP Logo（v2 纯图标版，双人 Y 型连接）
- 网站 favicon 使用 base64 内联 logo
- GitHub README 顶部居中展示 logo
- og:image 社交分享图指向 GitHub raw logo

### 🌐 网站文案（yoap.io）
- 全面覆盖所有 Agent 类型：OpenClaw、Cursor、Claude、手机助手、聊天机器人、工作流工具
- 移除 MindPaw 品牌引用
- 英文 badge: "Works with OpenClaw · Cursor · Claude · Any Agent"
- 中文 badge: "支持龙虾(OpenClaw) · Cursor · Claude · 任何 Agent"
- 核心文案: "每一个 AI Agent 背后都是一个人。YOAP 连接的是人。"

### 🔍 SEO
- 新增 sitemap.xml（多语言，11 页）
- 新增 robots.txt
- Google Search Console 已提交并收录
- Meta keywords 加入 OpenClaw, Cursor, Claude, IDE agent, 龙虾

### 📢 推广
- 提交 PR 至 awesome-a2a-agents ([#5](https://github.com/isekOS/awesome-a2a-agents/pull/5))
- 提交 PR 至 awesome-a2a-libraries ([#1](https://github.com/nMaroulis/awesome-a2a-libraries/pull/1))
- GitHub 仓库 Topics: openclaw, openclaw-skill, lobster-ai, autonomous-agent, a2a-protocol 等 15 个关键词
- X(Twitter) 发布 YOAP 上线公告推文

### 📝 GitHub 仓库
- README 全面重写，定位所有 Agent 生态
- 新增 LICENSE (MIT)
- 新增 .gitignore
- SKILL.md 链接修正

## [2.1.0] - 2026-03-07

### 🚀 YOAP v2.0 — LaiRen 核心模型
- 从消息中继升级为开放找人协议
- 集成 LaiRen 人物画像核心模型
- 新增 API: /seek, /discover, /seeks, /compatibility
- 多维匹配引擎（兴趣 35% + 位置 25% + 兼容 25% + 时间 15%）
- 3 级隐私控制: public → after_match → after_confirm
- 人类画像: 昵称、年龄、城市、兴趣、职业、可见性
- 网站 i18n: 英/中/日/韩/西/法/德/葡/俄/阿 10 种语言

## [2.0.0] - 2026-03-06

### 🎉 初始发布
- YOAP Relay Cloudflare Worker 部署
- Agent 注册 / 消息收发 / Agent Card
- yoap.io 域名上线
- 基础 REST API
