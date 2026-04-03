// 🐦 鸟类认知学习游戏 - 公共网页版游戏逻辑
// 作者：小林 🐱 为姐姐精心制作 - 公共版本

// 鸟类数据 - 使用Base64编码的图片
const birds = [
    {
        id: 1,
        name: "凤头潜鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", // 示例Base64，实际需要替换
        scientific: "Aythya fuligula",
        features: "头部有明显的黑色凤冠，雄鸟头颈黑色，雌鸟头颈棕褐色。常见于湖泊、水库等水域。",
        habitat: "淡水湖泊、水库、河流"
    },
    {
        id: 2,
        name: "凤头麦鸡",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Vanellus vanellus",
        features: "头顶有黑色长羽冠，翅膀宽圆，飞行时黑白分明。喜欢在农田、草地活动。",
        habitat: "农田、草地、湿地"
    },
    {
        id: 3,
        name: "反嘴鹬",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Recurvirostra avosetta",
        features: "嘴细长而上翘，黑白相间的羽毛非常醒目。常在浅水区觅食。",
        habitat: "沿海滩涂、盐田、浅水湖泊"
    },
    {
        id: 4,
        name: "斑头秋沙鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Mergus squamatus",
        features: "头部有黑色斑纹，嘴细长带钩。善于潜水捕鱼，是优秀的潜水员。",
        habitat: "山区溪流、森林河流"
    },
    {
        id: 5,
        name: "普通秋沙鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Mergus merganser",
        features: "嘴细长带锯齿，雄鸟头颈墨绿色，雌鸟头颈棕红色。捕鱼高手。",
        habitat: "湖泊、河流、水库"
    },
    {
        id: 6,
        name: "环颈雉",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Phasianus colchicus",
        features: "雄鸟颈部有白色环纹，羽毛华丽多彩。雌鸟羽毛较朴素，呈棕褐色。",
        habitat: "农田、林地、灌丛"
    },
    {
        id: 7,
        name: "短嘴豆雁",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Anser fabalis",
        features: "嘴较短而厚实，体形较大。迁徙时呈V字形飞行，叫声洪亮。",
        habitat: "湿地、农田、草原"
    },
    {
        id: 8,
        name: "红嘴鸥",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Chroicocephalus ridibundus",
        features: "嘴和脚呈鲜红色，冬季头部白色，夏季头部变为深褐色。",
        habitat: "沿海、湖泊、河流"
    },
    {
        id: 9,
        name: "红头潜鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Aythya ferina",
        features: "雄鸟头部栗红色，雌鸟头部棕褐色。善于潜水，常成群活动。",
        habitat: "湖泊、水库、沼泽"
    },
    {
        id: 10,
        name: "红胸秋沙鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Mergus serrator",
        features: "雄鸟胸部有红色斑块，冠羽较长。雌鸟头部棕红色，冠羽较短。",
        habitat: "沿海、河口、湖泊"
    },
    {
        id: 11,
        name: "豆雁",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Anser fabalis",
        features: "嘴黑色，前端有黄色斑块。体形较大，飞行时叫声低沉。",
        habitat: "湿地、农田、草地"
    },
    {
        id: 12,
        name: "赤嘴潜鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Netta rufina",
        features: "雄鸟嘴红色，头部棕红色。雌鸟嘴黑色，头部灰褐色。",
        habitat: "湖泊、水库、沼泽"
    },
    {
        id: 13,
        name: "鹊鸭",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        scientific: "Bucephala clangula",
        features: "雄鸟头部黑色，有白色斑点。雌鸟头部棕褐色，体型较小。",
        habitat: "森林湖泊、河流"
    }
];

// 游戏状态
let currentGameMode = null;
let currentScore = 0;
let gameActive = false;
let currentBirdIndex = 0;
let timer = null;
let timeLeft = 60;

// DOM元素
const gameArea = document.getElementById('gameArea');

// 初始化游戏
function initGame() {
    console.log('🐦 鸟类认知学习游戏 - 公共版已加载');
    updateOnlineCount();
}

// 更新在线人数（模拟）
function updateOnlineCount() {
    const onlineCount = document.getElementById('onlineCount');
    // 模拟在线人数变化
    const baseCount = Math.floor(Math.random() * 50) + 10;
    onlineCount.textContent = baseCount;

    // 每30秒更新一次
    setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newCount = Math.max(1, parseInt(onlineCount.textContent) + change);
        onlineCount.textContent = newCount;
    }, 30000);
}

