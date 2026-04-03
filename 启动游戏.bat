@echo off
chcp 65001 >nul
title 🐦 鸟类学习游戏 - 本地服务器
color 0B

echo ============================================================
echo 🐦 鸟类认知学习游戏 - 本地服务器启动器
echo ============================================================
echo.
echo 📁 游戏目录: %~dp0
echo 🌐 服务器地址: http://localhost:8000
echo 📱 支持设备: 电脑、手机、平板浏览器
echo.
echo 🎮 游戏模式:
echo   1. 学习模式 - 浏览所有鸟类图片和信息
echo   2. 识别模式 - 看图猜鸟名，测试识别能力
echo   3. 记忆模式 - 翻牌配对游戏，锻炼记忆力
echo   4. 挑战模式 - 限时答题挑战，争夺最高分
echo.
echo ============================================================
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Python！请确保已安装Python 3.x
    echo.
    echo 解决方案：
    echo   1. 下载并安装Python: https://www.python.org/downloads/
    echo   2. 安装时勾选"Add Python to PATH"
    echo   3. 重新运行此脚本
    pause
    exit /b 1
)

echo ✅ 检测到Python，正在启动服务器...
echo.

REM 启动Python服务器
python "%~dp0start-server.py"

if %errorlevel% neq 0 (
    echo.
    echo ❌ 服务器启动失败！
    echo.
    echo 常见问题解决方案：
    echo   1. 端口被占用 - 关闭其他使用端口8000的程序
    echo   2. 权限问题 - 尝试以管理员身份运行此脚本
    echo   3. Python路径问题 - 确保Python已正确安装
    echo.
    pause
)

exit /b 0