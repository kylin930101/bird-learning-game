// 🐦 鸟类认知学习游戏 - 公共网页版服务器
// 作者：小林 🐱 为姐姐精心制作

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.static(__dirname));
app.use(express.json());

// 记录访问日志
app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url} - ${req.ip}`);
    next();
});

// 主页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public-index.html'));
});

// 游戏页面
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public-index.html'));
});

// 离线版本
app.get('/offline', (req, res) => {
    res.sendFile(path.join(__dirname, 'bird-game-offline.html'));
});

// API: 获取游戏数据
app.get('/api/birds', (req, res) => {
    try {
        const birdsData = require('./birds-data.json');
        res.json({
            success: true,
            count: birdsData.length,
            birds: birdsData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '无法加载鸟类数据'
        });
    }
});

// API: 提交分数
app.post('/api/score', (req, res) => {
    const { playerName, score, gameMode } = req.body;

    if (!playerName || !score) {
        return res.status(400).json({
            success: false,
            error: '缺少必要参数'
        });
    }

    // 记录分数（这里可以保存到数据库）
    const scoreData = {
        playerName,
        score: parseInt(score),
        gameMode: gameMode || 'unknown',
        timestamp: new Date().toISOString(),
        ip: req.ip
    };

    console.log('📊 新分数记录:', scoreData);

    // 保存到文件（实际应用中应该用数据库）
    const scoresFile = path.join(__dirname, 'scores.json');
    let scores = [];

    try {
        if (fs.existsSync(scoresFile)) {
            scores = JSON.parse(fs.readFileSync(scoresFile, 'utf8'));
        }
        scores.push(scoreData);

        // 只保留最近100条记录
        if (scores.length > 100) {
            scores = scores.slice(-100);
        }

        fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2));
    } catch (error) {
        console.error('保存分数失败:', error);
    }

    res.json({
        success: true,
        message: '分数已保存',
        rank: Math.floor(Math.random() * 50) + 1 // 模拟排名
    });
});

// API: 获取排行榜
app.get('/api/leaderboard', (req, res) => {
    const scoresFile = path.join(__dirname, 'scores.json');

    try {
        let scores = [];
        if (fs.existsSync(scoresFile)) {
            scores = JSON.parse(fs.readFileSync(scoresFile, 'utf8'));
        }

        // 按分数排序
        const sortedScores = scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // 只返回前10名

        res.json({
            success: true,
            leaderboard: sortedScores,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        res.json({
            success: true,
            leaderboard: [
                { playerName: '小明', score: 980, gameMode: 'challenge' },
                { playerName: '小红', score: 850, gameMode: 'identify' },
                { playerName: '小华', score: 720, gameMode: 'memory' }
            ],
            updatedAt: new Date().toISOString()
        });
    }
});

// API: 提交反馈
app.post('/api/feedback', (req, res) => {
    const { feedback, contact } = req.body;

    if (!feedback) {
        return res.status(400).json({
            success: false,
            error: '反馈内容不能为空'
        });
    }

    // 记录反馈（这里可以保存到数据库）
    const feedbackData = {
        feedback,
        contact: contact || '未提供',
        timestamp: new Date().toISOString(),
        ip: req.ip
    };

    console.log('📝 新反馈:', feedbackData);

    // 保存到文件
    const feedbackFile = path.join(__dirname, 'feedback.json');
    let feedbacks = [];

    try {
        if (fs.existsSync(feedbackFile)) {
            feedbacks = JSON.parse(fs.readFileSync(feedbackFile, 'utf8'));
        }
        feedbacks.push(feedbackData);
        fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2));
    } catch (error) {
        console.error('保存反馈失败:', error);
    }

    res.json({
        success: true,
        message: '感谢您的反馈！'
    });
});

// 健康检查
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'bird-learning-game',
        version: '1.0.0',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 统计信息
app.get('/stats', (req, res) => {
    // 模拟在线人数
    const onlineUsers = Math.floor(Math.random() * 50) + 10;

    res.json({
        onlineUsers,
        totalGames: Math.floor(Math.random() * 1000) + 100,
        averageScore: Math.floor(Math.random() * 500) + 200,
        popularMode: ['challenge', 'identify', 'memory'][Math.floor(Math.random() * 3)]
    });
});

// 404处理
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        success: false,
        error: '服务器内部错误',
        message: process.env.NODE_ENV === 'development' ? err.message : '请稍后重试'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`
    🚀 鸟类认知学习游戏服务器已启动！

    📍 本地访问: http://localhost:${PORT}
    📍 公共访问: 需要配置域名和端口转发

    📊 功能接口:
    - GET  /             游戏主页
    - GET  /game         游戏页面
    - GET  /offline      离线版本
    - GET  /api/birds    获取鸟类数据
    - POST /api/score    提交分数
    - GET  /api/leaderboard 获取排行榜
    - POST /api/feedback 提交反馈
    - GET  /health       健康检查
    - GET  /stats        统计信息

    🐱 制作：小林 为 姐姐 精心打造
    `);
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('收到关闭信号，正在优雅关闭服务器...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('收到中断信号，正在关闭服务器...');
    process.exit(0);
});