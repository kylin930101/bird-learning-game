// 游戏核心逻辑

// 切换屏幕
function switchScreen(screenId) {
    // 隐藏所有屏幕
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // 显示目标屏幕
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        gameState.currentScreen = screenId;

        // 播放点击声音
        GameUtils.playSound('click-sound');

        // 特定屏幕的初始化
        switch (screenId) {
            case 'main-menu':
                updateStats();
                break;
            case 'game-screen':
                // 如果游戏未开始，开始新游戏
                if (gameState.currentQuestion === 0) {
                    startNewGame();
                }
                break;
            case 'encyclopedia-screen':
                loadEncyclopedia();
                break;
            case 'settings-screen':
                loadSettings();
                break;
        }
    }
}

// 开始新游戏
function startNewGame() {
    // 重置游戏状态
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.timeLeft = gameConfig.timePerQuestion;
    gameState.selectedOption = null;
    gameState.usedHints = 0;
    gameState.correctAnswers = 0;
    gameState.answeredQuestions = [];

    // 更新UI
    updateGameUI();
    updateProgress();

    // 切换到游戏界面
    switchScreen('game-screen');

    // 开始第一题
    loadQuestion();
}

// 加载题目
function loadQuestion() {
    // 停止之前的计时器
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    // 获取当前鸟类
    const usedBirdIds = gameState.answeredQuestions.map(q => q.birdId);
    gameState.currentBird = GameUtils.getRandomBird(usedBirdIds);

    // 获取选项
    const optionCount = gameConfig.difficultyLevels[gameState.gameMode].options || 4;
    gameState.currentOptions = GameUtils.getRandomOptions(gameState.currentBird, optionCount);

    // 更新UI
    updateQuestionUI();

    // 重置选择状态
    gameState.selectedOption = null;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'wrong');
        btn.disabled = false;
    });

    // 隐藏反馈
    document.getElementById('feedback-overlay').classList.remove('active');

    // 开始计时器
    startTimer();
}

// 更新问题UI
function updateQuestionUI() {
    // 更新鸟类图片
    const birdImage = document.getElementById('bird-image');
    birdImage.src = gameState.currentBird.image;
    birdImage.alt = gameState.currentBird.name;

    // 更新模态框图片
    document.getElementById('modal-image').src = gameState.currentBird.image;
    document.getElementById('modal-bird-name').textContent = gameState.currentBird.name;
    document.getElementById('modal-bird-scientific').textContent = gameState.currentBird.scientificName;

    // 更新选项
    const optionButtons = document.querySelectorAll('.option-btn');
    gameState.currentOptions.forEach((bird, index) => {
        if (index < optionButtons.length) {
            const btn = optionButtons[index];
            btn.querySelector('.option-text').textContent = bird.name;
            btn.style.display = 'flex';
        }
    });

    // 隐藏多余的选项按钮
    for (let i = gameState.currentOptions.length; i < optionButtons.length; i++) {
        optionButtons[i].style.display = 'none';
    }

    // 更新问题编号
    document.getElementById('question-number').textContent =
        `${gameState.currentQuestion + 1}/${gameConfig.totalQuestions}`;

    // 更新当前分数
    document.getElementById('current-score').textContent = gameState.score;

    // 更新提示按钮状态
    updateHintButton();
}

// 开始计时器
function startTimer() {
    gameState.timeLeft = gameConfig.difficultyLevels[gameState.gameMode].time || 60;
    updateTimerDisplay();

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        updateTimerDisplay();

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            timeUp();
        }
    }, 1000);
}

// 更新计时器显示
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = gameState.timeLeft;

        // 时间警告（最后10秒）
        if (gameState.timeLeft <= 10) {
            timerElement.style.color = 'var(--danger-color)';
            timerElement.style.animation = gameState.timeLeft <= 5 ? 'pulse 0.5s infinite' : 'none';
        } else {
            timerElement.style.color = '';
            timerElement.style.animation = '';
        }
    }
}

