# GitHub Actions Deployment Setup

This guide will help you set up automatic deployment of your Recipe Finder app to Vercel using GitHub Actions.

## 🚀 Quick Setup

### Option 1: Using Vercel's Official Action (Recommended)

1. **Choose the workflow file**: Use `.github/workflows/vercel-deploy.yml` for simpler setup
2. **Set up GitHub Secrets**: Follow the secrets configuration below
3. **Push to main branch**: Automatic deployment will trigger

### Option 2: Using Custom Vercel CLI Action

1. **Choose the workflow file**: Use `.github/workflows/deploy.yml` for more control
2. **Set up GitHub Secrets**: Follow the secrets configuration below
3. **Push to main branch**: Automatic deployment will trigger

## 🔧 Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### 1. VERCEL_TOKEN
- **How to get it**: 
  1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
  2. Navigate to Settings → Tokens
  3. Create a new token with appropriate permissions
  4. Copy the token value

### 2. VERCEL_ORG_ID
- **How to get it**:
  1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
  2. Navigate to Settings → General
  3. Copy the "Team ID" (this is your org ID)

### 3. VERCEL_PROJECT_ID
- **How to get it**:
  1. Go to your project in Vercel Dashboard
  2. Navigate to Settings → General
  3. Copy the "Project ID"

### 4. NEXT_PUBLIC_SPOONACULAR_API_KEY
- **Value**: Your Spoonacular API key
- **Purpose**: Used during build process for environment variables

## 📝 Setting Up GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Click "New repository secret"**
4. **Add each secret**:
   - Name: `VERCEL_TOKEN`, Value: Your Vercel token
   - Name: `VERCEL_ORG_ID`, Value: Your Vercel org ID
   - Name: `VERCEL_PROJECT_ID`, Value: Your Vercel project ID
   - Name: `NEXT_PUBLIC_SPOONACULAR_API_KEY`, Value: Your API key

## 🔄 Workflow Triggers

The workflows are configured to trigger on:

- **Push to main/master branch**: Automatic production deployment
- **Pull requests to main/master**: Preview deployment
- **Manual trigger**: Use the "workflow_dispatch" option in GitHub Actions tab

## 🛠️ Workflow Features

### Code Quality Checks
- **Linting**: Runs ESLint to check code quality
- **Type Checking**: Runs TypeScript compiler to check types
- **Build Verification**: Ensures the app builds successfully

### Deployment Options
- **Production**: Deploys to production environment
- **Preview**: Deploys to preview environment for testing

### Caching
- **Node modules**: Cached between runs for faster builds
- **Dependencies**: Uses `npm ci` for consistent installs

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check if all dependencies are properly installed
   - Verify TypeScript types are correct
   - Ensure environment variables are set

2. **Deployment Fails**
   - Verify Vercel secrets are correct
   - Check if project is properly linked to Vercel
   - Ensure Vercel token has appropriate permissions

3. **Environment Variables Not Working**
   - Verify `NEXT_PUBLIC_SPOONACULAR_API_KEY` is set in GitHub secrets
   - Check if the variable is properly referenced in the workflow

### Debug Steps

1. **Check GitHub Actions logs**:
   - Go to Actions tab in your repository
   - Click on the failed workflow run
   - Review the logs for specific error messages

2. **Verify Vercel configuration**:
   - Ensure project is properly set up in Vercel
   - Check if domain and settings are configured correctly

3. **Test locally first**:
   - Run `npm run build` locally to ensure it works
   - Test with the same environment variables

## 📋 Manual Deployment

If you need to deploy manually:

1. **Go to GitHub Actions tab**
2. **Select the workflow** (either `Deploy to Vercel` or `Deploy to Vercel (Official Action)`)
3. **Click "Run workflow"**
4. **Choose the branch and environment**
5. **Click "Run workflow"**

## 🔒 Security Best Practices

1. **Never commit secrets**: Always use GitHub secrets for sensitive data
2. **Use least privilege**: Give Vercel token minimal required permissions
3. **Rotate tokens regularly**: Update Vercel tokens periodically
4. **Review workflow permissions**: Ensure workflows only have necessary access

## 📞 Support

If you encounter issues:

1. **Check the workflow logs** for specific error messages
2. **Verify all secrets are correctly set**
3. **Ensure your Vercel project is properly configured**
4. **Test the build process locally first**

## 🎯 Next Steps

After setting up GitHub Actions:

1. **Push your changes** to the main branch
2. **Monitor the deployment** in GitHub Actions tab
3. **Verify the deployment** on your Vercel dashboard
4. **Test the live application** to ensure everything works

---

**Happy Deploying! 🚀** 