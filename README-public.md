# 🐦 鸟类认知学习游戏 - 公共网页版

一个免费的在线鸟类认知学习游戏，让所有人都能通过游戏轻松学习鸟类知识！

## ✨ 功能特色

- 🎮 **4种游戏模式**：学习、识别、记忆、挑战
- 🐦 **13种精美鸟类**：真实鸟类图片和详细资料
- 📱 **响应式设计**：手机、平板、电脑都能完美运行
- 🌐 **完全免费**：无需注册，打开即玩
- 🏆 **排行榜系统**：挑战高分，争夺排名
- 📊 **数据统计**：在线人数、游戏次数等统计
- 💬 **反馈系统**：收集用户建议，持续改进

## 🚀 快速开始

### 本地运行

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动服务器**
   ```bash
   npm start
   ```

3. **访问游戏**
   - 打开浏览器访问：http://localhost:3000
   - 或使用手机扫描二维码（同一网络下）

### 开发模式
```bash
npm run dev
```

## 🌍 部署到公网

### 选项1：Vercel（推荐）

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署**
   ```bash
   vercel
   ```

3. **配置域名**
   - 在Vercel控制台添加自定义域名
   - 配置SSL证书（自动）

### 选项2：Heroku

1. **创建Heroku应用**
   ```bash
   heroku create bird-learning-game
   ```

2. **部署**
   ```bash
   git push heroku main
   ```

3. **访问**
   ```bash
   heroku open
   ```

### 选项3：Netlify

1. **连接Git仓库**
   - 登录Netlify，选择Git仓库
   - 构建命令：`npm run build`
   - 发布目录：`.`

2. **自动部署**
   - 每次push到main分支自动部署

## 📁 项目结构

```
bird-quiz-web/
├── public-index.html          # 公共版主页
├── server.js                  # Express服务器
├── package.json              # 项目配置
├── README-public.md          # 本文件
├── js/
│   ├── game-logic-public.js  # 公共版游戏逻辑
│   └── public-features.js    # 公共功能
├── css/
│   └── bird-learning.css     # 样式文件
├── birds/                    # 鸟类图片目录
├── images/                   # 其他图片
└── fonts/                    # 字体文件
```

## 🔧 配置说明

### 环境变量

创建 `.env` 文件：
```env
PORT=3000
NODE_ENV=production
GAME_NAME=鸟类认知学习游戏
```

### API接口

- `GET /api/birds` - 获取鸟类数据
- `POST /api/score` - 提交游戏分数
- `GET /api/leaderboard` - 获取排行榜
- `POST /api/feedback` - 提交用户反馈
- `GET /health` - 健康检查
- `GET /stats` - 统计信息

## 📱 移动端优化

- ✅ 触摸屏支持
- ✅ 手势操作
- ✅ 离线缓存
- ✅ 添加到主屏幕
- ✅ 横竖屏适配

## 🔒 安全考虑

1. **输入验证**：所有用户输入都经过验证
2. **速率限制**：API调用频率限制
3. **CORS配置**：仅允许信任的域名
4. **HTTPS强制**：生产环境强制使用HTTPS
5. **数据清理**：定期清理旧数据

## 📊 数据分析

游戏内置以下统计：
- 在线玩家数量
- 游戏模式使用频率
- 平均游戏分数
- 用户反馈收集
- 设备类型统计

## 🎨 自定义主题

修改 `css/bird-learning.css` 文件：

```css
:root {
  --primary-color: #4CAF50;    /* 主色调 */
  --secondary-color: #2196F3;  /* 次要色调 */
  --accent-color: #FF9800;     /* 强调色 */
  --text-color: #333333;       /* 文字颜色 */
  --bg-color: #f5f5f5;         /* 背景色 */
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 所有鸟类图片提供者
- 游戏测试参与者
- 提供反馈的用户

## 📞 联系我们

- 邮箱：contact@bird-game.example.com
- 问题反馈：[GitHub Issues](https://github.com/yourusername/bird-learning-game/issues)
- 功能建议：游戏内反馈表单

---

**制作：🐱 小林 为 姐姐 精心打造**

希望这个游戏能帮助更多人了解和喜爱鸟类！ 🐦✨