# Quick Deployment Checklist
## Follow Along Reference

Print this or keep it open while following `DEPLOYMENT_STEP_BY_STEP.md`

---

## ✅ PART 1: BACKEND DEPLOYMENT (Railway)

- [ ] Signed up at railway.app
- [ ] Created new project from GitHub repo
- [ ] Set Root Directory to: `backend`
- [ ] Set Build Command to: `npm install && npm run build`
- [ ] Set Start Command to: `npm start`
- [ ] Added environment variable: `PORT=3001`
- [ ] Added environment variable: `NODE_ENV=production`
- [ ] Added environment variable: `SUPABASE_URL=...`
- [ ] Added environment variable: `SUPABASE_SERVICEROLE_KEY=...`
- [ ] Added environment variable: `SUPABASE_ANON_KEY=...`
- [ ] Added environment variable: `FRONTEND_URL=https://yourdomain.com`
- [ ] Deployment completed successfully
- [ ] Backend URL copied: `https://xxxxx.up.railway.app`
- [ ] Tested backend: `/health` endpoint works

**Backend URL**: _________________________________

---

## ✅ PART 2: FRONTEND PREPARATION

- [ ] Opened Terminal/Command Prompt
- [ ] Navigated to: `/Users/anuj/projects/supremeAnimation`
- [ ] Verified `next.config.ts` has `output: 'export'`
- [ ] Created/updated `.env` file in project root
- [ ] Added `NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.up.railway.app`
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL=...`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- [ ] Ran `npm install` (if needed)
- [ ] Ran `npm run build`
- [ ] Build completed successfully
- [ ] Verified `out/` folder exists with files

---

## ✅ PART 3: UPLOAD TO GODADDY

- [ ] Logged into GoDaddy cPanel
- [ ] Navigated to `public_html/` folder
- [ ] Cleared existing files (if needed)
- [ ] Uploaded all files from `out/` folder
- [ ] Verified `index.html` is in `public_html/`
- [ ] Verified `_next/` folder is in `public_html/`

---

## ✅ PART 4: CONFIGURE .HTACCESS

- [ ] Created `.htaccess` file in `public_html/`
- [ ] Added routing rules
- [ ] Added HTTPS redirect
- [ ] Added compression rules
- [ ] Saved file

---

## ✅ PART 5: DNS & SSL

- [ ] Checked DNS records in GoDaddy
- [ ] Updated A record if needed
- [ ] Enabled SSL in cPanel
- [ ] SSL activated successfully

---

## ✅ PART 6: TESTING

- [ ] Website loads at `https://yourdomain.com`
- [ ] Homepage displays correctly
- [ ] All sections visible
- [ ] Images load
- [ ] Animations work
- [ ] Contact form submits successfully
- [ ] No console errors
- [ ] All pages navigate correctly

---

## 📝 NOTES & CREDENTIALS

**Backend URL**: 
```
https://_________________________________
```

**Supabase URL**: 
```
https://_________________________________
```

**Domain**: 
```
https://_________________________________
```

**GoDaddy cPanel URL**: 
```
https://_________________________________
```

**Railway Dashboard**: 
```
https://railway.app/project/_________________________________
```

---

## 🔄 UPDATING SITE (Future Reference)

1. Make code changes locally
2. Run: `npm run build`
3. Upload new files from `out/` to GoDaddy `public_html/`

---

## 🆘 TROUBLESHOOTING QUICK REFERENCE

**Blank Page?**
- Check browser console (F12)
- Verify `index.html` exists
- Check `.htaccess` file

**Form Not Working?**
- Check backend URL in `.env`
- Test backend: `/health` endpoint
- Check browser console for errors

**Images Not Loading?**
- Verify `public/` files uploaded
- Check file paths in code

**404 on Refresh?**
- Verify `.htaccess` exists
- Check routing rules in `.htaccess`

