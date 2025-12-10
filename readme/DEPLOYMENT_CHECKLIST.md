# Quick Deployment Checklist

## Pre-Deployment

### GoDaddy Setup
- [ ] VPS or Dedicated Server purchased (NOT shared hosting)
- [ ] SSH access credentials obtained
- [ ] Server IP address noted
- [ ] Domain name ready

### Server Requirements
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] PM2 installed globally
- [ ] Nginx installed
- [ ] Git installed
- [ ] Firewall configured (ports 22, 80, 443 open)

### Environment Variables Prepared
- [ ] Supabase URL
- [ ] Supabase Service Role Key
- [ ] Supabase Anon Key
- [ ] Production domain URLs
- [ ] Production backend URL

## Deployment Steps

### Initial Server Setup
- [ ] Connected to server via SSH
- [ ] Updated system packages
- [ ] Installed Node.js 18+
- [ ] Installed PM2 globally
- [ ] Installed Nginx
- [ ] Configured firewall

### Application Deployment
- [ ] Cloned repository to server
- [ ] Installed frontend dependencies (`npm install`)
- [ ] Installed backend dependencies (`cd backend && npm install`)
- [ ] Built frontend (`npm run build`)
- [ ] Built backend (`cd backend && npm run build`)
- [ ] Created `.env` file in root with frontend variables
- [ ] Created `backend/.env` file with backend variables
- [ ] Created `ecosystem.config.js` in root
- [ ] Started applications with PM2 (`pm2 start ecosystem.config.js`)
- [ ] Saved PM2 configuration (`pm2 save`)
- [ ] Set up PM2 startup script (`pm2 startup`)

### Nginx Configuration
- [ ] Created Nginx config file
- [ ] Configured reverse proxy for frontend (port 3000)
- [ ] Configured reverse proxy for backend (port 3001)
- [ ] Tested Nginx configuration (`sudo nginx -t`)
- [ ] Enabled site (`sudo ln -s`)
- [ ] Restarted Nginx

### SSL Certificate
- [ ] Installed Certbot
- [ ] Obtained SSL certificate for main domain
- [ ] Obtained SSL certificate for API subdomain
- [ ] Verified auto-renewal configured

### DNS Configuration
- [ ] Added A record for main domain pointing to server IP
- [ ] Added A record for www subdomain
- [ ] Added A record for api subdomain
- [ ] Verified DNS propagation (use `dig` or online tools)

## Post-Deployment Verification

### Functionality Tests
- [ ] Frontend loads at https://yourdomain.com
- [ ] Backend health check: https://api.yourdomain.com/health
- [ ] Contact form submission works
- [ ] Lead management panel accessible at /manage
- [ ] Login/signup functionality works
- [ ] Leads display correctly
- [ ] Status updates work

### Performance & Monitoring
- [ ] PM2 processes running (`pm2 status`)
- [ ] Nginx running (`sudo systemctl status nginx`)
- [ ] Logs accessible (`pm2 logs`)
- [ ] No errors in logs
- [ ] SSL certificate valid
- [ ] HTTPS redirect working

## Quick Commands Reference

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Restart applications
pm2 restart all

# Update deployment
cd /var/www/supreme-animation
git pull
npm install
npm run build
cd backend
npm install
npm run build
cd ..
pm2 restart all

# Check Nginx status
sudo systemctl status nginx

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting Quick Fixes

### Application not starting
```bash
pm2 logs
pm2 restart all
```

### Port already in use
```bash
sudo lsof -i :3000
sudo lsof -i :3001
sudo kill -9 <PID>
```

### Nginx 502 error
```bash
# Check if apps are running
pm2 status

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart everything
pm2 restart all
sudo systemctl restart nginx
```

### SSL certificate issues
```bash
sudo certbot renew --dry-run
sudo certbot certificates
```

