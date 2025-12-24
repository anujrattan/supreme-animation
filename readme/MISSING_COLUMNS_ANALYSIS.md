# Missing Columns Analysis - Leads Table Schema

## 📊 Current Schema Overview

**Current columns in `leads` table:**

- ✅ `id` (uuid)
- ✅ `first_name` (text)
- ✅ `last_name` (text)
- ✅ `email` (text)
- ✅ `phone` (text)
- ✅ `message` (text)
- ✅ `property_url` (text)
- ✅ `whatsapp_same` (boolean)
- ✅ `source` (text)
- ✅ `status` (text)
- ✅ `notes` (text)
- ✅ `created_at` (timestamp)
- ✅ `updated_at` (timestamp)
- ✅ `company_name` (text)
- ✅ `service_need` (text)

---

## 🏢 Missing Columns by Industry

### 1. Real Estate Industry ❌

**All Real Estate columns are MISSING:**

| Column Name           | Type      | Required | Description                               |
| --------------------- | --------- | -------- | ----------------------------------------- |
| `property_type`       | TEXT/ENUM | Yes      | Residential, Commercial, Land, Industrial |
| `property_address`    | TEXT      | Yes      | Full address of the property              |
| `bedrooms`            | INTEGER   | No       | Number of bedrooms                        |
| `bathrooms`           | DECIMAL   | No       | Number of bathrooms (e.g., 2.5)           |
| `property_size_sqft`  | INTEGER   | No       | Square footage                            |
| `property_features`   | TEXT[]    | No       | Array: ["Pool", "Garage", "Garden"]       |
| `move_in_date`        | DATE      | No       | Desired move-in date                      |
| `selling_price`       | DECIMAL   | No       | Property selling price                    |
| `rental_price`        | DECIMAL   | No       | Monthly rental price                      |
| `property_status`     | TEXT/ENUM | No       | For Sale, For Rent, Sold, Pending         |
| `listing_id`          | TEXT      | No       | External listing reference                |
| `viewing_preferences` | TEXT[]    | No       | Preferred viewing times                   |
| `financing_type`      | TEXT/ENUM | No       | Cash, Mortgage, Lease                     |
| `pre_approved`        | BOOLEAN   | No       | Pre-approved for financing                |

**Total Missing: 13 columns**

---

### 2. Animation Studios / Agencies Industry ❌

**All Animation Studio columns are MISSING:**

| Column Name                 | Type      | Required | Description                                       |
| --------------------------- | --------- | -------- | ------------------------------------------------- |
| `project_type`              | TEXT/ENUM | Yes      | 2D Animation, 3D Animation, Motion Graphics, etc. |
| `project_style`             | TEXT      | No       | Realistic, Stylized, Cartoon, Minimalist          |
| `project_duration`          | TEXT      | No       | 30 seconds, 2 minutes, Full Series                |
| `target_audience`           | TEXT      | No       | Children, Adults, B2B, General                    |
| `delivery_format`           | TEXT[]    | No       | ["MP4", "MOV", "WebM"]                            |
| `resolution`                | TEXT      | No       | 1080p, 4K, 8K                                     |
| `timeline`                  | TEXT      | No       | Urgent (1 week), Standard (1 month), Flexible     |
| `reference_links`           | TEXT[]    | No       | URLs to inspiration/references                    |
| `voice_over_needed`         | BOOLEAN   | No       | Whether voice over is needed                      |
| `music_needed`              | BOOLEAN   | No       | Whether music is needed                           |
| `script_provided`           | BOOLEAN   | No       | Whether script is provided                        |
| `storyboard_provided`       | BOOLEAN   | No       | Whether storyboard is provided                    |
| `brand_guidelines_provided` | BOOLEAN   | No       | Whether brand guidelines are provided             |

**Total Missing: 13 columns**

**Note:** Current schema has `service_need` which might overlap with `project_type`, but they serve different purposes:

- `service_need` = General category (e.g., "AI Avatars & VTubers")
- `project_type` = Specific project type (e.g., "2D Animation", "3D Animation")

---

### 3. Signage Companies Industry ❌

**All Signage Company columns are MISSING:**

| Column Name              | Type      | Required | Description                                              |
| ------------------------ | --------- | -------- | -------------------------------------------------------- |
| `sign_type`              | TEXT/ENUM | Yes      | Indoor, Outdoor, Vehicle Wrap, Banner, LED Display, Neon |
| `sign_dimensions`        | TEXT      | No       | "10ft x 5ft" or "3m x 1.5m"                              |
| `sign_location`          | TEXT      | No       | Where sign will be installed                             |
| `installation_address`   | TEXT      | Yes      | Full installation address                                |
| `installation_date`      | DATE      | No       | Desired installation date                                |
| `material_preference`    | TEXT[]    | No       | ["Vinyl", "Acrylic", "Metal", "Fabric"]                  |
| `lighting_required`      | BOOLEAN   | No       | Whether lighting is needed                               |
| `mounting_type`          | TEXT/ENUM | No       | Wall Mount, Freestanding, Hanging, Vehicle               |
| `design_provided`        | BOOLEAN   | No       | Whether design is provided                               |
| `permit_required`        | BOOLEAN   | No       | Whether permit is required                               |
| `permit_status`          | TEXT      | No       | Not Started, In Progress, Approved, Denied               |
| `quantity`               | INTEGER   | No       | Number of signs                                          |
| `durability_requirement` | TEXT      | No       | Temporary, Semi-Permanent, Permanent                     |

