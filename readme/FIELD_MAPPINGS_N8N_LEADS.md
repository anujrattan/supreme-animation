# Field Mappings: Contact Form → n8n → Leads Table

## 📋 Overview

This document defines the field mappings for each industry's contact form, showing how data flows from the form → n8n workflow → Supabase leads table.

---

## 🏢 1. Real Estate Contact Form Mapping

### Form Fields → n8n → Leads Table

| Form Field | Form Name | n8n Processing | Leads Table Column | Required | Notes |
|-----------|-----------|----------------|-------------------|----------|-------|
| **Full Name** | `name` | Split into first/last | `first_name`, `last_name` | ✅ Yes | Split logic: first word = first_name, rest = last_name |
| **Phone Number** | `phone` | Direct mapping | `phone` | ✅ Yes | Required for Real Estate |
| **Email Address** | `email` | Direct mapping | `email` | ✅ Yes | |
| **Service Interested In** | `serviceInterestedIn` | Direct mapping | `service_need` | ✅ Yes | Dropdown value |
| **Message** | `message` | Direct mapping | `message` | ⚠️ Optional | Can be empty |
| **Hidden: Client ID** | `client_id` | Direct mapping | `client_id` | ✅ Yes | Value: `"real-estate-client-1"` |
| **Hidden: Source** | - | Set in n8n | `source` | ✅ Yes | Value: `"real_estate_website"` |

### n8n Code Node Logic (Real Estate):

```javascript
// Split name into first_name and last_name
const name = ($input.item.json.name || '').trim();
const parts = name.split(/\s+/).filter(part => part.length > 0);

let firstName, lastName;
if (parts.length === 0) {
  firstName = 'Unknown';
  lastName = 'User';
} else if (parts.length === 1) {
  firstName = parts[0];
  lastName = 'N/A';
} else {
  firstName = parts[0];
  lastName = parts.slice(1).join(' ');
}

// Get form data
const formData = $input.item.json;

// Prepare data for Supabase
return {
  json: {
    first_name: firstName,
    last_name: lastName,
    email: (formData.email || '').trim(),
    phone: (formData.phone || '').trim(), // Required for Real Estate
    message: (formData.message || '').trim() || null,
    company_name: null, // Not in Real Estate form
    service_need: (formData.serviceInterestedIn || '').trim(),
    notes: null, // No budget field in Real Estate form
    property_url: formData.property_url || 'https://realestate-client.com',
    source: 'real_estate_website',
    status: 'New',
    whatsapp_same: false,
    client_id: formData.client_id || 'real-estate-client-1'
  }
};
```

### Supabase Insert Mapping:

```javascript
{
  "first_name": "={{ $json.first_name }}",
  "last_name": "={{ $json.last_name }}",
  "email": "={{ $json.email }}",
  "phone": "={{ $json.phone }}",
  "message": "={{ $json.message }}",
  "company_name": null,
  "service_need": "={{ $json.service_need }}",
  "notes": null,
  "property_url": "={{ $json.property_url }}",
  "source": "={{ $json.source }}",
  "status": "={{ $json.status }}",
  "whatsapp_same": false
}
```

---

## 🎨 2. Animation Studio Contact Form Mapping

### Form Fields → n8n → Leads Table

| Form Field | Form Name | n8n Processing | Leads Table Column | Required | Notes |
|-----------|-----------|----------------|-------------------|----------|-------|
| **Name** | `name` | Split into first/last | `first_name`, `last_name` | ✅ Yes | Split logic: first word = first_name, rest = last_name |
| **Email** | `email` | Direct mapping | `email` | ✅ Yes | |
| **Company / Studio** | `company` | Direct mapping | `company_name` | ⚠️ Optional | Can be empty/null |
| **What do you need?** | `projectNeed` | Direct mapping | `service_need` | ✅ Yes | Dropdown value |
| **Estimated budget** | `budget` | Format and store | `notes` | ⚠️ Optional | Format: "Budget: $50K - $100K" |
| **Tell us about your project** | `message` | Direct mapping | `message` | ✅ Yes | Required |
| **Hidden: Client ID** | `client_id` | Direct mapping | `client_id` | ✅ Yes | Value: `"supreme-animation"` |
| **Hidden: Source** | - | Set in n8n | `source` | ✅ Yes | Value: `"supreme_animation_website"` |

### n8n Code Node Logic (Animation Studio):

```javascript
// Split name into first_name and last_name
const name = ($input.item.json.name || '').trim();
const parts = name.split(/\s+/).filter(part => part.length > 0);

let firstName, lastName;
if (parts.length === 0) {
  firstName = 'Unknown';
  lastName = 'User';
} else if (parts.length === 1) {
  firstName = parts[0];
  lastName = 'N/A';
} else {
  firstName = parts[0];
  lastName = parts.slice(1).join(' ');
}

// Get form data
const formData = $input.item.json;

// Build notes from budget (if provided)
const notes = formData.budget && formData.budget.trim() 
  ? `Budget: ${formData.budget.trim()}` 
  : null;

// Prepare data for Supabase
return {
  json: {
    first_name: firstName,
    last_name: lastName,
    email: (formData.email || '').trim(),
    phone: 'Not provided', // Not in Animation Studio form
    message: (formData.message || '').trim(),
    company_name: formData.company && formData.company.trim() 
      ? formData.company.trim() 
      : null,
    service_need: (formData.projectNeed || '').trim(),
    notes: notes,
    property_url: formData.property_url || 'https://supremeanimation.com',
    source: 'supreme_animation_website',
    status: 'New',
    whatsapp_same: false,
    client_id: formData.client_id || 'supreme-animation'
  }
};
```

