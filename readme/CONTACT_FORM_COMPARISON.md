# Contact Form Fields Comparison - Three Industries

## 📊 Form Field Analysis

### Screenshot 1: Real Estate Contact Form

**Fields:**
1. ✅ **Full Name*** (required)
2. ✅ **Phone Number*** (required)
3. ✅ **Email Address*** (required)
4. ✅ **Service Interested In*** (dropdown, required)
5. ✅ **Message** (textarea, optional)

**Total: 5 fields**

---

### Screenshot 2: Animation Studio Contact Form (Current)

**Fields:**
1. ✅ **Name*** (required)
2. ✅ **Email*** (required)
3. ⚠️ **Company / Studio** (optional)
4. ✅ **What do you need?*** (dropdown - `projectNeed`, required)
5. ⚠️ **Estimated budget** (optional)
6. ✅ **Tell us about your project*** (textarea - `message`, required)

**Total: 6 fields**

---

### Screenshot 3: Signage Company Contact Form

**Fields:**
1. ✅ **Full Name*** (required, left column)
2. ✅ **Email Address*** (required, right column)
3. ⚠️ **Phone Number** (optional, left column)
4. ⚠️ **Company Name** (optional, right column)
5. ⚠️ **Service Interested In** (dropdown, optional)
6. ✅ **Project Details*** (textarea, required)

**Total: 6 fields**

---

## 🔄 Overlapping/Common Fields

### Fields Present in ALL Three Forms:

| Field | Real Estate | Animation Studio | Signage Company | Notes |
|-------|-------------|------------------|-----------------|-------|
| **Full Name / Name** | ✅ Required | ✅ Required | ✅ Required | Same field, different labels |
| **Email Address / Email** | ✅ Required | ✅ Required | ✅ Required | Same field, different labels |
| **Service Interested In / What do you need?** | ✅ Required | ✅ Required | ⚠️ Optional | Dropdown field - maps to `service_need` |
| **Message / Project Details** | ⚠️ Optional | ✅ Required | ✅ Required | Textarea - maps to `message` |

**Core Common Fields: 4**
- Name (required in all)
- Email (required in all)
- Service/Project Type (dropdown - required in 2, optional in 1)
- Message/Details (textarea - required in 2, optional in 1)

---

## 🎯 Unique Fields by Industry

### Real Estate - Unique Fields:

| Field | Required | Notes |
|-------|----------|-------|
| **Phone Number** | ✅ Yes | Required in Real Estate, optional in others |

**Total Unique: 1 field**

**Note:** Real Estate form is the **simplest** - only 5 fields total, no optional company/budget fields.

---

### Animation Studio - Unique Fields:

| Field | Required | Notes |
|-------|----------|-------|
| **Company / Studio** | ❌ No | Optional - not in Real Estate form |
| **Estimated budget** | ❌ No | Optional - not in other forms |

**Total Unique: 2 fields**

---

### Signage Company - Unique Fields:

| Field | Required | Notes |
|-------|----------|-------|
| **Phone Number** | ❌ No | Optional - present but not required |
| **Company Name** | ❌ No | Optional - similar to Animation Studio's "Company / Studio" |

**Total Unique: 0 fields** (but has different field arrangement/layout)

**Note:** Signage Company form has **phone** and **company** fields, but they're optional. These are similar to Animation Studio's optional fields.

---

## 📋 Complete Field Mapping

### Common Fields (All Industries):

| Form Field Name | Database Column | Required | Notes |
|----------------|-----------------|----------|-------|
| Full Name / Name | `first_name`, `last_name` | ✅ Yes | Split in backend |
| Email Address / Email | `email` | ✅ Yes | |
| Service Interested In / What do you need? | `service_need` | ⚠️ Varies | Required in Real Estate & Animation, Optional in Signage |
| Message / Project Details / Tell us about your project | `message` | ⚠️ Varies | Required in Animation & Signage, Optional in Real Estate |

### Industry-Specific Fields:

#### Real Estate:
| Form Field | Database Column | Required | Notes |
|-----------|-----------------|----------|-------|
| Phone Number | `phone` | ✅ Yes | Required in Real Estate only |

