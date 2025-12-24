# FTP Connection Troubleshooting for GoDaddy

## Issue: "Could not connect to server" or DNS resolution error

### Solution 1: Find Correct FTP Hostname

**In GoDaddy cPanel:**

1. **Go to**: cPanel → "FTP Accounts"
2. **Look for**: "Configure FTP Client" or "FTP Connection Details"
3. **You'll see one of these formats**:
   - `ftp.yourdomain.com` (if FTP subdomain is set up)
   - `your-server-ip` (direct IP address)
   - `host.yourdomain.com` (alternative hostname)
   - `files.yourdomain.com` (alternative hostname)

### Solution 2: Use Server IP Address

1. **In cPanel**, look for:
   - "Server Information" section
   - Or "Shared IP Address"
   - Copy the IP address (e.g., `192.168.1.100`)

2. **In FileZilla**, use:
   - **Host**: `[your-server-ip]` (the IP address)
   - **Port**: `21` (or `22` for SFTP)
   - **Username**: Your FTP username
   - **Password**: Your FTP password

### Solution 3: Check FTP Account Settings

1. **Go to**: cPanel → "FTP Accounts"
2. **Find your FTP account** (or create one)
3. **Click**: "Configure FTP Client" or "Connection Details"
4. **Copy the exact hostname** shown there

### Solution 4: Common GoDaddy FTP Hostnames

Try these formats (replace `yourdomain.com` with `supremeanimation.com`):

- `ftp.yourdomain.com`
- `files.yourdomain.com`
- `host.yourdomain.com`
- `your-server-ip` (from cPanel)

### Solution 5: Use SFTP (Port 22)

If regular FTP doesn't work:

1. **In FileZilla**: File → Site Manager
2. **Protocol**: Select "SFTP - SSH File Transfer Protocol"
3. **Host**: Same as above
4. **Port**: `22`
5. **Logon Type**: Normal
6. **Username**: Your FTP username
7. **Password**: Your FTP password

### Solution 6: Contact GoDaddy Support

If none of the above work:

1. **Contact GoDaddy Support**
2. **Ask for**: "FTP connection details for my shared hosting account"
3. **They'll provide**: Exact hostname, port, and connection method

---

## Quick Steps to Find FTP Details in cPanel

1. **Login to GoDaddy** → My Products → Web Hosting → Manage
2. **Open cPanel**
3. **Click**: "FTP Accounts" (under Files section)
4. **Look for**: "Configure FTP Client" button
5. **Copy**: The hostname shown there

---

## Alternative: Use GoDaddy's File Manager (If FTP Fails)

If FTP continues to fail, you can:

1. **Use cPanel File Manager** to manually create folders
2. **Upload files individually** (time-consuming but works)
3. **Or compress files** and extract on server

