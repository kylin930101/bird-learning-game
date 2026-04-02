import pandas as pd
import sys

def calculate_segments(flight_number):
    """根据航班号中的'-'数量计算航段数量"""
    if pd.isna(flight_number):
        return 1  # 如果没有航班号，默认1个航段
    flight_str = str(flight_number)
    dash_count = flight_str.count('-')
    return dash_count + 1  # 航段数量 = '-'数量 + 1

def main():
    input_file = r"C:\Users\EDY\lobsterai\project\.cowork-temp\attachments\manual\b4927ce1-6722-4184-bb53-11c93f342494-1774841950011-fsoqbj.xls"
    output_file = r"C:\Users\EDY\lobsterai\project\balanceTheTicket_with_segments.xlsx"

    try:
        # 读取Excel文件
        print(f"正在读取文件: {input_file}")
        df = pd.read_excel(input_file)

        # 显示列名，确认数据结构
        print("文件列名:")
        print(df.columns.tolist())
        print(f"\n数据形状: {df.shape}")
        print("\n前5行数据:")
        print(df.head())

        # 检查是否有"航班号"列
        if "航班号" not in df.columns:
            # 尝试查找包含"航班"的列
            flight_cols = [col for col in df.columns if "航班" in str(col)]
            if flight_cols:
                print(f"\n未找到'航班号'列，但找到了相关列: {flight_cols}")
                flight_col = flight_cols[0]
            else:
                print("\n错误: 未找到包含'航班'的列")
                print("可用列名:")
                for col in df.columns:
                    print(f"  - {col}")
                return
        else:
            flight_col = "航班号"

        # 检查是否有"航段数量"列，如果没有则创建
        if "航段数量" not in df.columns:
            df["航段数量"] = None

        # 计算航段数量
        print(f"\n正在计算航段数量，使用列: {flight_col}")
        df["航段数量"] = df[flight_col].apply(calculate_segments)

        # 显示统计信息
        print("\n航段数量统计:")
        print(df["航段数量"].value_counts().sort_index())

        # 保存到新文件
        print(f"\n正在保存到: {output_file}")
        df.to_excel(output_file, index=False)

        print(f"\n处理完成! 已保存到: {output_file}")

        # 显示一些示例
        print("\n示例数据 (前10行):")
        sample_cols = [flight_col, "航段数量"]
        # 只显示存在的列
        sample_cols = [col for col in sample_cols if col in df.columns]
        print(df[sample_cols].head(10))

    except Exception as e:
        print(f"处理文件时出错: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()