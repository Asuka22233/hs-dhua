# 仪光赤心 · AI 红色时光对话机

> 跨越时空，与福建革命先烈对话的 AI 互动网页

**在线访问：** [https://asuka22233.github.io/hs-dhua/](https://asuka22233.github.io/hs-dhua/)

## 项目简介

结合 AI 大模型技术，让用户与革命先烈进行实时对话，探索数字红色教育新形式。

**主要功能：**

- 5 位福建革命先烈可供选择
- AI 角色扮演对话
- 快捷提问引导
- 对话卡片生成与下载

## 技术栈

- **前端**：HTML / CSS / JavaScript
- **后端**：Node.js + Express
- **AI**：DeepSeek API
- **部署**：GitHub Pages (前端) + Vercel (后端)

## 部署架构

采用前后端分离架构确保 API 密钥安全：

- **前端**：托管在 GitHub Pages
- **后端**：托管在 Vercel，通过环境变量保护 API Key
- **CORS**：后端配置跨域访问白名单

详细部署指南请查看：[DEPLOYMENT-SPLIT.md](DEPLOYMENT-SPLIT.md)

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量（复制 .env.example 为 .env，填入 API Key）
cp .env.example .env

# 启动服务
npm start
```

访问 `http://localhost:3000` 即可使用。

## 获取 API Key

访问 [DeepSeek 平台](https://platform.deepseek.com/) 注册并创建 API 密钥。

---

**项目作者**：仪光赤心实践队  
**许可证**：MIT

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
