# 快速部署指南 - 5分钟上线

## 最简部署方案

如果你想快速上线，使用**你自己的 DeepSeek API Key**，按以下步骤操作：

---

## 第一步：部署后端（3分钟）

### 使用 Vercel（推荐）

1. **安装 Vercel CLI**

   ```powershell
   npm install -g vercel
   ```

2. **登录并部署**

   ```powershell
   vercel login
   vercel
   ```

3. **配置 API Key**

   ```powershell
   vercel env add DEEPSEEK_API_KEY
   # 输入你的 DeepSeek API Key（从 https://platform.deepseek.com/ 获取）
   ```

4. **部署到生产**

   ```powershell
   vercel --prod
   ```

5. **记下后端地址**
   例如：`https://ai-red-dialogue-api.vercel.app`

---

## 第二步：部署前端（2分钟）

### 1. 修改配置

编辑 `docx/index.html`，找到约第 1290 行：

```javascript
const BACKEND_API =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "/api/chat"
    : "https://你的后端地址.vercel.app/api/chat"; // 改这里
```

将 `https://你的后端地址.vercel.app/api/chat` 替换为你的实际后端地址。

### 2. 上传到 GitHub

```powershell
git add .
git commit -m "配置后端API地址"
git push origin main
```

### 3. 启用 GitHub Pages

1. 进入 GitHub 仓库的 **Settings** → **Pages**
2. Source 选择 `main` 分支
3. Folder 选择 `/docx`（或 `/ (root)`）
4. 保存

### 4. 访问网站

等待 1-2 分钟后访问：

```
https://你的用户名.github.io/仓库名/
```

---

## 第三步：配置 CORS（1分钟）

### 1. 修改 server.js

编辑 `server.js`，找到约第 13 行：

```javascript
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || process.env.NODE_ENV === "production"
        ? [
            "https://你的用户名.github.io", // 改这里
            "http://localhost:5500",
            "http://127.0.0.1:5500",
          ]
        : "*",
    credentials: true,
  }),
);
```

将 `https://你的用户名.github.io` 替换为你的 GitHub Pages 地址。

### 2. 重新部署后端

```powershell
git add .
git commit -m "配置CORS"
git push origin main

# 如果 Vercel 未自动部署，手动执行：
vercel --prod
```

---

## 完成！🎉

现在访问你的 GitHub Pages 地址，就可以使用了！

---

## 本地测试（可选）

如果想在本地测试：

```powershell
# 1. 创建 .env 文件
cp .env.example .env

# 2. 编辑 .env，填入你的 API Key
# DEEPSEEK_API_KEY=sk-your-key

# 3. 安装依赖并启动
npm install
npm start

# 4. 访问 http://localhost:3000
```

---

## 常见问题

**Q: 前端报跨域错误？**
A: 检查 server.js 的 CORS 配置，确保包含了你的 GitHub Pages 域名。

**Q: 后端地址在哪里看？**
A: Vercel 部署完成后会显示，通常是 `https://项目名.vercel.app`

**Q: DeepSeek API Key 在哪获取？**
A: 访问 https://platform.deepseek.com/ 注册并创建 API Key

---

需要更详细的说明？查看 [DEPLOYMENT-SPLIT.md](DEPLOYMENT-SPLIT.md)
