import pandas as pd
import os
import sys

def is_china_itinerary(itinerary, china_cities):
    """检查行程是否涉及中国城市"""
    if pd.isna(itinerary):
        return False
    itinerary_str = str(itinerary)
    for city in china_cities:
        if city in itinerary_str:
            return True
    return False

def process_excel_file(input_path, output_dir=None):
    """处理单个Excel文件"""
    try:
        print(f"读取文件: {input_path}")

        # 读取Excel文件
        df = pd.read_excel(input_path)
        print(f"原始数据形状: {df.shape}")

        # 确保行程列是字符串类型
        if '行程' in df.columns:
            df['行程'] = df['行程'].astype(str)
            print("已将行程列转换为字符串类型")

        # 确保返点列是字符串类型
        if '返点' in df.columns:
            df['返点'] = df['返点'].astype(str)
            print("已将返点列转换为字符串类型")

        # 定义中国城市列表
        china_cities = [
            '北京', '上海', '广州', '深圳', '成都', '重庆', '杭州', '武汉', '西安', '南京',
            '天津', '郑州', '长沙', '沈阳', '青岛', '合肥', '福州', '厦门', '南昌', '济南',
            '南宁', '海口', '贵阳', '昆明', '太原', '长春', '哈尔滨', '石家庄', '兰州', '西宁',
            '银川', '乌鲁木齐', '拉萨', '呼和浩特', '香港', '澳门', '台北', '高雄', '台中'
        ]

        # 检查行程是否涉及中国城市
        china_mask = df['行程'].apply(lambda x: is_china_itinerary(x, china_cities))
        china_count = china_mask.sum()
        non_china_count = len(df) - china_count

        print(f"涉及中国城市的行程数量: {china_count}")
        print(f"不涉及中国城市的行程数量: {non_china_count}")

        # 显示示例
        if non_china_count > 0:
            print(f"\n不涉及中国城市的行程示例:")
            non_china_examples = df[~china_mask]['行程'].head(5).tolist()
            for i, example in enumerate(non_china_examples, 1):
                print(f"  {i}. {example}")

        if china_count > 0:
            print(f"\n涉及中国城市的行程示例:")
            china_examples = df[china_mask]['行程'].head(5).tolist()
            for i, example in enumerate(china_examples, 1):
                print(f"  {i}. {example}")

        # 检查返点列当前值
        print(f"\n返点列当前值统计:")
        print(df['返点'].value_counts(dropna=False))

        # 检查修改前不涉及中国城市的行程中已有返点值的数量
        existing_non_china_rebate = df.loc[~china_mask, '返点'].notna().sum()
        print(f"\n修改前，不涉及中国城市的行程中已有返点值的数量: {existing_non_china_rebate}")

        # 将不涉及中国城市的行程返点设置为'0%'
        df.loc[~china_mask, '返点'] = '0%'

        # 验证修改结果
        non_china_rebate_zero = (df.loc[~china_mask, '返点'] == '0%').sum()
        print(f"修改后，不涉及中国城市的行程中返点为'0%'的数量: {non_china_rebate_zero}/{non_china_count}")

        # 检查涉及中国城市的行程返点值
        print(f"\n涉及中国城市的行程返点值统计 (排除nan):")
        china_rebate_stats = df.loc[china_mask, '返点'].value_counts()
        print(china_rebate_stats)

        # 生成输出文件名
        input_filename = os.path.basename(input_path)
        filename_no_ext = os.path.splitext(input_filename)[0]

        if output_dir:
            output_path = os.path.join(output_dir, f"{filename_no_ext}_processed.xlsx")
        else:
            output_path = f"{filename_no_ext}_processed.xlsx"

        print(f"\n保存处理后的文件到: {output_path}")

        # 保存为xlsx格式
        df.to_excel(output_path, index=False)

        # 验证文件大小
        file_size = os.path.getsize(output_path)
        print(f"文件保存成功! 文件大小: {file_size} 字节")

        # 最终验证
        print(f"\n验证: 不涉及中国城市的行程中返点为'0%'的数量: {non_china_rebate_zero}/{non_china_count}")
        if non_china_rebate_zero == non_china_count:
            print("✅ 所有不涉及中国城市的行程返点已成功设置为0%")
        else:
            print("⚠️ 部分不涉及中国城市的行程返点设置失败")

        # 最终统计
        print(f"\n最终统计:")
        print(f"- 总行数: {len(df)}")
        print(f"- 涉及中国城市的行程: {china_count} 行")
        print(f"- 不涉及中国城市的行程: {non_china_count} 行")
        print(f"- 返点为'0%'的行: {non_china_rebate_zero} 行")

        # 显示处理后的前10行数据示例
        print(f"\n处理后的前10行数据示例:")
        print(df[['行程', '返点']].head(10))

        print(f"\n处理完成!")
        return True, output_path

    except Exception as e:
        print(f"处理文件时出错: {e}")
        print(f"\n处理失败!")
        import traceback
        traceback.print_exc()
        return False, None

def main():
    """主函数：批量处理Excel文件"""
    # 获取当前工作目录
    current_dir = os.getcwd()
    print(f"当前工作目录: {current_dir}")

    # 要处理的文件列表
    files_to_process = [
        "C:/Users/EDY/AppData/Local/Temp/lobsterai/attachments/2025年TK-1773201245959-sxs7b5.xls",
        "C:/Users/EDY/AppData/Local/Temp/lobsterai/attachments/2025年LH-1773201256364-b21fag.xls"
    ]

    # 输出目录
    output_dir = current_dir

    print("开始批量处理Excel文件...")
    print("=" * 60)

    results = []
    for input_file in files_to_process:
        if os.path.exists(input_file):
            print(f"\n处理文件: {os.path.basename(input_file)}")
            print("-" * 40)
            success, output_path = process_excel_file(input_file, output_dir)
            results.append({
                'input': input_file,
                'output': output_path,
                'success': success
            })
            print("=" * 60)
        else:
            print(f"文件不存在: {input_file}")
            results.append({
                'input': input_file,
                'output': None,
                'success': False
            })

    # 汇总结果
    print("\n批量处理完成!")
    print("处理结果汇总:")
    for result in results:
        status = "✅ 成功" if result['success'] else "❌ 失败"
        print(f"- {os.path.basename(result['input'])}: {status}")
        if result['output']:
            print(f"  输出文件: {result['output']}")

if __name__ == "__main__":
    main()