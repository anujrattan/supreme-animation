# Lead Management System - Multi-Industry Schema Design

## 🎯 Overview

This document outlines a flexible schema design for a multi-industry lead management system that can handle:
- **Real Estate**
- **Animation Studios/Agencies**
- **Signage Companies**
- **Future industries** (extensible)

---

## 📋 Common Fields (All Industries)

These fields should be present for **every industry** regardless of type:

### Core Contact Information
- `id` (UUID, Primary Key)
- `first_name` (TEXT, Required)
- `last_name` (TEXT, Required)
- `email` (TEXT, Required, Indexed)
- `phone` (TEXT, Optional)
- `company_name` (TEXT, Optional)
- `job_title` (TEXT, Optional)
- `website` (TEXT, Optional)

### Lead Metadata
- `source` (TEXT, Required) - Where the lead came from (e.g., "supreme_animation_website", "real_estate_portal")
- `client_id` (TEXT, Required) - Client/industry identifier (e.g., "supreme-animation", "real-estate-client-1")
- `status` (ENUM, Required) - Lead status: `New`, `Contacted`, `Qualified`, `Converted`, `Lost`
- `priority` (ENUM, Optional) - `Low`, `Medium`, `High`, `Urgent`
- `assigned_to` (UUID, Optional) - User/agent assigned to this lead
- `tags` (TEXT[], Optional) - Array of tags for categorization

### Communication & Notes
- `message` (TEXT, Optional) - Initial inquiry message
- `notes` (TEXT, Optional) - Internal notes/observations
- `last_contacted_at` (TIMESTAMP, Optional)
- `next_follow_up_at` (TIMESTAMP, Optional)

### Financial
- `budget` (TEXT, Optional) - Budget range (e.g., "$50K - $100K")
- `estimated_value` (DECIMAL, Optional) - Numeric value for calculations
- `currency` (TEXT, Optional) - Currency code (default: "USD")

### Location
- `location` (TEXT, Optional) - General location/city
- `address` (TEXT, Optional) - Full address
- `country` (TEXT, Optional)
- `timezone` (TEXT, Optional)

### Timestamps
- `created_at` (TIMESTAMP, Auto)
- `updated_at` (TIMESTAMP, Auto)
- `converted_at` (TIMESTAMP, Optional)
- `lost_at` (TIMESTAMP, Optional)

### Tracking
- `utm_source` (TEXT, Optional) - Marketing attribution
- `utm_medium` (TEXT, Optional)
- `utm_campaign` (TEXT, Optional)
- `referrer_url` (TEXT, Optional)
- `property_url` (TEXT, Optional) - URL where lead was captured

---

## 🏢 Industry-Specific Fields

### 1. Real Estate

**Additional Fields:**
- `property_type` (ENUM) - `Residential`, `Commercial`, `Land`, `Industrial`
- `property_address` (TEXT, Required)
- `property_size_sqft` (INTEGER) - Square footage
- `bedrooms` (INTEGER)
- `bathrooms` (DECIMAL) - e.g., 2.5
- `property_features` (TEXT[]) - Array: `["Pool", "Garage", "Garden"]`
- `move_in_date` (DATE)
- `selling_price` (DECIMAL)
- `rental_price` (DECIMAL)
- `property_status` (ENUM) - `For Sale`, `For Rent`, `Sold`, `Pending`
- `listing_id` (TEXT) - External listing reference
- `viewing_preferences` (TEXT[]) - Preferred viewing times
- `financing_type` (ENUM) - `Cash`, `Mortgage`, `Lease`
- `pre_approved` (BOOLEAN)

**Example Lead:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "property_type": "Residential",
  "property_address": "123 Main St, City, State",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "property_size_sqft": 2000,
  "selling_price": 450000,
  "move_in_date": "2024-06-01",
  "financing_type": "Mortgage",
  "pre_approved": true
}
```

---

### 2. Animation Studios / Agencies

**Additional Fields:**
- `project_type` (ENUM) - `2D Animation`, `3D Animation`, `Motion Graphics`, `Character Design`, `VFX`, `Virtual Production`
- `project_style` (TEXT) - `Realistic`, `Stylized`, `Cartoon`, `Minimalist`
- `project_duration` (TEXT) - `30 seconds`, `2 minutes`, `Full Series`
- `target_audience` (TEXT) - `Children`, `Adults`, `B2B`, `General`
- `delivery_format` (TEXT[]) - `["MP4", "MOV", "WebM"]`
- `resolution` (TEXT) - `1080p`, `4K`, `8K`
- `timeline` (TEXT) - `Urgent (1 week)`, `Standard (1 month)`, `Flexible`
- `reference_links` (TEXT[]) - URLs to inspiration/references
- `voice_over_needed` (BOOLEAN)
- `music_needed` (BOOLEAN)
- `script_provided` (BOOLEAN)
- `storyboard_provided` (BOOLEAN)
- `brand_guidelines_provided` (BOOLEAN)

**Example Lead:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@studio.com",
  "company_name": "Creative Studio",
  "project_type": "3D Animation",
  "project_style": "Realistic",
  "project_duration": "2 minutes",
  "target_audience": "B2B",
  "timeline": "Standard (1 month)",
  "budget": "$50K - $100K",
  "voice_over_needed": true,
  "script_provided": true
}
```