#### Animation Studio:
| Form Field | Database Column | Required | Notes |
|-----------|-----------------|----------|-------|
| Company / Studio | `company_name` | ❌ No | Optional |
| Estimated budget | `notes` or `industry_data->>'budget'` | ❌ No | Optional |

#### Signage Company:
| Form Field | Database Column | Required | Notes |
|-----------|-----------------|----------|-------|
| Phone Number | `phone` | ❌ No | Optional (present but not required) |
| Company Name | `company_name` | ❌ No | Optional |

---

## 🎯 Key Observations

### 1. Field Requirements Vary:

- **Phone Number:**
  - Real Estate: ✅ **Required**
  - Animation Studio: ❌ **Not present**
  - Signage Company: ⚠️ **Optional**

- **Service/Project Type:**
  - Real Estate: ✅ **Required**
  - Animation Studio: ✅ **Required**
  - Signage Company: ⚠️ **Optional**

- **Message/Details:**
  - Real Estate: ⚠️ **Optional**
  - Animation Studio: ✅ **Required**
  - Signage Company: ✅ **Required**

### 2. Field Labels Differ:

- **Name field:**
  - Real Estate: "Full Name"
  - Animation Studio: "Name"
  - Signage Company: "Full Name"

- **Service field:**
  - Real Estate: "Service Interested In"
  - Animation Studio: "What do you need?"
  - Signage Company: "Service Interested In"

- **Message field:**
  - Real Estate: "Message"
  - Animation Studio: "Tell us about your project"
  - Signage Company: "Project Details"

### 3. Layout Differences:

- **Real Estate:** Single column, simple layout
- **Animation Studio:** Single column, includes budget field
- **Signage Company:** Two-column layout for name/email and phone/company

---

## 📊 Summary Table

| Field | Real Estate | Animation Studio | Signage Company | Database Column |
|-------|-------------|------------------|-----------------|-----------------|
| **Name** | ✅ Required | ✅ Required | ✅ Required | `first_name`, `last_name` |
| **Email** | ✅ Required | ✅ Required | ✅ Required | `email` |
| **Phone** | ✅ Required | ❌ Not present | ⚠️ Optional | `phone` |
| **Company** | ❌ Not present | ⚠️ Optional | ⚠️ Optional | `company_name` |
| **Service/Project Type** | ✅ Required | ✅ Required | ⚠️ Optional | `service_need` |
| **Budget** | ❌ Not present | ⚠️ Optional | ❌ Not present | `notes` or `industry_data` |
| **Message/Details** | ⚠️ Optional | ✅ Required | ✅ Required | `message` |

---

## 🚀 Implementation Notes

### Current Schema Status:

**Already have:**
- ✅ `first_name`, `last_name` (from name field)
- ✅ `email`
- ✅ `phone` (exists but not always required)
- ✅ `company_name` (exists but not always present)
- ✅ `service_need` (maps to service/project type dropdown)
- ✅ `message`
- ✅ `notes` (can store budget)

**Missing:**
- ❌ `industry_data` JSONB column (for any future industry-specific fields)
- ❌ `client_id` column (to identify which industry/client)

### Recommendations:

1. **Phone field handling:**
   - Real Estate: Make `phone` required in validation
   - Animation Studio: `phone` can be "Not provided" (current behavior)
   - Signage Company: `phone` is optional

2. **Service/Project Type:**
   - All forms have this dropdown
   - Real Estate & Animation: Required
   - Signage: Optional
   - Maps to `service_need` column

3. **Message field:**
   - Real Estate: Optional
   - Animation & Signage: Required
   - Maps to `message` column

4. **Budget field:**
   - Only Animation Studio has this
   - Can store in `notes` or `industry_data->>'budget'`

---

## ✅ Conclusion

**All form fields are already covered by the current schema!** 

The only additions needed are:
- `industry_data` JSONB column (for future flexibility)
- `client_id` column (to identify which industry)

No additional columns needed for these three contact forms - they all use the same common fields, just with different:
- Field labels
- Required/optional status
- Layout arrangements

