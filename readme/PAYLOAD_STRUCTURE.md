# Final Payload Structure - Frontend to n8n Workflow

## 📤 Payload Sent from Frontend to n8n

### Current Implementation (Animation Studio)

**From `src/components/Contact.tsx`:**

```json
{
  "name": "Jane Smith",
  "email": "jane@studio.com",
  "company": "Creative Studio",
  "projectNeed": "3D Animation",
  "budget": "$50K - $100K",
  "message": "I need help with creating a 3D animation for our product launch.",
  "client_id": "supreme-animation"
}
```

**Note:** Currently uses `projectNeed` (needs to be changed to `serviceNeed` per standardization)

---

## 📋 Standardized Payload (After Updates)

### All Industries Should Send This Structure:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9646646111",
  "company": "Example Studio",
  "serviceNeed": "3D Animation",
  "budget": "$50K - $100K",
  "message": "I need help with...",
  "client_id": "supreme-animation",
  "property_url": "https://supremeanimation.com/contact"
}
```

---

## 🏢 Industry-Specific Payloads

### 1. Real Estate Contact Form

**Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9646646111",
  "serviceNeed": "Residential Property",
  "message": "I'm interested in viewing properties in downtown area.",
  "client_id": "real-estate-client-1",
  "property_url": "https://realestate.com/contact"
}
```

**Fields:**
- ✅ `name` (required)
- ✅ `email` (required)
- ✅ `phone` (required)
- ✅ `serviceNeed` (required)
- ⚠️ `message` (optional)
- ✅ `client_id` (required, hidden)
- ✅ `property_url` (from Real Estate form)

**Missing fields:**
- ❌ `company` (not in form)
- ❌ `budget` (not in form)

---

### 2. Animation Studio Contact Form

**Payload:**
```json
{
  "name": "Jane Smith",
  "email": "jane@studio.com",
  "company": "Creative Studio",
  "serviceNeed": "3D Animation",
  "budget": "$50K - $100K",
  "message": "I need help with creating a 3D animation for our product launch.",
  "client_id": "supreme-animation"
}
```

**Fields:**
- ✅ `name` (required)
- ✅ `email` (required)
- ⚠️ `company` (optional)
- ✅ `serviceNeed` (required)
- ⚠️ `budget` (optional)
- ✅ `message` (required)
- ✅ `client_id` (required, hidden)

**Missing fields:**
- ❌ `phone` (not in form)
- ❌ `property_url` (not sent, will be set to 'N/A' in n8n)

---

### 3. Signage Company Contact Form

**Payload:**
```json
{
  "name": "Mike Johnson",
  "email": "mike@business.com",
  "phone": "+91-1234567890",
  "company": "Local Business Inc",
  "serviceNeed": "Outdoor Signage",
  "message": "I need help with designing and installing outdoor signage for our storefront.",
  "client_id": "signage-client-1"
}
```

**Fields:**
- ✅ `name` (required)
- ✅ `email` (required)
- ⚠️ `phone` (optional)
- ⚠️ `company` (optional)
- ⚠️ `serviceNeed` (optional)
- ✅ `message` (required)
- ✅ `client_id` (required, hidden)

**Missing fields:**
- ❌ `budget` (not in form)
- ❌ `property_url` (not sent, will be set to 'N/A' in n8n)

---

## 🔄 Payload Processing in n8n

### What n8n Receives:

**Raw payload from frontend:**
```json
{
  "name": "Jane Smith",
  "email": "jane@studio.com",
  "company": "Creative Studio",
  "serviceNeed": "3D Animation",
  "budget": "$50K - $100K",
  "message": "I need help with...",
  "client_id": "supreme-animation"
}
```

### What n8n Processes and Sends to Supabase:

**After Code Node processing:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@studio.com",
  "phone": "Not Available",
  "message": "I need help with...",
  "company_name": "Creative Studio",
  "service_need": "3D Animation",
  "notes": "Budget: $50K - $100K",
  "property_url": "N/A",
  "source": "supreme_animation_website",
  "status": "New",
  "whatsapp_same": false,
  "client_id": "supreme-animation"
}
```

---

## 📊 Complete Payload Flow

### Step 1: Frontend Form Submission

```javascript
// From Contact.tsx handleSubmit
const payload = {
  ...form,  // Contains: name, email, company, projectNeed, budget, message
  client_id: "supreme-animation"
};

// Sent to n8n webhook
fetch(n8nWebhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

### Step 2: n8n Webhook Receives

```json
{
  "name": "Jane Smith",
  "email": "jane@studio.com",
  "company": "Creative Studio",
  "projectNeed": "3D Animation",  // Note: Should be "serviceNeed" after standardization
  "budget": "$50K - $100K",
  "message": "I need help with...",
  "client_id": "supreme-animation"
}
```

### Step 3: n8n Code Node Processes

- Splits `name` → `first_name`, `last_name`
- Maps `email` → `email`
- Maps `company` → `company_name`
- Maps `serviceNeed`/`projectNeed` → `service_need`
- Maps `message` → `message`
- Formats `budget` → `notes` ("Budget: $X")
- Sets `phone` based on industry
- Sets `property_url` based on industry
- Sets `source` based on `client_id`
- Sets `status` = "New"
- Sets `whatsapp_same` = false

### Step 4: n8n Sends to Supabase

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@studio.com",
  "phone": "Not Available",
  "message": "I need help with...",
  "company_name": "Creative Studio",
  "service_need": "3D Animation",
  "notes": "Budget: $50K - $100K",
  "property_url": "N/A",
  "source": "supreme_animation_website",
  "status": "New",
  "whatsapp_same": false,
  "client_id": "supreme-animation"
}
```

---

## ✅ Field Mapping Summary

| Frontend Field | n8n Processing | Database Column | Example Value |
|---------------|----------------|-----------------|---------------|
| `name` | Split into first/last | `first_name`, `last_name` | "Jane Smith" → "Jane", "Smith" |
| `email` | Direct mapping | `email` | "jane@studio.com" |
| `phone` | Industry-specific | `phone` | "+91-123" or "Not Available" |
| `company` | Direct mapping | `company_name` | "Creative Studio" |
| `serviceNeed` | Direct mapping | `service_need` | "3D Animation" |
| `message` | Direct mapping | `message` | "I need help with..." |
| `budget` | Format to "Budget: $X" | `notes` | "$50K" → "Budget: $50K" |
| `client_id` | Direct mapping | `client_id` | "supreme-animation" |
| `property_url` | Industry-specific | `property_url` | From form or "N/A" |

---

## 🎯 Current vs Standardized

### Current (Animation Studio):
```json
{
  "projectNeed": "3D Animation"  // ⚠️ Needs to change
}
```

### Standardized (All Industries):
```json
{
  "serviceNeed": "3D Animation"  // ✅ Standard name
}
```

---

## 📝 Notes

1. **`property_url`**: Only Real Estate forms send this. Animation Studio and Signage Company don't send it, so n8n sets it to `'N/A'`.

2. **`phone`**: 
   - Real Estate: Required, comes from form
   - Animation Studio: Not in form, n8n sets to `'Not Available'`
   - Signage Company: Optional, comes from form or `'Not Available'`

3. **`client_id`**: Always required, identifies which industry/client the lead belongs to.

4. **Field name standardization**: After updating frontend forms, all industries will use `serviceNeed` instead of `projectNeed` or `serviceInterestedIn`.

