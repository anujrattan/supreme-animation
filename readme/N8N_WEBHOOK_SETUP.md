# n8n Webhook Setup for Contact Form

The contact form now submits to your local n8n instance instead of the backend API.

## Configuration

### Environment Variable (Optional)

You can set a custom n8n webhook URL via environment variable:

**Create `.env.local` in the project root:**

```bash
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/contact
```

**Default URL** (if no env variable is set):
- `http://localhost:5678/webhook/contact`

---

## n8n Webhook Setup

### Step 1: Create Webhook Node in n8n

1. **Open n8n** (http://localhost:5678)
2. **Create a new workflow**
3. **Add a "Webhook" node** as the trigger
4. **Configure the webhook**:
   - **HTTP Method**: `POST`
   - **Path**: `/webhook/contact` (or your custom path)
   - **Response Mode**: "Respond When Last Node Finishes" or "Using 'Respond to Webhook' Node"
   - **Authentication**: None (or configure if needed)

### Step 2: Test the Webhook

1. **Activate the workflow** in n8n
2. **Copy the webhook URL** (should be something like: `http://localhost:5678/webhook/contact`)
3. **Update the environment variable** if the path is different

### Step 3: Form Data Structure

The contact form sends the following JSON payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Studio",
  "projectNeed": "AI Avatars & VTubers",
  "budget": "$50K – $150K",
  "message": "I need help with...",
  "client_id": "supreme-animation"
}
```

**Fields:**
- `name` (required): Full name
- `email` (required): Email address
- `company` (optional): Company/Studio name
- `projectNeed` (required): Selected project type
- `budget` (optional): Estimated budget
- `message` (required): Project description
- `client_id` (hidden, required): Client identifier - currently set to `"supreme-animation"`

### Step 4: Expected Response

The form expects a successful HTTP response (200 OK). n8n can return:
- Empty body (200 OK) - Form will show success
- JSON with `{ success: true }` - Form will show success
- Any other 200 response - Form will show success

If n8n returns an error status (4xx, 5xx), the form will display an error message.

---

## Testing

1. **Start n8n**: Make sure n8n is running on `localhost:5678`
2. **Start Next.js dev server**: `npm run dev`
3. **Fill out the contact form** on the website
4. **Check n8n workflow** - You should see the webhook trigger with the form data
5. **Verify response** - Form should show "Message Sent!" on success

---

## Troubleshooting

### Form shows "Failed to submit form"
- Check if n8n is running on `localhost:5678`
- Verify the webhook path matches your n8n workflow
- Check browser console for CORS errors
- Ensure the n8n workflow is **activated**

### CORS Errors
If you see CORS errors, you may need to:
- Configure CORS in n8n settings
- Or use a proxy/CORS extension for local development

### Webhook Not Triggering
- Verify the workflow is **activated** in n8n
- Check the webhook URL path matches exactly
- Test the webhook directly using curl:
  ```bash
  curl -X POST http://localhost:5678/webhook/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","projectNeed":"AI Avatars & VTubers","message":"Test message"}'
  ```

---

## Production Deployment

For production, you'll need to:
1. **Update the webhook URL** to point to your production n8n instance
2. **Set the environment variable** in your hosting platform:
   - Netlify: Site settings → Environment variables
   - GoDaddy: Via `.env` file or hosting panel
3. **Ensure n8n is accessible** from the internet (or use a tunnel service)

---

## Reverting to Backend API

If you want to switch back to the backend API:

1. **Update `src/components/Contact.tsx`**:
   ```typescript
   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
   const response = await fetch(`${backendUrl}/api/contact/submit`, {
     // ... rest of the code
   });
   ```

2. **Remove or comment out** the n8n webhook code

