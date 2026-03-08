# 前后端分离部署指南

## 架构说明

为了保护你的 DeepSeek API Key 不被泄露，采用**前后端分离**的部署方案：

- **前端**：部署到 GitHub Pages（免费静态托管）
- **后端**：部署到 Vercel/Railway/Render（免费 Node.js 托管）
- **API Key**：保存在后端服务器的环境变量中，前端无法访问

```
┌─────────────┐        HTTPS         ┌─────────────┐       DeepSeek API      ┌──────────────┐
│   用户浏览器  │  ────────────────>   │  后端服务器  │  ─────────────────>    │   DeepSeek   │
│ GitHub Pages│        调用API        │   Vercel    │    (带 API Key)        │              │
└─────────────┘                      └─────────────┘                        └──────────────┘
```

---

## 方案一：Vercel + GitHub Pages（推荐）

### 第一步：部署后端到 Vercel

#### 1. 准备 Vercel 配置文件

在项目根目录创建 `vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    }
  ]
}
```

#### 2. 部署到 Vercel

**方式 A：使用 Vercel CLI（推荐）**

```powershell
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署（第一次）
vercel

# 根据提示配置：
# - Set up and deploy? Y
# - Which scope? 选择你的账号
# - Link to existing project? N
# - Project name? 输入项目名，如 ai-red-dialogue-api
# - In which directory is your code located? ./
# - Want to override the settings? N

# 配置环境变量
vercel env add DEEPSEEK_API_KEY
# 粘贴你的 DeepSeek API Key

# 部署到生产环境
vercel --prod
```

**方式 B：使用 Vercel 网站**