---

### 3. Signage Companies

**Additional Fields:**
- `sign_type` (ENUM) - `Indoor`, `Outdoor`, `Vehicle Wrap`, `Banner`, `LED Display`, `Neon`
- `sign_dimensions` (TEXT) - `"10ft x 5ft"` or `"3m x 1.5m"`
- `sign_location` (TEXT) - Where sign will be installed
- `installation_address` (TEXT, Required)
- `installation_date` (DATE)
- `material_preference` (TEXT[]) - `["Vinyl", "Acrylic", "Metal", "Fabric"]`
- `lighting_required` (BOOLEAN)
- `mounting_type` (ENUM) - `Wall Mount`, `Freestanding`, `Hanging`, `Vehicle`
- `design_provided` (BOOLEAN)
- `permit_required` (BOOLEAN)
- `permit_status` (TEXT) - `Not Started`, `In Progress`, `Approved`, `Denied`
- `quantity` (INTEGER) - Number of signs
- `durability_requirement` (TEXT) - `Temporary`, `Semi-Permanent`, `Permanent`

**Example Lead:**
```json
{
  "first_name": "Mike",
  "last_name": "Johnson",
  "email": "mike@business.com",
  "company_name": "Local Business Inc",
  "sign_type": "Outdoor",
  "sign_dimensions": "8ft x 4ft",
  "installation_address": "456 Business Ave, City, State",
  "installation_date": "2024-05-15",
  "material_preference": ["Vinyl", "Metal"],
  "lighting_required": true,
  "mounting_type": "Wall Mount",
  "quantity": 2,
  "durability_requirement": "Permanent"
}
```

---

## 🏗️ Recommended Database Schema Approach

### Option 1: Hybrid Approach (RECOMMENDED) ⭐

**Best for: Most use cases**

Use **fixed columns for common fields** + **JSONB column for industry-specific fields**.

**Pros:**
- ✅ Fast queries on common fields (indexed columns)
- ✅ Flexible for industry-specific data (JSONB)
- ✅ Easy to query and filter
- ✅ Type safety for common fields
- ✅ PostgreSQL/Supabase native support

**Cons:**
- ⚠️ JSONB fields not as easy to query (but still possible)
- ⚠️ No strict validation on JSONB structure

**Schema:**
```sql
CREATE TABLE leads (
  -- Common fields (fixed columns)
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  job_title TEXT,
  website TEXT,
  
  -- Lead metadata
  source TEXT NOT NULL,
  client_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  priority TEXT,
  assigned_to UUID,
  tags TEXT[],
  
  -- Communication
  message TEXT,
  notes TEXT,
  last_contacted_at TIMESTAMP,
  next_follow_up_at TIMESTAMP,
  
  -- Financial
  budget TEXT,
  estimated_value DECIMAL,
  currency TEXT DEFAULT 'USD',
  
  -- Location
  location TEXT,
  address TEXT,
  country TEXT,
  timezone TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  converted_at TIMESTAMP,
  lost_at TIMESTAMP,
  
  -- Tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer_url TEXT,
  property_url TEXT,
  
  -- Industry-specific fields (JSONB)
  industry_data JSONB DEFAULT '{}'::jsonb,
  
  -- Indexes
  CONSTRAINT leads_status_check CHECK (status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Lost')),
  CONSTRAINT leads_priority_check CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent') OR priority IS NULL)
);

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_industry_data ON leads USING GIN (industry_data); -- GIN index for JSONB queries
```

**Usage Example:**
```sql
-- Insert lead with industry-specific data
INSERT INTO leads (
  first_name, last_name, email, client_id, source, status,
  industry_data
) VALUES (
  'John', 'Doe', 'john@example.com', 'real-estate-client-1', 'website', 'New',
  '{
    "property_type": "Residential",
    "bedrooms": 3,
    "bathrooms": 2.5,
    "property_size_sqft": 2000,
    "selling_price": 450000
  }'::jsonb
);

-- Query with JSONB filter
SELECT * FROM leads 
WHERE client_id = 'real-estate-client-1'
  AND industry_data->>'property_type' = 'Residential'
  AND (industry_data->>'bedrooms')::int >= 3;
```

---

### Option 2: EAV (Entity-Attribute-Value) Pattern

**Best for: Maximum flexibility, many industries**

**Pros:**
- ✅ Unlimited flexibility
- ✅ Easy to add/remove fields at runtime
- ✅ Can store field metadata (types, validation rules)

**Cons:**
- ⚠️ Complex queries (many JOINs)
- ⚠️ Performance can be slower
- ⚠️ Harder to maintain
- ⚠️ No type safety

**Schema:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  -- Common fields only
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  -- ... other common fields
);

