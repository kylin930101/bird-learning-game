// 🐦 鸟类认知学习游戏 - 游戏逻辑
// 作者：小林 🐱 为姐姐精心制作

// 鸟类数据
const birds = [
    {
        id: 1,
        name: "凤头潜鸭",
        image: "birds/凤头潜鸭.png",
        scientific: "Aythya fuligula",
        features: "头部有明显的黑色凤冠，雄鸟头颈黑色，雌鸟头颈棕褐色。常见于湖泊、水库等水域。",
        habitat: "淡水湖泊、水库、河流"
    },
    {
        id: 2,
        name: "凤头麦鸡",
        image: "birds/凤头麦鸡.png",
        scientific: "Vanellus vanellus",
        features: "头顶有黑色长羽冠，翅膀宽圆，飞行时黑白分明。喜欢在农田、草地活动。",
        habitat: "农田、草地、湿地"
    },
    {
        id: 3,
        name: "反嘴鹬",
        image: "birds/反嘴鹬.png",
        scientific: "Recurvirostra avosetta",
        features: "嘴细长而上翘，黑白相间的羽毛非常醒目。常在浅水区觅食。",
        habitat: "沿海滩涂、盐田、浅水湖泊"
    },
    {
        id: 4,
        name: "斑头秋沙鸭",
        image: "birds/斑头秋沙鸭.png",
        scientific: "Mergus squamatus",
        features: "头部有黑色斑纹，嘴细长带钩。善于潜水捕鱼，是优秀的潜水员。",
        habitat: "山区溪流、森林河流"
    },
    {
        id: 5,
        name: "普通秋沙鸭",
        image: "birds/普通秋沙鸭.png",
        scientific: "Mergus merganser",
        features: "嘴细长带锯齿，雄鸟头颈墨绿色，雌鸟头颈棕红色。捕鱼高手。",
        habitat: "湖泊、河流、水库"
    },
    {
        id: 6,
        name: "环颈雉",
        image: "birds/环颈雉.png",
        scientific: "Phasianus colchicus",
        features: "雄鸟颈部有白色环纹，羽毛色彩艳丽。雌鸟颜色较暗淡，善于隐蔽。",
        habitat: "农田、灌丛、林缘"
    },
    {
        id: 7,
        name: "短嘴豆雁",
        image: "birds/短嘴豆雁.png",
        scientific: "Anser serrirostris",
        features: "嘴短而粗，额头较平。飞行时呈V字形队列，叫声洪亮。",
        habitat: "草原、农田、湿地"
    },
    {
        id: 8,
        name: "红嘴鸥",
        image: "birds/红嘴鸥.png",
        scientific: "Chroicocephalus ridibundus",
        features: "冬季头部白色，夏季头部深褐色，红嘴红脚。常在城市水域出现。",
        habitat: "湖泊、河流、海岸、城市公园"
    },
    {
        id: 9,
        name: "红头潜鸭",
        image: "birds/红头潜鸭.png",
        scientific: "Aythya ferina",
        features: "雄鸟头颈栗红色，雌鸟头颈棕褐色。善于潜水，以水生植物为食。",
        habitat: "湖泊、水库、沼泽"
    },
    {
        id: 10,
        name: "红胸秋沙鸭",
        image: "birds/红胸秋沙鸭.png",
        scientific: "Mergus serrator",
        features: "雄鸟胸部棕红色，头颈墨绿色。嘴细长带钩，善于捕鱼。",
        habitat: "沿海水域、大型湖泊"
    },
    {
        id: 11,
        name: "豆雁",
        image: "birds/豆雁.png",
        scientific: "Anser fabalis",
        features: "嘴黑色带橘黄色斑，体型较大。迁徙时成群结队，场面壮观。",
        habitat: "农田、草地、湿地"
    },
    {
        id: 12,
        name: "赤嘴潜鸭",
        image: "birds/赤嘴潜鸭.png",
        scientific: "Netta rufina",
        features: "雄鸟嘴红色，头颈棕红色。雌鸟嘴灰黑色，头颈灰褐色。",
        habitat: "湖泊、水库、沼泽"
    },
    {
        id: 13,
        name: "鹊鸭",
        image: "birds/鹊鸭.png",
        scientific: "Bucephala clangula",
        features: "雄鸟头部黑绿色有金属光泽，脸颊有白色圆斑。飞行时翅膀响声清脆。",
        habitat: "森林湖泊、河流"
    }
];