// 时间到
function timeUp() {
    // 显示反馈
    showFeedback(false, '时间到！');

    // 记录错误答案
    gameState.answeredQuestions.push({
        birdId: gameState.currentBird.id,
        correct: false,
        selectedOption: null
    });

    // 添加学习记录
    GameUtils.addLearnedBird(gameState.currentBird.id);
}

// 选择选项
function selectOption(optionIndex) {
    // 如果已经选择过，忽略
    if (gameState.selectedOption !== null) return;

    // 停止计时器
    clearInterval(gameState.timerInterval);

    // 记录选择
    gameState.selectedOption = optionIndex;
    const selectedBird = gameState.currentOptions[optionIndex];
    const isCorrect = selectedBird.id === gameState.currentBird.id;

    // 更新按钮样式
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        const bird = gameState.currentOptions[index];
        if (!bird) return;

        btn.disabled = true;

        if (bird.id === gameState.currentBird.id) {
            btn.classList.add('correct');
        } else if (index === optionIndex) {
            btn.classList.add('wrong');
        }

        if (index === optionIndex) {
            btn.classList.add('selected');
        }
    });

    // 播放声音
    GameUtils.playSound(isCorrect ? 'correct-sound' : 'wrong-sound');

    // 更新分数
    if (isCorrect) {
        gameState.score += gameConfig.pointsPerCorrectAnswer;
        gameState.correctAnswers++;

        // 更新最高分
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            GameUtils.saveGameState();
            GameUtils.showNotification(`新纪录！最高分：${gameState.highScore}`, 'success');
        }
    }

    // 记录答案
    gameState.answeredQuestions.push({
        birdId: gameState.currentBird.id,
        correct: isCorrect,
        selectedOption: optionIndex
    });

    // 添加学习记录
    GameUtils.addLearnedBird(gameState.currentBird.id);

    // 显示反馈
    showFeedback(isCorrect, isCorrect ? '回答正确！' : '回答错误！');
}

// 显示反馈
function showFeedback(isCorrect, title) {
    const feedbackOverlay = document.getElementById('feedback-overlay');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackMessage = document.getElementById('feedback-message');
    const birdKnowledge = document.getElementById('bird-knowledge');

    // 更新反馈内容
    feedbackIcon.className = isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle';
    feedbackTitle.textContent = title;

    if (isCorrect) {
        feedbackMessage.textContent = `太棒了！你认出了这是${gameState.currentBird.name}。`;
        feedbackMessage.style.color = 'var(--success-color)';
    } else {
        feedbackMessage.textContent = `正确答案是：${gameState.currentBird.name}`;
        feedbackMessage.style.color = 'var(--danger-color)';
    }

    // 显示鸟类知识
    birdKnowledge.textContent = gameState.currentBird.description;

    // 显示反馈
    feedbackOverlay.classList.add('active');

    // 更新UI
    updateGameUI();
}

// 显示提示
function showHint() {
    // 检查提示次数限制
    if (gameState.usedHints >= gameConfig.maxHintsPerGame) {
        GameUtils.showNotification('提示次数已用完！', 'error');
        return;
    }

    // 扣分
    gameState.score += gameConfig.pointsPerHintUsed;
    if (gameState.score < 0) gameState.score = 0;
    gameState.usedHints++;

    // 播放声音
    GameUtils.playSound('click-sound');

    // 显示提示（排除一个错误选项）
    const wrongOptions = gameState.currentOptions
        .map((bird, index) => ({ bird, index }))
        .filter(item => item.bird.id !== gameState.currentBird.id);

    if (wrongOptions.length > 0) {
        const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        const wrongButton = document.querySelector(`.option-btn[data-index="${randomWrong.index}"]`);

        // 闪烁提示
        wrongButton.style.animation = 'blink 1s 3';
        setTimeout(() => {
            wrongButton.style.animation = '';
        }, 3000);

        GameUtils.showNotification(`提示：选项 ${String.fromCharCode(65 + randomWrong.index)} 是错误的`, 'info');
    }

    // 更新UI
    updateGameUI();
    updateHintButton();
}