CREATE TABLE lead_attributes (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  attribute_key TEXT NOT NULL,
  attribute_value TEXT,
  attribute_type TEXT, -- 'text', 'number', 'boolean', 'date', 'array'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lead_attributes_lead_id ON lead_attributes(lead_id);
CREATE INDEX idx_lead_attributes_key ON lead_attributes(attribute_key);
```

---

### Option 3: Separate Tables per Industry

**Best for: Very different industries with strict schemas**

**Pros:**
- ✅ Type safety per industry
- ✅ Fast queries
- ✅ Clear separation

**Cons:**
- ⚠️ Code duplication
- ⚠️ Hard to query across industries
- ⚠️ Complex migrations

---

## 🎨 Frontend Dynamic Form Approach

### Recommended: Field Definition System

Store field definitions in a table or config file:

```sql
CREATE TABLE industry_field_definitions (
  id UUID PRIMARY KEY,
  industry_type TEXT NOT NULL, -- 'real_estate', 'animation', 'signage'
  field_key TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_type TEXT NOT NULL, -- 'text', 'number', 'select', 'date', 'boolean', 'array'
  required BOOLEAN DEFAULT false,
  options JSONB, -- For select/radio fields
  validation_rules JSONB, -- Min, max, pattern, etc.
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Example Field Definitions:**
```sql
-- Real Estate Fields
INSERT INTO industry_field_definitions (industry_type, field_key, field_label, field_type, required, options, display_order) VALUES
('real_estate', 'property_type', 'Property Type', 'select', true, '{"options": ["Residential", "Commercial", "Land", "Industrial"]}', 1),
('real_estate', 'bedrooms', 'Bedrooms', 'number', false, '{"min": 0, "max": 10}', 2),
('real_estate', 'bathrooms', 'Bathrooms', 'number', false, '{"min": 0, "max": 10, "step": 0.5}', 3);

-- Animation Fields
INSERT INTO industry_field_definitions (industry_type, field_key, field_label, field_type, required, options, display_order) VALUES
('animation', 'project_type', 'Project Type', 'select', true, '{"options": ["2D Animation", "3D Animation", "Motion Graphics"]}', 1),
('animation', 'project_duration', 'Duration', 'text', false, NULL, 2),
('animation', 'voice_over_needed', 'Voice Over Needed', 'boolean', false, NULL, 3);
```

**Frontend Implementation:**
```typescript
// Fetch field definitions for industry
const fieldDefinitions = await fetch(`/api/fields/${industryType}`);

// Dynamically render form
fieldDefinitions.forEach(field => {
  renderField(field); // Render based on field_type
});
```

---

## 🔄 Runtime Field Management

### Adding Fields at Runtime

**With Hybrid Approach (JSONB):**

1. **Add field definition** to `industry_field_definitions` table
2. **Frontend automatically picks up** new field from API
3. **Data stored in JSONB** - no migration needed
4. **Backend validates** based on field definition

**Example:**
```sql
-- Add new field for real estate
INSERT INTO industry_field_definitions 
(industry_type, field_key, field_label, field_type, required)
VALUES 
('real_estate', 'has_pool', 'Has Pool', 'boolean', false);

-- Frontend automatically shows checkbox
-- Data stored as: industry_data->>'has_pool' = 'true'
```

### Removing Fields at Runtime

1. **Mark field as inactive** in `industry_field_definitions`
2. **Frontend hides field** (but keeps existing data)
3. **Data remains in JSONB** (for historical records)

```sql
UPDATE industry_field_definitions 
SET is_active = false 
WHERE industry_type = 'real_estate' AND field_key = 'old_field';
```

---

## 📊 Recommended Implementation Steps

### Phase 1: Core Schema
1. ✅ Create `leads` table with common fields + `industry_data` JSONB
2. ✅ Create `industry_field_definitions` table
3. ✅ Set up indexes

### Phase 2: Industry Support
1. ✅ Add field definitions for each industry
2. ✅ Create frontend dynamic form renderer
3. ✅ Add validation based on field definitions

### Phase 3: Runtime Management
1. ✅ Build admin UI for field management
2. ✅ Add field versioning (for schema changes)
3. ✅ Add field migration tools

---

## 🎯 Best Practices

1. **Always validate** JSONB data against field definitions
2. **Use GIN indexes** on JSONB columns for query performance
3. **Version your field definitions** for backward compatibility
4. **Keep common fields as columns** - only use JSONB for industry-specific
5. **Document field definitions** - maintain clear schema documentation
6. **Test field additions/removals** - ensure existing data isn't broken

---

## 📝 Summary

**Recommended Approach:** **Hybrid (Common Fields + JSONB)**

- **Common fields**: Fixed columns (fast, indexed, type-safe)
- **Industry-specific**: JSONB column (flexible, extensible)
- **Field definitions**: Separate table (runtime management)
- **Frontend**: Dynamic form renderer based on field definitions

This gives you the best balance of:
- ✅ Performance (indexed common fields)
- ✅ Flexibility (JSONB for industry data)
- ✅ Maintainability (clear structure)
- ✅ Scalability (easy to add industries)

