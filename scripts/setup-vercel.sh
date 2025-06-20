#!/bin/bash

# Vercel Setup Script for Recipe Finder
# This script helps you get the required IDs for GitHub Actions deployment

echo "🍳 Recipe Finder - Vercel Setup Script"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "Please install it first: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI is installed"
echo ""

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "❌ You are not logged in to Vercel."
    echo "Please run: vercel login"
    exit 1
fi

echo "✅ You are logged in to Vercel"
echo ""

# Get current user info
echo "👤 Current user:"
vercel whoami
echo ""

# Get team/org info
echo "🏢 Team/Organization ID:"
vercel teams ls
echo ""

# Check if project is already linked
if [ -f ".vercel/project.json" ]; then
    echo "✅ Project is already linked to Vercel"
    echo ""
    echo "📋 Project Information:"
    cat .vercel/project.json | jq '.'
    echo ""
    
    echo "🔑 Required GitHub Secrets:"
    echo "VERCEL_TOKEN: Create at https://vercel.com/account/tokens"
    echo "VERCEL_ORG_ID: $(cat .vercel/project.json | jq -r '.orgId')"
    echo "VERCEL_PROJECT_ID: $(cat .vercel/project.json | jq -r '.projectId')"
    echo "NEXT_PUBLIC_SPOONACULAR_API_KEY: Your Spoonacular API key"
else
    echo "❓ Project is not linked to Vercel"
    echo ""
    echo "Would you like to link this project to Vercel? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo ""
        echo "🔗 Linking project to Vercel..."
        vercel link
        
        echo ""
        echo "✅ Project linked successfully!"
        echo ""
        echo "🔑 Required GitHub Secrets:"
        echo "VERCEL_TOKEN: Create at https://vercel.com/account/tokens"
        echo "VERCEL_ORG_ID: $(cat .vercel/project.json | jq -r '.orgId')"
        echo "VERCEL_PROJECT_ID: $(cat .vercel/project.json | jq -r '.projectId')"
        echo "NEXT_PUBLIC_SPOONACULAR_API_KEY: Your Spoonacular API key"
    else
        echo "❌ Project linking cancelled"
        exit 1
    fi
fi

echo ""
echo "📝 Next Steps:"
echo "1. Add the secrets above to your GitHub repository"
echo "2. Push your code to trigger the GitHub Actions workflow"
echo "3. Monitor the deployment in the Actions tab"
echo ""
echo "📚 For more information, see: GITHUB_ACTIONS_SETUP.md" 