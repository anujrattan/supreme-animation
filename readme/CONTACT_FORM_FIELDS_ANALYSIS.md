# Contact Form Fields Analysis - By Industry

## 🎯 Scope

This document identifies **contact form fields only** - what visitors fill out on each industry's website contact form. Detailed project/property information is stored separately (e.g., `listings` table for Real Estate).

---

## 📋 Current Contact Form Fields

**Current form captures:**
- ✅ `name` → `first_name`, `last_name`
- ✅ `email`
- ✅ `company` → `company_name`
- ✅ `projectNeed` → `service_need`
- ✅ `budget`
- ✅ `message`
- ✅ `client_id` (hidden field)

**All these fields are already in the schema!** ✅

---

## 🏢 Industry-Specific Contact Form Fields

### 1. Real Estate Contact Form

**Additional fields needed on contact form:**

| Field Name | Type | Required | Description | Maps to Column |
|-----------|------|----------|-------------|----------------|
| `property_type` | SELECT | Yes | Residential, Commercial, Land, Industrial | `industry_data->>'property_type'` |
| `property_address` | TEXT | Yes | Address they're interested in | `industry_data->>'property_address'` |
| `move_in_date` | DATE | No | Desired move-in date | `industry_data->>'move_in_date'` |
| `financing_type` | SELECT | No | Cash, Mortgage, Lease | `industry_data->>'financing_type'` |
| `pre_approved` | BOOLEAN | No | Are they pre-approved? | `industry_data->>'pre_approved'` |
| `viewing_preference` | TEXT | No | Preferred viewing time | `industry_data->>'viewing_preference'` |

**Note:** Detailed property info (bedrooms, bathrooms, price) comes from the `listings` table, not the contact form.

**Total additional fields: 6**

---

### 2. Animation Studios / Agencies Contact Form

**Additional fields needed on contact form:**

| Field Name | Type | Required | Description | Maps to Column |
|-----------|------|----------|-------------|----------------|
| `project_type` | SELECT | Yes | 2D Animation, 3D Animation, Motion Graphics, VFX, etc. | `industry_data->>'project_type'` |
| `project_style` | SELECT | No | Realistic, Stylized, Cartoon, Minimalist | `industry_data->>'project_style'` |
| `project_duration` | TEXT | No | 30 seconds, 2 minutes, Full Series | `industry_data->>'project_duration'` |
| `target_audience` | SELECT | No | Children, Adults, B2B, General | `industry_data->>'target_audience'` |
| `timeline` | SELECT | No | Urgent (1 week), Standard (1 month), Flexible | `industry_data->>'timeline'` |
| `delivery_format` | MULTI-SELECT | No | MP4, MOV, WebM | `industry_data->>'delivery_format'` (array) |
| `resolution` | SELECT | No | 1080p, 4K, 8K | `industry_data->>'resolution'` |
| `voice_over_needed` | BOOLEAN | No | Checkbox | `industry_data->>'voice_over_needed'` |
| `music_needed` | BOOLEAN | No | Checkbox | `industry_data->>'music_needed'` |
| `script_provided` | BOOLEAN | No | Checkbox | `industry_data->>'script_provided'` |
| `reference_links` | TEXTAREA | No | URLs to inspiration/references | `industry_data->>'reference_links'` (array) |

**Total additional fields: 11**

---

### 3. Signage Companies Contact Form

**Additional fields needed on contact form:**

