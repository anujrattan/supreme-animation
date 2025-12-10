# Deployment Guide - GoDaddy Hosting

This guide covers deploying the Supreme Animation Studio website to GoDaddy hosting.

## Prerequisites

### 1. GoDaddy Hosting Requirements

**Required Hosting Plan:**
- **VPS (Virtual Private Server)** or **Dedicated Server** - Required for Node.js applications
- Shared hosting typically does NOT support Node.js/Express backend
- Minimum recommended: 2GB RAM, 2 CPU cores

**Alternative Options:**
- If GoDaddy shared hosting: Consider deploying backend separately (Vercel, Railway, Render, etc.)
- Use GoDaddy only for domain management
- Deploy frontend to Vercel/Netlify and backend to a Node.js hosting service

### 2. Domain & DNS
- Domain name registered with GoDaddy
- Access to GoDaddy DNS management panel

### 3. Server Access
- SSH access to your GoDaddy VPS/server
- Root or sudo access
- cPanel access (if using cPanel hosting)

### 4. Software Requirements on Server
- Node.js 18+ (LTS version recommended)
- npm or yarn
- PM2 (process manager for Node.js)
- Nginx or Apache (for reverse proxy)
- Git (for deployment)

### 5. Environment Variables
- Supabase credentials (URL, Service Role Key, Anon Key)
- Production backend URL
- Production frontend URL

## Pre-Deployment Checklist

