# n8n Workflow Setup - Contact Form to Supabase

This guide will help you import and configure the n8n workflow that replaces the backend API for contact form submissions.

## 📋 Prerequisites

1. **n8n installed and running** on `localhost:5678`
2. **Supabase account** with the `leads` table created
3. **Supabase credentials**:
   - Supabase Project URL
   - Supabase Service Role Key (for write access)

---

## 🚀 Step-by-Step Setup

### Step 1: Import the Workflow

1. **Open n8n**: Navigate to `http://localhost:5678`
2. **Click**: "Workflows" in the left sidebar
3. **Click**: "Import from File" or "Import from URL"
4. **Select**: `readme/n8n-workflow-contact-form.json`
5. **Click**: "Import"

The workflow will be imported with 4 nodes:
- **Webhook** (trigger)
- **Process Form Data** (Code node - transforms data)
- **Insert to Supabase** (Supabase node - saves to database)
- **Respond to Webhook** (responds to the form)

---

### Step 2: Configure Supabase Credentials

1. **Click on the "Insert to Supabase" node**
2. **Click**: "Create New Credential" or select existing
3. **Fill in**:
   - **Host**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - **Service Role Secret**: Your Supabase Service Role Key
   - **Click**: "Save"

**⚠️ Important**: Use the **Service Role Key**, not the Anon Key, as it has write permissions.

**Where to find your Supabase credentials:**
- Go to your Supabase project dashboard
- Settings → API
- Copy:
  - **Project URL** → Use as Host
  - **service_role key** (secret) → Use as Service Role Secret

---

### Step 3: Configure the Webhook

1. **Click on the "Webhook" node**
2. **Verify settings**:
   - **HTTP Method**: `POST`
   - **Path**: `contact` (this creates: `http://localhost:5678/webhook/contact`)
   - **Response Mode**: "Respond When Last Node Finishes"
3. **Click**: "Save"

**Note**: The webhook URL will be: `http://localhost:5678/webhook/contact`

---

### Step 4: Verify Table Mapping

1. **Click on the "Insert to Supabase" node**
2. **Verify the table name**: Should be `leads`
3. **Check field mappings** (should match automatically):
   - `first_name` → from processed data
   - `last_name` → from processed data
   - `email` → from form
   - `phone` → "Not provided" (default)
   - `message` → from form
   - `company_name` → from form (optional)
   - `service_need` → from form `projectNeed`
   - `notes` → from form `budget` (formatted as "Budget: $X")
   - `property_url` → "https://supremeanimation.com"
   - `source` → "supreme_animation_website"
   - `status` → "New"
   - `whatsapp_same` → false

---

### Step 5: Activate the Workflow

1. **Toggle the "Active" switch** at the top right of the workflow
2. **The workflow is now live** and listening for webhook requests

---

### Step 6: Test the Workflow

#### Option A: Test from n8n UI

1. **Click**: "Execute Workflow" button
2. **In the Webhook node**, click "Listen for Test Event"
3. **Open a new tab** and use curl or Postman:
   ```bash
   curl -X POST http://localhost:5678/webhook/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "company": "Test Studio",
       "projectNeed": "AI Avatars & VTubers",
       "budget": "$50K – $150K",
       "message": "This is a test message",
       "client_id": "supreme-animation"
     }'
   ```
4. **Check n8n execution**: You should see the data flow through all nodes
5. **Check Supabase**: Verify the lead was created in the `leads` table

#### Option B: Test from the Website

1. **Start Next.js dev server**: `npm run dev`
2. **Fill out the contact form** on the website
3. **Submit the form**
4. **Check n8n**: Execution should appear in "Executions" tab
5. **Check Supabase**: New lead should be in the database

---

## 🔍 Workflow Details

### Data Flow

```
1. Webhook receives POST request
   ↓
2. Process Form Data (Code node):
   - Splits name into first_name/last_name
   - Formats budget into notes
   - Maps all fields correctly
   ↓
3. Insert to Supabase:
   - Saves lead to database
   - Returns created record
   ↓
4. Respond to Webhook:
   - Returns success response to form
```

### Name Splitting Logic

The workflow replicates the backend logic:
- **Empty name**: `first_name = "Unknown"`, `last_name = "User"`
- **Single word**: `first_name = "John"`, `last_name = "N/A"`
- **Multiple words**: `first_name = "John"`, `last_name = "Doe Smith"` (all remaining words)

### Notes Field

- If budget is provided: `notes = "Budget: $50K – $150K"`
- If budget is empty: `notes = null`

---

## 🛠️ Troubleshooting

### Error: "Table 'leads' not found"
- **Solution**: Make sure the `leads` table exists in Supabase
- Run the SQL from `backend/supabase-setup.sql` if needed

### Error: "Permission denied" or "Row Level Security"
- **Solution**: Use the **Service Role Key** (not Anon Key)
- Or disable RLS on the `leads` table for inserts

### Error: "Webhook not found" or 404
- **Solution**: Make sure the workflow is **activated**
- Check the webhook path matches: `/webhook/contact`
- Verify n8n is running on `localhost:5678`

### Data not appearing in Supabase
- **Check n8n execution logs**: Look for errors in each node
- **Verify Supabase credentials**: Test connection in Supabase node
- **Check field mappings**: Ensure all required fields are mapped

### CORS Errors
- **Solution**: n8n webhooks don't typically have CORS issues
- If you see CORS errors, check browser console for details
- Ensure the form is sending to the correct URL

---

## 📊 Monitoring

### View Executions

1. **In n8n**, go to "Executions" tab
2. **See all workflow runs** with:
   - Success/failure status
   - Execution time
   - Data flow through nodes

### Check Supabase

1. **Go to Supabase dashboard**
2. **Table Editor** → `leads` table
3. **Verify new submissions** appear with:
   - Correct `source`: `supreme_animation_website`
   - Correct `status`: `New`
   - All form data properly mapped

---

## 🔄 Production Deployment

When deploying to production:

1. **Update webhook URL** in your frontend:
   - Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` to your production n8n URL
   - Example: `https://n8n.yourdomain.com/webhook/contact`

2. **Ensure n8n is accessible**:
   - Use a public URL or tunnel (ngrok, Cloudflare Tunnel)
   - Or deploy n8n to a server with a domain

3. **Secure the webhook** (optional):
   - Add authentication to the webhook node
   - Or use n8n's webhook authentication features

---

## 📝 Workflow Customization

### Add Email Notification

Add an "Email" node after "Insert to Supabase":
- Configure SMTP settings
- Send notification when a new lead is created

### Add Slack/Discord Notification

Add a "Slack" or "Discord" node:
- Get notified in your team channel
- Include lead details in the message

### Add Data Validation

Add an "IF" node before "Process Form Data":
- Validate required fields
- Return error if data is invalid

---

## ✅ Checklist

- [ ] Workflow imported successfully
- [ ] Supabase credentials configured
- [ ] Webhook path verified (`/webhook/contact`)
- [ ] Workflow activated
- [ ] Test submission successful
- [ ] Data appears in Supabase `leads` table
- [ ] Form shows success message
- [ ] Production URL configured (when ready)

---

**Need help?** Check n8n execution logs or Supabase table editor for detailed error messages.

