# Deployment Notes

Just some notes on how I deployed this React app to Vercel. Pretty straightforward once you get it working.

## Quick setup

The easiest way is to just connect your GitHub repo to Vercel:

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project" and import your repo
3. Vercel automatically detects it's a Vite project, so just hit Deploy
4. That's it - you get a live URL

## If you want to use the CLI instead

```bash
npm i -g vercel
vercel login
vercel --prod
```

I had some issues initially with the build failing, but it was just missing React imports. Fixed that and it deployed fine.

## GitHub Actions setup (optional)

I set up auto-deployments so it redeploys whenever I push to main. If you want that:

1. Go to your repo Settings → Secrets and variables → Actions
2. Add these secrets (get them from Vercel):
   - `VERCEL_TOKEN` - from vercel.com/account/tokens
   - `ORG_ID` - from your Vercel team settings
   - `PROJECT_ID` - from your project settings
   - `VERCEL_ORG_ID` - same as ORG_ID

The workflow file is already in `.github/workflows/ci-cd.yml` so it should just work.

## Configuration files

- `vercel.json` - tells Vercel how to build and route the app
- `.vercelignore` - excludes test files and docs from deployment
- The GitHub Actions workflow runs tests before deploying

## Troubleshooting stuff I ran into

**Build failures:**
- Make sure React is imported in your main files (App.tsx, main.tsx)
- Test the build locally first: `npm run build`

**Routing issues:**
- The vercel.json handles SPA routing so refreshing pages works

**Large bundle warning:**
- It complains about bundle size but it's fine for this project (1.26MB)
- Could add code splitting later if needed

## Environment variables

If you need env vars, add them in the Vercel dashboard under Project Settings. For local dev, create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

## Testing the deployment

After deploying, check:
- App loads properly
- Navigation works (especially page refreshes)
- All features work the same as local
- No console errors

## My deployment workflow

1. Push changes to main branch
2. GitHub Actions automatically runs tests
3. If tests pass, deploys to Vercel
4. Get a new deployment URL

For pull requests, it creates preview deployments which is pretty cool.

## Links

- Live app: https://invigilator-assessment-q9rxg5ty7-yehualashets-projects.vercel.app
- Vercel dashboard: https://vercel.com/yehualashets-projects/invigilator-assessment-hub

The whole setup took maybe 15 minutes once I figured out the React import issue. 