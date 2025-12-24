# Standardized Field Names - All Industries

## 🎯 Goal

Use the **same field names** across all industries' contact forms to eliminate if/else routing in n8n code node.

---

## 📋 Standardized Field Names (Frontend → n8n)

### Required Fields (All Industries)

| Field Name    | Type     | Description                         | Database Column                          |
| ------------- | -------- | ----------------------------------- | ---------------------------------------- |
| `name`        | TEXT     | Full name of the contact            | `first_name`, `last_name` (split in n8n) |
| `email`       | EMAIL    | Email address                       | `email`                                  |
| `serviceNeed` | TEXT     | Service/Project type (dropdown)     | `service_need`                           |
| `message`     | TEXTAREA | Project details/message             | `message`                                |
| `client_id`   | TEXT     | Industry/client identifier (hidden) | `client_id`                              |

### Optional Fields

| Field Name     | Type | Description                  | Database Column                     | Industries                                                          |
| -------------- | ---- | ---------------------------- | ----------------------------------- | ------------------------------------------------------------------- |
| `phone`        | TEXT | Phone number                 | `phone`                             | Real Estate (required), Signage (optional), Animation (not in form) |
| `company`      | TEXT | Company/Studio name          | `company_name`                      | Animation (optional), Signage (optional), Real Estate (not in form) |
| `budget`       | TEXT | Estimated budget             | `notes` (formatted as "Budget: $X") | Animation (optional), others (not in form)                          |
| `property_url` | TEXT | URL where form was submitted | `property_url`                      | All (auto-set by frontend)                                          |

---

## 📤 Standard Payload Structure (All Industries)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9646646111", // Optional (required for Real Estate)
  "company": "Example Studio", // Optional (not in Real Estate form)
  "serviceNeed": "Residential Property", // Required (dropdown value)
  "budget": "$50K - $100K", // Optional (only Animation Studio)
  "message": "I need help with...", // Required (optional for Real Estate)
  "client_id": "real-estate-client-1", // Required (hidden field)
  "property_url": "https://example.com/contact" // Real Estate only (others: 'N/A')
}
```

---

## 🔄 Field Name Changes Needed

### Current vs Standardized:

| Industry             | Current Field Name    | Standardized Name | Action                     |
| -------------------- | --------------------- | ----------------- | -------------------------- |
| **Real Estate**      | `serviceInterestedIn` | `serviceNeed`     | ✅ Change to `serviceNeed` |
| **Animation Studio** | `projectNeed`         | `serviceNeed`     | ✅ Change to `serviceNeed` |
| **Signage Company**  | `serviceInterestedIn` | `serviceNeed`     | ✅ Change to `serviceNeed` |
| **Signage Company**  | `projectDetails`      | `message`         | ✅ Change to `message`     |

**All other fields already match!** ✅

---

## 🏢 Industry-Specific Form Fields

### Real Estate Contact Form

**Fields to send:**

```json
{
  "name": "John Doe", // ✅ Required
  "email": "john@example.com", // ✅ Required
  "phone": "+91-9646646111", // ✅ Required
  "serviceNeed": "Residential Property", // ✅ Required (dropdown)
  "message": "I'm interested in...", // ⚠️ Optional
  "client_id": "real-estate-client-1", // ✅ Required (hidden)
  "property_url": "https://realestate.com/contact" // From Real Estate form
}
```

**Note:** No `company` or `budget` fields.

---

### Animation Studio Contact Form (Current)

**Fields currently sent:**

```json
{
  "name": "Jane Smith", // ✅ Required
  "email": "jane@studio.com", // ✅ Required
  "company": "Creative Studio", // ⚠️ Optional
  "projectNeed": "3D Animation", // ⚠️ NEEDS CHANGE → "serviceNeed"
  "budget": "$50K - $100K", // ⚠️ Optional
  "message": "I need help with...", // ✅ Required
  "client_id": "supreme-animation" // ✅ Required (hidden)
}
```

**Change needed:** `projectNeed` → `serviceNeed`

---

### Signage Company Contact Form

**Fields to send:**

```json
{
  "name": "Mike Johnson", // ✅ Required
  "email": "mike@business.com", // ✅ Required
  "phone": "+91-1234567890", // ⚠️ Optional
  "company": "Local Business Inc", // ⚠️ Optional
  "serviceNeed": "Outdoor Signage", // ⚠️ Optional (dropdown)
  "message": "I need help with...", // ✅ Required
  "client_id": "signage-client-1" // ✅ Required (hidden)
}
```

**Changes needed:**

- `serviceInterestedIn` → `serviceNeed`
- `projectDetails` → `message`

---

## 🔧 Simplified n8n Code Node (After Standardization)

With standardized field names, the code becomes much simpler:

```javascript
// Universal Code Node: All industries use same field names

// 1. Name: Split into first_name and last_name
const name = ($input.item.json.name || "").trim();
const parts = name.split(/\s+/).filter((part) => part.length > 0);

