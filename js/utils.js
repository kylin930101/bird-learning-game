// 工具函数集合

// 生成占位图片
function generatePlaceholderImage(text, width = 400, height = 300) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 背景色
    const bgColors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#009688'];
    const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    // 绘制背景
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // 绘制鸟类图标
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐦', width / 2, height / 2 - 20);

    // 绘制文字
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(text, width / 2, height / 2 + 60);

    // 绘制边框
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);

    return canvas.toDataURL('image/png');
}

// 预加载图片
function preloadImages() {
    const images = birdsData.map(bird => bird.image);
    const promises = images.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => {
                // 如果图片加载失败，使用占位图片
                bird.image = generatePlaceholderImage(bird.name);
                resolve();
            };
            img.src = src;
        });
    });

    return Promise.all(promises);
}

// 创建占位图片
function createPlaceholderImages() {
    birdsData.forEach(bird => {
        // 检查图片是否存在，如果不存在则创建占位图片
        const img = new Image();
        img.onerror = () => {
            bird.image = generatePlaceholderImage(bird.name);
        };
        img.src = bird.image;
    });
}

// 格式化日期
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 复制到剪贴板
function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(resolve)
                .catch(reject);
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                resolve();
            } catch (err) {
                reject(err);
            }
            document.body.removeChild(textArea);
        }
    });
}

// 获取URL参数
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 设置URL参数
function setUrlParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
}

// 移除URL参数
function removeUrlParam(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.replaceState({}, '', url);
}

// 检测设备类型
function detectDevice() {
    const ua = navigator.userAgent;
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
        isTablet: /iPad|Android(?!.*Mobile)|Tablet/i.test(ua),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
        isIOS: /iPad|iPhone|iPod/.test(ua),
        isAndroid: /Android/.test(ua)
    };
}

// 检测网络状态
function checkNetworkStatus() {
    return navigator.onLine;
}

// 添加网络状态监听
function addNetworkListener(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
}

// 保存到本地存储（带过期时间）
function setLocalStorageWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// 从本地存储读取（检查过期时间）
function getLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}

// 生成随机颜色
function getRandomColor() {
    const colors = [
        '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#009688',
        '#FF5722', '#795548', '#607D8B', '#3F51B5', '#E91E63'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 计算两个日期之间的天数
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// 数组分组
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// 深度克隆对象
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
    return obj;
}

// 对象合并（深合并）
function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// 导出到全局作用域
window.utils = {
    generatePlaceholderImage,
    preloadImages,
    createPlaceholderImages,
    formatDate,
    generateId,
    debounce,
    throttle,
    copyToClipboard,
    getUrlParam,
    setUrlParam,
    removeUrlParam,
    detectDevice,
    checkNetworkStatus,
    addNetworkListener,
    setLocalStorageWithExpiry,
    getLocalStorageWithExpiry,
    getRandomColor,
    daysBetween,
    chunkArray,
    deepClone,
    deepMerge
};

// 页面加载完成后创建占位图片
document.addEventListener('DOMContentLoaded', function() {
    // 创建占位图片
    createPlaceholderImages();

    // 预加载图片
    preloadImages().then(() => {
        console.log('所有图片预加载完成');
    }).catch(error => {
        console.warn('图片预加载失败:', error);
    });

    // 检测设备并添加相应类
    const device = detectDevice();
    if (device.isMobile) {
        document.body.classList.add('mobile-device');
    }
    if (device.isTablet) {
        document.body.classList.add('tablet-device');
    }
    if (device.isDesktop) {
        document.body.classList.add('desktop-device');
    }
});