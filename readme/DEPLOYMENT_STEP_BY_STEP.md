# Complete Step-by-Step Deployment Guide
## GoDaddy Shared Hosting + Railway Backend

**Follow this guide exactly as written. Every command, click, and path is specified.**

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Before starting, ensure you have:
- [ ] GoDaddy account with Web Hosting Economy plan
- [ ] GitHub account (free)
- [ ] Your code pushed to GitHub repository
- [ ] Supabase account with database set up
- [ ] Supabase credentials ready (URL, Anon Key, Service Role Key)

---

## PART 1: DEPLOY BACKEND TO RAILWAY

### Step 1.1: Sign Up for Railway

1. **Open your web browser**
2. **Go to**: https://railway.app
3. **Click**: "Start a New Project" button (top right)
4. **Select**: "Login with GitHub"
5. **Authorize Railway** to access your GitHub account
6. **You should now see**: Railway dashboard

---

### Step 1.2: Create New Project

1. **In Railway dashboard**, you'll see "New Project" button
2. **Click**: "New Project"
3. **You'll see options**:
   - "Deploy from GitHub repo" ← **Click this**
   - "Empty Project" (don't click this)
   - "Deploy a Template" (don't click this)
4. **Select your repository**: 
   - You'll see a list of your GitHub repos
   - **Find and click**: `supremeAnimation` (or your repo name)
5. **Railway will start importing** - wait 10-30 seconds

---

### Step 1.3: Configure the Service

After Railway imports your repo, you'll see a service card. Now configure it:

1. **Click on the service card** (it might say "supremeAnimation" or show a default name)

2. **Click the "Settings" tab** (top of the page, next to "Deployments", "Metrics", etc.)

3. **Find "Root Directory"** section:
   - **Click the input field**
   - **Type exactly**: `backend`
   - **Press Enter** or click outside

4. **Find "Build Command"** section:
   - **Click the input field**
   - **Type exactly**: `npm install && npm run build`
   - **Press Enter**

5. **Find "Start Command"** section:
   - **Click the input field**
   - **Type exactly**: `npm start`
   - **Press Enter**

---

### Step 1.4: Add Environment Variables

1. **Still in Settings tab**, scroll down to **"Variables"** section

2. **Click**: "New Variable" button

3. **Add each variable one by one** (click "New Variable" for each):

   **Variable 1:**
   - **Name**: `PORT`
   - **Value**: `3001`
   - **Click**: "Add"

   **Variable 2:**
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Click**: "Add"

   **Variable 3:**
   - **Name**: `SUPABASE_URL`
   - **Value**: `[Your Supabase URL from Supabase dashboard]`
   - **Click**: "Add"
   - **To find this**: Go to Supabase → Project Settings → API → Project URL

   **Variable 4:**
   - **Name**: `SUPABASE_SERVICEROLE_KEY`
   - **Value**: `[Your Service Role Key from Supabase]`
   - **Click**: "Add"
   - **To find this**: Go to Supabase → Project Settings → API → service_role key (secret)

   **Variable 5:**
   - **Name**: `SUPABASE_ANON_KEY`
   - **Value**: `[Your Anon Key from Supabase]`
   - **Click**: "Add"
   - **To find this**: Go to Supabase → Project Settings → API → anon public key

   **Variable 6:**
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://yourdomain.com` (replace with your actual domain)
   - **Click**: "Add"
   - **Note**: If you don't have domain yet, use a placeholder like `https://example.com` and update later

4. **Verify all 6 variables are listed** in the Variables section

---

### Step 1.5: Deploy Backend

1. **Click**: "Deployments" tab (top of page)

2. **You should see**: A deployment in progress (or it might auto-deploy)

3. **Wait for deployment**:
   - Status will show "Building..." then "Deploying..."
   - This takes 2-5 minutes
   - **DO NOT close the page**

4. **When deployment completes**:
   - Status changes to "Active" (green)
   - You'll see a URL like: `https://supreme-animation-production-xxxx.up.railway.app`

5. **Copy this URL** - this is your backend URL
   - **Right-click** the URL → **Copy link address**
   - **Save it somewhere** (notepad, notes app, etc.)
   - **Format**: `https://xxxxx.up.railway.app`

---

### Step 1.6: Test Backend

1. **Open a new browser tab**
2. **Visit**: `https://your-backend-url.up.railway.app/health`
   - Replace `your-backend-url` with the actual URL from Step 1.5
3. **You should see**: `{"status":"ok","timestamp":"..."}`
4. **If you see this**: ✅ Backend is working!
5. **If you see error**: Go back to Railway → Check deployment logs

---

## PART 2: PREPARE FRONTEND FOR STATIC EXPORT

### Step 2.1: Open Terminal/Command Prompt

**On Mac:**
- **Press**: `Cmd + Space`
- **Type**: `Terminal`
- **Press**: Enter
- **You should see**: Terminal window opens

**On Windows:**
- **Press**: `Win + R`
- **Type**: `cmd`
- **Press**: Enter
- **You should see**: Command Prompt window opens

---

### Step 2.2: Navigate to Project Directory

**In Terminal/Command Prompt, type exactly:**

```bash
cd /Users/anuj/projects/supremeAnimation
```

**Press Enter**

**Verify you're in the right place:**
```bash
pwd
```
**On Mac/Linux, you should see**: `/Users/anuj/projects/supremeAnimation`

**On Windows:**
```bash
cd
```
**You should see**: `C:\Users\...\supremeAnimation` or your project path

---

### Step 2.3: Verify Next.js Config

1. **Open the file**: `next.config.ts`
   - **Path**: `/Users/anuj/projects/supremeAnimation/next.config.ts`
   - **In VS Code or your editor**

2. **Verify it contains**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

3. **If it's different**, update it to match above
4. **Save the file** (Cmd+S or Ctrl+S)

---

### Step 2.4: Create/Update Frontend .env File

1. **In your project root** (`/Users/anuj/projects/supremeAnimation/`)

2. **Check if `.env` file exists**:
   ```bash
   ls -la .env
   ```
   (On Windows: `dir .env`)

3. **If file doesn't exist, create it**:
   ```bash
   touch .env
   ```
   (On Windows: `type nul > .env`)

4. **Open `.env` file** in your editor

5. **Add/Update these lines** (replace with your actual values):
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.up.railway.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Important:**
- Replace `https://your-backend-url.up.railway.app` with the actual URL from Step 1.5
- Replace `your_supabase_url_here` with your Supabase URL
- Replace `your_supabase_anon_key_here` with your Supabase anon key
- **No spaces** around the `=` sign
- **No quotes** around the values

6. **Save the file**

---

### Step 2.5: Install Dependencies (If Needed)

**In Terminal, make sure you're in project root**, then run:

```bash
npm install
```

**Wait for completion** (1-2 minutes)

**You should see**: `added XXX packages` message

---

### Step 2.6: Build Static Export

**In Terminal, run:**

```bash
npm run build
```

**What happens:**
1. Next.js will compile your app
2. It will create an `out/` directory
3. This takes 1-3 minutes
4. **Wait for**: "Export successful" or similar message

**Expected output:**
```
✓ Compiled successfully
✓ Exporting (X/X)
✓ Export successful
```

**If you see errors:**
- Read the error message
- Common issues: Missing dependencies, syntax errors
- Fix errors and run `npm run build` again

---

### Step 2.7: Verify Build Output

**In Terminal, run:**

```bash
ls -la out/
```

**On Windows:**
```bash
dir out
```

**You should see:**
- `index.html`
- `_next/` folder
- Other static files

**If `out/` folder doesn't exist:**
- Check for build errors
- Run `npm run build` again

---

## PART 3: UPLOAD TO GODADDY

### Step 3.1: Access GoDaddy cPanel

1. **Open browser**
2. **Go to**: https://sso.godaddy.com
3. **Log in** with your GoDaddy credentials
4. **Click**: "My Products" (top menu)
5. **Find**: "Web Hosting" section
6. **Click**: "Manage" button (next to your hosting plan)
7. **Click**: "cPanel Admin" or "File Manager"
   - You might see "cPanel" button directly
   - Or "File Manager" in the hosting dashboard

---

### Step 3.2: Navigate to Public Directory

**In cPanel File Manager:**

1. **Look at the left sidebar** - you'll see a folder tree
2. **Click**: `public_html` folder
   - If you have multiple domains, click `public_html` → then your domain folder
3. **You should now see**: Contents of `public_html/` in the main area
   - This is where your website files go

---

### Step 3.3: Clear Existing Files (Optional but Recommended)

**If `public_html/` has existing files:**

1. **In File Manager**, click the **checkbox** at the top (selects all files)
2. **Or manually select** files you want to delete
3. **Click**: "Delete" button (top toolbar)
4. **Confirm deletion** in popup
5. **Wait for deletion** to complete

**⚠️ WARNING**: Only delete if you don't need existing files. Make a backup first if unsure.

---

### Step 3.4: Upload Files - Method 1: cPanel Upload

1. **In File Manager**, make sure you're in `public_html/` folder

2. **Click**: "Upload" button (top toolbar)

3. **You'll see**: Upload interface

4. **Click**: "Select File" or drag and drop area

5. **Navigate to your project**:
   - **On Mac**: `/Users/anuj/projects/supremeAnimation/out/`
   - **On Windows**: `C:\Users\...\supremeAnimation\out\`

6. **Select ALL files and folders** in the `out/` directory:
   - **Select `index.html`**
   - **Select `_next` folder** (entire folder)
   - **Select any other files/folders** (like `banner/`, logo files, etc.)
   - **On Mac**: Cmd+Click to select multiple
   - **On Windows**: Ctrl+Click to select multiple

7. **Click**: "Open" or "Upload"

8. **Wait for upload** to complete (2-5 minutes depending on file size)

9. **You should see**: Files appearing in `public_html/`

---

### Step 3.5: Upload Files - Method 2: FTP (Alternative)

**If cPanel upload is slow or fails, use FTP:**

1. **Download FileZilla** (free FTP client):
   - **Mac**: https://filezilla-project.org/download.php?type=client
   - **Windows**: Same link

2. **Get FTP credentials from GoDaddy**:
   - In cPanel → "FTP Accounts"
   - Note: Host, Username, Password

3. **Open FileZilla**

4. **Enter connection details** (top bar):
   - **Host**: `ftp.yourdomain.com` or IP from GoDaddy
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21` (or `22` for SFTP)

5. **Click**: "Quickconnect"

6. **Navigate to `public_html/`** on the server (right side)

7. **Navigate to `out/` folder** on your computer (left side)

8. **Select all files** in `out/` folder (left side)

9. **Drag and drop** to `public_html/` (right side)

10. **Wait for upload** to complete

---

### Step 3.6: Verify Files Are Uploaded

**In cPanel File Manager:**

1. **Make sure you're in `public_html/`**

2. **You should see**:
   - ✅ `index.html` file
   - ✅ `_next/` folder
   - ✅ Other static assets (banner/, logos, etc.)

3. **If files are missing**: Re-upload them

---

## PART 4: CONFIGURE .HTACCESS

### Step 4.1: Create .htaccess File

**In cPanel File Manager:**

1. **Make sure you're in `public_html/` folder**

2. **Click**: "New File" button (top toolbar)

3. **Enter filename**: `.htaccess`
   - **Important**: Starts with a dot (.)
   - **No extension**

4. **Click**: "Create New File"

5. **You should see**: `.htaccess` file appears in the list

---

### Step 4.2: Edit .htaccess File

1. **Right-click** on `.htaccess` file

2. **Click**: "Edit" or "Code Edit"

3. **Delete any existing content**

4. **Copy and paste this exact content**:

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

5. **Click**: "Save Changes" or "Save"

6. **Close the editor**

---

## PART 5: CONFIGURE DNS (IF NEEDED)

### Step 5.1: Check Current DNS

1. **Go to**: https://sso.godaddy.com
2. **Click**: "My Products"
3. **Click**: "DNS" (next to your domain)
4. **You should see**: DNS records table

---

### Step 5.2: Update A Record (If Needed)

**If your domain is not pointing to GoDaddy hosting:**

1. **In DNS Management**, find the **A record** with:
   - **Type**: A
   - **Name**: @ (or blank)

2. **Click**: "Edit" (pencil icon)

3. **Update Value** to your GoDaddy hosting IP:
   - **Find IP in cPanel**: Look for "Shared IP Address" in cPanel
   - **Or contact GoDaddy support** for your hosting IP

4. **Click**: "Save"

5. **Wait 5-10 minutes** for DNS to propagate

---

## PART 6: ENABLE SSL (HTTPS)

### Step 6.1: Enable SSL in cPanel

1. **In cPanel**, look for**: "SSL/TLS" or "Let's Encrypt SSL"

2. **Click**: "SSL/TLS Status" or "Manage SSL"

3. **You'll see**: Your domain listed

4. **Click**: "Run AutoSSL" or "Install" button

5. **Wait 2-5 minutes** for SSL to activate

6. **You should see**: Green checkmark or "Active" status

---

### Step 6.2: Force HTTPS (Already in .htaccess)

The `.htaccess` file we created already forces HTTPS, so this is done!

---

## PART 7: TEST YOUR DEPLOYMENT

### Step 7.1: Test Website

1. **Open browser**

2. **Visit**: `https://yourdomain.com`
   - Replace `yourdomain.com` with your actual domain

3. **You should see**: Your website loads

4. **Check**:
   - ✅ Homepage loads
   - ✅ All sections visible
   - ✅ Images load
   - ✅ Animations work

---

### Step 7.2: Test Contact Form

1. **Scroll to**: Contact section

2. **Fill out the form**:
   - Name
   - Email
   - Company (optional)
   - Project Need
   - Budget
   - Message

3. **Click**: "Submit" button

4. **Open browser console** (F12 or Right-click → Inspect → Console tab)

5. **Look for**:
   - ✅ Success message
   - ✅ No error messages
   - ✅ API call to your Railway backend URL

6. **If form works**: ✅ Success!

7. **If form doesn't work**:
   - Check console for errors
   - Verify backend URL in `.env` was correct
   - Check Railway backend is running
   - Rebuild frontend with correct backend URL

---

### Step 7.3: Test All Pages

**Navigate through your site:**
- ✅ Home section
- ✅ Portfolio section
- ✅ Services/Expertise section
- ✅ Partnerships section
- ✅ Industries section
- ✅ About section
- ✅ Contact section
- ✅ Footer links

**Check**:
- ✅ All pages load
- ✅ No 404 errors
- ✅ Smooth scrolling works
- ✅ All animations work

---

## PART 8: TROUBLESHOOTING

### Issue: Blank Page

**Check:**
1. **Browser console** (F12 → Console tab)
   - Look for error messages
2. **Verify files uploaded**:
   - `index.html` exists in `public_html/`
   - `_next/` folder exists
3. **Check `.htaccess`**:
   - File exists
   - Content is correct
4. **Try**: Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

---

### Issue: Contact Form Not Working

**Check:**
1. **Browser console** (F12 → Console tab)
   - Look for API errors
2. **Verify backend URL**:
   - Check Railway deployment is active
   - Test: `https://your-backend-url.up.railway.app/health`
3. **Rebuild frontend**:
   - Update `.env` with correct backend URL
   - Run `npm run build` again
   - Re-upload `out/` folder

---

### Issue: Images Not Loading

**Check:**
1. **Browser console** (F12 → Console tab)
   - Look for 404 errors on images
2. **Verify image paths**:
   - Check `public/` folder files are uploaded
   - Verify paths in code match uploaded structure
3. **Re-upload** missing image files

---

### Issue: Routing Not Working (404 on Refresh)

**Check:**
1. **Verify `.htaccess` exists** in `public_html/`
2. **Check `.htaccess` content** matches what we created
3. **Contact GoDaddy support** if `mod_rewrite` is not enabled

---

## PART 9: UPDATING YOUR SITE

**When you make changes to your code:**

### Step 9.1: Update Code Locally

1. **Make your changes** in your code editor
2. **Save all files**

---

### Step 9.2: Rebuild Static Export

**In Terminal (project root):**

```bash
cd /Users/anuj/projects/supremeAnimation
npm run build
```

**Wait for build** to complete

---

### Step 9.3: Re-upload to GoDaddy

1. **Go to cPanel File Manager**
2. **Navigate to `public_html/`**
3. **Delete old files** (or just the changed files)
4. **Upload new files** from `out/` folder (same as Step 3.4)

---

## ✅ DEPLOYMENT COMPLETE!

**Your site should now be live at**: `https://yourdomain.com`

**Summary of what we did:**
1. ✅ Deployed backend to Railway
2. ✅ Configured Next.js for static export
3. ✅ Built static files
4. ✅ Uploaded to GoDaddy
5. ✅ Configured `.htaccess`
6. ✅ Enabled SSL
7. ✅ Tested everything

**Need help?** Refer to troubleshooting section or contact support.

