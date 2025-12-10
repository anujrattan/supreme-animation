# GoDaddy Hosting Guide for Supreme Animation Studio

This guide covers deploying your Next.js + Express application to GoDaddy hosting.

## Quick Answer: Can You Host on GoDaddy?

**Yes, but it depends on your GoDaddy hosting plan:**

### ✅ **GoDaddy VPS or Dedicated Server**
- **Full support** - Can run both Next.js frontend and Express backend
- Requires Node.js 18+ installed
- Best for full control and performance

### ⚠️ **GoDaddy Shared Hosting**
- **Limited support** - Typically doesn't support Node.js
- **Option 1**: Static export of Next.js frontend only (backend must be hosted elsewhere)
- **Option 2**: Use GoDaddy only for domain, host elsewhere (Vercel, Netlify, Railway)

## Determine Your Hosting Type

1. **Log into GoDaddy** → My Products → Web Hosting
2. **Check your plan type:**
   - **VPS/Dedicated**: You'll see "Virtual Private Server" or "Dedicated Server"
   - **Shared Hosting**: You'll see "Web Hosting" or "cPanel Hosting"

---

## Option 1: Full Stack on GoDaddy VPS (Recommended if you have VPS)

### Prerequisites
- ✅ GoDaddy VPS or Dedicated Server
- ✅ SSH access to your server
- ✅ Root or sudo access
- ✅ Node.js 18+ installed

### Step 1: Connect to Your Server

```bash
ssh username@your-server-ip
# Or use GoDaddy's SSH credentials from your hosting panel
```

### Step 2: Install Node.js (if not already installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x or higher
npm --version
```

### Step 3: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Step 4: Upload Your Project

**Option A: Using Git (Recommended)**
```bash
cd /var/www
sudo git clone https://your-repo-url.git supreme-animation
cd supreme-animation
```

**Option B: Using FTP/SFTP**
1. Use FileZilla or similar FTP client
2. Connect to your GoDaddy server
3. Upload project files to `/var/www/supreme-animation` (or your preferred directory)

### Step 5: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 6: Build Both Applications

```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build
cd ..
```

### Step 7: Set Up Environment Variables

**Frontend `.env` file:**
```bash
nano .env
```

Add:
```env
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

**Backend `backend/.env` file:**
```bash
nano backend/.env
```

Add:
```env
PORT=3001
FRONTEND_URL=https://yourdomain.com
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICEROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

### Step 8: Configure PM2

The `ecosystem.config.js` file is already set up. Update it with your server paths:

```bash
nano ecosystem.config.js
```

Update the `cwd` paths to match your server directory (e.g., `/var/www/supreme-animation`).

Then start the applications:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the instructions to enable auto-start on reboot
```

### Step 9: Set Up Nginx Reverse Proxy

**Install Nginx:**
```bash
sudo apt-get update
sudo apt-get install nginx
```

**Create Nginx configuration:**
```bash
sudo nano /etc/nginx/sites-available/supreme-animation
```

Add:
```nginx
# Frontend (Next.js)
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/supreme-animation /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### Step 10: Set Up SSL (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

### Step 11: Configure GoDaddy DNS

1. Log into GoDaddy → My Products → DNS
2. Add/Update records:

```
Type    Name    Value              TTL
A       @       your-server-ip      600
A       www     your-server-ip      600
A       api     your-server-ip      600
```

### Step 12: Configure Firewall

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable
```

---

## Option 2: Static Export + Separate Backend (For Shared Hosting)

If you have **GoDaddy Shared Hosting**, you can:

1. **Export Next.js as static site** → Host on GoDaddy
2. **Host Express backend elsewhere** → Railway, Render, or your GoDaddy VPS

### Step 1: Configure Next.js for Static Export

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features
  trailingSlash: true,
};

export default nextConfig;
```

### Step 2: Build Static Export

```bash
npm run build
```

This creates a `out/` directory with static files.

### Step 3: Upload to GoDaddy Shared Hosting

1. **Connect via FTP/cPanel File Manager**
2. **Upload contents of `out/` folder** to `public_html/` (or your domain's root directory)
3. **Ensure `.htaccess` file** (if needed for routing):

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

### Step 4: Host Backend Separately

Deploy your Express backend to:
- **Railway** (recommended - easy setup)
- **Render** (free tier available)
- **Your GoDaddy VPS** (if you have one)

Update frontend `.env`:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.railway.app
```

---

## Option 3: Hybrid Deployment (Recommended for Ease)

**Best of both worlds:**
- **Frontend**: Deploy to Vercel/Netlify (free, optimized for Next.js)
- **Backend**: Deploy to Railway/Render (free tier available)
- **Domain**: Use GoDaddy domain, point DNS to Vercel/Netlify

### Benefits:
- ✅ No server management
- ✅ Automatic SSL
- ✅ Easy deployments
- ✅ Better performance
- ✅ Free tiers available

### Steps:

1. **Deploy Frontend to Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```
   - Connect your GitHub repo
   - Set environment variables in Vercel dashboard
   - Add custom domain

2. **Deploy Backend to Railway:**
   - Connect GitHub repo
   - Set root directory to `backend`
   - Add environment variables
   - Deploy

3. **Update GoDaddy DNS:**
   - Point A record to Vercel's IP
   - Or use CNAME to Vercel's domain

---

## Troubleshooting

### Port Already in Use
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Permission Denied
```bash
sudo chown -R $USER:$USER /var/www/supreme-animation
```

### PM2 Not Starting
```bash
pm2 logs  # Check logs
pm2 restart all
```

### Nginx 502 Bad Gateway
- Check if PM2 processes are running: `pm2 status`
- Verify backend is listening: `curl http://localhost:3001/health`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### Environment Variables Not Loading
- Verify `.env` files exist in correct locations
- Restart PM2: `pm2 restart all`
- Check PM2 logs: `pm2 logs`

---

## Post-Deployment Checklist

- [ ] Frontend accessible at `https://yourdomain.com`
- [ ] Backend API accessible at `https://api.yourdomain.com/health`
- [ ] SSL certificates active (HTTPS working)
- [ ] Contact form submission working
- [ ] All animations and videos loading correctly
- [ ] PM2 processes running (if using VPS)
- [ ] Nginx/Apache running
- [ ] Logs accessible and monitored

---

## Updating Your Site

### On GoDaddy VPS:
```bash
cd /var/www/supreme-animation
git pull origin main
npm install
npm run build
cd backend
npm install
npm run build
cd ..
pm2 restart all
```

---

## Need Help?

1. **GoDaddy Support**: https://www.godaddy.com/help
2. **PM2 Documentation**: https://pm2.keymetrics.io/
3. **Nginx Documentation**: https://nginx.org/en/docs/
4. **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## Quick Decision Guide

**Choose Option 1 if:**
- ✅ You have GoDaddy VPS/Dedicated Server
- ✅ You want everything on one server
- ✅ You're comfortable with server management

**Choose Option 2 if:**
- ✅ You have GoDaddy Shared Hosting
- ✅ You want to use your existing hosting
- ✅ You can host backend elsewhere

**Choose Option 3 if:**
- ✅ You want easiest deployment
- ✅ You want best performance
- ✅ You don't mind using multiple services
- ✅ You want automatic SSL and deployments