**Total Missing: 13 columns**

---

## 📋 Summary

### Missing Columns Count:

- **Real Estate**: 13 columns
- **Animation Studios**: 13 columns
- **Signage Companies**: 13 columns
- **Total Unique Missing**: ~39 columns (some may overlap)

### Current Schema Status:

- ✅ **Common fields**: Present (15 columns)
- ❌ **Industry-specific fields**: **ALL MISSING** (0 columns)

---

## 🎯 Recommended Solution

Based on our earlier discussion, you have **two options**:

### Option 1: Add JSONB Column (RECOMMENDED) ⭐

**Add a single flexible column:**

```sql
ALTER TABLE leads
ADD COLUMN industry_data JSONB DEFAULT '{}'::jsonb;

-- Add GIN index for performance
CREATE INDEX idx_leads_industry_data ON leads USING GIN (industry_data);
```

**Pros:**

- ✅ No schema changes needed for new industries
- ✅ Can store all industry-specific data
- ✅ Easy to add/remove fields at runtime
- ✅ No migration needed when adding new industries

**Cons:**

- ⚠️ JSONB queries are slightly more complex
- ⚠️ No strict type validation

**Usage:**

```sql
-- Real Estate example
UPDATE leads
SET industry_data = '{
  "property_type": "Residential",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "property_size_sqft": 2000,
  "selling_price": 450000
}'::jsonb
WHERE id = '...';

-- Query example
SELECT * FROM leads
WHERE industry_data->>'property_type' = 'Residential';
```

---

### Option 2: Add All Columns (NOT RECOMMENDED)

**Add all 39 columns to the table:**

```sql
-- Real Estate columns
ALTER TABLE leads ADD COLUMN property_type TEXT;
ALTER TABLE leads ADD COLUMN property_address TEXT;
ALTER TABLE leads ADD COLUMN bedrooms INTEGER;
-- ... (36 more columns)
```

**Pros:**

- ✅ Direct column access
- ✅ Type safety
- ✅ Easy to query

**Cons:**

- ❌ Massive schema changes
- ❌ Many NULL columns for each industry
- ❌ Hard to maintain
- ❌ Requires migration for every new industry
- ❌ Wastes storage (most columns will be NULL)

---

## 🚀 Implementation Recommendation

### Step 1: Add JSONB Column

```sql
-- Add industry_data column
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS industry_data JSONB DEFAULT '{}'::jsonb;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_leads_industry_data
ON leads USING GIN (industry_data);

-- Optional: Add client_id column for industry identification
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS client_id TEXT;

-- Add index for client_id
CREATE INDEX IF NOT EXISTS idx_leads_client_id ON leads(client_id);
```

### Step 2: Update n8n Workflow

Update the n8n workflow to store industry-specific data in `industry_data`:

```javascript
// In n8n Code node, add industry-specific fields to industry_data
const industryData = {};

// For Real Estate
if (formData.client_id === "real-estate-client-1") {
  industryData.property_type = formData.property_type;
  industryData.bedrooms = formData.bedrooms;
  industryData.bathrooms = formData.bathrooms;
  // ... etc
}

// For Animation
if (formData.client_id === "supreme-animation") {
  industryData.project_type = formData.project_type;
  industryData.project_style = formData.project_style;
  industryData.voice_over_needed = formData.voice_over_needed;
  // ... etc
}

// Add to payload
return {
  json: {
    // ... common fields
    industry_data: industryData,
    client_id: formData.client_id,
  },
};
```

### Step 3: Query Examples

```sql
-- Query Real Estate leads
SELECT * FROM leads
WHERE client_id = 'real-estate-client-1'
  AND industry_data->>'property_type' = 'Residential'
  AND (industry_data->>'bedrooms')::int >= 3;

-- Query Animation leads
SELECT * FROM leads
WHERE client_id = 'supreme-animation'
  AND industry_data->>'project_type' = '3D Animation'
  AND (industry_data->>'voice_over_needed')::boolean = true;

-- Query Signage leads
SELECT * FROM leads
WHERE client_id = 'signage-client-1'
  AND industry_data->>'sign_type' = 'Outdoor'
  AND (industry_data->>'lighting_required')::boolean = true;
```

---

## 📝 Next Steps

1. **Add `industry_data` JSONB column** to `leads` table
2. **Add `client_id` column** (if not exists) for industry identification
3. **Update n8n workflow** to populate `industry_data` based on `client_id`
4. **Create field definitions table** (optional, for runtime management)
5. **Update frontend forms** to capture industry-specific fields
6. **Test with sample data** for each industry

---

## ✅ Checklist

- [ ] Add `industry_data` JSONB column
- [ ] Add `client_id` column (if missing)
- [ ] Create GIN index on `industry_data`
- [ ] Update n8n workflow to use `industry_data`
- [ ] Test Real Estate lead submission
- [ ] Test Animation Studio lead submission
- [ ] Test Signage Company lead submission
- [ ] Verify queries work with JSONB filters