// 游戏状态
let gameState = {
    currentMode: null,
    score: 0,
    currentQuestion: 0,
    totalQuestions: 10,
    timeLeft: 60,
    timer: null,
    flippedCards: [],
    matchedPairs: 0,
    currentBirdIndex: 0,
    answeredQuestions: []
};

// DOM元素
const gameArea = document.getElementById('gameArea');

// 初始化游戏
function initGame() {
    gameState = {
        currentMode: null,
        score: 0,
        currentQuestion: 0,
        totalQuestions: 10,
        timeLeft: 60,
        timer: null,
        flippedCards: [],
        matchedPairs: 0,
        currentBirdIndex: 0,
        answeredQuestions: []
    };
}

// 开始游戏
function startGame(mode) {
    initGame();
    gameState.currentMode = mode;
    gameArea.style.display = 'block';

    switch(mode) {
        case 'learn':
            showLearningMode();
            break;
        case 'identify':
            showIdentifyMode();
            break;
        case 'memory':
            showMemoryMode();
            break;
        case 'challenge':
            showChallengeMode();
            break;
    }

    // 滚动到游戏区域
    gameArea.scrollIntoView({ behavior: 'smooth' });
}

// 返回主菜单
function backToMenu() {
    gameArea.style.display = 'none';
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
}

// 重新开始游戏
function restartGame() {
    if (gameState.currentMode) {
        startGame(gameState.currentMode);
    }
}

