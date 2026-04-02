import pandas as pd
import numpy as np
import os

def extract_routes_from_file1(file_path):
    """从第一个文件（三航优势航段）提取航线"""
    try:
        # 读取Excel文件
        xls = pd.ExcelFile(file_path)
        print(f"文件: {os.path.basename(file_path)}")
        print(f"Sheet名称: {xls.sheet_names}")

        # 读取第一个sheet
        df = pd.read_excel(file_path, sheet_name=0, header=None)
        print(f"数据形状: {df.shape}")
        print(f"前5行数据:")
        for i in range(min(5, len(df))):
            print(f"  行{i}: {df.iloc[i].tolist()}")
        print()

        routes = []
        # 尝试找到航线列
        for col in range(df.shape[1]):
            col_data = df.iloc[:, col].astype(str)
            # 查找包含"-"且看起来像航线格式的行
            for val in col_data:
                if isinstance(val, str) and "-" in val and len(val) >= 6:
                    # 检查是否是航线格式（如AAT-XIY）
                    parts = val.split("-")
                    if len(parts) == 2 and len(parts[0]) >= 3 and len(parts[1]) >= 3:
                        routes.append(val.strip().upper())

        # 如果没找到，尝试其他方法
        if not routes:
            # 查看所有单元格
            for i in range(len(df)):
                for j in range(df.shape[1]):
                    val = str(df.iat[i, j])
                    if "-" in val and len(val) >= 6:
                        parts = val.split("-")
                        if len(parts) == 2 and len(parts[0]) >= 3 and len(parts[1]) >= 3:
                            routes.append(val.strip().upper())

        return list(set(routes))  # 去重

    except Exception as e:
        print(f"读取文件1时出错: {e}")
        return []

def extract_routes_from_file2(file_path):
    """从第二个文件提取航线"""
    try:
        # 读取Excel文件
        xls = pd.ExcelFile(file_path)
        print(f"文件: {os.path.basename(file_path)}")
        print(f"Sheet名称: {xls.sheet_names}")

        # 读取第一个sheet
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"数据形状: {df.shape}")
        print(f"列名: {df.columns.tolist()}")
        print(f"前5行数据:")
        print(df.head())
        print()

        routes = []
        # 尝试从所有列中提取航线
        for col in df.columns:
            col_data = df[col].astype(str)
            for val in col_data:
                if isinstance(val, str) and "-" in val:
                    # 处理可能的多段航线
                    segments = val.split()
                    for segment in segments:
                        if "-" in segment and len(segment) >= 6:
                            parts = segment.split("-")
                            if len(parts) == 2 and len(parts[0]) >= 3 and len(parts[1]) >= 3:
                                routes.append(segment.strip().upper())

        return list(set(routes))  # 去重

    except Exception as e:
        print(f"读取文件2时出错: {e}")
        return []

def analyze_routes(file1_path, file2_path):
    """分析两个文件的航线匹配"""
    print("=" * 80)
    print("开始分析航线匹配...")
    print("=" * 80)

    # 提取航线
    print("\n提取文件1的航线...")
    routes1 = extract_routes_from_file1(file1_path)
    print(f"文件1找到 {len(routes1)} 条航线")

    print("\n提取文件2的航线...")
    routes2 = extract_routes_from_file2(file2_path)
    print(f"文件2找到 {len(routes2)} 条航线")

    # 找出匹配的航线
    routes1_set = set(routes1)
    routes2_set = set(routes2)
    matched_routes = sorted(list(routes1_set.intersection(routes2_set)))

    # 输出结果
    print("\n" + "=" * 80)
    print("分析结果:")
    print("=" * 80)
    print(f"文件1总航线数: {len(routes1)}")
    print(f"文件2总航线数: {len(routes2)}")
    print(f"匹配的航线数: {len(matched_routes)}")
    print(f"匹配率: {len(matched_routes)/len(routes1)*100:.1f}% (相对于文件1)")

    # 保存详细结果
    output_file = "航线匹配结果_新文件.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("航线匹配分析结果\n")
        f.write("=" * 50 + "\n")
        f.write(f"文件1: {os.path.basename(file1_path)}\n")
        f.write(f"文件2: {os.path.basename(file2_path)}\n")
        f.write(f"分析时间: {pd.Timestamp.now()}\n\n")

        f.write(f"文件1总航线数: {len(routes1)}\n")
        f.write(f"文件2总航线数: {len(routes2)}\n")
        f.write(f"匹配的航线数: {len(matched_routes)}\n")
        f.write(f"匹配率: {len(matched_routes)/len(routes1)*100:.1f}%\n\n")

        f.write("匹配的航线列表:\n")
        for i, route in enumerate(matched_routes, 1):
            f.write(f"  {i}. {route}\n")

        f.write("\n文件1所有航线:\n")
        for i, route in enumerate(sorted(routes1), 1):
            f.write(f"  {i}. {route}\n")

        f.write("\n文件2所有航线:\n")
        for i, route in enumerate(sorted(routes2), 1):
            f.write(f"  {i}. {route}\n")

    print(f"\n详细结果已保存到: {output_file}")

    # 显示部分匹配航线
    if matched_routes:
        print("\n前20条匹配航线:")
        for i, route in enumerate(matched_routes[:20], 1):
            print(f"  {i}. {route}")
        if len(matched_routes) > 20:
            print(f"  ... 还有 {len(matched_routes)-20} 条")
    else:
        print("\n没有找到匹配的航线")

    return routes1, routes2, matched_routes

if __name__ == "__main__":
    # 文件路径
    file1 = r"C:\Users\EDY\AppData\Local\Temp\lobsterai\attachments\附件2：三航优势航段-1774424595569-pcab5a.xlsx"
    file2 = r"C:\Users\EDY\AppData\Local\Temp\lobsterai\attachments\55cb05b4-0113-4002-a482-3cedc914f056-1774424602177-egi5mi.xls"

    # 分析航线
    routes1, routes2, matched = analyze_routes(file1, file2)