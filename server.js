require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== 中间件 =====
// 配置 CORS，支持前后端分离部署
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || process.env.NODE_ENV === "production"
        ? [
            "https://asuka022533.github.io", // GitHub Pages 地址
            "http://localhost:5500", // VS Code Live Server
            "http://127.0.0.1:5500",
          ]
        : "*", // 开发环境允许所有来源
    credentials: true,
  }),
);
app.use(express.json());

// 静态文件：前端页面（仅在本地测试时使用）
app.use(express.static(path.join(__dirname, "docx")));

// ===== API 代理：对话接口 =====
app.post("/api/chat", async (req, res) => {
  const { systemPrompt, messages } = req.body;

  // 基础入参校验
  if (!systemPrompt || !Array.isArray(messages) || messages.length === 0) {
    return res
      .status(400)
      .json({ error: "参数缺失：需要 systemPrompt 和 messages" });
  }

  // 限制 messages 长度，防止滥用（保留最近 20 条）
  const trimmedMessages = messages.slice(-20);

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl =
    process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "服务器未配置 API Key，请联系管理员" });
  }

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...trimmedMessages,
          ],
          temperature: 0.85,
          max_tokens: 400,
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      if (response.status === 402) {
        return res
          .status(402)
          .json({ error: "API 账户余额不足，请充值后再使用" });
      }
      if (response.status === 401) {
        return res.status(401).json({ error: "API Key 无效或已过期" });
      }
      return res
        .status(response.status)
        .json({ error: `上游错误 ${response.status}` });
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "API 返回格式异常" });
    }

    res.json({ reply: data.choices[0].message.content.trim() });
  } catch (err) {
    console.error("调用 AI 接口出错:", err);
    res.status(500).json({ error: "服务器内部错误，请稍后重试" });
  }
});

// 其他路由回退到 index.html（单页应用支持）
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "docx", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ 服务已启动：http://localhost:${PORT}`);
  console.log(
    `   API Key 状态：${process.env.DEEPSEEK_API_KEY ? "已配置 ✔" : "未配置 ✗ (演示模式)"}`,
  );
});