| Field Name | Type | Required | Description | Maps to Column |
|-----------|------|----------|-------------|----------------|
| `sign_type` | SELECT | Yes | Indoor, Outdoor, Vehicle Wrap, Banner, LED Display, Neon | `industry_data->>'sign_type'` |
| `sign_dimensions` | TEXT | No | "10ft x 5ft" or "3m x 1.5m" | `industry_data->>'sign_dimensions'` |
| `installation_address` | TEXT | Yes | Where sign will be installed | `industry_data->>'installation_address'` |
| `installation_date` | DATE | No | Desired installation date | `industry_data->>'installation_date'` |
| `material_preference` | MULTI-SELECT | No | Vinyl, Acrylic, Metal, Fabric | `industry_data->>'material_preference'` (array) |
| `lighting_required` | BOOLEAN | No | Checkbox | `industry_data->>'lighting_required'` |
| `mounting_type` | SELECT | No | Wall Mount, Freestanding, Hanging, Vehicle | `industry_data->>'mounting_type'` |
| `design_provided` | BOOLEAN | No | Checkbox | `industry_data->>'design_provided'` |
| `permit_required` | BOOLEAN | No | Checkbox | `industry_data->>'permit_required'` |
| `quantity` | NUMBER | No | Number of signs | `industry_data->>'quantity'` |
| `durability_requirement` | SELECT | No | Temporary, Semi-Permanent, Permanent | `industry_data->>'durability_requirement'` |

**Total additional fields: 11**

---

## 📊 Summary

### Current Schema Status

**Already have (common fields):**
- ✅ `first_name`, `last_name`
- ✅ `email`
- ✅ `phone`
- ✅ `company_name`
- ✅ `service_need` (maps to `projectNeed` in form)
- ✅ `message`
- ✅ `notes` (can store budget)
- ✅ `source`
- ✅ `status`
- ✅ `property_url`
- ✅ `created_at`, `updated_at`

**Missing:**
- ❌ `industry_data` JSONB column (to store industry-specific form fields)
- ❌ `client_id` column (to identify which industry/client)

### Contact Form Fields by Industry

| Industry | Common Fields | Industry-Specific Fields | Total Form Fields |
|----------|--------------|-------------------------|-------------------|
| **Real Estate** | 7 fields | 6 fields | **13 fields** |
| **Animation Studios** | 7 fields | 11 fields | **18 fields** |
| **Signage Companies** | 7 fields | 11 fields | **18 fields** |

---

## 🚀 Implementation

### Step 1: Add Missing Columns to Schema

```sql
-- Add industry_data JSONB column for flexible form fields
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS industry_data JSONB DEFAULT '{}'::jsonb;

-- Add client_id column to identify industry/client
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS client_id TEXT;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_industry_data 
ON leads USING GIN (industry_data);

CREATE INDEX IF NOT EXISTS idx_leads_client_id 
ON leads(client_id);
```

### Step 2: Update n8n Workflow

**For Real Estate:**
```javascript
// In n8n Code node
const industryData = {};

if (formData.client_id === 'real-estate-client-1') {
  industryData.property_type = formData.property_type;
  industryData.property_address = formData.property_address;
  industryData.move_in_date = formData.move_in_date;
  industryData.financing_type = formData.financing_type;
  industryData.pre_approved = formData.pre_approved === 'true' || formData.pre_approved === true;
  industryData.viewing_preference = formData.viewing_preference;
}

return {
  json: {
    first_name: firstName,
    last_name: lastName,
    email: formData.email,
    // ... other common fields
    industry_data: industryData,
    client_id: formData.client_id
  }
};
```

**For Animation Studios:**
```javascript
if (formData.client_id === 'supreme-animation') {
  industryData.project_type = formData.project_type;
  industryData.project_style = formData.project_style;
  industryData.project_duration = formData.project_duration;
  industryData.target_audience = formData.target_audience;
  industryData.timeline = formData.timeline;
  industryData.delivery_format = Array.isArray(formData.delivery_format) 
    ? formData.delivery_format 
    : [formData.delivery_format].filter(Boolean);
  industryData.resolution = formData.resolution;
  industryData.voice_over_needed = formData.voice_over_needed === 'true' || formData.voice_over_needed === true;
  industryData.music_needed = formData.music_needed === 'true' || formData.music_needed === true;
  industryData.script_provided = formData.script_provided === 'true' || formData.script_provided === true;
  industryData.reference_links = Array.isArray(formData.reference_links)
    ? formData.reference_links
    : formData.reference_links?.split('\n').filter(Boolean) || [];
}
```

