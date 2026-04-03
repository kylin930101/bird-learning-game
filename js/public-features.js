// 🐦 公共网页版 - 额外功能
// 作者：小林 🐱 为姐姐精心制作

// 分享功能
function shareGame(platform) {
    const gameUrl = window.location.href;
    const gameTitle = '🐦 鸟类认知学习游戏 - 免费在线玩！';
    const gameDescription = '探索13种美丽鸟类，通过游戏轻松学习鸟类知识！';

    switch(platform) {
        case 'wechat':
            showMessage('📱 请使用微信扫描二维码分享', 'info');
            // 实际应用中这里应该生成二维码
            break;
        case 'qq':
            const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(gameUrl)}&title=${encodeURIComponent(gameTitle)}&summary=${encodeURIComponent(gameDescription)}`;
            window.open(qqUrl, '_blank', 'width=600,height=400');
            break;
        case 'link':
            navigator.clipboard.writeText(gameUrl)
                .then(() => showMessage('✅ 链接已复制到剪贴板！', 'success'))
                .catch(() => {
                    // 备用方法
                    const textArea = document.createElement('textarea');
                    textArea.value = gameUrl;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showMessage('✅ 链接已复制到剪贴板！', 'success');
                });
            break;
    }
}

// 反馈功能
function showFeedback() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'block';
}

function closeFeedback() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
    document.getElementById('feedbackText').value = '';
}

function submitFeedback() {
    const feedback = document.getElementById('feedbackText').value.trim();

    if (!feedback) {
        showMessage('❌ 请输入反馈内容', 'error');
        return;
    }

    // 模拟提交反馈
    console.log('📝 用户反馈:', feedback);

    // 这里可以添加实际提交到服务器的代码
    // fetch('/api/feedback', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ feedback })
    // })

    showMessage('✅ 感谢您的反馈！我们会认真考虑您的建议。', 'success');
    closeFeedback();
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target === modal) {
        closeFeedback();
    }
}

// 键盘快捷键
document.addEventListener('keydown', function(event) {
    // ESC键关闭反馈窗口
    if (event.key === 'Escape') {
        closeFeedback();
    }

    // 空格键重新开始游戏
    if (event.key === ' ' && currentGameMode) {
        event.preventDefault();
        restartGame();
    }

    // 数字键1-4选择游戏模式
    if (!currentGameMode) {
        switch(event.key) {
            case '1':
                startGame('learn');
                break;
            case '2':
                startGame('identify');
                break;
            case '3':
                startGame('memory');
                break;
            case '4':
                startGame('challenge');
                break;
        }
    }
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面被隐藏，暂停游戏
        if (timer) {
            clearInterval(timer);
        }
    } else {
        // 页面恢复显示，恢复游戏
        if (currentGameMode === 'challenge' && gameActive) {
            startTimer();
        }
    }
});

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
/* 分享按钮 */
.share-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.share-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.share-btn i {
    font-size: 18px;
}

/* 在线计数器 */
.online-counter {
    background: rgba(76, 175, 80, 0.1);
    border: 2px solid #4CAF50;
    border-radius: 20px;
    padding: 8px 16px;
    margin: 10px auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    color: #4CAF50;
}

/* 排行榜 */
.leaderboard {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.leaderboard h2 {
    text-align: center;
    color: #333;
    margin-bottom: 15px;
}

.leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.leaderboard-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 12px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.rank {
    font-size: 24px;
    width: 40px;
}

.player {
    flex: 1;
    font-weight: bold;
    color: #333;
}

.score {
    background: #4CAF50;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-weight: bold;
}

/* 模态框 */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background: white;
    margin: 15% auto;
    padding: 30px;
    border-radius: 15px;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.modal-content h3 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.modal-content textarea {
    width: 100%;
    height: 150px;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    resize: vertical;
    margin-bottom: 20px;
}

.modal-content .btn {
    margin: 0 10px;
}

/* 消息提示 */
.message {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    z-index: 1001;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.message.success {
    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
}

.message.error {
    background: linear-gradient(135deg, #f44336 0%, #c62828 100%);
}

.message.info {
    background: linear-gradient(135deg, #2196F3 0%, #0D47A1 100%);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 学习模式样式 */
.learn-container {
    max-width: 1200px;
    margin: 0 auto;
}

.bird-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.bird-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.bird-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.bird-image {
    height: 150px;
    overflow: hidden;
}

.bird-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.bird-card:hover .bird-image img {
    transform: scale(1.1);
}

.bird-info {
    padding: 15px;
    text-align: center;
}

.bird-info h3 {
    margin: 0 0 5px 0;
    color: #333;
}

.bird-info p {
    margin: 0;
    color: #666;
    font-size: 14px;
}

/* 鸟类详情页 */
.bird-detail {
    max-width: 1000px;
    margin: 0 auto;
}

.back-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
}

.back-btn:hover {
    background: #5a6268;
}

.detail-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.detail-image {
    border-radius: 15px;
    overflow: hidden;
}

.detail-image img {
    width: 100%;
    height: auto;
    border-radius: 15px;
}

.detail-info h2 {
    color: #333;
    margin-bottom: 10px;
}

.scientific {
    color: #666;
    font-style: italic;
    margin-bottom: 20px;
}

.info-section {
    margin-bottom: 20px;
}

.info-section h3 {
    color: #4CAF50;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.fun-fact {
    background: #FFF3CD;
    border-left: 4px solid #FFC107;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
}

.fun-fact h3 {
    color: #856404;
    margin-bottom: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .detail-content {
        grid-template-columns: 1fr;
    }

    .bird-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .share-buttons {
        flex-direction: column;
        align-items: center;
    }

    .share-btn {
        width: 200px;
        justify-content: center;
    }
}

/* 联系链接 */
.contact {
    margin-top: 15px;
    text-align: center;
}

.contact a {
    color: #4CAF50;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.2s;
}

.contact a:hover {
    color: #2E7D32;
    text-decoration: underline;
}
`;
document.head.appendChild(style);

// 初始化变量（如果未定义）
if (typeof currentGameMode === 'undefined') {
    var currentGameMode = null;
    var gameActive = false;
    var timer = null;
}

console.log('🚀 公共功能已加载 - 鸟类认知学习游戏公共版');