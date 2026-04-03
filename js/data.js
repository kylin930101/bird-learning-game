// 鸟类数据 - 使用姐姐提供的真实鸟类图片
const birdsData = [
    {
        id: 1,
        name: "鹊鸭",
        scientificName: "Bucephala clangula",
        image: "birds/鹊鸭.png",
        description: "鹊鸭是一种中型水鸟，以其黑白相间的羽毛和圆形的头部而闻名。雄性鹊鸭有醒目的黑白配色，雌性则呈灰褐色。它们擅长潜水捕食。",
        habitat: "淡水湖泊、河流、池塘",
        diet: "水生昆虫、小鱼、甲壳类",
        size: "40-50厘米",
        weight: "500-1300克",
        conservationStatus: "无危"
    },
    {
        id: 2,
        name: "斑头秋沙鸭",
        scientificName: "Mergus albellus",
        image: "birds/斑头秋沙鸭.png",
        description: "斑头秋沙鸭是一种小型水鸟，以其黑白相间的头部斑纹和细长的喙而闻名。它们擅长潜水捕鱼，通常成群活动。",
        habitat: "淡水湖泊、河流、河口",
        diet: "小鱼、水生昆虫",
        size: "38-44厘米",
        weight: "500-900克",
        conservationStatus: "无危"
    },
    {
        id: 3,
        name: "普通秋沙鸭",
        scientificName: "Mergus merganser",
        image: "birds/普通秋沙鸭.png",
        description: "普通秋沙鸭是大型水鸟，以其细长的红色喙和流线型身体而闻名。雄性有醒目的黑白配色，雌性则呈灰褐色。它们是优秀的潜水捕鱼者。",
        habitat: "淡水湖泊、河流、沿海水域",
        diet: "鱼类、甲壳类、水生昆虫",
        size: "58-72厘米",
        weight: "900-2100克",
        conservationStatus: "无危"
    },
    {
        id: 4,
        name: "红胸秋沙鸭",
        scientificName: "Mergus serrator",
        image: "birds/红胸秋沙鸭.png",
        description: "红胸秋沙鸭是一种中型水鸟，以其醒目的红色胸部和细长的锯齿状喙而闻名。它们擅长潜水捕鱼，通常在海湾和河口活动。",
        habitat: "沿海水域、海湾、河口",
        diet: "鱼类、甲壳类、软体动物",
        size: "52-58厘米",
        weight: "800-1300克",
        conservationStatus: "无危"
    },
    {
        id: 5,
        name: "环颈雉",
        scientificName: "Phasianus colchicus",
        image: "birds/环颈雉.png",
        description: "环颈雉是一种美丽的雉类，雄性有鲜艳的羽毛和白色的颈环，雌性则呈棕褐色保护色。它们是常见的狩猎鸟类，奔跑速度快。",
        habitat: "农田、草地、灌木丛",
        diet: "种子、谷物、昆虫、浆果",
        size: "70-90厘米",
        weight: "1-1.5公斤",
        conservationStatus: "无危"
    },
    {
        id: 6,
        name: "翠鸟",
        scientificName: "Alcedo atthis",
        image: "images/birds/placeholders/bird6.png",
        description: "翠鸟是色彩鲜艳的小型鸟类，以其捕鱼技巧而闻名。它们有鲜艳的蓝绿色羽毛和长而尖的喙。",
        habitat: "河流、湖泊、池塘附近",
        diet: "鱼类、水生昆虫",
        size: "16-17厘米",
        weight: "34-46克",
        conservationStatus: "无危"
    },
    {
        id: 7,
        name: "啄木鸟",
        scientificName: "Dendrocopos major",
        image: "images/birds/placeholders/bird7.png",
        description: "啄木鸟以其独特的啄木行为而闻名，它们在树干上凿洞寻找昆虫。它们的头骨有特殊的减震结构。",
        habitat: "森林、林地、公园",
        diet: "昆虫、树液、坚果",
        size: "23-26厘米",
        weight: "70-98克",
        conservationStatus: "无危"
    },
    {
        id: 8,
        name: "猫头鹰",
        scientificName: "Strix aluco",
        image: "images/birds/placeholders/bird8.png",
        description: "猫头鹰是夜行性猛禽，有出色的夜间视力和听力。它们的头部可以旋转270度，飞行时几乎没有声音。",
        habitat: "森林、林地、农田",
        diet: "小型哺乳动物、鸟类、昆虫",
        size: "37-43厘米",
        weight: "330-620克",
        conservationStatus: "无危"
    },
    {
        id: 9,
        name: "天鹅",
        scientificName: "Cygnus olor",
        image: "images/birds/placeholders/bird9.png",
        description: "天鹅是优雅的大型水鸟，以其优美的颈部和纯白的羽毛而闻名。它们是忠诚的伴侣，通常终身一夫一妻。",
        habitat: "湖泊、河流、池塘",
        diet: "水生植物、小型水生动物",
        size: "140-160厘米",
        weight: "8-15公斤",
        conservationStatus: "无危"
    },
    {
        id: 10,
        name: "孔雀",
        scientificName: "Pavo cristatus",
        image: "images/birds/placeholders/bird10.png",
        description: "孔雀以其华丽的尾羽而闻名，雄性孔雀会展开尾羽进行求偶展示。它们是印度的国鸟，象征着美丽和尊严。",
        habitat: "森林、农田、公园",
        diet: "种子、昆虫、小型爬行动物",
        size: "100-115厘米（不包括尾羽）",
        weight: "4-6公斤",
        conservationStatus: "无危"
    }
];

