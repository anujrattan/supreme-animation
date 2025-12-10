# Netlify Deployment Guide

This guide covers deploying the Supreme Animation Studio website to Netlify.

## Architecture Overview

Since Netlify is optimized for frontend/static sites and serverless functions, we'll use a hybrid deployment:

- **Frontend (Next.js)**: Deployed to Netlify
- **Backend (Express)**: Deployed separately to Railway, Render, or similar Node.js hosting service

```
┌─────────────────┐         ┌──────────────────┐
│     Netlify     │         │  Railway/Render  │
│   (Frontend)    │◄────────┤    (Backend)     │
│   Next.js App   │         │  Express Server  │
└─────────────────┘         └────────┬─────────┘
                                      │
                                      ▼
                              Supabase Database
```

## Prerequisites

1. **Netlify Account**
   - Sign up at [netlify.com](https://www.netlify.com) (free tier available)

2. **Backend Hosting Account** (choose one):
   - [Railway](https://railway.app) (recommended - easy setup)
   - [Render](https://render.com) (free tier available)
   - [Fly.io](https://fly.io)
   - Or any Node.js hosting service

3. **GitHub Repository**
   - Your code should be in a GitHub repository
   - Netlify will connect to this for automatic deployments

4. **Environment Variables Ready**
   - Supabase URL
   - Supabase Anon Key
   - Backend API URL (will be set after backend deployment)

## Step 1: Deploy Backend First

The backend must be deployed first so you can get the production URL for the frontend environment variables.

### Option A: Deploy to Railway (Recommended)

1. **Sign up/Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway should auto-detect the backend folder
   - If not, set **Root Directory** to `backend`
   - Set **Build Command**: `npm install && npm run build`
   - Set **Start Command**: `npm start`

4. **Add Environment Variables**
   - Click on your service → Variables tab
   - Add the following:
     ```
     PORT=3001
     FRONTEND_URL=https://your-netlify-site.netlify.app
     SUPABASE_URL=your_supabase_url
     SUPABASE_SERVICEROLE_KEY=your_supabase_service_role_key
     SUPABASE_ANON_KEY=your_supabase_anon_key
     NODE_ENV=production
     ```
   - Note: Update `FRONTEND_URL` after deploying frontend

5. **Deploy**
   - Railway will automatically deploy
   - Once deployed, copy the production URL (e.g., `https://your-backend.railway.app`)

### Option B: Deploy to Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `supreme-animation-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   - Scroll to "Environment Variables" section
   - Add the same variables as Railway (see above)

5. **Deploy**
   - Click "Create Web Service"
   - Once deployed, copy the production URL

## Step 2: Deploy Frontend to Netlify

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Login to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Sign in with GitHub

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your GitHub repositories
   - Select your `supremeAnimation` repository

3. **Configure Build Settings**
   - **Base directory**: Leave empty (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (Netlify will auto-detect this with the plugin)

4. **Add Environment Variables**
   - Click "Show advanced" → "New variable"
   - Add the following variables:
     ```
     NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Replace `your-backend.railway.app` with your actual backend URL from Step 1

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your site
   - Wait for deployment to complete (usually 2-5 minutes)

6. **Get Your Site URL**
   - Once deployed, you'll get a URL like `https://random-name-12345.netlify.app`
   - Copy this URL

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Follow the prompts to link your site
   - Choose "Create & configure a new site"

4. **Set Environment Variables**
   ```bash
   netlify env:set NEXT_PUBLIC_BACKEND_URL "https://your-backend.railway.app"
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_supabase_url"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_supabase_anon_key"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 3: Update Backend CORS Settings

After deploying the frontend, update the backend's `FRONTEND_URL` environment variable:

1. **Railway**: Go to your service → Variables → Update `FRONTEND_URL` to your Netlify URL
2. **Render**: Go to your service → Environment → Update `FRONTEND_URL`

Then restart the backend service.

## Step 4: Configure Custom Domain (Optional)

### In Netlify:

1. Go to your site → **Domain settings**
2. Click **Add custom domain**
3. Enter your domain name (e.g., `yourdomain.com`)
4. Follow the DNS configuration instructions

### DNS Configuration:

Add these DNS records in your domain provider (GoDaddy, Namecheap, etc.):

```
Type    Name    Value                          TTL
CNAME   www     your-site.netlify.app          600
A       @       75.2.60.5                      600  (Netlify's IP - check current IP in Netlify dashboard)
```

Or use Netlify's nameservers (recommended):
- Go to Domain settings → DNS
- Use Netlify's nameservers provided in the dashboard

## Step 5: Verify Deployment

### Frontend Checks:
- [ ] Site loads at your Netlify URL
- [ ] All pages are accessible
- [ ] 3D animations load correctly
- [ ] Contact form works
- [ ] Lead management panel accessible at `/manage`

### Backend Checks:
- [ ] Backend health check: `https://your-backend.railway.app/health`
- [ ] Contact form submissions work
- [ ] API endpoints respond correctly

### Integration Checks:
- [ ] Contact form successfully submits to backend
- [ ] Login/signup functionality works
- [ ] Leads display correctly in management panel

## Post-Deployment Configuration

### Enable Automatic Deployments

Netlify automatically deploys when you push to your main branch. To configure:

1. Go to **Site settings** → **Build & deploy**
2. Under **Continuous Deployment**, ensure your branch is set to `main` or `master`
3. Optionally configure branch deploys for previews

### Set Up Build Hooks (Optional)

If you need to trigger builds manually:

1. Go to **Site settings** → **Build & deploy** → **Build hooks**
2. Click **Add build hook**
3. Copy the webhook URL
4. Use it to trigger builds from external services

## Environment Variables Reference

### Frontend (Netlify)
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (Railway/Render)
```env
PORT=3001
FRONTEND_URL=https://your-site.netlify.app
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICEROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

## Troubleshooting

### Build Fails on Netlify

1. **Check Build Logs**
   - Go to **Deploys** → Click on failed deploy → View logs
   - Look for error messages

2. **Common Issues**:
   - **Missing dependencies**: Ensure all dependencies are in `package.json`
   - **Build command error**: Verify `npm run build` works locally
   - **Node version**: Netlify uses Node 18 by default (configured in `netlify.toml`)

3. **Fix Build Issues**:
   ```bash
   # Test build locally first
   npm run build
   
   # If it works locally, check Netlify logs for specific errors
   ```

### Backend Not Responding

1. **Check Backend Logs**
   - Railway: Go to service → Logs tab
   - Render: Go to service → Logs tab

2. **Verify Environment Variables**
   - Ensure all required variables are set
   - Check for typos in URLs

3. **Test Backend Directly**
   ```bash
   curl https://your-backend.railway.app/health
   ```

### CORS Errors

If you see CORS errors in the browser console:

1. **Verify `FRONTEND_URL` in backend** matches your Netlify URL exactly
2. **Check backend CORS configuration** allows your Netlify domain
3. **Restart backend service** after updating environment variables

### Environment Variables Not Working

- **Frontend**: Variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- **Backend**: Restart the service after adding/updating variables
- **Netlify**: Redeploy after adding new environment variables

## Updating Your Deployment

### Automatic Updates

Both Netlify and Railway/Render automatically deploy when you push to your main branch.

### Manual Updates

**Netlify:**
```bash
# Trigger a new deployment
netlify deploy --prod
```

**Railway/Render:**
- Push to GitHub, or
- Use the dashboard to trigger a redeploy

## Monitoring

### Netlify Analytics (Optional)

1. Go to **Site settings** → **Analytics**
2. Enable Netlify Analytics (paid feature) or use Google Analytics

### Backend Monitoring

- **Railway**: Built-in metrics in dashboard
- **Render**: Built-in metrics in dashboard
- Set up error tracking (e.g., Sentry) for production

## Security Checklist

- [ ] All environment variables are set (never commit `.env` files)
- [ ] HTTPS is enabled (automatic on Netlify)
- [ ] CORS is properly configured in backend
- [ ] Supabase RLS (Row Level Security) policies are set
- [ ] API endpoints are protected with authentication where needed

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Next.js on Netlify**: https://docs.netlify.com/integrations/frameworks/nextjs/

## Quick Reference Commands

```bash
# Netlify CLI
netlify login              # Login to Netlify
netlify init               # Initialize site
netlify deploy             # Deploy to draft
netlify deploy --prod      # Deploy to production
netlify env:list           # List environment variables
netlify env:set KEY value  # Set environment variable
netlify open               # Open site in browser
netlify status             # Check deployment status
```




