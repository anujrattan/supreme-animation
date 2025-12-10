# Netlify Deployment Checklist

## Pre-Deployment

### Accounts & Access
- [ ] Netlify account created
- [ ] Backend hosting account created (Railway/Render)
- [ ] GitHub repository ready and pushed
- [ ] Supabase project configured

### Environment Variables Prepared
- [ ] Supabase URL
- [ ] Supabase Anon Key
- [ ] Supabase Service Role Key (for backend)
- [ ] Backend URL (will get after backend deployment)

## Step 1: Deploy Backend

### Railway/Render Setup
- [ ] Backend service created
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] `PORT=3001`
  - [ ] `FRONTEND_URL` (update after frontend deploy)
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_SERVICEROLE_KEY`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `NODE_ENV=production`
- [ ] Backend deployed successfully
- [ ] Backend URL copied (e.g., `https://your-backend.railway.app`)

## Step 2: Deploy Frontend to Netlify

### Netlify Setup
- [ ] Site created and connected to GitHub repo
- [ ] Build settings configured:
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `.next` (auto-detected)
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_BACKEND_URL` (from Step 1)
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Initial deployment successful
- [ ] Netlify URL copied (e.g., `https://your-site.netlify.app`)

## Step 3: Update Backend CORS

- [ ] Updated `FRONTEND_URL` in backend environment variables
- [ ] Backend service restarted
- [ ] CORS verified working

## Step 4: Custom Domain (Optional)

- [ ] Custom domain added in Netlify
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Domain verified working

## Post-Deployment Verification

### Frontend
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] 3D animations working
- [ ] Contact form submits successfully
- [ ] Lead management panel accessible at `/manage`

### Backend
- [ ] Health check endpoint working: `/health`
- [ ] Contact form API working: `/api/contact/submit`
- [ ] Auth endpoints working: `/api/auth/login`, `/api/auth/signup`

### Integration
- [ ] Contact form connects to backend
- [ ] Login/signup functionality works
- [ ] Leads display in management panel
- [ ] No CORS errors in browser console

## Quick Commands

```bash
# Test build locally
npm run build

# Netlify CLI (if using)
netlify login
netlify init
netlify deploy --prod
netlify env:list
```

## Troubleshooting Quick Fixes

### Build fails
- Check Netlify build logs
- Verify `npm run build` works locally
- Check Node version (should be 18+)

### Backend not responding
- Check backend logs in Railway/Render
- Verify environment variables
- Test backend URL directly: `curl https://your-backend.railway.app/health`

### CORS errors
- Verify `FRONTEND_URL` in backend matches Netlify URL exactly
- Restart backend after updating environment variables