// 游戏配置
const gameConfig = {
    totalQuestions: 10,
    timePerQuestion: 60,
    optionsPerQuestion: 4,
    pointsPerCorrectAnswer: 10,
    pointsPerHintUsed: -2,
    maxHintsPerGame: 3,
    difficultyLevels: {
        easy: { time: 90, options: 3 },
        medium: { time: 60, options: 4 },
        hard: { time: 30, options: 5 }
    }
};

// 游戏状态
let gameState = {
    currentScreen: 'main-menu',
    currentQuestion: 0,
    score: 0,
    highScore: localStorage.getItem('birdQuizHighScore') || 0,
    timeLeft: gameConfig.timePerQuestion,
    timerInterval: null,
    selectedOption: null,
    usedHints: 0,
    correctAnswers: 0,
    currentBird: null,
    currentOptions: [],
    answeredQuestions: [],
    gameMode: 'medium',
    learnedBirds: JSON.parse(localStorage.getItem('learnedBirds')) || [],
    gameHistory: JSON.parse(localStorage.getItem('gameHistory')) || []
};

// 工具函数
const GameUtils = {
    // 获取随机鸟类（排除已使用的）
    getRandomBird: function(excludeIds = []) {
        const availableBirds = birdsData.filter(bird => !excludeIds.includes(bird.id));
        if (availableBirds.length === 0) {
            // 如果所有鸟类都用过了，重置排除列表
            return birdsData[Math.floor(Math.random() * birdsData.length)];
        }
        return availableBirds[Math.floor(Math.random() * availableBirds.length)];
    },

    // 获取随机选项（包括正确答案）
    getRandomOptions: function(correctBird, count = 4) {
        const options = [correctBird];
        const usedIds = [correctBird.id];

        while (options.length < count) {
            const randomBird = this.getRandomBird(usedIds);
            if (randomBird && !options.some(opt => opt.id === randomBird.id)) {
                options.push(randomBird);
                usedIds.push(randomBird.id);
            }
        }

        // 随机打乱选项顺序
        return this.shuffleArray(options);
    },

    // 打乱数组
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // 格式化时间（秒转分:秒）
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    // 计算正确率
    calculateAccuracy: function(correct, total) {
        if (total === 0) return 0;
        return Math.round((correct / total) * 100);
    },

    // 保存游戏状态到本地存储
    saveGameState: function() {
        localStorage.setItem('birdQuizHighScore', gameState.highScore);
        localStorage.setItem('learnedBirds', JSON.stringify(gameState.learnedBirds));
        localStorage.setItem('gameHistory', JSON.stringify(gameState.gameHistory));
    },

    // 添加学习记录
    addLearnedBird: function(birdId) {
        if (!gameState.learnedBirds.includes(birdId)) {
            gameState.learnedBirds.push(birdId);
            this.saveGameState();
        }
    },

    // 添加游戏记录
    addGameHistory: function(score, correct, total) {
        const gameRecord = {
            date: new Date().toISOString(),
            score: score,
            correct: correct,
            total: total,
            accuracy: this.calculateAccuracy(correct, total),
            mode: gameState.gameMode
        };

        gameState.gameHistory.unshift(gameRecord);
        // 只保留最近50条记录
        if (gameState.gameHistory.length > 50) {
            gameState.gameHistory = gameState.gameHistory.slice(0, 50);
        }

        this.saveGameState();
    },

    // 获取统计数据
    getStatistics: function() {
        const totalGames = gameState.gameHistory.length;
        const totalScore = gameState.gameHistory.reduce((sum, game) => sum + game.score, 0);
        const totalCorrect = gameState.gameHistory.reduce((sum, game) => sum + game.correct, 0);
        const totalQuestions = gameState.gameHistory.reduce((sum, game) => sum + game.total, 0);

        return {
            totalGames,
            averageScore: totalGames > 0 ? Math.round(totalScore / totalGames) : 0,
            totalCorrect,
            totalQuestions,
            overallAccuracy: this.calculateAccuracy(totalCorrect, totalQuestions),
            learnedBirds: gameState.learnedBirds.length,
            totalBirds: birdsData.length
        };
    },

    // 播放声音
    playSound: function(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('声音播放失败:', e));
        }
    },

    // 显示通知
    showNotification: function(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // 添加到页面
        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => notification.classList.add('show'), 10);

        // 自动移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// 初始化游戏
