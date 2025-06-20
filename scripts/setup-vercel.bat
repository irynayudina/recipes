@echo off
REM Vercel Setup Script for Recipe Finder (Windows Batch)
REM This script helps you get the required IDs for GitHub Actions deployment

echo 🍳 Recipe Finder - Vercel Setup Script
echo ======================================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI is not installed.
    echo Please install it first: npm install -g vercel
    pause
    exit /b 1
)

echo ✅ Vercel CLI is installed
echo.

REM Check if user is logged in
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ You are not logged in to Vercel.
    echo Please run: vercel login
    pause
    exit /b 1
)

echo ✅ You are logged in to Vercel
echo.

REM Get current user info
echo 👤 Current user:
vercel whoami
echo.

REM Get team/org info
echo 🏢 Team/Organization ID:
vercel teams ls
echo.

REM Check if project is already linked
if exist ".vercel\project.json" (
    echo ✅ Project is already linked to Vercel
    echo.
    echo 📋 Project Information:
    type .vercel\project.json
    echo.
    
    echo 🔑 Required GitHub Secrets:
    echo VERCEL_TOKEN: Create at https://vercel.com/account/tokens
    echo VERCEL_ORG_ID: [Check project.json for orgId]
    echo VERCEL_PROJECT_ID: [Check project.json for projectId]
    echo NEXT_PUBLIC_SPOONACULAR_API_KEY: Your Spoonacular API key
) else (
    echo ❓ Project is not linked to Vercel
    echo.
    set /p response="Would you like to link this project to Vercel? (y/n): "
    
    if /i "%response%"=="y" (
        echo.
        echo 🔗 Linking project to Vercel...
        vercel link
        
        if %errorlevel% equ 0 (
            echo.
            echo ✅ Project linked successfully!
            echo.
            echo 🔑 Required GitHub Secrets:
            echo VERCEL_TOKEN: Create at https://vercel.com/account/tokens
            echo VERCEL_ORG_ID: [Check project.json for orgId]
            echo VERCEL_PROJECT_ID: [Check project.json for projectId]
            echo NEXT_PUBLIC_SPOONACULAR_API_KEY: Your Spoonacular API key
        ) else (
            echo ❌ Failed to link project to Vercel
            pause
            exit /b 1
        )
    ) else (
        echo ❌ Project linking cancelled
        pause
        exit /b 1
    )
)

echo.
echo 📝 Next Steps:
echo 1. Add the secrets above to your GitHub repository
echo 2. Push your code to trigger the GitHub Actions workflow
echo 3. Monitor the deployment in the Actions tab
echo.
echo 📚 For more information, see: GITHUB_ACTIONS_SETUP.md
pause 