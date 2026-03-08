# GitHub Pages 部署指南

## 方式一：直接部署（推荐）

### 1. 准备工作

- 确保你有一个 GitHub 账号
- 注册并获取 DeepSeek API Key：https://platform.deepseek.com/

### 2. 部署步骤

#### 2.1 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库（例如：`ai-red-dialogue`）
2. 可以设置为公开（Public）或私有（Private）

#### 2.2 上传代码

1. 将 `docx` 文件夹中的所有文件上传到仓库根目录
   - 或者将 `docx/index.html` 重命名为 `index.html` 后上传

2. 确保仓库根目录包含 `index.html`

#### 2.3 启用 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单找到 **Pages**
3. 在 **Source** 下拉菜单中选择 **main** 分支
4. 选择根目录 **/ (root)** 作为发布目录
5. 点击 **Save** 保存

#### 2.4 访问你的网站

- 等待 1-2 分钟后，GitHub Pages 会自动构建
- 访问地址：`https://你的用户名.github.io/仓库名`
- 例如：`https://username.github.io/ai-red-dialogue`

### 3. 配置 API Key

1. 打开部署好的网站
2. 点击右上角的 **⚙️ 设置**
3. 输入你的 DeepSeek API Key
4. 点击 **保存设置**

**重要：** API Key 只保存在浏览器本地（localStorage），不会上传到任何服务器。

---

## 方式二：本地运行（开发测试）

如果你想在本地测试：

### 使用 Node.js 后端（原版本）

1. **安装依赖**

   ```powershell
   npm install
   ```

2. **创建 .env 文件**
   复制 `.env.example` 为 `.env`，并填入你的 API Key：

   ```
   DEEPSEEK_API_KEY=sk-your-actual-key-here
   ```

3. **启动服务器**

   ```powershell
   npm start
   ```

4. **访问**
   打开浏览器访问：`http://localhost:3000`

### 直接打开静态文件

1. 直接双击 `docx/index.html` 在浏览器中打开
2. 或使用 VS Code 的 Live Server 插件

---

## 安全说明

### ✅ 安全实践

- API Key 保存在浏览器的 localStorage 中，仅存储在用户本地
- 代码中不含任何硬编码的 API 密钥
- `.env` 文件已在 `.gitignore` 中配置，不会被提交到 Git

### ⚠️ 注意事项

- **不要**将包含真实 API Key 的 `.env` 文件提交到 Git
- **不要**在代码中硬编码任何敏感信息
- 每个用户使用自己的 API Key，自行承担调用费用
- 建议在 DeepSeek 后台设置 API Key 的使用限额，避免滥用

---

## 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容填写你的域名，例如：`yourdomain.com`
3. 在域名服务商处配置 DNS 记录：
   - 类型：`CNAME`
   - 主机记录：`@` 或 `www`
   - 记录值：`你的用户名.github.io`

---

## 常见问题

### Q: 为什么需要自己配置 API Key？

A: 为了保护开发者的 API 密钥不被滥用，也让每个用户独立控制自己的调用费用。

### Q: DeepSeek API 免费吗？

A: DeepSeek 提供一定的免费额度，超出后需要付费。具体请查看官网。

### Q: 能否使用其他 AI 模型？

A: 目前代码基于 DeepSeek API，如需使用其他模型（如 OpenAI、Claude 等），需要修改代码中的 API 调用部分。

### Q: API Key 会泄露吗？

A: 前端直接调用 API 时，API Key 会出现在浏览器的网络请求中。建议仅个人使用，不要公开分享网站给大量用户，否则可能造成 API Key 泄露。如需公开使用，建议采用后端代理方式。

---

## 进阶：部署到其他平台

如果你想使用 Node.js 后端版本，可以部署到：

### Vercel（推荐）

1. 注册 Vercel 账号并连接 GitHub
2. 导入你的仓库
3. 在环境变量中配置 `DEEPSEEK_API_KEY`
4. 自动部署

### Railway

1. 注册 Railway 账号
2. 从 GitHub 导入项目
3. 配置环境变量
4. 部署

### Render

类似操作，在平台上配置环境变量即可。

---

## 许可证

请根据你的实际情况添加开源许可证。

---

**祝你部署顺利！** 🎉

如有问题，欢迎提 Issue。
