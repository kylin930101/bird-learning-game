// 🐦 创建鸟类数据JSON文件
// 将图片转换为Base64并生成数据文件

const fs = require('fs');
const path = require('path');

// 鸟类数据
const birds = [
    {
        id: 1,
        name: "凤头潜鸭",
        filename: "凤头潜鸭.png",
        scientific: "Aythya fuligula",
        features: "头部有明显的黑色凤冠，雄鸟头颈黑色，雌鸟头颈棕褐色。常见于湖泊、水库等水域。",
        habitat: "淡水湖泊、水库、河流"
    },
    {
        id: 2,
        name: "凤头麦鸡",
        filename: "凤头麦鸡.png",
        scientific: "Vanellus vanellus",
        features: "头顶有黑色长羽冠，翅膀宽圆，飞行时黑白分明。喜欢在农田、草地活动。",
        habitat: "农田、草地、湿地"
    },
    {
        id: 3,
        name: "反嘴鹬",
        filename: "反嘴鹬.png",
        scientific: "Recurvirostra avosetta",
        features: "嘴细长而上翘，黑白相间的羽毛非常醒目。常在浅水区觅食。",
        habitat: "沿海滩涂、盐田、浅水湖泊"
    },
    {
        id: 4,
        name: "斑头秋沙鸭",
        filename: "斑头秋沙鸭.png",
        scientific: "Mergus squamatus",
        features: "头部有黑色斑纹，嘴细长带钩。善于潜水捕鱼，是优秀的潜水员。",
        habitat: "山区溪流、森林河流"
    },
    {
        id: 5,
        name: "普通秋沙鸭",
        filename: "普通秋沙鸭.png",
        scientific: "Mergus merganser",
        features: "嘴细长带锯齿，雄鸟头颈墨绿色，雌鸟头颈棕红色。捕鱼高手。",
        habitat: "湖泊、河流、水库"
    },
    {
        id: 6,
        name: "环颈雉",
        filename: "环颈雉.png",
        scientific: "Phasianus colchicus",
        features: "雄鸟颈部有白色环纹，羽毛华丽多彩。雌鸟羽毛较朴素，呈棕褐色。",
        habitat: "农田、林地、灌丛"
    },
    {
        id: 7,
        name: "短嘴豆雁",
        filename: "短嘴豆雁.png",
        scientific: "Anser fabalis",
        features: "嘴较短而厚实，体形较大。迁徙时呈V字形飞行，叫声洪亮。",
        habitat: "湿地、农田、草原"
    },
    {
        id: 8,
        name: "红嘴鸥",
        filename: "红嘴鸥.png",
        scientific: "Chroicocephalus ridibundus",
        features: "嘴和脚呈鲜红色，冬季头部白色，夏季头部变为深褐色。",
        habitat: "沿海、湖泊、河流"
    },
    {
        id: 9,
        name: "红头潜鸭",
        filename: "红头潜鸭.png",
        scientific: "Aythya ferina",
        features: "雄鸟头部栗红色，雌鸟头部棕褐色。善于潜水，常成群活动。",
        habitat: "湖泊、水库、沼泽"
    },
    {
        id: 10,
        name: "红胸秋沙鸭",
        filename: "红胸秋沙鸭.png",
        scientific: "Mergus serrator",
        features: "雄鸟胸部有红色斑块，冠羽较长。雌鸟头部棕红色，冠羽较短。",
        habitat: "沿海、河口、湖泊"
    },
    {
        id: 11,
        name: "豆雁",
        filename: "豆雁.png",
        scientific: "Anser fabalis",
        features: "嘴黑色，前端有黄色斑块。体形较大，飞行时叫声低沉。",
        habitat: "湿地、农田、草地"
    },
    {
        id: 12,
        name: "赤嘴潜鸭",
        filename: "赤嘴潜鸭.png",
        scientific: "Netta rufina",
        features: "雄鸟嘴红色，头部棕红色。雌鸟嘴黑色，头部灰褐色。",
        habitat: "湖泊、水库、沼泽"
    },
    {
        id: 13,
        name: "鹊鸭",
        filename: "鹊鸭.png",
        scientific: "Bucephala clangula",
        features: "雄鸟头部黑色，有白色斑点。雌鸟头部棕褐色，体型较小。",
        habitat: "森林湖泊、河流"
    }
];

// 生成数据文件
function generateBirdsData() {
    const birdsData = birds.map(bird => {
        // 尝试读取图片并转换为Base64
        const imagePath = path.join(__dirname, 'birds', bird.filename);

        let imageBase64 = '';
        try {
            if (fs.existsSync(imagePath)) {
                const imageBuffer = fs.readFileSync(imagePath);
                const mimeType = getMimeType(imagePath);
                imageBase64 = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
            } else {
                console.warn(`⚠️  图片不存在: ${bird.filename}`);
                // 使用占位图
                imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
            }
        } catch (error) {
            console.error(`❌ 处理图片失败 ${bird.filename}:`, error.message);
            imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        }

        return {
            ...bird,
            image: imageBase64,
            // 添加趣味知识
            funFact: getFunFact(bird.name)
        };
    });

    // 保存到文件
    const outputPath = path.join(__dirname, 'birds-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(birdsData, null, 2), 'utf8');

    console.log(`✅ 鸟类数据已生成: ${outputPath}`);
    console.log(`📊 共 ${birdsData.length} 种鸟类`);

    // 同时生成JavaScript文件
    generateJSFile(birdsData);
}

// 获取MIME类型
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    return mimeTypes[ext] || 'image/png';
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

// 生成JavaScript文件
function generateJSFile(birdsData) {
    const jsContent = `// 🐦 鸟类数据 - 自动生成
// 生成时间: ${new Date().toISOString()}

const birds = ${JSON.stringify(birdsData, null, 2)};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = birds;
}

// 全局变量
if (typeof window !== 'undefined') {
    window.birdsData = birds;
}`;

    const jsPath = path.join(__dirname, 'birds-data.js');
    fs.writeFileSync(jsPath, jsContent, 'utf8');

    console.log(`✅ JavaScript数据文件已生成: ${jsPath}`);
}

// 运行生成
console.log('🐦 开始生成鸟类数据文件...');
generateBirdsData();
console.log('🎉 数据生成完成！');