1. 访问 [vercel.com](https://vercel.com/)，用 GitHub 账号登录
2. 点击 **New Project**
3. 导入你的 GitHub 仓库
4. 配置：
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: 留空
   - **Output Directory**: 留空
5. 添加环境变量：
   - Name: `DEEPSEEK_API_KEY`
   - Value: 你的 DeepSeek API Key
6. 点击 **Deploy**

#### 3. 获取后端 URL

部署完成后，Vercel 会提供一个 URL，例如：

```
https://ai-red-dialogue-api.vercel.app
```

你的 API 地址为：

```
https://ai-red-dialogue-api.vercel.app/api/chat
```

---

### 第二步：部署前端到 GitHub Pages

#### 1. 修改前端配置

编辑 `docx/index.html`，找到 `BACKEND_API` 配置（约第 1286 行）：

```javascript
const BACKEND_API =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "/api/chat" // 本地开发
    : "https://ai-red-dialogue-api.vercel.app/api/chat"; // 替换为你的 Vercel URL
```

将 `https://ai-red-dialogue-api.vercel.app/api/chat` 替换为你实际的后端 URL。

#### 2. 上传到 GitHub

```powershell
git add .
git commit -m "配置后端 API 地址"
git push origin main
```

#### 3. 启用 GitHub Pages

1. 进入 GitHub 仓库的 **Settings**
2. 左侧菜单找到 **Pages**
3. **Source** 选择 `main` 分支
4. **Folder** 选择 `/docx` 或 `/ (root)`（如果你把 index.html 放在根目录）
5. 点击 **Save**

等待 1-2 分钟，访问：

```
https://你的用户名.github.io/仓库名/
```

---

### 第三步：配置 CORS

#### 1. 更新 server.js 的 CORS 配置

编辑 `server.js`，找到 CORS 配置部分（约第 10 行）：

```javascript
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || process.env.NODE_ENV === "production"
        ? [
            "https://你的用户名.github.io", // 替换为你的 GitHub Pages 地址
            "http://localhost:5500",
            "http://127.0.0.1:5500",
          ]
        : "*",
    credentials: true,
  }),
);
```

将 `https://你的用户名.github.io` 替换为你的实际 GitHub Pages 地址。

#### 2. 重新部署后端

```powershell
# 使用 Vercel CLI
vercel --prod

# 或通过 Git 推送（如果配置了自动部署）
git push origin main
```

---

## 方案二：Railway + GitHub Pages

### 1. 部署后端到 Railway

1. 访问 [railway.app](https://railway.app/)，用 GitHub 登录
2. 点击 **New Project**
3. 选择 **Deploy from GitHub repo**
4. 选择你的仓库
5. 添加环境变量：
   - Name: `DEEPSEEK_API_KEY`
   - Value: 你的 API Key
6. Railway 会自动检测 Node.js 项目并部署
7. 在 **Settings** → **Networking** 中生成公开域名

### 2. 后续步骤

与 Vercel 方案相同，修改前端的 `BACKEND_API` 配置并部署到 GitHub Pages。

---

## 方案三：Render + GitHub Pages

### 1. 部署后端到 Render

1. 访问 [render.com](https://render.com/)，注册登录
2. 点击 **New +** → **Web Service**
3. 连接 GitHub 仓库
4. 配置：
   - **Name**: ai-red-dialogue-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. 添加环境变量：
   - Key: `DEEPSEEK_API_KEY`
   - Value: 你的 API Key
6. 点击 **Create Web Service**

### 2. 后续步骤

与 Vercel 方案相同。

---

## 本地开发测试

### 1. 启动后端

```powershell
# 安装依赖
npm install

# 创建 .env 文件
cp .env.example .env

# 编辑 .env，填入你的 API Key
# DEEPSEEK_API_KEY=sk-your-actual-key

# 启动服务器
npm start
```

后端运行在：`http://localhost:3000`

### 2. 测试前端

**方式 A：直接打开文件**

- 用浏览器打开 `docx/index.html`
- 前端会自动调用 `http://localhost:3000/api/chat`

**方式 B：使用 Live Server（推荐）**

- VS Code 安装 Live Server 插件
- 右键 `docx/index.html` → **Open with Live Server**
- 访问 `http://localhost:5500/docx/index.html`

---

## 环境变量说明

### 后端环境变量（.env 或云平台配置）

| 变量名              | 说明                       | 示例                          |
| ------------------- | -------------------------- | ----------------------------- |
| `DEEPSEEK_API_KEY`  | **必填** DeepSeek API 密钥 | `sk-xxxxxxxxxxxxx`            |
| `DEEPSEEK_BASE_URL` | 可选，API 基础 URL         | `https://api.deepseek.com/v1` |
| `DEEPSEEK_MODEL`    | 可选，使用的模型           | `deepseek-chat`               |
| `PORT`              | 可选，服务器端口           | `3000`                        |
| `FRONTEND_URL`      | 可选，前端地址（CORS）     | `https://xxx.github.io`       |

---

## 安全检查清单

✅ **必须做的：**

- [ ] `.env` 文件已添加到 `.gitignore`
- [ ] 从未将真实 API Key 提交到 Git
- [ ] 后端 CORS 配置限制了允许的来源
- [ ] API Key 保存在后端环境变量中

⚠️ **注意事项：**

- 定期检查 DeepSeek 账户的 API 使用量
- 建议设置 API Key 的使用限额
- 不要在代码中硬编码任何敏感信息

---

## 常见问题

### Q: 前端报错 "CORS policy" 或跨域错误？

A:

1. 检查后端 `server.js` 的 CORS 配置，确保包含了你的 GitHub Pages 地址
2. 重新部署后端服务
3. 清除浏览器缓存

### Q: 前端报错 "Failed to fetch"？

A:

1. 检查后端是否成功部署并运行
2. 在浏览器开发者工具中查看网络请求，确认后端 URL 是否正确
3. 手动访问后端 URL（例如 `https://xxx.vercel.app`），看是否能访问

### Q: 后端返回 401 或 "API Key 无效"？

A:

1. 检查后端环境变量 `DEEPSEEK_API_KEY` 是否正确配置
2. 确认 API Key 没有过期
3. 在 DeepSeek 平台检查 API Key 状态

### Q: GitHub Pages 更新后前端没变化？

A:

1. 清除浏览器缓存（Ctrl+Shift+R 强制刷新）
2. GitHub Pages 有时需要 1-2 分钟才能更新
3. 检查 GitHub Actions 是否构建成功

### Q: Vercel/Railway 部署失败？

A:

1. 检查 `package.json` 中的 `start` 脚本是否正确
2. 确保项目根目录包含 `server.js`
3. 查看部署日志，定位错误信息

### Q: 本地开发时前端和后端都在 localhost，需要 CORS 吗？

A: 如果前端通过 `file://` 协议打开（双击文件），仍需 CORS。建议使用 Live Server。

---

## 部署成功后

1. 访问你的 GitHub Pages 地址
2. 选择一位先烈
3. 开始对话
4. 生成并下载时空对话卡片

**恭喜！你的 AI 红色时光对话机已成功部署！** 🎉

---

## 进阶：自定义域名

### GitHub Pages 自定义域名

1. 在仓库根目录（或 `/docx`）创建 `CNAME` 文件
2. 内容填写你的域名：`yourdomain.com`
3. 在域名 DNS 配置：
   - 类型：`CNAME`
   - 名称：`@` 或 `www`
   - 值：`你的用户名.github.io`

### Vercel 自定义域名

1. 在 Vercel 项目的 **Settings** → **Domains**
2. 添加你的域名
3. 按提示配置 DNS

---

## 技术支持

遇到问题？

1. 查看本文档的"常见问题"部分
2. 检查浏览器控制台的错误信息
3. 在 GitHub 提 Issue

---

**仪光赤心实践队** · 让技术传承红色精神