// ========== 学习模式 ==========
function showLearningMode() {
    const html = `
        <div class="game-header">
            <h2 class="game-title"><i class="fas fa-book-open"></i> 学习模式 - 认识13种鸟类</h2>
            <div class="game-stats">
                <div class="stat"><i class="fas fa-dove"></i> ${birds.length} 种鸟类</div>
                <div class="stat"><i class="fas fa-graduation-cap"></i> 学习进度</div>
            </div>
        </div>
        <div class="bird-gallery" id="birdGallery">
            ${birds.map(bird => `
                <div class="bird-card">
                    <img src="${bird.image}" alt="${bird.name}" class="bird-image" onerror="this.src='images/placeholder.png'">
                    <div class="bird-info">
                        <h3 class="bird-name">${bird.name}</h3>
                        <p class="bird-scientific">${bird.scientific}</p>
                        <p class="bird-features">${bird.features}</p>
                        <p><strong>栖息地：</strong>${bird.habitat}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="controls">
            <button class="btn btn-success" onclick="startGame('identify')">
                <i class="fas fa-arrow-right"></i> 开始识别测试
            </button>
        </div>
    `;
    gameArea.innerHTML = html;
}

// ========== 识别模式 ==========
function showIdentifyMode() {
    // 随机选择一只鸟
    const randomBird = getRandomBird();
    gameState.currentBirdIndex = birds.findIndex(b => b.id === randomBird.id);

    // 生成3个错误选项
    const wrongOptions = getRandomBirds(3, [randomBird.id]);
    const options = [randomBird, ...wrongOptions];
    shuffleArray(options);

    const html = `
        <div class="game-header">
            <h2 class="game-title"><i class="fas fa-question-circle"></i> 识别模式 - 这是什么鸟？</h2>
            <div class="game-stats">
                <div class="stat"><i class="fas fa-star"></i> 得分: ${gameState.score}</div>
                <div class="stat"><i class="fas fa-question"></i> 第 ${gameState.currentQuestion + 1} / ${gameState.totalQuestions} 题</div>
            </div>
        </div>
        <div class="quiz-area">
            <img src="${randomBird.image}" alt="猜猜这是什么鸟" class="quiz-image" onerror="this.src='images/placeholder.png'">
            <div class="options-grid">
                ${options.map(option => `
                    <button class="option-btn" onclick="checkAnswer(${option.id})">
                        ${option.name}
                    </button>
                `).join('')}
            </div>
            <div class="controls">
                <button class="btn btn-secondary" onclick="skipQuestion()">
                    <i class="fas fa-forward"></i> 跳过此题
                </button>
            </div>
        </div>
    `;
    gameArea.innerHTML = html;
}

function checkAnswer(selectedId) {
    const correctBird = birds[gameState.currentBirdIndex];
    const buttons = document.querySelectorAll('.option-btn');

    // 禁用所有按钮
    buttons.forEach(btn => btn.disabled = true);

    // 标记正确和错误答案
    buttons.forEach(btn => {
        const birdName = btn.textContent.trim();
        const bird = birds.find(b => b.name === birdName);

        if (bird.id === correctBird.id) {
            btn.classList.add('correct');
        } else if (bird.id === selectedId) {
            btn.classList.add('wrong');
        }
    });

    // 计分
    if (selectedId === correctBird.id) {
        gameState.score += 10;
        showMessage('🎉 答对了！ +10分', 'success');
    } else {
        showMessage(`❌ 答错了，正确答案是：${correctBird.name}`, 'error');
    }

    gameState.currentQuestion++;
    gameState.answeredQuestions.push({
        question: correctBird.name,
        userAnswer: birds.find(b => b.id === selectedId).name,
        correct: selectedId === correctBird.id
    });

    // 下一题或结束
    setTimeout(() => {
        if (gameState.currentQuestion < gameState.totalQuestions) {
            showIdentifyMode();
        } else {
            showGameResult();
        }
    }, 2000);
}

function skipQuestion() {
    gameState.currentQuestion++;
    if (gameState.currentQuestion < gameState.totalQuestions) {
        showIdentifyMode();
    } else {
        showGameResult();
    }
}

// ========== 记忆模式 ==========
function showMemoryMode() {
    // 选择6对鸟（12张牌）
    const selectedBirds = getRandomBirds(6);
    const memoryCards = [...selectedBirds, ...selectedBirds];
    shuffleArray(memoryCards);

    const html = `
        <div class="game-header">
            <h2 class="game-title"><i class="fas fa-brain"></i> 记忆模式 - 翻牌配对</h2>
            <div class="game-stats">
                <div class="stat"><i class="fas fa-star"></i> 得分: ${gameState.score}</div>
                <div class="stat"><i class="fas fa-puzzle-piece"></i> 配对: ${gameState.matchedPairs} / 6</div>
                <div class="stat"><i class="fas fa-clock"></i> 时间: ${gameState.timeLeft}s</div>
            </div>
        </div>
        <div class="memory-grid" id="memoryGrid">
            ${memoryCards.map((bird, index) => `
                <div class="memory-card" data-index="${index}" data-bird-id="${bird.id}" onclick="flipCard(this)">
                    <div class="front">
                        <i class="fas fa-question"></i>
                    </div>
                    <div class="back">
                        <img src="${bird.image}" alt="${bird.name}" onerror="this.src='images/placeholder.png'">
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="controls">
            <button class="btn btn-primary" onclick="startMemoryTimer()">
                <i class="fas fa-play"></i> 开始计时
            </button>
        </div>
    `;
    gameArea.innerHTML = html;
}

function startMemoryTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    gameState.timeLeft = 60;
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.querySelector('.stat:nth-child(3)').innerHTML = `<i class="fas fa-clock"></i> 时间: ${gameState.timeLeft}s`;

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            showMessage('⏰ 时间到！游戏结束', 'error');
            setTimeout(showGameResult, 2000);
        }
    }, 1000);
}

function flipCard(card) {
    if (gameState.flippedCards.length >= 2 || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add('flipped');
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [card1, card2] = gameState.flippedCards;
    const birdId1 = card1.dataset.birdId;
    const birdId2 = card2.dataset.birdId;

    if (birdId1 === birdId2) {
        // 配对成功
        gameState.matchedPairs++;
        gameState.score += 20;
        document.querySelector('.stat:nth-child(1)').innerHTML = `<i class="fas fa-star"></i> 得分: ${gameState.score}`;
        document.querySelector('.stat:nth-child(2)').innerHTML = `<i class="fas fa-puzzle-piece"></i> 配对: ${gameState.matchedPairs} / 6`;

        gameState.flippedCards = [];

        if (gameState.matchedPairs === 6) {
            clearInterval(gameState.timer);
            showMessage('🎉 恭喜！全部配对成功！', 'success');
            setTimeout(showGameResult, 2000);
        }
    } else {
        // 配对失败
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            gameState.flippedCards = [];
        }, 1000);
    }
}