**For Signage Companies:**
```javascript
if (formData.client_id === 'signage-client-1') {
  industryData.sign_type = formData.sign_type;
  industryData.sign_dimensions = formData.sign_dimensions;
  industryData.installation_address = formData.installation_address;
  industryData.installation_date = formData.installation_date;
  industryData.material_preference = Array.isArray(formData.material_preference)
    ? formData.material_preference
    : [formData.material_preference].filter(Boolean);
  industryData.lighting_required = formData.lighting_required === 'true' || formData.lighting_required === true;
  industryData.mounting_type = formData.mounting_type;
  industryData.design_provided = formData.design_provided === 'true' || formData.design_provided === true;
  industryData.permit_required = formData.permit_required === 'true' || formData.permit_required === true;
  industryData.quantity = formData.quantity ? parseInt(formData.quantity) : null;
  industryData.durability_requirement = formData.durability_requirement;
}
```

---

## 📝 Contact Form Field Examples

### Real Estate Contact Form

```html
<form>
  <!-- Common fields -->
  <input name="name" required />
  <input name="email" type="email" required />
  <input name="company" />
  <textarea name="message" required></textarea>
  <input name="budget" />
  <input type="hidden" name="client_id" value="real-estate-client-1" />
  
  <!-- Industry-specific fields -->
  <select name="property_type" required>
    <option value="">Select...</option>
    <option value="Residential">Residential</option>
    <option value="Commercial">Commercial</option>
    <option value="Land">Land</option>
    <option value="Industrial">Industrial</option>
  </select>
  
  <input name="property_address" required placeholder="Property Address" />
  <input name="move_in_date" type="date" />
  <select name="financing_type">
    <option value="">Select...</option>
    <option value="Cash">Cash</option>
    <option value="Mortgage">Mortgage</option>
    <option value="Lease">Lease</option>
  </select>
  <input name="pre_approved" type="checkbox" />
  <input name="viewing_preference" placeholder="Preferred viewing time" />
</form>
```

### Animation Studio Contact Form

```html
<form>
  <!-- Common fields -->
  <input name="name" required />
  <input name="email" type="email" required />
  <input name="company" />
  <textarea name="message" required></textarea>
  <input name="budget" />
  <input type="hidden" name="client_id" value="supreme-animation" />
  
  <!-- Industry-specific fields -->
  <select name="project_type" required>
    <option value="">Select...</option>
    <option value="2D Animation">2D Animation</option>
    <option value="3D Animation">3D Animation</option>
    <option value="Motion Graphics">Motion Graphics</option>
    <option value="VFX">VFX</option>
  </select>
  
  <select name="project_style">
    <option value="Realistic">Realistic</option>
    <option value="Stylized">Stylized</option>
    <option value="Cartoon">Cartoon</option>
  </select>
  
  <input name="project_duration" placeholder="e.g., 2 minutes" />
  <select name="target_audience">...</select>
  <select name="timeline">...</select>
  <select name="resolution">...</select>
  <input name="delivery_format" type="checkbox" value="MP4" />
  <input name="delivery_format" type="checkbox" value="MOV" />
  <input name="voice_over_needed" type="checkbox" />
  <input name="music_needed" type="checkbox" />
  <input name="script_provided" type="checkbox" />
  <textarea name="reference_links" placeholder="One URL per line"></textarea>
</form>
```

---

## ✅ Next Steps

1. **Add `industry_data` JSONB column** to `leads` table
2. **Add `client_id` column** (if not exists)
3. **Update n8n workflow** to map form fields to `industry_data`
4. **Create contact forms** for each industry with their specific fields
5. **Test form submissions** for each industry

---

## 🎯 Key Points

- ✅ **Contact forms only** - not full project/property details
- ✅ **Real Estate** has separate `listings` table for property details
- ✅ **Common fields** are already in schema
- ✅ **Industry-specific fields** go in `industry_data` JSONB column
- ✅ **Flexible approach** - easy to add new industries without schema changes

