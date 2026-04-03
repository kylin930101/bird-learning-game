#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建鸟类占位图片
姐姐，运行这个脚本可以生成简单的占位图片！
"""

import os
from PIL import Image, ImageDraw, ImageFont
import colorsys

# 鸟类数据
birds = [
    {"id": 1, "name": "麻雀", "scientific": "Passer montanus", "color": (139, 69, 19)},    # 棕色
    {"id": 2, "name": "燕子", "scientific": "Hirundo rustica", "color": (0, 0, 139)},       # 深蓝色
    {"id": 3, "name": "鸽子", "scientific": "Columba livia", "color": (192, 192, 192)},     # 银色
    {"id": 4, "name": "喜鹊", "scientific": "Pica pica", "color": (0, 0, 0)},               # 黑色
    {"id": 5, "name": "乌鸦", "scientific": "Corvus corax", "color": (105, 105, 105)},      # 深灰色
    {"id": 6, "name": "翠鸟", "scientific": "Alcedo atthis", "color": (0, 191, 255)},       # 亮蓝色
    {"id": 7, "name": "啄木鸟", "scientific": "Dendrocopos major", "color": (178, 34, 34)}, # 红色
    {"id": 8, "name": "猫头鹰", "scientific": "Strix aluco", "color": (139, 90, 43)},       # 褐色
    {"id": 9, "name": "天鹅", "scientific": "Cygnus olor", "color": (255, 255, 255)},       # 白色
    {"id": 10, "name": "孔雀", "scientific": "Pavo cristatus", "color": (0, 100, 0)},       # 深绿色
]

def create_placeholder_image(bird, size=300):
    """创建占位图片"""
    # 创建新图片
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)

    # 计算圆心和半径
    center = size // 2
    radius = size // 2 - 20

    # 绘制圆形背景
    draw.ellipse([center - radius, center - radius, center + radius, center + radius],
                 fill=bird["color"], outline=(100, 100, 100), width=3)

    # 添加鸟的编号
    try:
        font = ImageFont.truetype("arial.ttf", 80)
    except:
        font = ImageFont.load_default()

    text = str(bird["id"])
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    text_x = center - text_width // 2
    text_y = center - text_height // 2

    # 根据背景颜色选择文字颜色
    r, g, b = bird["color"]
    brightness = (r * 299 + g * 587 + b * 114) / 1000
    text_color = (0, 0, 0) if brightness > 128 else (255, 255, 255)

    draw.text((text_x, text_y), text, fill=text_color, font=font)

    return img

def main():
    """主函数"""
    # 创建输出目录
    output_dir = "images/birds/placeholders"
    os.makedirs(output_dir, exist_ok=True)

    print("🐦 开始创建鸟类占位图片...")
    print(f"输出目录: {output_dir}")
    print("-" * 50)

    # 为每种鸟创建图片
    for bird in birds:
        print(f"创建 {bird['id']}. {bird['name']} ({bird['scientific']})...")

        # 创建图片
        img = create_placeholder_image(bird)

        # 保存图片
        filename = f"bird{bird['id']}.png"
        filepath = os.path.join(output_dir, filename)
        img.save(filepath, "PNG")

        print(f"  已保存: {filepath}")

    print("-" * 50)
    print("✅ 所有占位图片创建完成！")
    print("\n📝 下一步：")
    print("1. 游戏现在可以使用这些占位图片")
    print("2. 姐姐可以用真实的鸟类图片替换这些占位图")
    print("3. 把真实图片放到 images/birds/ 目录")
    print("4. 在 data.js 中更新图片路径")

if __name__ == "__main__":
    main()