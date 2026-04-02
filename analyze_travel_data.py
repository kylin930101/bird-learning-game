import pandas as pd
import sys
import os

def analyze_travel_data(file_path):
    """
    分析旅行数据，统计"中国境内至境外"行程的境外目的地分布
    """
    try:
        # 读取Excel文件
        print(f"正在读取文件: {file_path}")

        # 尝试读取所有工作表
        try:
            # 先读取第一个工作表来查看结构
            df = pd.read_excel(file_path, sheet_name=0)
            print(f"成功读取工作表: {pd.read_excel(file_path, sheet_name=None).keys()}")
        except Exception as e:
            print(f"读取Excel文件时出错: {e}")
            # 尝试使用不同的引擎
            try:
                df = pd.read_excel(file_path, engine='xlrd')
            except:
                try:
                    df = pd.read_excel(file_path, engine='openpyxl')
                except Exception as e2:
                    print(f"所有引擎都失败: {e2}")
                    return None

        print(f"数据形状: {df.shape}")
        print(f"列名: {list(df.columns)}")

        # 显示前几行数据
        print("\n前5行数据:")
        print(df.head())

        # 查找包含"中国"或"境内"的列
        china_columns = []
        for col in df.columns:
            if isinstance(col, str):
                if '中国' in col or '境内' in col or '出发' in col or '起点' in col:
                    china_columns.append(col)

        print(f"\n可能包含中国出发信息的列: {china_columns}")

        # 查找包含"境外"或"目的地"的列
        destination_columns = []
        for col in df.columns:
            if isinstance(col, str):
                if '境外' in col or '目的地' in col or '终点' in col or '国家' in col or '地区' in col:
                    destination_columns.append(col)

        print(f"可能包含境外目的地信息的列: {destination_columns}")

        # 如果没有明确的列，尝试基于内容筛选
        if not china_columns or not destination_columns:
            print("\n尝试基于内容筛选...")

            # 查找包含"中国"的行
            china_rows = []
            for idx, row in df.iterrows():
                for col in df.columns:
                    cell_value = str(row[col]) if pd.notna(row[col]) else ''
                    if '中国' in cell_value and ('至' in cell_value or '到' in cell_value or '->' in cell_value):
                        china_rows.append(idx)
                        break

            print(f"找到 {len(china_rows)} 行可能包含中国出发信息")

            if china_rows:
                # 分析这些行的目的地信息
                destinations = {}
                for idx in china_rows[:10]:  # 先看前10行
                    print(f"\n第 {idx+1} 行数据:")
                    for col in df.columns:
                        val = df.iloc[idx][col]
                        if pd.notna(val):
                            print(f"  {col}: {val}")

                # 尝试提取目的地
                print("\n尝试提取目的地信息...")
                for idx in china_rows:
                    for col in df.columns:
                        cell_value = str(df.iloc[idx][col]) if pd.notna(df.iloc[idx][col]) else ''
                        # 如果包含"中国"和"至"，尝试分割
                        if '中国' in cell_value and '至' in cell_value:
                            parts = cell_value.split('至')
                            if len(parts) == 2:
                                china_part = parts[0].strip()
                                dest_part = parts[1].strip()
                                if '中国' in china_part:
                                    # 进一步清理目的地
                                    dest = dest_part.split('(')[0].split('（')[0].strip()
                                    destinations[dest] = destinations.get(dest, 0) + 1

        # 如果找到了明确的列，直接分析
        if china_columns and destination_columns:
            print(f"\n使用列分析: 出发列={china_columns[0]}, 目的地列={destination_columns[0]}")

            # 筛选包含"中国"的出发记录
            china_mask = df[china_columns[0]].astype(str).str.contains('中国')
            china_trips = df[china_mask]

            print(f"找到 {len(china_trips)} 条中国出发记录")

            if len(china_trips) > 0:
                # 统计目的地
                dest_counts = china_trips[destination_columns[0]].value_counts()

                print(f"\n境外目的地统计 (前20个):")
                print(dest_counts.head(20))

                return dest_counts

        print("\n分析完成，但未找到明确的'中国境内至境外'数据模式")
        return None

    except Exception as e:
        print(f"分析过程中出错: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    else:
        # 使用默认文件路径
        file_path = r"C:\Users\EDY\lobsterai\project\.cowork-temp\attachments\manual\10354854-07b6-4b5f-87ee-b49e78c3f4b7-1774491217395-dr6c0x.xls"

    if not os.path.exists(file_path):
        print(f"文件不存在: {file_path}")
        sys.exit(1)

    result = analyze_travel_data(file_path)

    if result is not None:
        print("\n=== 分析结果汇总 ===")
        print(f"共找到 {len(result)} 个不同的境外目的地")
        print("\n目的地分布:")
        for dest, count in result.items():
            print(f"  {dest}: {count} 次")
    else:
        print("未能生成统计结果")