- [ ] GoDaddy VPS/Dedicated server provisioned
- [ ] Node.js 18+ installed on server
- [ ] Domain DNS configured
- [ ] SSL certificate ready (Let's Encrypt recommended)
- [ ] Supabase database configured and accessible
- [ ] Environment variables documented
- [ ] Backend and frontend tested locally
- [ ] Build scripts tested

## Deployment Architecture Options

### Option 1: Full Stack on GoDaddy VPS (Recommended for single server)

```
┌─────────────────────────────────┐
│     GoDaddy VPS                 │
│  ┌──────────┐  ┌──────────┐   │
│  │  Nginx   │  │   PM2     │   │
│  │ (Port 80)│  │ (Backend) │   │
│  └────┬─────┘  └─────┬─────┘   │
│       │              │          │
│  ┌────▼──────────────▼────┐    │
│  │   Next.js (Port 3000)  │    │
│  │   Express (Port 3001)  │    │
│  └────────────────────────┘    │
└─────────────────────────────────┘
         │
         ▼
   Supabase Database
```

### Option 2: Hybrid Deployment (Recommended for easier management)

```
┌─────────────────┐         ┌──────────────────┐
│  Vercel/Netlify │         │  Railway/Render  │
│   (Frontend)    │         │    (Backend)     │
│   Next.js App   │◄────────┤  Express Server  │
└─────────────────┘         └────────┬─────────┘
                                      │
                                      ▼
                              Supabase Database
```

**GoDaddy Domain** → Points to Vercel/Netlify (frontend)

## Step-by-Step Deployment: Option 1 (Full Stack on GoDaddy)

### Step 1: Server Setup

#### 1.1 Connect to Server
```bash
ssh username@your-server-ip
```

#### 1.2 Install Node.js
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### 1.3 Install PM2
```bash
sudo npm install -g pm2
```

#### 1.4 Install Nginx
```bash
sudo apt-get update
sudo apt-get install nginx
```

### Step 2: Prepare Application Files

#### 2.1 Clone Repository
```bash
cd /var/www
sudo git clone https://your-repo-url.git supreme-animation
cd supreme-animation
```

#### 2.2 Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### 2.3 Build Frontend
```bash
npm run build
```

#### 2.4 Build Backend
```bash
cd backend
npm run build
cd ..
```

### Step 3: Configure Environment Variables

#### 3.1 Frontend Environment (.env)
```bash
sudo nano .env
```

Add:
```env
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
NEXT_PUBLIC_BACKEND_PORT=3001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 3.2 Backend Environment (backend/.env)
```bash
sudo nano backend/.env
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

### Step 4: Configure PM2

#### 4.1 Create PM2 Ecosystem File
```bash
sudo nano ecosystem.config.js
```

Add:
```javascript
module.exports = {
  apps: [
    {
      name: 'supreme-backend',
      cwd: '/var/www/supreme-animation/backend',
      script: 'dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/pm2/backend-error.log',
      out_file: '/var/log/pm2/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'supreme-frontend',
      cwd: '/var/www/supreme-animation',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/frontend-error.log',
      out_file: '/var/log/pm2/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
```

#### 4.2 Start Applications with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 5: Configure Nginx Reverse Proxy

#### 5.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/supreme-animation
```

Add:
```nginx
# Frontend (Next.js)
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
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
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # Backend API
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

#### 5.2 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/supreme-animation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

### Step 7: Configure GoDaddy DNS

1. Log in to GoDaddy Domain Manager
2. Go to DNS Management
3. Add/Update records:

```
Type    Name    Value              TTL
A       @       your-server-ip      600
A       www     your-server-ip      600
A       api     your-server-ip      600
CNAME   www     yourdomain.com      600
```

### Step 8: Firewall Configuration

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable
```

## Step-by-Step Deployment: Option 2 (Hybrid - Recommended)

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - `NEXT_PUBLIC_BACKEND_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Configure Custom Domain**
   - Add yourdomain.com in Vercel dashboard
   - Update GoDaddy DNS to point to Vercel

### Backend Deployment (Railway/Render)

#### Railway:
1. Connect GitHub repository
2. Set root directory to `backend`
3. Add environment variables
4. Deploy
5. Get production URL

#### Render:
1. Create new Web Service
2. Connect repository
3. Set root directory to `backend`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

### GoDaddy DNS Configuration (Hybrid)

```
Type    Name    Value                    TTL
A       @       Vercel-IP-Address         600
CNAME   www     cname.vercel-dns.com     600
CNAME   api     backend-url.railway.app   600
```

## Post-Deployment Checklist

- [ ] Frontend accessible at https://yourdomain.com
- [ ] Backend API accessible at https://api.yourdomain.com/health
- [ ] SSL certificates active (HTTPS working)
- [ ] Contact form submission working
- [ ] Lead management panel accessible at /manage
- [ ] Login/signup working
- [ ] Leads displaying correctly
- [ ] PM2 processes running (if Option 1)
- [ ] Nginx/Apache running
- [ ] Logs accessible and monitored

## Monitoring & Maintenance

### PM2 Commands (Option 1)
```bash
pm2 status              # Check status
pm2 logs                # View logs
pm2 restart all         # Restart all apps
pm2 monit               # Monitor dashboard
```

### Update Deployment
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

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Permission Denied**
   ```bash
   sudo chown -R $USER:$USER /var/www/supreme-animation
   ```

3. **Nginx 502 Bad Gateway**
   - Check if PM2 processes are running
   - Verify backend is listening on correct port
   - Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

4. **Environment Variables Not Loading**
   - Verify .env files exist and are in correct location
   - Restart PM2: `pm2 restart all`
   - Check PM2 logs: `pm2 logs`

## Security Recommendations

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Use Strong Passwords**
   - Database credentials
   - Server SSH access
   - Admin accounts

3. **Regular Backups**
   - Database backups (Supabase handles this)
   - Code repository (Git)
   - Environment variables (store securely)

4. **Firewall Rules**
   - Only open necessary ports
   - Use fail2ban for SSH protection

5. **SSL/TLS**
   - Always use HTTPS
   - Auto-renew Let's Encrypt certificates

## Support & Resources

- GoDaddy Support: https://www.godaddy.com/help
- PM2 Documentation: https://pm2.keymetrics.io/
- Nginx Documentation: https://nginx.org/en/docs/
- Vercel Documentation: https://vercel.com/docs
- Railway Documentation: https://docs.railway.app/

