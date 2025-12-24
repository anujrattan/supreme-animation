# n8n Webhook 404 Error - Troubleshooting Guide

## 🔍 Error Analysis

**Error**: `404 Not Found` on `OPTIONS` request to `http://localhost:5678/webhook-test/contact`

**What's happening:**
1. Browser sends **CORS preflight request** (OPTIONS method) before the actual POST
2. n8n webhook doesn't exist at that path → 404 error
3. Browser blocks the actual POST request due to failed preflight

---

## ✅ Solution Steps

### Step 1: Verify n8n Webhook URL

1. **Open n8n**: `http://localhost:5678`
2. **Go to your workflow**
3. **Click on the Webhook node**
4. **Check the webhook URL** shown in the node:
   - It should show something like: `http://localhost:5678/webhook/contact` or `http://localhost:5678/webhook-test/contact`
5. **Copy the exact URL** shown

### Step 2: Update .env File

**If your n8n webhook URL is different**, update `.env`:

```bash
# If n8n shows: http://localhost:5678/webhook/contact
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/contact

# OR if n8n shows: http://localhost:5678/webhook-test/contact
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/contact
```

### Step 3: Verify Workflow is Activated

1. **In n8n**, check the **toggle switch** at the top right of the workflow
2. **It should be ON (green/active)**
3. **If OFF**: Click to activate it

### Step 4: Check Webhook Path in n8n

**In the Webhook node settings:**
- **Path**: Should be `contact` (creates `/webhook/contact`)
- **OR**: Should be `test/contact` (creates `/webhook-test/contact`)

**n8n URL structure:**
- Path: `contact` → URL: `http://localhost:5678/webhook/contact`
- Path: `test/contact` → URL: `http://localhost:5678/webhook-test/contact`

---

## 🔧 Common Issues & Fixes

### Issue 1: Webhook Path Mismatch

**Problem**: `.env` has `/webhook-test/contact` but n8n webhook is at `/webhook/contact`

**Fix**:
1. Either update `.env` to match n8n
2. OR update n8n webhook path to match `.env`

### Issue 2: Workflow Not Activated

**Problem**: Workflow exists but isn't active

**Fix**:
1. Toggle the **"Active"** switch ON in n8n
2. Wait a few seconds for webhook to register

### Issue 3: Wrong Webhook Node Configuration

**Problem**: Webhook node path is incorrect

**Fix**:
1. Click on Webhook node
2. Set **Path** to: `contact` (for `/webhook/contact`)
3. OR set **Path** to: `test/contact` (for `/webhook-test/contact`)
4. Save and reactivate workflow

### Issue 4: n8n Not Running

**Problem**: n8n server isn't running

**Fix**:
1. Check if n8n is running: `http://localhost:5678` should load
2. If not, start n8n:
   ```bash
   npx n8n
   # OR if installed globally
   n8n
   ```

---

## 🧪 Test the Webhook Directly

**Test with curl** (bypasses CORS):

```bash
curl -X POST http://localhost:5678/webhook-test/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "projectNeed": "AI Avatars & VTubers",
    "message": "Test message",
    "client_id": "supreme-animation"
  }'
```

**If this works**: The webhook is correct, issue is CORS
**If this fails**: The webhook path is wrong or workflow isn't active

---

## 🔄 Quick Fix Checklist

- [ ] n8n is running on `localhost:5678`
- [ ] Workflow is **activated** (toggle ON)
- [ ] Webhook node path matches `.env` file
- [ ] `.env` file has correct `NEXT_PUBLIC_N8N_WEBHOOK_URL`
- [ ] Restarted Next.js dev server after changing `.env`
- [ ] Tested webhook with curl (works)
- [ ] Browser console shows correct URL being called

---

## 📝 Standard n8n Webhook Paths

**Default n8n webhook structure:**
- Base URL: `http://localhost:5678`
- Path in node: `contact`
- Full URL: `http://localhost:5678/webhook/contact`

**If you need custom path:**
- Path in node: `test/contact`
- Full URL: `http://localhost:5678/webhook-test/contact`

**Note**: n8n automatically prefixes `/webhook/` or `/webhook-{custom}/` based on the path structure.

---

## 🚀 Recommended Fix

**Most likely issue**: Path mismatch between `.env` and n8n webhook

**Quick fix**:
1. Check n8n webhook node for the exact URL
2. Update `.env` to match exactly
3. Restart Next.js: `npm run dev`
4. Try form submission again

