# Deployment Guide - Vercel + GitHub Actions

This guide will help you deploy the Invigilator Assessment Hub to Vercel with automatic CI/CD using GitHub Actions.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Automatic (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

#### Option B: Manual via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Set Up GitHub Actions (Optional but Recommended)

For automatic deployments on every push, you'll need to add these secrets to your GitHub repository:

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:

```
VERCEL_TOKEN: Your Vercel token (get from vercel.com/account/tokens)
ORG_ID: Your Vercel team/org ID (get from vercel.com/teams/settings)
PROJECT_ID: Your project ID (get from vercel project settings)
VERCEL_ORG_ID: Same as ORG_ID (legacy compatibility)
```

### 4. How to Get Vercel IDs

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Get project info
vercel env ls
```

The `.vercel/project.json` file will contain your `orgId` and `projectId`.

## 📁 Configuration Files

- **`vercel.json`** - Vercel deployment configuration
- **`.github/workflows/ci-cd.yml`** - GitHub Actions pipeline
- **`.vercelignore`** - Files to exclude from deployment

## 🔄 Deployment Workflow

1. **Push to `dev` branch** → Runs tests and builds
2. **Create Pull Request to `main`** → Deploys preview environment
3. **Merge to `main`** → Deploys to production

## 🌍 Environment Variables

If you need environment variables:

1. Add them in Vercel dashboard → Project Settings → Environment Variables
2. For local development, create `.env.local`:

```env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

## ✅ Verification

After deployment:
- ✅ Check your app loads at the Vercel URL
- ✅ Verify routing works (try refreshing on different pages)
- ✅ Test all features work in production
- ✅ Check GitHub Actions are running on new commits

## 🐛 Troubleshooting

**Build fails?**
```bash
# Test locally first
npm run build
npm run preview
```

**Routing issues?**
- The `vercel.json` handles SPA routing automatically

**Large bundle warning?**
- Consider code splitting if needed (the warning is just informational)

## 📊 Performance

Current build size: ~1.26MB (395KB gzipped)
- This is acceptable for a React app with Ant Design
- Consider dynamic imports for further optimization if needed

---

**Your app should now be live! 🎉** 