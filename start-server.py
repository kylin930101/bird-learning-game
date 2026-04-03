#!/usr/bin/env python3
"""
🐦 鸟类学习游戏 - 本地服务器启动脚本
作者：小林 🐱 为姐姐精心制作
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from datetime import datetime

# 服务器配置
PORT = 8000
HOST = "localhost"
GAME_DIR = os.path.dirname(os.path.abspath(__file__))

class GameHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义HTTP请求处理器"""

    def log_message(self, format, *args):
        """自定义日志格式"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {self.address_string()} - {format % args}")

    def end_headers(self):
        """添加CORS头，允许跨域访问"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    """启动本地服务器"""
    os.chdir(GAME_DIR)  # 切换到游戏目录

    print("=" * 60)
    print("🐦 鸟类认知学习游戏 - 本地服务器")
    print("=" * 60)
    print(f"游戏目录: {GAME_DIR}")
    print(f"服务器地址: http://{HOST}:{PORT}")
    print(f"主游戏文件: index.html")
    print("-" * 60)
    print("📱 支持的设备:")
    print("  • 电脑浏览器 (Chrome, Firefox, Edge, Safari)")
    print("  • 手机浏览器 (iOS Safari, Android Chrome)")
    print("  • 平板电脑 (iPad, Android平板)")
    print("-" * 60)
    print("🎮 游戏模式:")
    print("  1. 学习模式 - 浏览所有鸟类图片和信息")
    print("  2. 识别模式 - 看图猜鸟名，测试识别能力")
    print("  3. 记忆模式 - 翻牌配对游戏，锻炼记忆力")
    print("  4. 挑战模式 - 限时答题挑战，争夺最高分")
    print("=" * 60)

    try:
        # 创建服务器
        with socketserver.TCPServer((HOST, PORT), GameHTTPRequestHandler) as httpd:
            print(f"✅ 服务器已启动！正在监听端口 {PORT}...")
            print(f"🌐 请在浏览器中打开: http://{HOST}:{PORT}")
            print("📱 手机访问: 确保手机和电脑在同一网络，然后访问上述地址")
            print("🛑 按 Ctrl+C 停止服务器")
            print("-" * 60)

            # 尝试自动打开浏览器
            try:
                webbrowser.open(f"http://{HOST}:{PORT}")
                print("🌍 正在自动打开浏览器...")
            except:
                print("⚠️  无法自动打开浏览器，请手动访问上述地址")

            # 启动服务器
            httpd.serve_forever()

    except OSError as e:
        if e.errno == 10048:  # 端口被占用
            print(f"❌ 端口 {PORT} 已被占用！")
            print("请尝试以下解决方案:")
            print(f"  1. 关闭占用端口 {PORT} 的程序")
            print(f"  2. 修改脚本中的 PORT 变量为其他端口（如 8080）")
            print(f"  3. 等待几分钟后重试")
        else:
            print(f"❌ 启动服务器时出错: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
        sys.exit(0)

if __name__ == "__main__":
    start_server()