# GoDaddy Shared Hosting Deployment Guide

**For GoDaddy Web Hosting Economy Plan (Shared Hosting)**

Since GoDaddy shared hosting doesn't support Node.js, we'll:
1. **Export Next.js as static files** → Upload to GoDaddy
2. **Host Express backend separately** → Railway/Render (free options available)

---

## Architecture

```
┌─────────────────────┐         ┌──────────────────┐
│   GoDaddy Shared    │         │  Railway/Render  │
│   Hosting (Static)  │◄────────┤    (Backend)     │
│   Next.js Export    │         │  Express Server  │
└─────────────────────┘         └────────┬─────────┘
                                         │
                                         ▼
                                 Supabase Database
```

---

## Step 1: Configure Next.js for Static Export

Update `next.config.ts` to enable static export:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with routing on static hosts
};

export default nextConfig;
```

---

## Step 2: Build Static Export

Run the build command:

```bash
npm run build
```

This will create an `out/` directory with all static files ready to upload.

**Verify the export:**
```bash
ls -la out/
```

You should see:
- `index.html`
- `_next/` folder (with CSS, JS, and assets)
- All your static assets

---

## Step 3: Deploy Backend First (Required)

Your backend must be deployed first so you can get the production URL.

### Option A: Deploy to Railway (Recommended - Easiest)

1. **Sign up at [railway.app](https://railway.app)**
   - Use GitHub to sign up (free tier available)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - **Root Directory**: Set to `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   Click "Variables" tab and add:
   ```
   PORT=3001
   FRONTEND_URL=https://yourdomain.com
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICEROLE_KEY=your_supabase_service_role_key
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway will automatically deploy
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Deploy to Render (Free Tier Available)

1. **Sign up at [render.com](https://render.com)**

2. **Create New Web Service**
   - Connect your GitHub repository
   - Set **Root Directory** to `backend`

3. **Configure Build & Start**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables** (same as Railway above)

5. **Deploy**
   - Render will deploy automatically
   - Get your backend URL

---

## Step 4: Update Frontend Environment Variables

Before building the static export, update your `.env` file with the production backend URL:

```bash
nano .env
```

Add/Update:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** Rebuild after updating:
```bash
npm run build
```

---

## Step 5: Upload to GoDaddy Shared Hosting

### Method 1: Using cPanel File Manager (Easiest)

1. **Log into GoDaddy**
   - Go to My Products → Web Hosting → Manage
   - Click "cPanel" or "File Manager"

2. **Navigate to Public Directory**
   - Go to `public_html/` (or your domain's root directory)
   - If you have multiple domains, go to `public_html/yourdomain.com/`

3. **Clear Existing Files** (Optional)
   - Select all files in `public_html/`
   - Delete them (keep a backup if needed)

4. **Upload Files**
   - Click "Upload" button
   - Select **ALL files and folders** from your `out/` directory
   - Upload them to `public_html/`

5. **Verify Structure**
   Your `public_html/` should look like:
   ```
   public_html/
   ├── index.html
   ├── _next/
   │   ├── static/
   │   └── ...
   ├── banner/
   ├── Supreme Animation - Logo.png
   └── ... (other static assets)
   ```

### Method 2: Using FTP Client (FileZilla, etc.)

1. **Get FTP Credentials from GoDaddy**
   - Go to cPanel → FTP Accounts
   - Note your FTP host, username, and password

2. **Connect via FTP Client**
   - Host: `ftp.yourdomain.com` or IP from GoDaddy
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

3. **Upload Files**
   - Navigate to `public_html/` on server
   - Upload all contents of `out/` directory

---

## Step 6: Configure .htaccess for Routing

Since it's a static site, you need to handle client-side routing. Create a `.htaccess` file:

1. **In cPanel File Manager:**
   - Navigate to `public_html/`
   - Click "New File"
   - Name it `.htaccess`

2. **Add this content:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle client-side routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
  
  # Force HTTPS (optional but recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Enable compression
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
  </IfModule>
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

3. **Save the file**

---

## Step 7: Configure GoDaddy DNS (If Needed)

If your domain is already pointing to GoDaddy, you're done. Otherwise:

1. **Go to GoDaddy DNS Management**
   - My Products → DNS

2. **Update A Record**
   ```
   Type: A
   Name: @
   Value: [Your GoDaddy hosting IP - found in cPanel]
   TTL: 600
   ```

3. **Update CNAME for www**
   ```
   Type: CNAME
   Name: www
   Value: @
   TTL: 600
   ```

---

## Step 8: Test Your Deployment

1. **Visit your domain**: `https://yourdomain.com`
2. **Check contact form**: Submit a test form
3. **Verify backend connection**: Open browser console, check for API calls
4. **Test all pages**: Navigate through all sections

