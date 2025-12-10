# GitHub & Netlify Setup Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `supreme-animation` (or your preferred name)
3. **Description**: "Modern portfolio website for Supreme Animation Studio"
4. **Visibility**: 
   - ✅ **Private** (recommended for client projects)
   - Or **Public** (if you want it public)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. **Click**: "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/supreme-animation.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication errors**, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

## Step 3: Deploy Frontend to Netlify

### Option A: Connect GitHub Repository (Recommended)

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up/Login** (use GitHub to sign in)
3. **Click**: "Add new site" → "Import an existing project"
4. **Select**: "GitHub"
5. **Authorize Netlify** to access your repositories
6. **Select repository**: `supreme-animation`
7. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)
8. **Add environment variables** (click "Show advanced"):
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.railway.app
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
9. **Click**: "Deploy site"
10. **Wait 2-5 minutes** for deployment

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Step 4: Deploy Backend (IMPORTANT)

**⚠️ Netlify does NOT support Express.js servers directly.**

You have two options:

### Option 1: Deploy Backend to Railway (Recommended - Easiest)

1. **Go to Railway**: https://railway.app
2. **Sign up** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select**: `supreme-animation` repository
5. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. **Add Environment Variables**:
   ```
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-site.netlify.app
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICEROLE_KEY=your_service_role_key
   SUPABASE_ANON_KEY=your_anon_key
   ```
7. **Deploy** - Railway will automatically deploy
8. **Copy backend URL** (e.g., `https://xxxxx.up.railway.app`)
9. **Update Netlify environment variable**:
   - Go to Netlify → Site settings → Environment variables
   - Update `NEXT_PUBLIC_BACKEND_URL` with Railway URL

### Option 2: Convert Backend to Netlify Functions

This requires rewriting the Express.js backend as Netlify Functions. More complex but keeps everything on Netlify.

**Not recommended** unless you want to refactor the entire backend.

## Step 5: Update Environment Variables

After both deployments:

1. **Netlify** (Frontend):
   - Update `NEXT_PUBLIC_BACKEND_URL` with Railway backend URL

2. **Railway** (Backend):
   - Update `FRONTEND_URL` with Netlify site URL

## Step 6: Test Deployment

1. **Visit your Netlify site**: `https://your-site.netlify.app`
2. **Test contact form**: Submit a test form
3. **Check browser console**: Look for any errors
4. **Test backend**: Visit `https://your-backend.railway.app/health`

## Troubleshooting

### Frontend Build Fails on Netlify

- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Check `next.config.ts` doesn't have static export enabled

### Backend Not Connecting

- Verify `NEXT_PUBLIC_BACKEND_URL` is correct in Netlify
- Check Railway backend is running (visit `/health` endpoint)
- Check CORS settings in backend allow Netlify domain

### Contact Form Not Working

- Open browser console (F12)
- Check for API errors
- Verify backend URL is correct
- Check Railway logs for errors

## Quick Commands Reference

```bash
# Git
git add .
git commit -m "Your message"
git push origin main

# Netlify CLI
netlify status
netlify deploy
netlify deploy --prod

# Railway CLI (if installed)
railway up
railway logs
```

## Architecture

```
┌─────────────────┐         ┌──────────────────┐
│     Netlify     │         │     Railway      │
│   (Frontend)    │◄────────┤    (Backend)     │
│   Next.js App   │         │  Express Server  │
└─────────────────┘         └────────┬─────────┘
                                     │
                                     ▼
                             Supabase Database
```

---

**Next Steps:**
1. Create GitHub repo
2. Push code
3. Deploy frontend to Netlify
4. Deploy backend to Railway
5. Update environment variables
6. Test everything!