// 跳过问题
function skipQuestion() {
    // 停止计时器
    clearInterval(gameState.timerInterval);

    // 记录跳过
    gameState.answeredQuestions.push({
        birdId: gameState.currentBird.id,
        correct: false,
        selectedOption: null,
        skipped: true
    });

    // 播放声音
    GameUtils.playSound('click-sound');

    // 显示反馈
    showFeedback(false, '已跳过');
}

// 下一题
function nextQuestion() {
    // 隐藏反馈
    document.getElementById('feedback-overlay').classList.remove('active');

    // 检查是否还有题目
    gameState.currentQuestion++;
    updateProgress();

    if (gameState.currentQuestion >= gameConfig.totalQuestions) {
        // 游戏结束
        endGame();
    } else {
        // 加载下一题
        loadQuestion();
    }
}

// 结束游戏
function endGame() {
    // 保存游戏记录
    GameUtils.addGameHistory(
        gameState.score,
        gameState.correctAnswers,
        gameConfig.totalQuestions
    );

    // 切换到游戏结束界面
    switchScreen('game-over-screen');
    showGameResults();
}

// 显示游戏结果
function showGameResults() {
    const accuracy = GameUtils.calculateAccuracy(
        gameState.correctAnswers,
        gameConfig.totalQuestions
    );

    // 更新结果界面
    document.getElementById('result-score').textContent = gameState.score;
    document.getElementById('result-correct').textContent = gameState.correctAnswers;
    document.getElementById('result-total').textContent = gameConfig.totalQuestions;
    document.getElementById('result-accuracy').textContent = `${accuracy}%`;

    // 显示鼓励信息
    let encouragement = '';
    if (accuracy === 100) {
        encouragement = '完美！你是鸟类专家！';
    } else if (accuracy >= 80) {
        encouragement = '太棒了！你对鸟类很了解！';
    } else if (accuracy >= 60) {
        encouragement = '不错！继续努力！';
    } else {
        encouragement = '加油！多学习鸟类知识！';
    }

    document.getElementById('result-encouragement').textContent = encouragement;
}

// 更新游戏UI
function updateGameUI() {
    // 更新分数
    document.getElementById('current-score').textContent = gameState.score;

    // 更新问题进度
    document.getElementById('question-number').textContent =
        `${gameState.currentQuestion + 1}/${gameConfig.totalQuestions}`;
}

// 更新进度条
function updateProgress() {
    const progress = ((gameState.currentQuestion) / gameConfig.totalQuestions) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
    }
}

// 更新提示按钮
function updateHintButton() {
    const hintBtn = document.getElementById('hint-btn');
    const hintsLeft = gameConfig.maxHintsPerGame - gameState.usedHints;

    hintBtn.innerHTML = `<i class="fas fa-lightbulb"></i> 提示 (${hintsLeft}次)`;
    hintBtn.disabled = hintsLeft <= 0;

    if (hintsLeft <= 0) {
        hintBtn.style.opacity = '0.5';
        hintBtn.style.cursor = 'not-allowed';
    } else {
        hintBtn.style.opacity = '1';
        hintBtn.style.cursor = 'pointer';
    }
}