let firstName, lastName;
if (parts.length === 0) {
  firstName = "Unknown";
  lastName = "User";
} else if (parts.length === 1) {
  firstName = parts[0];
  lastName = "N/A";
} else {
  firstName = parts[0];
  lastName = parts.slice(1).join(" ");
}

// 2. All fields use standardized names (no variations to check!)
const email = ($input.item.json.email || "").trim();
const phone = ($input.item.json.phone || "").trim() || null;
const company = ($input.item.json.company || "").trim() || null;
const serviceNeed = ($input.item.json.serviceNeed || "").trim() || null;
const message = ($input.item.json.message || "").trim() || null;
const budget = ($input.item.json.budget || "").trim() || null;
const notes = budget ? `Budget: ${budget}` : null;
const propertyUrl = $input.item.json.property_url || "";
const clientId = $input.item.json.client_id || "";

// 3. Industry-specific logic (only for phone and source)
const result = {
  first_name: firstName,
  last_name: lastName,
  email: email,
  message: message,
  service_need: serviceNeed,
  company_name: company,
  notes: notes,
  property_url: propertyUrl,
  status: "New",
  whatsapp_same: false,
  client_id: clientId,
};

// Only phone and source need industry-specific handling
if (clientId === "real-estate-client-1") {
  result.phone = phone || ""; // Required for Real Estate
  result.source = "real_estate_website";
} else if (clientId === "supreme-animation") {
  result.phone = "Not Available"; // Not in Animation Studio form
  result.source = "supreme_animation_website";
} else if (clientId === "signage-client-1") {
  result.phone = phone || "Not Available"; // Optional for Signage
  result.source = "signage_website";
} else {
  result.phone = phone || "Not Available";
  result.source = "website";
}

return { json: result };
```

**Much simpler!** No more checking `serviceInterestedIn` vs `projectNeed` vs `serviceNeed` - just use `serviceNeed`!

---

## ✅ Implementation Checklist

### Frontend Updates Needed:

- [ ] **Animation Studio form** (`Contact.tsx`):

  - [ ] Change `projectNeed` → `serviceNeed` in form state
  - [ ] Update form field `name` attribute
  - [ ] Update `projectNeeds` array reference if needed

- [ ] **Real Estate form** (when created):

  - [ ] Use `serviceNeed` (not `serviceInterestedIn`)
  - [ ] Use `message` (not other variations)

- [ ] **Signage Company form** (when created):
  - [ ] Use `serviceNeed` (not `serviceInterestedIn`)
  - [ ] Use `message` (not `projectDetails`)

### n8n Workflow Updates:

- [ ] Update Code node to use only `serviceNeed` (remove `serviceInterestedIn` and `projectNeed` checks)
- [ ] Update Code node to use only `message` (remove `projectDetails` check)
- [ ] Simplify mapping logic

---

## 📝 Complete Field Name Reference

| Standardized Name | Old Names (to replace)                 | Database Column           | Notes                      |
| ----------------- | -------------------------------------- | ------------------------- | -------------------------- |
| `name`            | `name`, `fullName`                     | `first_name`, `last_name` | Split in n8n               |
| `email`           | `email`, `emailAddress`                | `email`                   | Direct mapping             |
| `phone`           | `phone`, `phoneNumber`                 | `phone`                   | Direct mapping             |
| `company`         | `company`, `companyName`               | `company_name`            | Direct mapping             |
| `serviceNeed`     | `serviceInterestedIn`, `projectNeed`   | `service_need`            | **Standardize this!**      |
| `message`         | `message`, `projectDetails`, `details` | `message`                 | **Standardize this!**      |
| `budget`          | `budget`, `estimatedBudget`            | `notes`                   | Direct mapping (formatted) |
| `client_id`       | `client_id`, `clientId`                | `client_id`               | Direct mapping             |
| `property_url`    | `property_url`, `propertyUrl`          | `property_url`            | Direct mapping             |

---

## 🎯 Benefits

✅ **Simpler n8n code** - No field name variations to check  
✅ **Easier maintenance** - One field name per purpose  
✅ **Consistent across industries** - Same field names everywhere  
✅ **Less error-prone** - No typos in field name checks  
✅ **Easier to add new industries** - Just follow the standard

---

## 📋 Summary

**Standardized field names that ALL industries should use:**

1. `name` - Full name (required)
2. `email` - Email address (required)
3. `phone` - Phone number (varies by industry)
4. `company` - Company name (optional)
5. `serviceNeed` - Service/Project type (required, optional for Signage)
6. `message` - Project details/message (required, optional for Real Estate)
7. `budget` - Estimated budget (optional, only Animation Studio)
8. `client_id` - Industry identifier (required, hidden)
9. `property_url` - Form submission URL (Real Estate only, others set to 'N/A' in n8n)

**All industries should send these exact field names to n8n!**
