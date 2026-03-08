# 仪光赤心 · AI 红色时光对话机

跨越时空，与福建革命先烈对话的 AI 互动网页。

## 项目简介

本项目由**仪光赤心实践队**出品，结合 AI 大模型角色扮演技术，让用户以第一人称与革命先烈实时对话，探索数字红色教育新形式。

## 功能特点

- 5 位福建革命先烈可供选择（陈祥榕、林则徐、瞿秋白、林祥谦、闽西先烈）
- AI 大模型全程角色扮演，回答坚定质朴、富有信仰
- 快捷提问引导，降低对话门槛
- 支持生成并下载「时空对话卡片」图片
- **前后端分离架构，API Key 安全保护在后端**

## 部署方案

**推荐：前后端分离部署**

- **前端**：GitHub Pages（免费）
- **后端**：Vercel/Railway/Render（免费）
- **API Key**：保存在后端环境变量中，安全可靠

详细部署指南：[DEPLOYMENT-SPLIT.md](DEPLOYMENT-SPLIT.md)

## 快速开始

### 方式一：前后端分离部署（推荐用于公开访问）

1. **部署后端**到 Vercel/Railway/Render
   - 配置环境变量 `DEEPSEEK_API_KEY`
   - 获得后端 API 地址

2. **部署前端**到 GitHub Pages
   - 修改 `docx/index.html` 中的 `BACKEND_API` 地址
   - 推送到 GitHub 并启用 Pages

3. **配置 CORS**
   - 在 `server.js` 中添加前端域名到 CORS 白名单

👉 完整步骤请查看 [DEPLOYMENT-SPLIT.md](DEPLOYMENT-SPLIT.md)

### 方式二：本地运行（开发测试）

1. **安装依赖**

   ```bash
   npm install
   ```

2. **配置 API Key**
   - 复制 `.env.example` 为 `.env`
   - 在 `.env` 文件中填入你的 DeepSeek API Key

3. **启动服务器**

   ```bash
   npm start
   ```

4. **访问**
   打开浏览器访问 `http://localhost:3000`

## 获取 API Key

1. 访问 [DeepSeek 平台](https://platform.deepseek.com/)
2. 注册并登录
3. 在 API Keys 页面创建新的密钥
4. 复制密钥并保存

**注意：** 请妥善保管你的 API Key，不要泄露给他人。

## 技术栈

- **前端：** 纯原生 HTML / CSS / JavaScript
- **AI：** [DeepSeek API](https://platform.deepseek.com)
- **后端（可选）：** Node.js + Express

## 目录结构

```
├── docx/
│   └── index.html      # 主页面（支持纯前端运行）
├── server.js           # Node.js 后端（可选）
├── package.json        # npm 依赖
├── .env.example        # 环境变量示例
├── .gitignore          # Git 忽略配置
├── DEPLOYMENT.md       # 部署指南
└── README.md           # 本文件
```

## 安全说明

✅ **已实施的安全措施：**

- API Key 可保存在浏览器本地（localStorage），不会上传到服务器
- `.env` 文件已在 `.gitignore` 中配置，不会提交到 Git
- 提供了 `.env.example` 作为配置模板，不包含真实密钥

⚠️ **重要提示：**

- **永远不要**将包含真实 API Key 的 `.env` 文件提交到 Git
- **永远不要**在代码中硬编码 API 密钥
- 前端直接调用 API 时，API Key 会出现在浏览器网络请求中
- 建议仅个人使用，或为每个用户提供独立的 API Key
- 建议在 DeepSeek 后台设置 API Key 的使用限额

## 部署选项

| 方式               | 适用场景       | 优点                         | 缺点                   |
| ------------------ | -------------- | ---------------------------- | ---------------------- |
| **GitHub Pages**   | 个人使用、展示 | 免费、简单                   | 用户需自己配置 API Key |
| **本地 Node.js**   | 开发测试       | API Key 在后端保护           | 需要服务器             |
| **Vercel/Railway** | 公开使用       | API Key 在后端保护、自动部署 | 需要配置环境变量       |

详细部署步骤请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

## 常见问题

**Q: 为什么需要自己配置 API Key？**  
A: 为了保护开发者的 API 密钥不被滥用，也让每个用户独立控制自己的调用费用。

**Q: DeepSeek API 免费吗？**  
A: DeepSeek 提供一定的免费额度，超出后需要付费。具体请查看官网。

**Q: API Key 会泄露吗？**  
A: 前端直接调用 API 时，API Key 会出现在浏览器的网络请求中。建议仅个人使用。如需公开使用，建议采用后端代理方式。

## 许可证

请根据实际情况添加许可证信息。

## 贡献

欢迎提出 Issue 和 Pull Request！

---

**仪光赤心实践队** · 让每一段对话，成为跨越时空的精神传承