// 放大图片
function zoomImage() {
    const modal = document.getElementById('image-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 加载鸟类图鉴
function loadEncyclopedia() {
    const encyclopediaContent = document.getElementById('encyclopedia-screen');
    if (!encyclopediaContent) return;

    let html = `
        <div class="game-header">
            <div class="header-content">
                <button id="back-to-menu-encyclopedia" class="back-button">
                    <i class="fas fa-arrow-left"></i> 返回
                </button>
                <h1><i class="fas fa-feather"></i> 鸟类图鉴</h1>
            </div>
        </div>

        <main class="menu-content">
            <div class="encyclopedia-stats">
                <div class="stat-card">
                    <i class="fas fa-book"></i>
                    <h3>已学习</h3>
                    <p>${gameState.learnedBirds.length}/${birdsData.length} 种鸟类</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-graduation-cap"></i>
                    <h3>学习进度</h3>
                    <p>${Math.round((gameState.learnedBirds.length / birdsData.length) * 100)}%</p>
                </div>
            </div>

            <div class="bird-grid">
    `;

    // 按学习状态排序（已学习的在前）
    const sortedBirds = [...birdsData].sort((a, b) => {
        const aLearned = gameState.learnedBirds.includes(a.id);
        const bLearned = gameState.learnedBirds.includes(b.id);
        return bLearned - aLearned;
    });

    sortedBirds.forEach(bird => {
        const isLearned = gameState.learnedBirds.includes(bird.id);

        html += `
            <div class="bird-card ${isLearned ? 'learned' : ''}">
                <img src="${bird.image}" alt="${bird.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="bird-card-content">
                    <h3>${bird.name}</h3>
                    <p class="scientific-name">${bird.scientificName}</p>
                    <p class="description">${bird.description.substring(0, 100)}...</p>
                    <div class="bird-details">
                        <p><i class="fas fa-home"></i> ${bird.habitat}</p>
                        <p><i class="fas fa-utensils"></i> ${bird.diet}</p>
                        <p><i class="fas fa-ruler"></i> ${bird.size}</p>
                    </div>
                    ${isLearned ? '<span class="learned-badge"><i class="fas fa-check"></i> 已学习</span>' : ''}
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </main>
    `;

    encyclopediaContent.innerHTML = html;

    // 添加返回按钮事件
    document.getElementById('back-to-menu-encyclopedia').addEventListener('click', () => {
        switchScreen('main-menu');
    });
}

// 加载设置
function loadSettings() {
    const settingsContent = document.getElementById('settings-screen');
    if (!settingsContent) return;

    const stats = GameUtils.getStatistics();

    let html = `
        <div class="game-header">
            <div class="header-content">
                <button id="back-to-menu-settings" class="back-button">
                    <i class="fas fa-arrow-left"></i> 返回
                </button>
                <h1><i class="fas fa-cog"></i> 设置</h1>
            </div>
        </div>

        <main class="menu-content">
            <div class="settings-container">
                <div class="setting-group">
                    <h3><i class="fas fa-gamepad"></i> 游戏设置</h3>

                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-chart-line"></i> 难度等级
                        </div>
                        <div class="setting-control">
                            <select id="difficulty-select" class="select-input">
                                <option value="easy" ${gameState.gameMode === 'easy' ? 'selected' : ''}>简单</option>
                                <option value="medium" ${gameState.gameMode === 'medium' ? 'selected' : ''}>中等</option>
                                <option value="hard" ${gameState.gameMode === 'hard' ? 'selected' : ''}>困难</option>
                            </select>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-volume-up"></i> 声音效果
                        </div>
                        <div class="setting-control">
                            <label class="switch">
                                <input type="checkbox" id="sound-toggle" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-palette"></i> 深色模式
                        </div>
                        <div class="setting-control">
                            <label class="switch">
                                <input type="checkbox" id="dark-mode-toggle">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <h3><i class="fas fa-chart-bar"></i> 游戏统计</h3>

                    <div class="stat-grid">
                        <div class="stat-item">
                            <span class="stat-label">总游戏次数</span>
                            <span class="stat-value">${stats.totalGames}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">平均分数</span>
                            <span class="stat-value">${stats.averageScore}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">总正确数</span>
                            <span class="stat-value">${stats.totalCorrect}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">总体正确率</span>
                            <span class="stat-value">${stats.overallAccuracy}%</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <h3><i class="fas fa-database"></i> 数据管理</h3>

                    <div class="action-buttons">
                        <button id="reset-stats" class="btn-secondary">
                            <i class="fas fa-redo"></i> 重置统计
                        </button>
                        <button id="export-data" class="btn-secondary">
                            <i class="fas fa-download"></i> 导出数据
                        </button>
                        <button id="import-data" class="btn-secondary">
                            <i class="fas fa-upload"></i> 导入数据
                        </button>
                    </div>
                </div>
            </div>
        </main>
    `;

    settingsContent.innerHTML = html;

    // 添加事件监听器
    document.getElementById('back-to-menu-settings').addEventListener('click', () => {
        switchScreen('main-menu');
    });

    document.getElementById('difficulty-select').addEventListener('change', function() {
        gameState.gameMode = this.value;
        GameUtils.showNotification(`难度已设置为：${this.options[this.selectedIndex].text}`, 'success');
    });

    document.getElementById('sound-toggle').addEventListener('change', function() {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.muted = !this.checked;
        });
        GameUtils.showNotification(`声音${this.checked ? '开启' : '关闭'}`, 'info');
    });

    document.getElementById('dark-mode-toggle').addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked);
        GameUtils.showNotification(`深色模式${this.checked ? '开启' : '关闭'}`, 'info');
    });

    document.getElementById('reset-stats').addEventListener('click', function() {
        if (confirm('确定要重置所有游戏统计吗？此操作不可撤销。')) {
            localStorage.clear();
            location.reload();
        }
    });

    document.getElementById('export-data').addEventListener('click', exportGameData);
    document.getElementById('import-data').addEventListener('click', importGameData);

    // 加载保存的设置
    loadSavedSettings();
}