// ========== 挑战模式 ==========
function showChallengeMode() {
    const html = `
        <div class="game-header">
            <h2 class="game-title"><i class="fas fa-trophy"></i> 挑战模式 - 限时答题</h2>
            <div class="game-stats">
                <div class="stat"><i class="fas fa-star"></i> 得分: ${gameState.score}</div>
                <div class="stat"><i class="fas fa-question"></i> 题目: 0 / ∞</div>
                <div class="stat"><i class="fas fa-bolt"></i> 连击: 0</div>
            </div>
        </div>
        <div class="quiz-area">
            <div class="challenge-timer" id="challengeTimer">60</div>
            <div class="challenge-progress">
                <div class="progress-bar" id="progressBar"></div>
            </div>
            <div id="challengeQuestion">
                <!-- 题目由JavaScript动态生成 -->
            </div>
            <div class="controls">
                <button class="btn btn-success" onclick="startChallenge()">
                    <i class="fas fa-play"></i> 开始挑战
                </button>
            </div>
        </div>
    `;
    gameArea.innerHTML = html;
}

function startChallenge() {
    gameState.timeLeft = 60;
    gameState.score = 0;
    gameState.currentQuestion = 0;

    // 更新显示
    document.querySelector('.stat:nth-child(1)').innerHTML = `<i class="fas fa-star"></i> 得分: 0`;
    document.querySelector('.stat:nth-child(2)').innerHTML = `<i class="fas fa-question"></i> 题目: 0`;

    // 开始计时器
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    gameState.timer = setInterval(updateChallengeTimer, 1000);

    // 显示第一题
    showChallengeQuestion();
}

function updateChallengeTimer() {
    gameState.timeLeft--;
    const timerElement = document.getElementById('challengeTimer');
    const progressBar = document.getElementById('progressBar');

    if (timerElement) {
        timerElement.textContent = gameState.timeLeft;

        // 更新进度条
        const progress = ((60 - gameState.timeLeft) / 60) * 100;
        progressBar.style.width = `${progress}%`;

        // 颜色变化
        if (gameState.timeLeft <= 10) {
            timerElement.style.color = '#f44336';
            progressBar.style.background = 'linear-gradient(90deg, #f44336, #e53935)';
        } else if (gameState.timeLeft <= 30) {
            timerElement.style.color = '#ff9800';
            progressBar.style.background = 'linear-gradient(90deg, #ff9800, #fb8c00)';
        }
    }

    if (gameState.timeLeft <= 0) {
        clearInterval(gameState.timer);
        showGameResult();
    }
}

function showChallengeQuestion() {
    const randomBird = getRandomBird();
    gameState.currentBirdIndex = birds.findIndex(b => b.id === randomBird.id);

    // 生成3个错误选项
    const wrongOptions = getRandomBirds(3, [randomBird.id]);
    const options = [randomBird, ...wrongOptions];
    shuffleArray(options);

    const html = `
        <img src="${randomBird.image}" alt="猜猜这是什么鸟" class="quiz-image" onerror="this.src='images/placeholder.png'">
        <div class="options-grid">
            ${options.map(option => `
                <button class="option-btn" onclick="checkChallengeAnswer(${option.id})">
                    ${option.name}
                </button>
            `).join('')}
        </div>
    `;

    document.getElementById('challengeQuestion').innerHTML = html;
}