// 开始游戏
function startGame(mode) {
    currentGameMode = mode;
    currentScore = 0;
    gameActive = true;

    // 清空游戏区域
    gameArea.innerHTML = '';

    switch(mode) {
        case 'learn':
            startLearnMode();
            break;
        case 'identify':
            startIdentifyMode();
            break;
        case 'memory':
            startMemoryMode();
            break;
        case 'challenge':
            startChallengeMode();
            break;
    }

    // 显示返回按钮
    document.querySelector('.controls').style.display = 'flex';
}

// 学习模式
function startLearnMode() {
    gameArea.innerHTML = `
        <div class="learn-container">
            <h2><i class="fas fa-book-open"></i> 学习模式</h2>
            <p class="learn-description">浏览所有鸟类，点击图片查看详细信息</p>
            <div class="bird-grid">
                ${birds.map(bird => `
                    <div class="bird-card" onclick="showBirdDetail(${bird.id})">
                        <div class="bird-image">
                            <img src="${bird.image}" alt="${bird.name}" onerror="this.src='images/placeholder-bird.png'">
                        </div>
                        <div class="bird-info">
                            <h3>${bird.name}</h3>
                            <p><i>${bird.scientific}</i></p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 显示鸟类详情
function showBirdDetail(birdId) {
    const bird = birds.find(b => b.id === birdId);
    if (!bird) return;

    gameArea.innerHTML = `
        <div class="bird-detail">
            <button class="back-btn" onclick="startGame('learn')">
                <i class="fas fa-arrow-left"></i> 返回
            </button>
            <div class="detail-content">
                <div class="detail-image">
                    <img src="${bird.image}" alt="${bird.name}" onerror="this.src='images/placeholder-bird.png'">
                </div>
                <div class="detail-info">
                    <h2>${bird.name}</h2>
                    <p class="scientific"><i>${bird.scientific}</i></p>
                    <div class="info-section">
                        <h3><i class="fas fa-feather"></i> 特征</h3>
                        <p>${bird.features}</p>
                    </div>
                    <div class="info-section">
                        <h3><i class="fas fa-tree"></i> 栖息地</h3>
                        <p>${bird.habitat}</p>
                    </div>
                    <div class="fun-fact">
                        <h3><i class="fas fa-lightbulb"></i> 趣味知识</h3>
                        <p>${getFunFact(bird.name)}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 获取趣味知识
function getFunFact(birdName) {
    const facts = {
        "凤头潜鸭": "凤头潜鸭的凤冠在求偶时会竖起来，非常漂亮！",
        "凤头麦鸡": "凤头麦鸡的飞行技巧高超，能在空中做出各种特技动作。",
        "反嘴鹬": "反嘴鹬的嘴巴特别适合在泥滩中寻找食物。",
        "斑头秋沙鸭": "斑头秋沙鸭是优秀的潜水员，能潜到水下10米捕鱼。",
        "普通秋沙鸭": "普通秋沙鸭的嘴巴有锯齿，能牢牢抓住滑溜的鱼。",
        "环颈雉": "环颈雉的雄鸟羽毛华丽，是许多摄影爱好者的拍摄对象。",
        "短嘴豆雁": "短嘴豆雁迁徙时能飞行数千公里，耐力惊人。",
        "红嘴鸥": "红嘴鸥是城市公园的常客，不怕人类。",
        "红头潜鸭": "红头潜鸭喜欢成群活动，有时能看到上百只一起游动。",
        "红胸秋沙鸭": "红胸秋沙鸭的冠羽在兴奋时会竖起来。",
        "豆雁": "豆雁的叫声低沉有力，能传播很远。",
        "赤嘴潜鸭": "赤嘴潜鸭的红色嘴巴在阳光下特别鲜艳。",
        "鹊鸭": "鹊鸭的英文名'Goldeneye'来源于它金色的眼睛。"
    };
    return facts[birdName] || "这种鸟类有很多有趣的特点等待你去发现！";
}

// 识别模式
function startIdentifyMode() {
    currentBirdIndex = Math.floor(Math.random() * birds.length);
    const bird = birds[currentBirdIndex];

    gameArea.innerHTML = `
        <div class="identify-container">
            <h2><i class="fas fa-question-circle"></i> 识别模式</h2>
            <p class="score">得分: <span id="score">${currentScore}</span></p>
            <div class="bird-question">
                <div class="question-image">
                    <img src="${bird.image}" alt="猜猜这是什么鸟？" onerror="this.src='images/placeholder-bird.png'">
                </div>
                <p class="question-text">猜猜这是什么鸟？</p>
                <div class="answer-options">
                    ${shuffleArray([...birds]).slice(0, 4).map(option => `
                        <button class="answer-btn" onclick="checkAnswer('${option.name}')">
                            ${option.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// 检查答案
function checkAnswer(answer) {
    const correctBird = birds[currentBirdIndex];
    const isCorrect = answer === correctBird.name;

    if (isCorrect) {
        currentScore += 10;
        document.getElementById('score').textContent = currentScore;
        showMessage('🎉 答对了！ +10分', 'success');
    } else {
        showMessage(`❌ 答错了！正确答案是：${correctBird.name}`, 'error');
    }

    // 1秒后下一题
    setTimeout(() => {
        startIdentifyMode();
    }, 1000);
}

// 记忆模式
function startMemoryMode() {
    // 创建记忆游戏卡片
    const memoryBirds = [...birds.slice(0, 6), ...birds.slice(0, 6)];
    const shuffledBirds = shuffleArray(memoryBirds);

    gameArea.innerHTML = `
        <div class="memory-container">
            <h2><i class="fas fa-brain"></i> 记忆模式</h2>
            <p class="score">得分: <span id="memoryScore">0</span></p>
            <div class="memory-grid">
                ${shuffledBirds.map((bird, index) => `
                    <div class="memory-card" data-id="${bird.id}" data-index="${index}" onclick="flipCard(${index})">
                        <div class="card-front">?</div>
                        <div class="card-back">
                            <img src="${bird.image}" alt="${bird.name}" onerror="this.src='images/placeholder-bird.png'">
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 挑战模式
function startChallengeMode() {
    timeLeft = 60;
    currentScore = 0;

    gameArea.innerHTML = `
        <div class="challenge-container">
            <h2><i class="fas fa-trophy"></i> 挑战模式</h2>
            <div class="challenge-info">
                <div class="timer">时间: <span id="timer">${timeLeft}</span>秒</div>
                <div class="score">得分: <span id="challengeScore">0</span></div>
            </div>
            <div id="challengeQuestion"></div>
        </div>
    `;

    startTimer();
    showNextChallengeQuestion();
}

// 启动计时器
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endChallenge();
        }
    }, 1000);
}

// 显示挑战问题
function showNextChallengeQuestion() {
    const bird = birds[Math.floor(Math.random() * birds.length)];
    const questionType = Math.random() > 0.5 ? 'name' : 'feature';

    let questionHTML = '';
    if (questionType === 'name') {
        questionHTML = `
            <div class="challenge-question">
                <div class="question-image">
                    <img src="${bird.image}" alt="这是什么鸟？" onerror="this.src='images/placeholder-bird.png'">
                </div>
                <p class="question-text">这是什么鸟？</p>
                <div class="answer-options">
                    ${shuffleArray([...birds]).slice(0, 4).map(option => `
                        <button class="challenge-btn" onclick="checkChallengeAnswer('${option.name}', '${bird.name}')">
                            ${option.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        questionHTML = `
            <div class="challenge-question">
                <p class="question-text">"${bird.features}" 描述的是哪种鸟？</p>
                <div class="answer-options">
                    ${shuffleArray([...birds]).slice(0, 4).map(option => `
                        <button class="challenge-btn" onclick="checkChallengeAnswer('${option.name}', '${bird.name}')">
                            ${option.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    document.getElementById('challengeQuestion').innerHTML = questionHTML;
}

// 检查挑战答案
function checkChallengeAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
        currentScore += 20;
        document.getElementById('challengeScore').textContent = currentScore;
        showMessage('🎉 答对了！ +20分', 'success');
    } else {
        showMessage(`❌ 答错了！正确答案是：${correctAnswer}`, 'error');
    }

    showNextChallengeQuestion();
}

// 结束挑战
function endChallenge() {
    gameArea.innerHTML = `
        <div class="challenge-end">
            <h2><i class="fas fa-flag-checkered"></i> 挑战结束！</h2>
            <div class="final-score">
                <p>最终得分: <span class="score-number">${currentScore}</span></p>
                <p>用时: 60秒</p>
            </div>
            <button class="btn btn-primary" onclick="startGame('challenge')">
                <i class="fas fa-redo"></i> 再玩一次
            </button>
            <button class="btn btn-success" onclick="saveScore()">
                <i class="fas fa-save"></i> 保存成绩
            </button>
        </div>
    `;
}

// 保存成绩
function saveScore() {
    const playerName = prompt('请输入您的昵称（用于排行榜）:', '游客');
    if (playerName) {
        showMessage(`🎉 成绩已保存！昵称: ${playerName}, 得分: ${currentScore}`, 'success');
        // 这里可以添加实际保存到服务器的代码
    }
}

// 返回主菜单
function backToMenu() {
    gameArea.innerHTML = '';
    document.querySelector('.controls').style.display = 'none';
    currentGameMode = null;
    gameActive = false;
    clearInterval(timer);
}

// 重新开始游戏
function restartGame() {
    if (currentGameMode) {
        startGame(currentGameMode);
    }
}

// 工具函数
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = text;
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 2000);
}

// 页面加载时初始化
window.onload = initGame;