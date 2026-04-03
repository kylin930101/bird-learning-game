#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将鸟类图片转换为Base64编码并生成离线HTML文件
作者：小林 🐱 为姐姐制作
"""

import os
import base64
import json
import re

def image_to_base64(image_path):
    """将图片转换为Base64编码"""
    with open(image_path, 'rb') as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

def get_image_mime_type(filename):
    """根据文件扩展名获取MIME类型"""
    ext = os.path.splitext(filename)[1].lower()
    if ext == '.png':
        return 'image/png'
    elif ext == '.jpg' or ext == '.jpeg':
        return 'image/jpeg'
    elif ext == '.gif':
        return 'image/gif'
    elif ext == '.webp':
        return 'image/webp'
    else:
        return 'image/png'  # 默认

def read_game_files():
    """读取游戏相关文件"""
    # 读取HTML文件
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 读取CSS文件
    css_content = ''
    css_path = 'css/bird-learning.css'
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css_content = f.read()

    # 读取JavaScript文件
    js_content = ''
    js_path = 'js/game-logic.js'
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()

    return html_content, css_content, js_content

def create_offline_html():
    """创建离线HTML文件"""
    print("🚀 开始创建离线游戏版本...")

    # 1. 读取游戏文件
    html_content, css_content, js_content = read_game_files()

    # 2. 获取所有鸟类图片
    birds_dir = 'birds'
    if not os.path.exists(birds_dir):
        print(f"❌ 错误：找不到{birds_dir}目录")
        return

    bird_images = {}
    for filename in os.listdir(birds_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            image_path = os.path.join(birds_dir, filename)
            bird_name = os.path.splitext(filename)[0]
            print(f"📷 处理图片：{bird_name}")

            # 转换为Base64
            base64_str = image_to_base64(image_path)
            mime_type = get_image_mime_type(filename)
            data_url = f"data:{mime_type};base64,{base64_str}"
            bird_images[bird_name] = data_url

    print(f"✅ 成功处理了 {len(bird_images)} 张鸟类图片")

    # 3. 修改JavaScript中的图片路径
    # 找到所有图片路径并替换为Base64
    for bird_name, data_url in bird_images.items():
        # 替换类似 "birds/凤头潜鸭.png" 的路径
        pattern = f'"birds/{re.escape(bird_name)}\\.(png|jpg|jpeg|gif|webp)"'
        replacement = f'"{data_url}"'

        # 在JavaScript内容中替换
        js_content = re.sub(pattern, replacement, js_content, flags=re.IGNORECASE)

    # 4. 创建完整的离线HTML
    offline_html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🐦 鸟类认知学习游戏 - 离线版 - 小林制作</title>
    <style>
{css_content}
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- 浮动的小鸟图标 -->
    <div class="bird-float" style="top: 10%; left: 5%; animation-delay: 0s;">🐦</div>
    <div class="bird-float" style="top: 20%; right: 10%; animation-delay: -5s;">🦆</div>
    <div class="bird-float" style="bottom: 30%; left: 15%; animation-delay: -10s;">🦜</div>
    <div class="bird-float" style="bottom: 20%; right: 20%; animation-delay: -15s;">🦢</div>

    <div class="container">
        <!-- 头部 -->
        <header class="header">
            <h1><i class="fas fa-dove"></i> 鸟类认知学习游戏 <i class="fas fa-kiwi-bird"></i></h1>
            <p>探索13种美丽鸟类的奇妙世界，通过游戏轻松学习鸟类知识！</p>
            <div class="bird-counter">
                <i class="fas fa-feather-alt"></i> 共收录 13 种鸟类
            </div>
            <div class="offline-badge">
                <i class="fas fa-wifi-slash"></i> 离线版 - 无需网络
            </div>
        </header>

        <!-- 游戏模式选择 -->
        <section class="game-modes">
            <div class="mode-card" onclick="startGame('learn')">
                <div class="mode-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <h3>学习模式</h3>
                <p>浏览所有鸟类图片，学习它们的名称、特征和习性。适合初学者入门。</p>
                <div class="mode-tag">轻松学习</div>
            </div>

            <div class="mode-card" onclick="startGame('identify')">
                <div class="mode-icon">
                    <i class="fas fa-question-circle"></i>
                </div>
                <h3>识别模式</h3>
                <p>看图猜鸟名！测试你对鸟类的识别能力，提升观察力。</p>
                <div class="mode-tag">挑战认知</div>
            </div>

            <div class="mode-card" onclick="startGame('memory')">
                <div class="mode-icon">
                    <i class="fas fa-brain"></i>
                </div>
                <h3>记忆模式</h3>
                <p>经典翻牌游戏！匹配相同的鸟类图片，锻炼记忆力和反应速度。</p>
                <div class="mode-tag">记忆训练</div>
            </div>

            <div class="mode-card" onclick="startGame('challenge')">
                <div class="mode-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>挑战模式</h3>
                <p>限时答题挑战！在时间内回答尽可能多的问题，争夺最高分。</p>
                <div class="mode-tag">高手对决</div>
            </div>
        </section>

        <!-- 游戏区域 -->
        <section id="gameArea" class="game-area">
            <!-- 游戏内容由JavaScript动态生成 -->
        </section>

        <!-- 控制按钮 -->
        <div class="controls">
            <button class="btn btn-secondary" onclick="backToMenu()">
                <i class="fas fa-home"></i> 返回主菜单
            </button>
            <button class="btn btn-primary" onclick="restartGame()">
                <i class="fas fa-redo"></i> 重新开始
            </button>
        </div>

        <!-- 底部 -->
        <footer class="footer">
            <p><i class="fas fa-mobile-alt"></i> <strong>离线版本</strong> - 无需网络，可在任何设备上直接打开</p>
            <p>所有图片已嵌入文件中，游戏完全独立运行</p>
            <div class="creator">
                制作：<i class="fas fa-heart"></i> 小林 为 姐姐 精心打造
            </div>
        </footer>
    </div>

    <script>
{js_content}
    </script>
</body>
</html>"""

    # 5. 保存离线HTML文件
    output_file = 'bird-game-offline.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(offline_html)

    print(f"🎉 离线游戏创建成功！")
    print(f"📁 文件：{output_file}")
    print(f"📱 使用方法：")
    print(f"   1. 将此文件发送到手机")
    print(f"   2. 在手机浏览器中直接打开")
    print(f"   3. 无需网络，随时随地玩！")

    # 6. 计算文件大小
    file_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
    print(f"📊 文件大小：{file_size:.2f} MB")

    return output_file

if __name__ == "__main__":
    try:
        create_offline_html()
    except Exception as e:
        print(f"❌ 创建离线游戏时出错：{e}")
        import traceback
        traceback.print_exc()