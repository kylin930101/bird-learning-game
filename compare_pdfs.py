#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
比较两个PDF文件的内容差异
"""

from pypdf import PdfReader
import difflib
import sys
import os

def extract_text_from_pdf(pdf_path):
    """从PDF文件中提取文本"""
    try:
        text = ""
        reader = PdfReader(pdf_path)

        print(f"文件: {os.path.basename(pdf_path)}")
        print(f"页数: {len(reader.pages)}")

        for i, page in enumerate(reader.pages):
            page_text = page.extract_text()
            if page_text:
                text += f"=== 第 {i+1} 页 ===\n{page_text}\n\n"
            else:
                text += f"=== 第 {i+1} 页 ===\n[无法提取文本，可能是扫描件或图像]\n\n"

        return text.strip()
    except Exception as e:
        print(f"提取PDF文本时出错 {pdf_path}: {e}")
        return ""
        return text.strip()
    except Exception as e:
        print(f"提取PDF文本时出错 {pdf_path}: {e}")
        return ""

def compare_texts(text1, text2, file1_name, file2_name):
    """比较两个文本的差异"""
    lines1 = text1.splitlines()
    lines2 = text2.splitlines()

    print(f"\n{'='*60}")
    print(f"文件比较: {file1_name} vs {file2_name}")
    print(f"{'='*60}")

    # 使用difflib生成差异
    diff = difflib.unified_diff(
        lines1,
        lines2,
        fromfile=file1_name,
        tofile=file2_name,
        lineterm=''
    )

    diff_lines = list(diff)

    if len(diff_lines) <= 2:  # 只有头部信息，没有实际差异
        print("✓ 两个文件内容完全相同")
        return

    print("发现以下差异:")
    print("-" * 40)

    for line in diff_lines[2:]:  # 跳过前两行头部信息
        if line.startswith('+'):
            print(f"添加: {line[1:]}")
        elif line.startswith('-'):
            print(f"删除: {line[1:]}")
        elif line.startswith('?'):
            continue  # 跳过上下文标记

    print("-" * 40)

    # 计算相似度
    similarity = difflib.SequenceMatcher(None, text1, text2).ratio()
    print(f"文本相似度: {similarity:.2%}")

def main():
    if len(sys.argv) != 3:
        print("用法: python compare_pdfs.py <文件1> <文件2>")
        sys.exit(1)

    file1 = sys.argv[1]
    file2 = sys.argv[2]

    if not os.path.exists(file1):
        print(f"错误: 文件不存在 - {file1}")
        sys.exit(1)

    if not os.path.exists(file2):
        print(f"错误: 文件不存在 - {file2}")
        sys.exit(1)

    print(f"正在提取文件1: {file1}")
    text1 = extract_text_from_pdf(file1)

    print(f"正在提取文件2: {file2}")
    text2 = extract_text_from_pdf(file2)

    if not text1 and not text2:
        print("两个文件都无法提取文本，可能是扫描件或加密文件")
        return

    if not text1:
        print(f"警告: 无法从 {file1} 提取文本")

    if not text2:
        print(f"警告: 无法从 {file2} 提取文本")

    # 保存提取的文本以便查看
    with open("extracted_text1.txt", "w", encoding="utf-8") as f:
        f.write(text1)

    with open("extracted_text2.txt", "w", encoding="utf-8") as f:
        f.write(text2)

    print(f"\n已保存提取的文本到:")
    print(f"  - extracted_text1.txt")
    print(f"  - extracted_text2.txt")

    # 比较文本
    compare_texts(text1, text2, os.path.basename(file1), os.path.basename(file2))

if __name__ == "__main__":
    main()