// 鸟类认知学习游戏 - JavaScript逻辑
// 作者：小林 🐱

class BirdQuizGame {
    constructor() {
        // 游戏状态
        this.score = 0;
        this.level = 1;
        this.currentQuestion = 0;
        this.totalQuestions = 10;
        this.timeLeft = 60;
        this.timer = null;
        this.isGameActive = false;
        this.currentBird = null;
        this.correctAnswer = null;

        // 鸟类数据库
        this.birds = [
            {
                id: 1,
                name: "麻雀",
                image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "麻雀是最常见的小型鸟类，体长约14厘米，主要栖息在人类居住区附近。它们以谷物、昆虫为食，性格活泼好动，常成群活动。",
                options: ["麻雀", "燕子", "鸽子", "喜鹊"]
            },
            {
                id: 2,
                name: "鸽子",
                image: "https://images.unsplash.com/photo-1596273315327-5f059714bff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "鸽子是常见的城市鸟类，体长约30厘米。它们以谷物、种子为食，具有出色的导航能力，曾被用作信鸽传递信息。",
                options: ["鸽子", "老鹰", "鹦鹉", "乌鸦"]
            },
            {
                id: 3,
                name: "燕子",
                image: "https://images.unsplash.com/photo-1534188753412-9f0337dbaa52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "燕子是候鸟，体长约17厘米。它们以飞行中的昆虫为食，常在屋檐下筑巢，是春天的象征。",
                options: ["燕子", "麻雀", "翠鸟", "啄木鸟"]
            },
            {
                id: 4,
                name: "喜鹊",
                image: "https://images.unsplash.com/photo-1572402230267-f3e267c1e5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "喜鹊体长约45厘米，黑白相间。它们聪明机警，会收集闪亮物品，在中国文化中是吉祥的象征。",
                options: ["喜鹊", "乌鸦", "八哥", "画眉"]
            },
            {
                id: 5,
                name: "鹦鹉",
                image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "鹦鹉是色彩鲜艳的鸟类，善于模仿人类语言。主要分布在热带地区，以水果、坚果为食。",
                options: ["鹦鹉", "孔雀", "火烈鸟", "犀鸟"]
            },
            {
                id: 6,
                name: "老鹰",
                image: "https://images.unsplash.com/photo-1597848218517-5c5c2c60a5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "老鹰是大型猛禽，视力极佳，能在高空发现地面猎物。它们是食物链顶端的捕食者。",
                options: ["老鹰", "秃鹫", "猫头鹰", "隼"]
            },
            {
                id: 7,
                name: "孔雀",
                image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "孔雀以华丽的尾羽闻名，雄孔雀开屏是为了求偶展示。它们是印度的国鸟，象征美丽和高贵。",
                options: ["孔雀", "火鸡", "鸵鸟", "鸸鹋"]
            },
            {
                id: 8,
                name: "猫头鹰",
                image: "https://images.unsplash.com/photo-1574085975024-eaa85ec28107?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "猫头鹰是夜行性猛禽，头部可旋转270度。它们以啮齿动物为食，是农民的益友。",
                options: ["猫头鹰", "夜鹰", "蝙蝠", "仓鸮"]
            },
            {
                id: 9,
                name: "天鹅",
                image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "天鹅是优雅的大型水鸟，颈部修长，羽毛洁白。它们终身一夫一妻，象征忠贞的爱情。",
                options: ["天鹅", "大雁", "鸭子", "鸬鹚"]
            },
            {
                id: 10,
                name: "火烈鸟",
                image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                description: "火烈鸟因羽毛呈粉红色而闻名，颜色来自食物中的虾青素。它们常单腿站立休息。",
                options: ["火烈鸟", "鹤", "鹳", "朱鹮"]
            }
        ];

        // DOM元素
        this.elements = {
            score: document.getElementById('score'),
            level: document.getElementById('level'),
            progress: document.getElementById('progress'),
            timer: document.getElementById('timer'),
            birdImage: document.getElementById('bird-image'),
            birdName: document.getElementById('bird-name'),
            birdDescription: document.getElementById('bird-description'),
            optionButtons: document.querySelectorAll('.option-btn'),
            feedback: document.getElementById('feedback'),
            nextBtn: document.getElementById('next-btn'),
            hintBtn: document.getElementById('hint-btn'),
            restartBtn: document.getElementById('restart-btn')
        };

        // 音频元素
        this.audio = {
            correct: document.getElementById('correct-sound'),
            wrong: document.getElementById('wrong-sound'),
            bird: document.getElementById('bird-sound')
        };

        this.init();
    }

