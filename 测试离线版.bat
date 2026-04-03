@echo off
chcp 65001 >nul
echo.
echo ========================================
echo 🐦 鸟类学习游戏 - 离线版测试工具
echo ========================================
echo.
echo 姐姐，这个工具可以帮助你测试离线版本的游戏！
echo.

:menu
echo 请选择要执行的操作：
echo.
echo 1. 打开离线游戏测试页面
echo 2. 查看离线游戏文件信息
echo 3. 打开离线游戏（在线预览）
echo 4. 复制文件到桌面（方便发送到手机）
echo 5. 退出
echo.
set /p choice="请输入数字选择 (1-5): "

if "%choice%"=="1" goto testpage
if "%choice%"=="2" goto fileinfo
if "%choice%"=="3" goto openoffline
if "%choice%"=="4" goto copytodesktop
if "%choice%"=="5" goto exit

echo 选择无效，请重新输入！
goto menu

:testpage
echo.
echo 正在打开测试页面...
start "" "test-offline.html"
echo 测试页面已打开！请按照页面上的说明操作。
echo.
pause
goto menu

:fileinfo
echo.
echo 📁 离线游戏文件信息：
echo.
dir "bird-game-offline.html"
echo.
echo 📱 使用方法：
echo   1. 将此文件发送到手机
echo   2. 在手机浏览器中直接打开
echo   3. 无需网络，随时随地玩！
echo.
pause
goto menu

:openoffline
echo.
echo 正在打开离线游戏...
start "" "bird-game-offline.html"
echo 离线游戏已打开！请测试游戏功能。
echo.
echo 💡 提示：要测试真正的离线功能，请：
echo   1. 断开网络连接
echo   2. 刷新页面
echo   3. 游戏应该仍然可以正常运行
echo.
pause
goto menu

:copytodesktop
echo.
echo 正在复制离线游戏文件到桌面...
copy "bird-game-offline.html" "%USERPROFILE%\Desktop\鸟类学习游戏-离线版.html"
if errorlevel 1 (
    echo ❌ 复制失败！
) else (
    echo ✅ 文件已复制到桌面：鸟类学习游戏-离线版.html
    echo.
    echo 📱 现在你可以：
    echo   1. 使用微信文件传输助手发送到手机
    echo   2. 或使用QQ发送到手机
    echo   3. 或在手机浏览器中直接打开
)
echo.
pause
goto menu

:exit
echo.
echo 谢谢使用！有问题随时找小林哦～ 🐱
echo.
pause
exit