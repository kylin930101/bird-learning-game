import pandas as pd
import numpy as np
import os

def read_excel_file(file_path):
    """读取Excel文件，尝试不同的sheet和读取方式"""
    try:
        # 尝试读取所有sheet
        xls = pd.ExcelFile(file_path)
        print(f"文件: {os.path.basename(file_path)}")
        print(f"Sheet名称: {xls.sheet_names}")

        # 尝试读取第一个sheet
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"第一个sheet的形状: {df.shape}")
        print(f"列名: {list(df.columns)}")
        print(f"前5行数据:")
        print(df.head())
        print("-" * 80)

        return df
    except Exception as e:
        print(f"读取文件 {file_path} 时出错: {e}")
        return None

def normalize_route(route_str):
    """标准化航线字符串"""
    if pd.isna(route_str):
        return None

    # 转换为字符串并去除空格
    route = str(route_str).strip()

    # 常见分隔符：-、—、到、至、→
    separators = ['-', '—', '到', '至', '→', '~', '～']

    for sep in separators:
        if sep in route:
            parts = route.split(sep)
            if len(parts) == 2:
                # 标准化为"出发-到达"格式
                return f"{parts[0].strip()}-{parts[1].strip()}"

    # 如果没有找到分隔符，尝试其他格式
    # 可能是"出发到达"格式（如"北京上海"）
    if len(route) >= 4:
        # 尝试识别常见城市名
        common_cities = ['北京', '上海', '广州', '深圳', '成都', '重庆', '杭州', '南京', '武汉', '西安', '昆明', '厦门', '青岛', '大连', '沈阳', '哈尔滨', '长春', '天津', '郑州', '长沙', '合肥', '福州', '南宁', '海口', '三亚', '乌鲁木齐', '拉萨', '兰州', '西宁', '银川', '呼和浩特']

        for city in common_cities:
            if route.startswith(city):
                remaining = route[len(city):]
                for city2 in common_cities:
                    if remaining == city2:
                        return f"{city}-{city2}"

    return route

def extract_routes(df):
    """从数据框中提取航线信息"""
    routes = set()

    # 检查列名，寻找可能包含航线信息的列
    for col in df.columns:
        col_str = str(col).lower()
        if any(keyword in col_str for keyword in ['航线', 'route', '出发', '到达', '起降', '城市', '机场', '航段']):
            print(f"找到可能的航线列: {col}")

            # 提取该列的非空值
            for value in df[col].dropna():
                normalized = normalize_route(value)
                if normalized:
                    routes.add(normalized)

    # 如果没有找到明显的航线列，尝试从所有列中提取
    if not routes:
        print("未找到明显的航线列，尝试从所有列中提取...")
        for col in df.columns:
            for value in df[col].dropna():
                value_str = str(value)
                # 检查是否包含常见城市名和分隔符
                if any(sep in value_str for sep in ['-', '—', '到', '至', '→']):
                    normalized = normalize_route(value)
                    if normalized:
                        routes.add(normalized)

    return routes

def main():
    # 文件路径
    file1 = "C:/Users/EDY/lobsterai/project/.cowork-temp/attachments/manual/附件1：东航独飞及优势范围-1774424346162-skbadc.xlsx"
    file2 = "C:/Users/EDY/lobsterai/project/.cowork-temp/attachments/manual/55cb05b4-0113-4002-a482-3cedc914f056-1774424349973-vi8ovf.xls"

    print("开始分析航线匹配...")
    print("=" * 80)

    # 读取文件
    df1 = read_excel_file(file1)
    df2 = read_excel_file(file2)

    if df1 is None or df2 is None:
        print("无法读取文件，请检查文件格式")
        return

    # 提取航线
    print("\n提取文件1的航线...")
    routes1 = extract_routes(df1)
    print(f"文件1找到 {len(routes1)} 条航线")

    print("\n提取文件2的航线...")
    routes2 = extract_routes(df2)
    print(f"文件2找到 {len(routes2)} 条航线")

    # 找出匹配的航线
    matched_routes = routes1.intersection(routes2)

    print("\n" + "=" * 80)
    print("分析结果:")
    print(f"文件1总航线数: {len(routes1)}")
    print(f"文件2总航线数: {len(routes2)}")
    print(f"匹配的航线数: {len(matched_routes)}")

    if matched_routes:
        print("\n匹配的航线列表:")
        for i, route in enumerate(sorted(matched_routes), 1):
            print(f"{i}. {route}")

    # 保存结果到文件
    output_file = "C:/Users/EDY/lobsterai/project/航线匹配结果.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("航线匹配分析报告\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"文件1: {os.path.basename(file1)}\n")
        f.write(f"文件2: {os.path.basename(file2)}\n\n")
        f.write(f"文件1总航线数: {len(routes1)}\n")
        f.write(f"文件2总航线数: {len(routes2)}\n")
        f.write(f"匹配的航线数: {len(matched_routes)}\n\n")

        if matched_routes:
            f.write("匹配的航线列表:\n")
            for i, route in enumerate(sorted(matched_routes), 1):
                f.write(f"{i}. {route}\n")
        else:
            f.write("没有找到匹配的航线\n")

    print(f"\n详细结果已保存到: {output_file}")

if __name__ == "__main__":
    main()