function initGame() {
    // 更新统计数据
    updateStats();

    // 设置事件监听器
    setupEventListeners();

    // 隐藏加载屏幕
    setTimeout(() => {
        document.getElementById('loading').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 500);
    }, 1000);
}

// 更新统计数据
function updateStats() {
    const stats = GameUtils.getStatistics();

    document.getElementById('high-score').textContent = gameState.highScore;
    document.getElementById('birds-learned').textContent = `${stats.learnedBirds}/${stats.totalBirds}`;
    document.getElementById('accuracy-rate').textContent = `${stats.overallAccuracy}%`;
}

// 设置事件监听器
function setupEventListeners() {
    // 主菜单按钮
    document.getElementById('start-game').addEventListener('click', startNewGame);
    document.getElementById('learn-mode').addEventListener('click', () => switchScreen('learn-screen'));
    document.getElementById('bird-encyclopedia').addEventListener('click', () => switchScreen('encyclopedia-screen'));
    document.getElementById('settings').addEventListener('click', () => switchScreen('settings-screen'));

    // 游戏界面按钮
    document.getElementById('back-to-menu').addEventListener('click', () => switchScreen('main-menu'));
    document.getElementById('hint-btn').addEventListener('click', showHint);
    document.getElementById('skip-btn').addEventListener('click', skipQuestion);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('zoom-image').addEventListener('click', zoomImage);

    // 选项按钮
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectOption(parseInt(this.dataset.index));
        });
    });

    // 模态框
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('bird-image').addEventListener('click', zoomImage);

    // 窗口点击关闭模态框
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('image-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // 键盘快捷键
    document.addEventListener('keydown', function(event) {
        if (gameState.currentScreen === 'game-screen') {
            // 数字键1-4选择选项
            if (event.key >= '1' && event.key <= '4') {
                const index = parseInt(event.key) - 1;
                selectOption(index);
            }
            // 空格键跳过
            else if (event.key === ' ') {
                event.preventDefault();
                skipQuestion();
            }
            // H键提示
            else if (event.key.toLowerCase() === 'h') {
                showHint();
            }
            // ESC键返回菜单
            else if (event.key === 'Escape') {
                switchScreen('main-menu');
            }
        }
    });
}

// 导出到全局作用域
window.birdsData = birdsData;
window.gameConfig = gameConfig;
window.gameState = gameState;
window.GameUtils = GameUtils;
window.initGame = initGame;