    init() {
        // 绑定事件
        this.elements.optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(e));
        });

        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());

        // 开始游戏
        this.startGame();
    }

    startGame() {
        this.isGameActive = true;
        this.startTimer();
        this.loadQuestion();
        this.updateUI();
    }

    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 60;
        this.updateTimer();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    updateTimer() {
        this.elements.timer.textContent = this.timeLeft;

        // 时间警告
        if (this.timeLeft <= 10) {
            this.elements.timer.parentElement.style.animation = 'pulse 1s infinite';
            this.elements.timer.style.color = '#f44336';
        } else {
            this.elements.timer.parentElement.style.animation = '';
            this.elements.timer.style.color = '#d32f2f';
        }
    }

    loadQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.levelUp();
            return;
        }

        // 随机选择鸟类
        const availableBirds = this.birds.filter(bird =>
            !this.usedBirds || !this.usedBirds.includes(bird.id)
        );

        if (availableBirds.length === 0) {
            this.usedBirds = [];
            this.loadQuestion();
            return;
        }

        this.currentBird = availableBirds[Math.floor(Math.random() * availableBirds.length)];
        this.correctAnswer = this.currentBird.name;

        // 更新UI
        this.elements.birdImage.src = this.currentBird.image;
        this.elements.birdImage.alt = this.currentBird.name;
        this.elements.birdName.textContent = '???';
        this.elements.birdDescription.textContent = this.currentBird.description;

        // 设置选项
        const options = [...this.currentBird.options];
        this.shuffleArray(options);

        this.elements.optionButtons.forEach((btn, index) => {
            btn.textContent = options[index];
            btn.classList.remove('correct', 'wrong');
            btn.disabled = false;
        });

        // 重置反馈
        this.elements.feedback.innerHTML = '<p>选择正确答案，学习鸟类知识！</p>';
        this.elements.feedback.className = 'feedback';

        // 更新进度
        this.currentQuestion++;
        this.updateUI();

        // 播放鸟叫声
        this.playBirdSound();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    handleAnswer(event) {
        if (!this.isGameActive) return;

        const selectedBtn = event.target;
        const selectedAnswer = selectedBtn.textContent;
        const isCorrect = selectedAnswer === this.correctAnswer;

        // 禁用所有按钮
        this.elements.optionButtons.forEach(btn => {
            btn.disabled = true;

            // 高亮正确答案
            if (btn.textContent === this.correctAnswer) {
                btn.classList.add('correct');
            }

            // 高亮错误答案
            if (btn.textContent === selectedAnswer && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        // 显示鸟名
        this.elements.birdName.textContent = this.currentBird.name;

        // 更新分数和反馈
        if (isCorrect) {
            this.score += 10;
            this.elements.feedback.innerHTML = `
                <p><i class="fas fa-check-circle"></i> 正确！这是${this.correctAnswer}，加10分！</p>
                <p class="hint">${this.getRandomCompliment()}</p>
            `;
            this.elements.feedback.classList.add('correct');
            this.audio.correct.currentTime = 0;
            this.audio.correct.play();
        } else {
            this.elements.feedback.innerHTML = `
                <p><i class="fas fa-times-circle"></i> 答错了！这是${this.correctAnswer}</p>
                <p class="hint">${this.currentBird.description}</p>
            `;
            this.elements.feedback.classList.add('wrong');
            this.audio.wrong.currentTime = 0;
            this.audio.wrong.play();
        }

        this.updateUI();
    }

    getRandomCompliment() {
        const compliments = [
            "姐姐真棒！又认识了一种鸟！🐦",
            "小林为姐姐点赞！👍",
            "鸟类知识又增加了！📚",
            "姐姐的眼睛真尖！👀",
            "继续加油，成为鸟类专家！🏆"
        ];
        return compliments[Math.floor(Math.random() * compliments.length)];
    }

    showHint() {
        if (!this.currentBird) return;

        // 显示提示
        const hint = this.generateHint();
        this.elements.feedback.innerHTML = `
            <p><i class="fas fa-lightbulb"></i> 提示：${hint}</p>
            <p class="hint">试试看，你能猜出来吗？</p>
        `;
        this.elements.feedback.classList.remove('correct', 'wrong');

        // 播放提示音
        this.audio.bird.currentTime = 0;
        this.audio.bird.play();
    }

    generateHint() {
        const hints = [
            `这种鸟的体型${this.currentBird.name === '麻雀' ? '较小' : '较大'}`,
            `主要食物：${this.currentBird.name === '老鹰' ? '肉类' : '谷物/昆虫'}`,
            `生活习性：${this.currentBird.name === '燕子' ? '候鸟' : '留鸟'}`,
            `特征：${this.currentBird.description.substring(0, 50)}...`
        ];
        return hints[Math.floor(Math.random() * hints.length)];
    }

    nextQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.levelUp();
        } else {
            this.loadQuestion();
        }
    }

    levelUp() {
        this.level++;
        this.currentQuestion = 0;
        this.totalQuestions = Math.min(this.totalQuestions + 5, 20); // 每关增加5题，最多20题

        // 显示升级信息
        this.elements.feedback.innerHTML = `
            <p><i class="fas fa-trophy"></i> 恭喜升级！现在进入第${this.level}关</p>
            <p>每关${this.totalQuestions}题，继续挑战！</p>
        `;
        this.elements.feedback.classList.add('correct');

        // 庆祝动画
        document.querySelector('.game-header').classList.add('celebrate');
        setTimeout(() => {
            document.querySelector('.game-header').classList.remove('celebrate');
        }, 1500);

        // 加载新题目
        setTimeout(() => this.loadQuestion(), 2000);
    }

    updateUI() {
        this.elements.score.textContent = this.score;
        this.elements.level.textContent = this.level;
        this.elements.progress.textContent = `${this.currentQuestion}/${this.totalQuestions}`;
    }

    playBirdSound() {
        this.audio.bird.currentTime = 0;
        this.audio.bird.play();
    }

    endGame() {
        this.isGameActive = false;
        clearInterval(this.timer);

        // 显示游戏结束画面
        const finalScore = this.score + this.level * 10 + this.timeLeft;

        this.elements.feedback.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3><i class="fas fa-flag-checkered"></i> 游戏结束！</h3>
                <p>最终得分：${this.score}</p>
                <p>通关关卡：${this.level}</p>
                <p>剩余时间：${this.timeLeft}秒</p>
                <p>总分：${finalScore}</p>
                <p>${this.getGameResult(finalScore)}</p>
            </div>
        `;
        this.elements.feedback.classList.add('correct');

        // 禁用按钮
        this.elements.optionButtons.forEach(btn => {
            btn.disabled = true;
        });
    }

    getGameResult(score) {
        if (score >= 200) return "🎉 太厉害了！姐姐是鸟类专家！";
        if (score >= 150) return "👍 很棒！姐姐认识很多鸟呢！";
        if (score >= 100) return "😊 不错哦！继续学习会更好！";
        return "💪 加油！多玩几次就能认识更多鸟了！";
    }

    restartGame() {
        // 重置游戏状态
        this.score = 0;
        this.level = 1;
        this.currentQuestion = 0;
        this.totalQuestions = 10;
        this.timeLeft = 60;
        this.usedBirds = [];

        // 清除定时器
        clearInterval(this.timer);

        // 重新开始游戏
        this.startGame();

        // 显示重启消息
        this.elements.feedback.innerHTML = '<p>游戏重新开始！加油！��</p>';
        this.elements.feedback.classList.remove('correct', 'wrong');
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new BirdQuizGame();

    // 添加键盘支持
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const btn = document.querySelectorAll('.option-btn')[index];
            if (btn && !btn.disabled) {
                btn.click();
            }
        }

        // 空格键下一题
        if (e.key === ' ') {
            document.getElementById('next-btn').click();
            e.preventDefault();
        }

        // H键提示
        if (e.key.toLowerCase() === 'h') {
            document.getElementById('hint-btn').click();
        }

        // R键重启
        if (e.key.toLowerCase() === 'r') {
            document.getElementById('restart-btn').click();
        }
    });

    // 添加游戏说明提示
    console.log('%c🐦 鸟类认知学习游戏 🐱', 'color: #4caf50; font-size: 20px; font-weight: bold;');
    console.log('%c游戏控制：', 'color: #2196f3; font-weight: bold;');
    console.log('1-4: 选择答案');
    console.log('空格: 下一题');
    console.log('H: 提示');
    console.log('R: 重新开始');
    console.log('%c祝姐姐玩得开心！🐱', 'color: #ff9800; font-weight: bold;');
});