function checkChallengeAnswer(selectedId) {
    const correctBird = birds[gameState.currentBirdIndex];
    const buttons = document.querySelectorAll('.option-btn');

    // 禁用所有按钮
    buttons.forEach(btn => btn.disabled = true);

    // 标记正确和错误答案
    buttons.forEach(btn => {
        const birdName = btn.textContent.trim();
        const bird = birds.find(b => b.name === birdName);

        if (bird.id === correctBird.id) {
            btn.classList.add('correct');
        } else if (bird.id === selectedId) {
            btn.classList.add('wrong');
        }
    });

    // 计分
    if (selectedId === correctBird.id) {
        gameState.score += 15;
        showMessage('🎯 正确！ +15分', 'success');
    } else {
        showMessage(`💥 错误！正确答案：${correctBird.name}`, 'error');
    }

    gameState.currentQuestion++;
    document.querySelector('.stat:nth-child(1)').innerHTML = `<i class="fas fa-star"></i> 得分: ${gameState.score}`;
    document.querySelector('.stat:nth-child(2)').innerHTML = `<i class="fas fa-question"></i> 题目: ${gameState.currentQuestion}`;

    // 下一题
    setTimeout(() => {
        showChallengeQuestion();
    }, 1500);
}

// ========== 游戏结果 ==========
function showGameResult() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    let resultMessage = '';
    let resultIcon = '🏆';

    if (gameState.currentMode === 'identify') {
        const correctCount = gameState.answeredQuestions.filter(q => q.correct).length;
        const accuracy = Math.round((correctCount / gameState.totalQuestions) * 100);

        resultMessage = `
            <h3>识别测试完成！</h3>
            <p>得分：${gameState.score} 分</p>
            <p>正确率：${accuracy}% (${correctCount}/${gameState.totalQuestions})</p>

            <div style="margin-top: 20px; text-align: left; max-width: 600px; margin: 20px auto;">
                <h4>答题详情：</h4>
                ${gameState.answeredQuestions.map((q, i) => `
                    <div style="padding: 10px; margin: 5px 0; background: ${q.correct ? '#e8f5e9' : '#ffebee'}; border-radius: 8px;">
                        <strong>第${i+1}题：</strong> ${q.question}<br>
                        你的答案：<span style="color: ${q.correct ? '#2e7d32' : '#c62828'}">${q.userAnswer}</span>
                        ${q.correct ? '✅' : '❌'}
                    </div>
                `).join('')}
            </div>
        `;
    } else if (gameState.currentMode === 'memory') {
        resultMessage = `
            <h3>记忆游戏完成！</h3>
            <p>得分：${gameState.score} 分</p>
            <p>完成配对：${gameState.matchedPairs} / 6</p>
            <p>剩余时间：${gameState.timeLeft} 秒</p>
        `;
    } else if (gameState.currentMode === 'challenge') {
        resultMessage = `
            <h3>挑战模式结束！</h3>
            <p>最终得分：${gameState.score} 分</p>
            <p>答题数量：${gameState.currentQuestion} 题</p>
            <p>平均每题得分：${gameState.currentQuestion > 0 ? Math.round(gameState.score / gameState.currentQuestion) : 0} 分</p>
        `;
    }

    const html = `
        <div class="game-header">
            <h2 class="game-title">${resultIcon} 游戏结果</h2>
        </div>
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 1.5rem; margin-bottom: 30px;">
                ${resultMessage}
            </div>
            <div class="controls">
                <button class="btn btn-primary" onclick="restartGame()">
                    <i class="fas fa-redo"></i> 再玩一次
                </button>
                <button class="btn btn-secondary" onclick="backToMenu()">
                    <i class="fas fa-home"></i> 返回主菜单
                </button>
            </div>
        </div>
    `;

    gameArea.innerHTML = html;
}

// ========== 工具函数 ==========
function getRandomBird() {
    const randomIndex = Math.floor(Math.random() * birds.length);
    return birds[randomIndex];
}

function getRandomBirds(count, excludeIds = []) {
    const availableBirds = birds.filter(bird => !excludeIds.includes(bird.id));
    const shuffled = [...availableBirds].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showMessage(message, type = 'info') {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;

    document.body.appendChild(messageDiv);

    // 3秒后移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 图片加载失败处理
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder.png';
    }
}, true);

console.log('🐦 鸟类学习游戏已加载！祝姐姐玩得开心！🐱✨');