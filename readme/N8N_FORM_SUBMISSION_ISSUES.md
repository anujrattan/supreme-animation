# Form Submission Issues - Troubleshooting

## 🔍 Problem: Form Worked Once, Now Not Working

If the form submitted successfully once but now fails, here are common causes and fixes:

---

## ✅ Quick Checks

### 1. Check Browser Console

**Open browser DevTools (F12) → Console tab**

Look for:
- ✅ `Submitting form to: http://localhost:5678/webhook-test/contact` - Form is trying to submit
- ✅ `Response status: 200` - Success
- ❌ `Response status: 404` - Webhook not found
- ❌ `Response status: 500` - n8n workflow error
- ❌ `Network error` - n8n not running or CORS issue

**What to do:**
- Copy any error messages you see
- Check the "Network" tab to see the actual request/response

---

### 2. Check n8n Workflow Status

**In n8n:**
1. **Go to "Executions" tab**
2. **Look for recent executions**
3. **Check if they're successful (green) or failed (red)**

**If executions are failing:**
- Click on the failed execution
- Check which node failed
- Read the error message

**Common n8n errors:**
- **Supabase connection error** - Check credentials
- **Code node error** - Check JavaScript code
- **Missing field** - Check data mapping

---

### 3. Verify n8n Workflow is Active

**In n8n workflow:**
- **Toggle switch** at top right should be **ON (green)**
- If OFF, click to activate

**Note:** Sometimes workflows get deactivated after errors

---

### 4. Check n8n Webhook URL

**In n8n Webhook node:**
- **Copy the exact webhook URL** shown
- **Compare with `.env` file:**
  ```bash
  NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/contact
  ```
- **They must match exactly**

---

## 🔧 Common Issues & Fixes

### Issue 1: n8n Workflow Error After First Submission

**Symptoms:**
- First submission works
- Subsequent submissions fail
- n8n executions show errors

**Possible Causes:**
- Supabase connection issue
- Missing required fields in Supabase
- Code node JavaScript error
- Response node not configured correctly

**Fix:**
1. **Check n8n execution logs:**
   - Go to "Executions" tab
   - Click on failed execution
   - See which node failed

2. **Check Supabase node:**
   - Verify credentials are correct
   - Check table name is `leads`
   - Verify all required fields are mapped

3. **Check Code node:**
   - Verify JavaScript code is correct
   - Check for syntax errors
   - Ensure all fields are being processed

4. **Check Response node:**
   - Ensure it's connected after Supabase node
   - Verify response format is correct

---

### Issue 2: Network/CORS Error

**Symptoms:**
- Console shows CORS error
- Network tab shows OPTIONS request failing
- Form stuck on "Sending..."

**Fix:**
1. **Check n8n is running:**
   ```bash
   # Visit http://localhost:5678
   # Should see n8n interface
   ```

2. **Test webhook directly:**
   ```bash
   curl -X POST http://localhost:5678/webhook-test/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "email": "test@example.com",
       "projectNeed": "AI Avatars & VTubers",
       "message": "Test",
       "client_id": "supreme-animation"
     }'
   ```

3. **If curl works but browser doesn't:**
   - It's a CORS issue
   - n8n should handle CORS automatically
   - Try restarting n8n

---

### Issue 3: Response Format Mismatch

**Symptoms:**
- Form submits but shows error
- n8n execution is successful
- Browser console shows parsing error

**Fix:**
1. **Check n8n Response node:**
   - Should return JSON: `{"success": true}`
   - Or return 200 OK with empty body

2. **Update Response node in n8n:**
   ```json
   {
     "success": true,
     "message": "Contact form submitted successfully"
   }
   ```

---

### Issue 4: Form Validation Error

**Symptoms:**
- Form doesn't submit
- No network request in console
- Button stays enabled

**Fix:**
1. **Check required fields:**
   - Name, Email, Project Need, Message are required
   - Ensure all are filled

2. **Check browser console:**
   - Look for validation errors
   - Check if form is actually submitting

---

### Issue 5: n8n Workflow Deactivated

**Symptoms:**
- First submission worked
- Now getting 404 errors
- Webhook URL seems correct

**Fix:**
1. **In n8n, check workflow:**
   - Toggle should be ON
   - If OFF, click to activate

2. **Wait a few seconds** after activating
   - Webhook needs time to register

---

## 🧪 Debugging Steps

### Step 1: Check Browser Console

1. **Open DevTools (F12)**
2. **Go to Console tab**
3. **Submit the form**
4. **Look for:**
   - `Submitting form to: ...` - Shows URL being called
   - `Payload: ...` - Shows data being sent
   - `Response status: ...` - Shows HTTP status
   - Any error messages

### Step 2: Check Network Tab

1. **Open DevTools (F12)**
2. **Go to Network tab**
3. **Submit the form**
4. **Find the request to `/webhook-test/contact`**
5. **Click on it to see:**
   - Request payload
   - Response status
   - Response body
   - Headers

### Step 3: Check n8n Executions

1. **Open n8n**
2. **Go to "Executions" tab**
3. **Look for recent executions**
4. **Click on execution to see:**
   - Which nodes executed
   - Data at each node
   - Any errors

### Step 4: Test Webhook Directly

**Use curl to test:**
```bash
curl -X POST http://localhost:5678/webhook-test/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "projectNeed": "AI Avatars & VTubers",
    "budget": "$50K",
    "message": "Test message",
    "client_id": "supreme-animation"
  }'
```

**Expected response:**
- Status: `200 OK`
- Body: JSON with success message (or empty)

---

## 🔄 Quick Fixes

### Fix 1: Restart Everything

1. **Stop n8n** (Ctrl+C)
2. **Restart n8n**: `npx n8n` or `n8n`
3. **Stop Next.js** (Ctrl+C)
4. **Restart Next.js**: `npm run dev`
5. **Reactivate workflow** in n8n
6. **Try form again**

### Fix 2: Clear Browser Cache

1. **Hard refresh**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Or clear cache** in browser settings
3. **Try form again**

### Fix 3: Check .env File

1. **Verify `.env` file exists** in project root
2. **Check value:**
   ```bash
   NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/contact
   ```
3. **Restart Next.js** after changing `.env`

---

## 📋 Checklist

When form stops working:

- [ ] Browser console shows no errors
- [ ] Network tab shows request being sent
- [ ] n8n is running (`http://localhost:5678` loads)
- [ ] Workflow is activated (toggle ON)
- [ ] Webhook URL in n8n matches `.env` file
- [ ] n8n executions show success (not errors)
- [ ] Supabase credentials are correct
- [ ] All required form fields are filled
- [ ] Tried restarting n8n and Next.js
- [ ] Tested webhook with curl (works)

---

## 🆘 Still Not Working?

**Collect this information:**

1. **Browser console errors** (screenshot or copy text)
2. **Network tab** - Request/Response details
3. **n8n execution logs** - Which node failed and error message
4. **n8n webhook URL** - Exact URL shown in webhook node
5. **`.env` file** - Value of `NEXT_PUBLIC_N8N_WEBHOOK_URL`

**Then:**
- Check if n8n workflow has any error nodes
- Verify Supabase connection works
- Test webhook with curl to isolate the issue

