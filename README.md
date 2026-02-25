# GrammarQuest: 英语语法大闯关

这是一个专为小学生设计的英语语法互动练习应用。

## 部署到 Vercel 指南

由于本项目使用 Vite 构建，部署到 Vercel 非常简单：

### 1. 推送到 GitHub
1. 在 GitHub 上创建一个新的仓库。
2. 在本地项目目录运行：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <您的仓库URL>
   git push -u origin main
   ```

### 2. 在 Vercel 上部署
1. 登录 [Vercel 控制台](https://vercel.com)。
2. 点击 **"Add New"** -> **"Project"**。
3. 导入您刚刚创建的 GitHub 仓库。
4. **关键配置（环境变量）**：
   - 在部署设置的 **Environment Variables** 部分，添加 `GEMINI_API_KEY`。
   - 虽然本项目目前主要使用内置题库，但如果后续扩展 AI 功能，此 Key 是必需的。
5. 点击 **"Deploy"**。

### 3. 项目配置说明
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 技术栈
- React 19
- Tailwind CSS 4
- Motion (动画)
- Lucide React (图标)