### Supabase Insert Mapping:

```javascript
{
  "first_name": "={{ $json.first_name }}",
  "last_name": "={{ $json.last_name }}",
  "email": "={{ $json.email }}",
  "phone": "={{ $json.phone }}",
  "message": "={{ $json.message }}",
  "company_name": "={{ $json.company_name }}",
  "service_need": "={{ $json.service_need }}",
  "notes": "={{ $json.notes }}",
  "property_url": "={{ $json.property_url }}",
  "source": "={{ $json.source }}",
  "status": "={{ $json.status }}",
  "whatsapp_same": false
}
```

---

## 🪧 3. Signage Company Contact Form Mapping

### Form Fields → n8n → Leads Table

| Form Field | Form Name | n8n Processing | Leads Table Column | Required | Notes |
|-----------|-----------|----------------|-------------------|----------|-------|
| **Full Name** | `name` | Split into first/last | `first_name`, `last_name` | ✅ Yes | Split logic: first word = first_name, rest = last_name |
| **Email Address** | `email` | Direct mapping | `email` | ✅ Yes | |
| **Phone Number** | `phone` | Direct mapping | `phone` | ⚠️ Optional | Can be empty/null |
| **Company Name** | `company` | Direct mapping | `company_name` | ⚠️ Optional | Can be empty/null |
| **Service Interested In** | `serviceInterestedIn` | Direct mapping | `service_need` | ⚠️ Optional | Can be empty/null |
| **Project Details** | `message` | Direct mapping | `message` | ✅ Yes | Required |
| **Hidden: Client ID** | `client_id` | Direct mapping | `client_id` | ✅ Yes | Value: `"signage-client-1"` |
| **Hidden: Source** | - | Set in n8n | `source` | ✅ Yes | Value: `"signage_website"` |

### n8n Code Node Logic (Signage Company):

```javascript
// Split name into first_name and last_name
const name = ($input.item.json.name || '').trim();
const parts = name.split(/\s+/).filter(part => part.length > 0);

let firstName, lastName;
if (parts.length === 0) {
  firstName = 'Unknown';
  lastName = 'User';
} else if (parts.length === 1) {
  firstName = parts[0];
  lastName = 'N/A';
} else {
  firstName = parts[0];
  lastName = parts.slice(1).join(' ');
}

// Get form data
const formData = $input.item.json;

// Prepare data for Supabase
return {
  json: {
    first_name: firstName,
    last_name: lastName,
    email: (formData.email || '').trim(),
    phone: formData.phone && formData.phone.trim() 
      ? formData.phone.trim() 
      : null, // Optional for Signage
    message: (formData.message || '').trim(),
    company_name: formData.company && formData.company.trim() 
      ? formData.company.trim() 
      : null,
    service_need: formData.serviceInterestedIn && formData.serviceInterestedIn.trim()
      ? formData.serviceInterestedIn.trim()
      : null, // Optional for Signage
    notes: null, // No budget field in Signage form
    property_url: formData.property_url || 'https://signage-client.com',
    source: 'signage_website',
    status: 'New',
    whatsapp_same: false,
    client_id: formData.client_id || 'signage-client-1'
  }
};
```

### Supabase Insert Mapping:

```javascript
{
  "first_name": "={{ $json.first_name }}",
  "last_name": "={{ $json.last_name }}",
  "email": "={{ $json.email }}",
  "phone": "={{ $json.phone }}",
  "message": "={{ $json.message }}",
  "company_name": "={{ $json.company_name }}",
  "service_need": "={{ $json.service_need }}",
  "notes": null,
  "property_url": "={{ $json.property_url }}",
  "source": "={{ $json.source }}",
  "status": "={{ $json.status }}",
  "whatsapp_same": false
}
```

---

## 🔄 Universal n8n Code Node (Handles All Industries)

### Single Code Node That Routes by `client_id`:

```javascript
// Split name into first_name and last_name (universal)
const name = ($input.item.json.name || '').trim();
const parts = name.split(/\s+/).filter(part => part.length > 0);

let firstName, lastName;
if (parts.length === 0) {
  firstName = 'Unknown';
  lastName = 'User';
} else if (parts.length === 1) {
  firstName = parts[0];
  lastName = 'N/A';
} else {
  firstName = parts[0];
  lastName = parts.slice(1).join(' ');
}

// Get form data
const formData = $input.item.json;
const clientId = formData.client_id || '';

// Initialize result object
const result = {
  first_name: firstName,
  last_name: lastName,
  email: (formData.email || '').trim(),
  message: (formData.message || formData.projectDetails || '').trim() || null,
  property_url: formData.property_url || '',
  source: '',
  status: 'New',
  whatsapp_same: false,
  client_id: clientId
};

// Route by client_id
if (clientId === 'real-estate-client-1') {
  // Real Estate mapping
  result.phone = (formData.phone || '').trim(); // Required
  result.company_name = null;
  result.service_need = (formData.serviceInterestedIn || '').trim();
  result.notes = null;
  result.source = 'real_estate_website';
  
} else if (clientId === 'supreme-animation') {
  // Animation Studio mapping
  result.phone = 'Not provided';
  result.company_name = formData.company && formData.company.trim() 
    ? formData.company.trim() 
    : null;
  result.service_need = (formData.projectNeed || '').trim();
  result.notes = formData.budget && formData.budget.trim() 
    ? `Budget: ${formData.budget.trim()}` 
    : null;
  result.source = 'supreme_animation_website';
  
} else if (clientId === 'signage-client-1') {
  // Signage Company mapping
  result.phone = formData.phone && formData.phone.trim() 
    ? formData.phone.trim() 
    : null; // Optional
  result.company_name = formData.company && formData.company.trim() 
    ? formData.company.trim() 
    : null;
  result.service_need = formData.serviceInterestedIn && formData.serviceInterestedIn.trim()
    ? formData.serviceInterestedIn.trim()
    : null; // Optional
  result.notes = null;
  result.source = 'signage_website';
  
} else {
  // Default/fallback mapping (for unknown clients)
  result.phone = formData.phone && formData.phone.trim() 
    ? formData.phone.trim() 
    : 'Not provided';
  result.company_name = formData.company && formData.company.trim() 
    ? formData.company.trim() 
    : null;
  result.service_need = (formData.serviceNeed || formData.serviceInterestedIn || formData.projectNeed || '').trim() || null;
  result.notes = formData.budget && formData.budget.trim() 
    ? `Budget: ${formData.budget.trim()}` 
    : null;
  result.source = 'website';
}

return { json: result };
```

---

## 📊 Field Mapping Summary Table

| Leads Column | Real Estate | Animation Studio | Signage Company | Notes |
|-------------|-------------|------------------|-----------------|-------|
| `first_name` | ✅ From `name` | ✅ From `name` | ✅ From `name` | Split first word |
| `last_name` | ✅ From `name` | ✅ From `name` | ✅ From `name` | Split remaining words |
| `email` | ✅ From `email` | ✅ From `email` | ✅ From `email` | Direct mapping |
| `phone` | ✅ From `phone` (required) | ⚠️ "Not provided" | ⚠️ From `phone` (optional) | Varies by industry |
| `message` | ⚠️ From `message` (optional) | ✅ From `message` (required) | ✅ From `message` (required) | Field name may vary |
| `company_name` | ❌ null | ⚠️ From `company` (optional) | ⚠️ From `company` (optional) | Not in Real Estate form |
| `service_need` | ✅ From `serviceInterestedIn` | ✅ From `projectNeed` | ⚠️ From `serviceInterestedIn` (optional) | Field name varies |
| `notes` | ❌ null | ⚠️ From `budget` (formatted) | ❌ null | Only Animation Studio has budget |
| `source` | `"real_estate_website"` | `"supreme_animation_website"` | `"signage_website"` | Set in n8n |
| `client_id` | `"real-estate-client-1"` | `"supreme-animation"` | `"signage-client-1"` | From form hidden field |
| `status` | `"New"` | `"New"` | `"New"` | Default value |
| `whatsapp_same` | `false` | `false` | `false` | Default value |
| `property_url` | From form or default | From form or default | From form or default | URL where form was submitted |

---

## ✅ Validation Rules by Industry

### Real Estate:
- ✅ `phone` is **required** (must not be empty)
- ✅ `service_need` is **required**
- ⚠️ `message` is **optional** (can be null)

### Animation Studio:
- ✅ `message` is **required** (must not be empty)
- ✅ `service_need` is **required**
- ⚠️ `phone` defaults to "Not provided"
- ⚠️ `company_name` is **optional**
- ⚠️ `notes` (budget) is **optional**

### Signage Company:
- ✅ `message` is **required** (must not be empty)
- ⚠️ `phone` is **optional** (can be null)
- ⚠️ `company_name` is **optional**
- ⚠️ `service_need` is **optional** (can be null)

---

## 🚀 Implementation Checklist

- [ ] Update n8n workflow Code node with universal routing logic
- [ ] Test Real Estate form submission
- [ ] Test Animation Studio form submission
- [ ] Test Signage Company form submission
- [ ] Verify all fields map correctly to leads table
- [ ] Verify `client_id` is set correctly for each industry
- [ ] Verify `source` is set correctly for each industry
- [ ] Test validation rules (required fields)
- [ ] Verify phone handling (required vs optional vs "Not provided")

