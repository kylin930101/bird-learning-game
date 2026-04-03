@echo off
chcp 65001 >nul
title 🐦 鸟类认知学习游戏 - 公共网页版服务器
color 0A

echo.
echo ========================================
echo    🐦 鸟类认知学习游戏 - 公共网页版
echo ========================================
echo.
echo 🚀 正在启动服务器...
echo.

REM 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Node.js！
    echo 请先安装Node.js：https://nodejs.org/
    pause
    exit /b 1
)

REM 检查依赖是否安装
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败！
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成！
    echo.
)

echo 📊 服务器信息：
echo   端口：3000
echo   本地访问：http://localhost:3000
echo   局域网访问：http://%COMPUTERNAME%:3000
echo.

echo 🔧 启动选项：
echo   1. 启动服务器（默认）
echo   2. 开发模式（自动重启）
echo   3. 检查依赖
echo   4. 查看日志
echo   5. 退出
echo.

set /p choice="请选择 (1-5): "

if "%choice%"=="2" (
    echo 🛠️  启动开发模式...
    call npm run dev
) else if "%choice%"=="3" (
    echo 📦 检查依赖...
    call npm list --depth=0
    pause
    exit /b 0
) else if "%choice%"=="4" (
    echo 📝 查看日志...
    if exist "server.log" (
        type "server.log"
    ) else (
        echo 暂无日志文件
    )
    pause
    exit /b 0
) else if "%choice%"=="5" (
    echo 👋 再见！
    timeout /t 2 >nul
    exit /b 0
) else (
    echo 🚀 启动服务器...
    call npm start
)

echo.
echo ⚠️  服务器已停止
echo.
pause