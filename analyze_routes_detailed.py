import pandas as pd
import numpy as np
import os

def read_excel_file_detailed(file_path, sheet_name=0):
    """详细读取Excel文件"""
    try:
        df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
        print(f"\n文件: {os.path.basename(file_path)}")
        print(f"Sheet: {sheet_name}")
        print(f"数据形状: {df.shape}")

        # 显示前10行数据
        print("\n前10行数据:")
        for i in range(min(10, len(df))):
            print(f"行{i}: {df.iloc[i].tolist()}")

        return df
    except Exception as e:
        print(f"读取文件出错: {e}")
        return None

def analyze_file1():
    """分析第一个文件（东航独飞及优势范围）"""
    file1 = "C:/Users/EDY/lobsterai/project/.cowork-temp/attachments/manual/附件1：东航独飞及优势范围-1774424346162-skbadc.xlsx"

    print("=" * 80)
    print("分析文件1: 东航独飞及优势范围")
    print("=" * 80)

    # 读取所有sheet
    xls = pd.ExcelFile(file1)
    print(f"Sheet列表: {xls.sheet_names}")

    # 分析每个sheet
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(file1, sheet_name=sheet_name)
        print(f"\nSheet: {sheet_name}")
        print(f"形状: {df.shape}")
        print(f"列名: {list(df.columns)}")

        # 显示前几行数据
        print("前5行数据:")
        for i in range(min(5, len(df))):
            row_data = []
            for col in df.columns:
                value = df.iloc[i][col]
                if pd.notna(value):
                    row_data.append(f"{col}: {value}")
            print(f"  行{i}: {', '.join(row_data)}")

    return xls

def analyze_file2():
    """分析第二个文件"""
    file2 = "C:/Users/EDY/lobsterai/project/.cowork-temp/attachments/manual/55cb05b4-0113-4002-a482-3cedc914f056-1774424349973-vi8ovf.xls"

    print("\n" + "=" * 80)
    print("分析文件2")
    print("=" * 80)

    # 读取文件
    xls = pd.ExcelFile(file2)
    print(f"Sheet列表: {xls.sheet_names}")

    # 分析主要sheet
    sheet_name = xls.sheet_names[0]
    df = pd.read_excel(file2, sheet_name=sheet_name)
    print(f"\nSheet: {sheet_name}")
    print(f"形状: {df.shape}")
    print(f"列名: {list(df.columns)}")

    # 统计航线数据
    if '行程' in df.columns:
        routes = df['行程'].dropna().unique()
        print(f"\n航线数量: {len(routes)}")
        print("前20条航线:")
        for i, route in enumerate(routes[:20]):
            print(f"  {i+1}. {route}")

        # 统计航线频次
        route_counts = df['行程'].value_counts()
        print(f"\n最常出现的10条航线:")
        for route, count in route_counts.head(10).items():
            print(f"  {route}: {count}次")

    return df

def compare_routes():
    """比较两个文件的航线"""
    print("\n" + "=" * 80)
    print("航线比较分析")
    print("=" * 80)

    # 读取文件1的航线（从Sheet1）
    file1 = "C:/Users/EDY/lobsterai/project/.cowork-temp/attachments/manual/附件1：东航独飞及优势范围-1774424346162-skbadc.xlsx"
    df1 = pd.read_excel(file1, sheet_name='Sheet1')

    # 提取文件1的航线（从第二列）
    routes1 = set()
    if df1.shape[1] >= 2:
        # 跳过表头行
        for i in range(1, len(df1)):
            route = df1.iloc[i, 1]  # 第二列
            if pd.notna(route):
                routes1.add(str(route).strip())

    print(f"文件1航线数: {len(routes1)}")
    print("文件1前10条航线:")
    for i, route in enumerate(list(routes1)[:10]):
        print(f"  {i+1}. {route}")

    # 读取文件2的航线
    file2 = "C:/Users/EDY/lobsterai/project/.cowork-temp/attachments/manual/55cb05b4-0113-4002-a482-3cedc914f056-1774424349973-vi8ovf.xls"
    df2 = pd.read_excel(file2, sheet_name='GetIssueTicketListPrint')

    # 提取文件2的航线
    routes2 = set()
    if '行程' in df2.columns:
        routes2 = set(df2['行程'].dropna().astype(str).str.strip())

    print(f"\n文件2航线数: {len(routes2)}")
    print("文件2前10条航线:")
    for i, route in enumerate(list(routes2)[:10]):
        print(f"  {i+1}. {route}")

    # 查找匹配的航线
    matched_routes = routes1.intersection(routes2)

    print(f"\n匹配的航线数: {len(matched_routes)}")
    if matched_routes:
        print("匹配的航线列表:")
        for i, route in enumerate(sorted(matched_routes)):
            print(f"  {i+1}. {route}")
    else:
        print("没有找到完全匹配的航线")

        # 尝试部分匹配（机场代码匹配）
        print("\n尝试机场代码匹配...")

        # 提取文件1的机场代码
        airports1 = set()
        for route in routes1:
            if '-' in route:
                parts = route.split('-')
                airports1.update(parts)
            else:
                airports1.add(route)

        # 提取文件2的机场代码
        airports2 = set()
        for route in routes2:
            if '-' in route:
                parts = route.split('-')
                airports2.update(parts)
            else:
                airports2.add(route)

        common_airports = airports1.intersection(airports2)
        print(f"共同的机场代码数: {len(common_airports)}")
        if common_airports:
            print("共同的机场代码:")
            for i, airport in enumerate(sorted(common_airports)):
                print(f"  {i+1}. {airport}")

def main():
    print("开始详细分析航线数据...")

    # 分析文件1
    xls1 = analyze_file1()

    # 分析文件2
    df2 = analyze_file2()

    # 比较航线
    compare_routes()

    print("\n" + "=" * 80)
    print("分析完成")

if __name__ == "__main__":
    main()