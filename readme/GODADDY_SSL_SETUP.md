# GoDaddy SSL Certificate Setup - Correct Steps

## ✅ CORRECT METHOD: Using cPanel SSL/TLS Manager

**Based on your screenshots, here's the exact process:**

### ✅ GOOD NEWS: SSL is Already Active!

**Your screenshots show:**

- `supremeanimation.com` = **GREEN padlock** ✅
- `www.supremeanimation.com` = **GREEN padlock** ✅

**This means SSL is already working!**

---

### Step 1: Verify SSL is Working

1. **Visit**: `https://supremeanimation.com`
2. **Check**: Do you see a padlock icon in the browser?
3. **If YES**: SSL is working! ✅
4. **If NO**: Continue to Step 2

---

### Step 2: Update to AutoSSL (For Auto-Renewal)

**To ensure your certificate auto-renews (recommended):**

1. **On the "Manage Installed SSL Websites" page** (Screenshot 1):

   - Find `supremeanimation.com` in the list
   - Click **"Update Certificate"** (in the Actions column)

2. **You should see options**:

   - Select **"AutoSSL"** or **"Let's Encrypt"**
   - Click **"Install"** or **"Update"**
   - Wait 5-15 minutes

3. **Alternative**: If "Update Certificate" doesn't show AutoSSL option:
   - Go back to SSL/TLS Manager
   - Click **"Install an SSL Website"** (or use the page from Screenshot 2)
   - Click **"Browse Certificates"** button
   - Look for **"AutoSSL"** or **"Let's Encrypt"** certificate
   - Select it and install

---

### Step 3: Verify AutoSSL Installation

1. **After 15 minutes**, go back to "Manage Installed SSL Websites"
2. **Check**: `supremeanimation.com` should still show green padlock
3. **Check certificate details**: Click **"Certificate Details"** to see expiration date
4. **AutoSSL certificates** typically expire in 90 days and auto-renew

---

## Method 1: GoDaddy SSL Management (Main Dashboard) - Alternative Method

**This is usually the correct method for GoDaddy shared hosting:**

1. **Go to GoDaddy Main Dashboard** (NOT cPanel):

   - Visit: https://sso.godaddy.com
   - Log in

2. **Navigate to Your Domain**:

   - Click "My Products"
   - Find "Web Hosting" section
   - Click "Manage" next to your hosting plan

3. **Find SSL Section**:

   - Look for "SSL" or "Security" tab/section
   - Or scroll down to find "SSL Certificate" section
   - You might see: "Free SSL" or "SSL Certificate"

4. **Enable SSL**:
   - Click "Manage" or "Setup" next to SSL
   - Or click "Activate" or "Install" button
   - Select your domain: `supremeanimation.com`
   - Click "Install" or "Activate"
   - Wait 5-15 minutes for activation

---

## Method 2: cPanel SSL/TLS (If Available)

**If you see SSL options in cPanel:**

1. **In cPanel**, look for these sections (they might be named differently):

   - "SSL/TLS Status"
   - "SSL/TLS"
   - "Security" → "SSL/TLS"
   - "Let's Encrypt SSL"
   - "AutoSSL"

2. **Click on the SSL section**

3. **You might see**:

   - A list of domains
   - "Run AutoSSL" button
   - "Install" or "Manage" buttons
   - "SSL Status" page

4. **Enable SSL**:
   - Find `supremeanimation.com` in the list
   - Click "Run AutoSSL" (if available)
   - Or click "Install" next to your domain
   - Wait for activation

---

## Method 3: GoDaddy SSL Certificate Manager

**Alternative location:**

1. **Go to**: https://sso.godaddy.com
2. **Click**: "My Products"
3. **Look for**: "SSL Certificates" section (separate from hosting)
4. **Or go directly to**: https://www.godaddy.com/help/manage-ssl-certificates-4970

---

## Method 4: Contact GoDaddy Support

**If you can't find SSL options:**

1. **Contact GoDaddy Support**:

   - Phone: 1-480-505-8877
   - Live Chat: Available in GoDaddy dashboard
   - Support URL: https://www.godaddy.com/help

2. **Ask them**:
   - "How do I enable free SSL certificate for my shared hosting account?"
   - "Where is the SSL management for my domain?"
   - They can enable it for you or guide you to the correct location

---

## Method 5: Check if SSL is Already Active

**Sometimes SSL is already enabled but not forced:**

1. **Test your site**: Visit `https://supremeanimation.com` (with https)
2. **If it loads**: SSL is already active!
3. **If you see "Not Secure"**: SSL needs to be activated
4. **Check browser**: Look for padlock icon in address bar

---

## After SSL is Enabled

### Step 1: Verify SSL is Working

1. **Visit**: `https://supremeanimation.com`
2. **Check**: Padlock icon in browser address bar
3. **Should show**: "Secure" or padlock icon

### Step 2: Force HTTPS (Already in .htaccess)

Your `.htaccess` file already has HTTPS redirect:

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

This will automatically redirect HTTP to HTTPS.

### Step 3: Test

1. **Visit**: `http://supremeanimation.com` (without s)
2. **Should redirect to**: `https://supremeanimation.com`
3. **Check**: Padlock icon appears

---

## Common GoDaddy SSL Locations

**Try navigating to these in GoDaddy dashboard:**

1. **My Products** → **Web Hosting** → **Manage** → **SSL** tab
2. **My Products** → **Web Hosting** → **Manage** → **Security** → **SSL**
3. **My Products** → **Domains** → **supremeanimation.com** → **SSL**
4. **cPanel** → **Security** → **SSL/TLS Status**
5. **cPanel** → **SSL/TLS**

---

## Troubleshooting

### SSL Not Activating

- **Wait 15-30 minutes** - SSL activation can take time
- **Check DNS**: Make sure domain points to GoDaddy hosting
- **Clear browser cache**: Try incognito/private window
- **Contact support**: They can activate it manually

### "Not Secure" Warning After SSL

- **Mixed content**: Some resources loading over HTTP
- **Check browser console** for mixed content errors
- **Update all URLs** to use HTTPS

---

## Quick Checklist

- [ ] Logged into GoDaddy main dashboard (not just cPanel)
- [ ] Found SSL section in Web Hosting management
- [ ] Enabled SSL for `supremeanimation.com`
- [ ] Waited 15-30 minutes for activation
- [ ] Tested `https://supremeanimation.com`
- [ ] Verified padlock icon appears
- [ ] Tested HTTP to HTTPS redirect

---

**If you still can't find the SSL options, tell me what sections you see in your GoDaddy dashboard and I'll guide you to the exact location!**