---

## Step 9: Enable SSL (HTTPS)

GoDaddy shared hosting usually includes free SSL:

1. **In cPanel:**
   - Find "SSL/TLS Status" or "Let's Encrypt"
   - Click "Run AutoSSL" or enable SSL for your domain
   - Wait a few minutes for activation

2. **Force HTTPS** (already in `.htaccess` above)

---

## Updating Your Site

When you make changes:

1. **Update code locally**
2. **Rebuild static export:**
   ```bash
   npm run build
   ```
3. **Upload new `out/` contents** to GoDaddy `public_html/`
   - You can delete old files and upload new ones
   - Or use FTP to sync changes

---

## Troubleshooting

### Site shows blank page
- Check browser console for errors
- Verify all files uploaded correctly
- Check `.htaccess` file exists and is correct
- Ensure `index.html` is in `public_html/`

### Contact form not working
- Check browser console for API errors
- Verify `NEXT_PUBLIC_BACKEND_URL` is correct in your build
- Check backend is running and accessible
- Verify CORS settings in backend allow your domain

### Images not loading
- Check file paths in `public/` folder
- Verify images uploaded to correct location
- Check browser console for 404 errors

### Routing not working (404 on refresh)
- Verify `.htaccess` file exists and has correct rules
- Check if `mod_rewrite` is enabled on GoDaddy
- Contact GoDaddy support if needed

### Backend connection errors
- Verify backend URL is correct
- Check backend is running (visit backend URL/health)
- Check CORS settings in backend
- Verify environment variables in backend

---

## Cost Breakdown

- **GoDaddy Shared Hosting**: Already paid ✅
- **Railway Backend**: Free tier available (500 hours/month)
- **Render Backend**: Free tier available (750 hours/month)
- **Supabase**: Free tier available (500MB database)

**Total: $0/month** (if within free tiers)

---

## Alternative: Easier Deployment (Recommended)

If you want easier deployments and better performance:

**Use Vercel for Frontend (Free) + Railway for Backend (Free)**

1. **Deploy Frontend to Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```
   - Connect GitHub
   - Set environment variables
   - Deploy (automatic SSL, CDN, etc.)

2. **Deploy Backend to Railway** (as described above)

3. **Point GoDaddy Domain to Vercel:**
   - In Vercel: Add custom domain
   - In GoDaddy DNS: Point to Vercel (instructions in Vercel)

**Benefits:**
- ✅ Automatic deployments on git push
- ✅ Free SSL
- ✅ Global CDN
- ✅ Better performance
- ✅ Still use your GoDaddy domain

---

## Quick Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Backend URL obtained
- [ ] Frontend `.env` updated with backend URL
- [ ] Static export built (`npm run build`)
- [ ] Files uploaded to GoDaddy `public_html/`
- [ ] `.htaccess` file created and configured
- [ ] DNS configured (if needed)
- [ ] SSL enabled
- [ ] Site tested and working
- [ ] Contact form tested

---

## Need Help?

- **GoDaddy Support**: https://www.godaddy.com/help
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

