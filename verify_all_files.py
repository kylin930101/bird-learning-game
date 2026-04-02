import pandas as pd
import os

def verify_file(file_path):
    """验证单个文件处理结果"""
    print(f"验证文件: {os.path.basename(file_path)}")

    try:
        df = pd.read_excel(file_path)

        # 定义中国城市列表
        china_cities = [
            '北京', '上海', '广州', '深圳', '成都', '重庆', '杭州', '武汉', '西安', '南京',
            '天津', '郑州', '长沙', '沈阳', '青岛', '合肥', '福州', '厦门', '南昌', '济南',
            '南宁', '海口', '贵阳', '昆明', '太原', '长春', '哈尔滨', '石家庄', '兰州', '西宁',
            '银川', '乌鲁木齐', '拉萨', '呼和浩特', '香港', '澳门', '台北', '高雄', '台中'
        ]

        # 检查行程是否涉及中国城市
        def is_china_itinerary(itinerary):
            if pd.isna(itinerary):
                return False
            itinerary_str = str(itinerary)
            for city in china_cities:
                if city in itinerary_str:
                    return True
            return False

        china_mask = df['行程'].apply(is_china_itinerary)
        china_count = china_mask.sum()
        non_china_count = len(df) - china_count

        # 检查不涉及中国城市的行程返点是否为'0%'
        non_china_rebate_zero = (df.loc[~china_mask, '返点'] == '0%').sum()

        print(f"文件行数: {len(df)}")
        print(f"涉及中国城市的行程: {china_count} 行")
        print(f"不涉及中国城市的行程: {non_china_count} 行")
        print(f"不涉及中国城市的行程中返点为'0%': {non_china_rebate_zero}/{non_china_count} 行")

        if non_china_rebate_zero == non_china_count:
            print("✅ 所有不涉及中国城市的行程返点都已正确设置为0%")
        else:
            print("❌ 部分不涉及中国城市的行程返点设置不正确")

        # 检查涉及中国城市的行程返点值
        china_rebate_stats = df.loc[china_mask, '返点'].value_counts()
        print(f"\n涉及中国城市的行程返点值统计:")
        print(china_rebate_stats)

        # 显示示例
        print(f"\n示例数据 (前3行):")
        print(df[['行程', '返点']].head(3))

        if non_china_count > 0:
            print(f"\n不涉及中国城市的行程示例 (前3行):")
            print(df[~china_mask][['行程', '返点']].head(3))

        if china_count > 0:
            print(f"\n涉及中国城市的行程示例 (前3行):")
            print(df[china_mask][['行程', '返点']].head(3))

        print("-" * 60)
        return True

    except Exception as e:
        print(f"验证文件时出错: {e}")
        return False

def main():
    """验证所有处理后的文件"""
    files_to_verify = [
        "2025年UA-1773200229155-luacht_processed.xlsx",
        "2025年TK-1773201245959-sxs7b5_processed.xlsx",
        "2025年LH-1773201256364-b21fag_processed.xlsx"
    ]

    print("开始验证所有处理后的文件...")
    print("=" * 60)

    all_success = True
    for file_name in files_to_verify:
        file_path = os.path.join(os.getcwd(), file_name)
        if os.path.exists(file_path):
            success = verify_file(file_path)
            if not success:
                all_success = False
        else:
            print(f"文件不存在: {file_name}")
            all_success = False

    print("\n验证完成!")
    if all_success:
        print("✅ 所有文件都处理成功!")
    else:
        print("⚠️ 部分文件验证失败")

    # 显示文件列表
    print(f"\n生成的文件列表:")
    for file_name in files_to_verify:
        file_path = os.path.join(os.getcwd(), file_name)
        if os.path.exists(file_path):
            file_size = os.path.getsize(file_path)
            print(f"- {file_name} ({file_size} 字节)")

if __name__ == "__main__":
    main()