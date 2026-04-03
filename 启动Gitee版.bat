@echo off
chcp 65001 >nul
title 🐦 鸟类认知学习游戏 - Gitee Pages版

echo.
echo ========================================
echo    🐦 鸟类认知学习游戏 - Gitee Pages版
echo ========================================
echo.

echo 🐱 小林正在为你启动游戏...
echo.

echo 📁 检查项目文件...
if not exist "gitee-index.html" (
    echo ❌ 错误：找不到 gitee-index.html 文件
    pause
    exit /b 1
)

echo ✅ 项目文件检查完成
echo.

echo 🎮 启动游戏...
echo.
echo 📍 本地访问：在浏览器中打开 gitee-index.html
echo 🌐 部署地址：https://你的用户名.gitee.io/bird-quiz-web
echo.

echo 🔧 可选操作：
echo 1. 按 1 生成鸟类数据
echo 2. 按 2 启动本地服务器
echo 3. 按 3 打开部署指南
echo 4. 按 4 直接打开游戏
echo 5. 按 其他键 退出
echo.

set /p choice=请选择操作 (1-4):

if "%choice%"=="1" (
    echo 🐦 正在生成鸟类数据...
    node create-birds-data.js
    echo ✅ 鸟类数据生成完成！
    pause
    goto :open_game
)

if "%choice%"=="2" (
    echo 🚀 启动本地服务器...
    node server.js
    exit /b 0
)

if "%choice%"=="3" (
    echo 📖 打开部署指南...
    start "Gitee Pages 部署指南" "Gitee-Pages-部署指南.md"
    pause
    goto :open_game
)

if "%choice%"=="4" (
    :open_game
    echo 🎮 正在打开游戏...
    start "" "gitee-index.html"
    echo.
    echo ✅ 游戏已启动！
    echo 📱 请在浏览器中查看游戏
    echo 🐱 制作：小林 为 姐姐 精心打造
    pause
    exit /b 0
)

echo 👋 再见！
timeout /t 3 >nul
exit /b 0