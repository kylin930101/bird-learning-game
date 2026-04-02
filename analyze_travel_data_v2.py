import pandas as pd
import re
from collections import Counter

def parse_travel_routes(file_path):
    """
    解析行程路线数据，统计中国境内至境外的目的地
    """
    try:
        # 读取Excel文件
        print(f"正在读取文件: {file_path}")
        df = pd.read_excel(file_path, sheet_name=0)

        print(f"数据形状: {df.shape}")
        print(f"列名: {list(df.columns)}")

        # 显示一些样本数据
        print("\n前10行数据:")
        for i in range(min(10, len(df))):
            print(f"  {i+1}: {df.iloc[i]['行程名称']}")

        # 中国城市列表（常见出发城市）
        china_cities = [
            '北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '重庆', '武汉', '西安',
            '厦门', '青岛', '大连', '沈阳', '哈尔滨', '长春', '天津', '苏州', '宁波', '温州',
            '福州', '泉州', '长沙', '郑州', '合肥', '南昌', '昆明', '贵阳', '南宁', '海口',
            '三亚', '乌鲁木齐', '拉萨', '呼和浩特', '银川', '西宁', '兰州',
            # 机场代码对应的城市
            'PEK', 'PVG', 'SHA', 'CAN', 'SZX', 'HGH', 'NKG', 'CTU', 'CKG', 'WUH',
            'XIY', 'XMN', 'TAO', 'DLC', 'SHE', 'HRB', 'CGQ', 'TSN', 'FOC', 'KMG'
        ]

        # 境外目的地统计
        overseas_destinations = Counter()
        china_to_overseas_count = 0

        print("\n开始分析行程数据...")

        for idx, route in df['行程名称'].items():
            route_str = str(route).strip()
            if not route_str or route_str == 'nan':
                continue

            # 分割行程段（使用空格、->、→等分隔符）
            segments = re.split(r'[\s→]+', route_str)
            segments = [s.strip() for s in segments if s.strip()]

            # 分析每个行程段
            for segment in segments:
                # 检查是否包含中国城市到境外
                for china_city in china_cities:
                    if china_city in segment:
                        # 尝试提取目的地
                        # 格式可能是: 中国城市->境外目的地 或 境外目的地->中国城市
                        if '->' in segment:
                            parts = segment.split('->')
                            if len(parts) == 2:
                                from_city, to_city = parts[0].strip(), parts[1].strip()

                                # 判断方向
                                if china_city in from_city:
                                    # 中国出发到境外
                                    destination = to_city
                                    # 检查目的地是否不是中国城市
                                    is_overseas = True
                                    for other_china in china_cities:
                                        if other_china in destination and other_china != china_city:
                                            is_overseas = False
                                            break

                                    if is_overseas:
                                        overseas_destinations[destination] += 1
                                        china_to_overseas_count += 1
                                        if china_to_overseas_count <= 5:
                                            print(f"  找到: {from_city} -> {destination}")
                                elif china_city in to_city:
                                    # 境外到中国，忽略
                                    pass

        print(f"\n分析完成，共找到 {china_to_overseas_count} 条中国境内至境外的行程")

        if overseas_destinations:
            print(f"\n境外目的地统计 (按频次排序):")
            sorted_dests = sorted(overseas_destinations.items(), key=lambda x: x[1], reverse=True)

            for dest, count in sorted_dests[:50]:  # 显示前50个
                print(f"  {dest}: {count} 次")

            # 保存结果到CSV
            result_df = pd.DataFrame(sorted_dests, columns=['目的地', '次数'])
            result_file = file_path.replace('.xls', '_境外目的地统计.csv')
            result_df.to_csv(result_file, index=False, encoding='utf-8-sig')
            print(f"\n结果已保存到: {result_file}")

            return sorted_dests
        else:
            print("未找到中国境内至境外的行程记录")
            return []

    except Exception as e:
        print(f"分析过程中出错: {e}")
        import traceback
        traceback.print_exc()
        return []

def analyze_by_pattern(file_path):
    """
    使用模式匹配分析行程数据
    """
    try:
        df = pd.read_excel(file_path, sheet_name=0)

        # 常见模式
        patterns = [
            r'([\u4e00-\u9fa5A-Z]+)->([\u4e00-\u9fa5A-Z]+)',  # 中文或英文城市->城市
            r'([A-Z]{3})->([A-Z]{3})',  # 机场代码->机场代码
        ]

        all_destinations = Counter()

        for idx, route in df['行程名称'].items():
            route_str = str(route).strip()

            for pattern in patterns:
                matches = re.findall(pattern, route_str)
                for match in matches:
                    if len(match) == 2:
                        from_city, to_city = match
                        all_destinations[(from_city, to_city)] += 1

        print(f"\n所有行程段统计 (前20个):")
        sorted_routes = sorted(all_destinations.items(), key=lambda x: x[1], reverse=True)

        for (from_city, to_city), count in sorted_routes[:20]:
            print(f"  {from_city} -> {to_city}: {count} 次")

        return sorted_routes

    except Exception as e:
        print(f"模式分析出错: {e}")
        return []

if __name__ == "__main__":
    file_path = r"C:\Users\EDY\lobsterai\project\.cowork-temp\attachments\manual\10354854-07b6-4b5f-87ee-b49e78c3f4b7-1774491217395-dr6c0x.xls"

    print("=== 方法1: 基于城市名称分析 ===")
    result1 = parse_travel_routes(file_path)

    print("\n\n=== 方法2: 基于模式匹配分析 ===")
    result2 = analyze_by_pattern(file_path)

    # 综合建议
    print("\n\n=== 分析建议 ===")
    print("根据数据格式，建议:")
    print("1. 数据中的行程可能是多段行程组合")
    print("2. 需要更明确地定义'中国境内'和'境外'的识别规则")
    print("3. 可以考虑添加机场代码到城市的映射表")
    print("4. 如果需要更精确的分析，请提供数据字段说明")