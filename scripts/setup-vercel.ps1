# Vercel Setup Script for Recipe Finder (PowerShell)
# This script helps you get the required IDs for GitHub Actions deployment

Write-Host "🍳 Recipe Finder - Vercel Setup Script" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Vercel CLI not found"
    }
    Write-Host "✅ Vercel CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI is not installed." -ForegroundColor Red
    Write-Host "Please install it first: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if user is logged in
try {
    $whoami = vercel whoami 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Not logged in"
    }
    Write-Host "✅ You are logged in to Vercel" -ForegroundColor Green
} catch {
    Write-Host "❌ You are not logged in to Vercel." -ForegroundColor Red
    Write-Host "Please run: vercel login" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Get current user info
Write-Host "👤 Current user:" -ForegroundColor Cyan
vercel whoami
Write-Host ""

# Get team/org info
Write-Host "🏢 Team/Organization ID:" -ForegroundColor Cyan
vercel teams ls
Write-Host ""

# Check if project is already linked
if (Test-Path ".vercel/project.json") {
    Write-Host "✅ Project is already linked to Vercel" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Project Information:" -ForegroundColor Cyan
    
    try {
        $projectJson = Get-Content ".vercel/project.json" | ConvertFrom-Json
        $projectJson | ConvertTo-Json -Depth 10
        Write-Host ""
        
        Write-Host "🔑 Required GitHub Secrets:" -ForegroundColor Yellow
        Write-Host "VERCEL_TOKEN: Create at https://vercel.com/account/tokens" -ForegroundColor White
        Write-Host "VERCEL_ORG_ID: $($projectJson.orgId)" -ForegroundColor White
        Write-Host "VERCEL_PROJECT_ID: $($projectJson.projectId)" -ForegroundColor White
        Write-Host "NEXT_PUBLIC_SPOONACULAR_API_KEY: Your Spoonacular API key" -ForegroundColor White
    } catch {
        Write-Host "❌ Error reading project.json file" -ForegroundColor Red
    }
} else {
    Write-Host "❓ Project is not linked to Vercel" -ForegroundColor Yellow
    Write-Host ""
    $response = Read-Host "Would you like to link this project to Vercel? (y/n)"
    
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host ""
        Write-Host "🔗 Linking project to Vercel..." -ForegroundColor Cyan
        vercel link
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Project linked successfully!" -ForegroundColor Green
            Write-Host ""
            
            try {
                $projectJson = Get-Content ".vercel/project.json" | ConvertFrom-Json
                Write-Host "🔑 Required GitHub Secrets:" -ForegroundColor Yellow
                Write-Host "VERCEL_TOKEN: Create at https://vercel.com/account/tokens" -ForegroundColor White
                Write-Host "VERCEL_ORG_ID: $($projectJson.orgId)" -ForegroundColor White
                Write-Host "VERCEL_PROJECT_ID: $($projectJson.projectId)" -ForegroundColor White
                Write-Host "NEXT_PUBLIC_SPOONACULAR_API_KEY: Your Spoonacular API key" -ForegroundColor White
            } catch {
                Write-Host "❌ Error reading project.json file after linking" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ Failed to link project to Vercel" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Project linking cancelled" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Add the secrets above to your GitHub repository" -ForegroundColor White
Write-Host "2. Push your code to trigger the GitHub Actions workflow" -ForegroundColor White
Write-Host "3. Monitor the deployment in the Actions tab" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more information, see: GITHUB_ACTIONS_SETUP.md" -ForegroundColor Yellow 