// 加载保存的设置
function loadSavedSettings() {
    // 深色模式
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.getElementById('dark-mode-toggle').checked = darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    // 声音设置
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    document.getElementById('sound-toggle').checked = soundEnabled;
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.muted = !soundEnabled;
    });
}

// 导出游戏数据
function exportGameData() {
    const exportData = {
        highScore: gameState.highScore,
        learnedBirds: gameState.learnedBirds,
        gameHistory: gameState.gameHistory,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `bird-quiz-data-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    GameUtils.showNotification('数据导出成功！', 'success');
}

// 导入游戏数据
function importGameData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);

                // 验证数据格式
                if (!importedData.highScore || !Array.isArray(importedData.learnedBirds)) {
                    throw new Error('无效的数据格式');
                }

                // 导入数据
                gameState.highScore = Math.max(gameState.highScore, importedData.highScore);
                gameState.learnedBirds = [...new Set([...gameState.learnedBirds, ...importedData.learnedBirds])];
                gameState.gameHistory = [...gameState.gameHistory, ...(importedData.gameHistory || [])];

                // 保存到本地存储
                GameUtils.saveGameState();

                // 更新UI
                updateStats();

                GameUtils.showNotification('数据导入成功！', 'success');
            } catch (error) {
                GameUtils.showNotification('导入失败：数据格式错误', 'error');
                console.error('导入错误:', error);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化游戏
    initGame();

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }

        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }

        .notification-success {
            border-left: 4px solid var(--success-color);
        }

        .notification-error {
            border-left: 4px solid var(--danger-color);
        }

        .notification-info {
            border-left: 4px solid var(--info-color);
        }

        .notification i {
            font-size: 1.2rem;
        }

        .notification-success i {
            color: var(--success-color);
        }

        .notification-error i {
            color: var(--danger-color);
        }

        .notification-info i {
            color: var(--info-color);
        }

        .dark-mode {
            --bg-color: #1a1a1a;
            --card-bg: #2d2d2d;
            --text-primary: #ffffff;
            --text-secondary: #b3b3b3;
            --text-light: #808080;
            --border-color: #404040;
            --shadow-color: rgba(0, 0, 0, 0.3);
        }

        .encyclopedia-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
        }

        .stat-card {
            background: var(--card-bg);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-lg);
            text-align: center;
            box-shadow: var(--shadow-md);
        }

        .stat-card i {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: var(--spacing-sm);
        }

        .stat-card h3 {
            font-size: 1.1rem;
            margin-bottom: 4px;
            color: var(--text-primary);
        }

        .stat-card p {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .bird-details {
            margin-top: var(--spacing-sm);
            font-size: 0.85rem;
            color: var(--text-light);
        }

        .bird-details p {
            margin: 2px 0;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .bird-card.learned {
            border: 2px solid var(--success-color);
        }

        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--spacing-md);
        }
    `;
    document.head.appendChild(style);
});