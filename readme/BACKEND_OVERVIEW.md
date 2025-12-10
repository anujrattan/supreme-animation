# Backend Overview - Supreme Animation Studio

Complete documentation of what the backend does and how it works.

---

## 🏗️ Architecture Overview

The backend is an **Express.js server** that acts as a **middleware layer** between your frontend and Supabase database. It handles:

1. **Contact Form Submissions** → Saves to Supabase `leads` table
2. **Lead Management** → CRUD operations for leads
3. **Authentication** → User login/signup for admin panel
4. **Data Validation & Sanitization** → Security and data integrity

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.ts                    # Main Express server setup
│   ├── routes/                       # API route definitions
│   │   ├── contact.routes.ts        # Contact form endpoints
│   │   ├── leads.routes.ts          # Lead management endpoints
│   │   └── auth.routes.ts           # Authentication endpoints
│   ├── controllers/                 # Business logic
│   │   ├── contact.controller.ts   # Handle contact form submissions
│   │   ├── leads.controller.ts     # Handle lead CRUD operations
│   │   └── auth.controller.ts       # Handle authentication
│   ├── middleware/                  # Request validation
│   │   ├── validation.middleware.ts # Contact form validation
│   │   └── auth.validation.middleware.ts # Auth validation
│   ├── utils/                       # Utility functions
│   │   └── sanitize.ts             # Input sanitization
│   └── types/                       # TypeScript types
│       └── contact.types.ts        # Contact form types
├── scripts/
│   └── create-admin.js             # Script to create admin users
├── package.json
├── tsconfig.json
└── supabase-setup.sql              # Database schema
```

---

## 🔌 API Endpoints

### 1. Health Check

**GET** `/health`

**Purpose**: Check if backend server is running

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Used by**: Deployment monitoring, health checks

---

### 2. Contact Form Submission

**POST** `/api/contact/submit`

**Purpose**: Submit contact form from website and save as a lead

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Studio",        // Optional
  "projectNeed": "AI Avatars & VTubers",
  "budget": "$50K – $150K",           // Optional
  "message": "I need help with..."
}
```

**What it does**:
1. ✅ Validates input (using Zod schema)
2. ✅ Sanitizes all inputs (prevents XSS, SQL injection)
3. ✅ Splits full name into `first_name` and `last_name`
4. ✅ Creates lead record in Supabase `leads` table
5. ✅ Sets source as `supreme_animation_website`
6. ✅ Sets status as `New`
7. ✅ Stores company, service_need, and budget separately

**Response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "uuid-here",
    "email": "john@example.com",
    "status": "New"
  }
}
```

**Database Table**: `leads` in Supabase

**Fields Saved**:
- `first_name`, `last_name` (split from `name`)
- `email`
- `phone` (defaults to "Not provided")
- `message`
- `company_name` (from `company`)
- `service_need` (from `projectNeed`)
- `notes` (contains budget info)
- `property_url` (frontend URL)
- `source` (always `supreme_animation_website`)
- `status` (defaults to `New`)
- `created_at` (auto-generated)

---

### 3. Get All Leads

**GET** `/api/leads`

**Purpose**: Retrieve all leads for the management panel

**Query Parameters**:
- `status` (optional): Filter by status (`New`, `Contacted`, `Qualified`, `Converted`, `Lost`)
- `limit` (optional): Number of results (default: 100, max: 500)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (`created_at`, `updated_at`, `email`, `first_name`, `last_name`, `status`)
- `sortOrder` (optional): `asc` or `desc` (default: `desc`)

**Example**: `/api/leads?status=New&limit=50&offset=0&sortBy=created_at&sortOrder=desc`

**What it does**:
1. ✅ Filters leads by source (`supreme_%` - only your website leads)
2. ✅ Applies status filter if provided
3. ✅ Applies sorting
4. ✅ Applies pagination
5. ✅ Returns leads with pagination metadata

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "company_name": "Example Studio",
      "service_need": "AI Avatars & VTubers",
      "status": "New",
      "created_at": "2024-01-01T00:00:00.000Z",
      ...
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

**Security**: Only returns leads with source starting with `supreme_`

---

### 4. Get Single Lead

**GET** `/api/leads/:id`

**Purpose**: Get details of a specific lead

**Example**: `/api/leads/123e4567-e89b-12d3-a456-426614174000`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "status": "New",
    ...
  }
}
```

**Security**: Only returns lead if source starts with `supreme_`

---

### 5. Update Lead Status

**PATCH** `/api/leads/:id/status`

**Purpose**: Update the status of a lead (for management panel)

**Request Body**:
```json
{
  "status": "Contacted"
}
```

**Valid Statuses**: `New`, `Contacted`, `Qualified`, `Converted`, `Lost`

**Example**: `/api/leads/123e4567-e89b-12d3-a456-426614174000/status`

**What it does**:
1. ✅ Validates status is one of the allowed values
2. ✅ Updates lead status in database
3. ✅ Updates `updated_at` timestamp
4. ✅ Returns updated lead

**Response**:
```json
{
  "success": true,
  "message": "Lead status updated successfully",
  "data": {
    "id": "uuid",
    "status": "Contacted",
    "updated_at": "2024-01-01T12:00:00.000Z",
    ...
  }
}
```

**Security**: Only updates leads with source starting with `supreme_`

---

### 6. User Login

**POST** `/api/auth/login`

**Purpose**: Authenticate user for lead management panel

**Request Body**:
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**What it does**:
1. ✅ Validates email format and password length (min 8 chars)
2. ✅ Sanitizes email input
3. ✅ Authenticates with Supabase Auth
4. ✅ Returns JWT tokens and user info

**Response**:
```json
{
  "success": true,
  "data": {
    "access_token": "jwt_token_here",
    "refresh_token": "refresh_token_here",
    "expires_at": 1234567890,
    "user": {
      "id": "user_uuid",
      "email": "admin@example.com",
      "name": "Admin User"
    }
  }
}
```

**Used by**: Lead management panel login

---

### 7. User Signup

**POST** `/api/auth/signup`

**Purpose**: Create new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**What it does**:
1. ✅ Validates inputs
2. ✅ Sanitizes email and name
3. ✅ Creates user in Supabase Auth
4. ✅ Returns tokens if email confirmation not required

**Response**:
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "access_token": "jwt_token_here",
    "refresh_token": "refresh_token_here",
    "user": { ... }
  }
}
```

---

### 8. Verify Token

**POST** `/api/auth/verify`

**Purpose**: Verify if a JWT token is valid

**Request Body**:
```json
{
  "access_token": "jwt_token_here"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_uuid",
      "email": "admin@example.com",
      "name": "Admin User"
    }
  }
}
```

**Used by**: Frontend to check if user is still logged in

---

### 9. Logout

**POST** `/api/auth/logout`

**Purpose**: Logout user (mainly for consistency, actual logout handled client-side)

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🔒 Security Features

### 1. Input Sanitization (`utils/sanitize.ts`)

**What it does**:
- ✅ Removes HTML tags
- ✅ Removes script tags and content
- ✅ Removes dangerous protocols (`javascript:`, `data:`, `vbscript:`)
- ✅ Removes event handlers (`onclick`, `onerror`, etc.)
- ✅ Removes SQL injection patterns
- ✅ Validates email format
- ✅ Validates URL format

**Applied to**: All user inputs before database operations

### 2. Input Validation (Zod Schemas)

**Contact Form Validation**:
- Name: Required, 1-200 characters
- Email: Required, valid email format, max 255 chars
- Company: Optional, max 200 chars
- Project Need: Required, 1-200 chars
- Budget: Optional, max 100 chars
- Message: Required, 1-5000 chars

**Auth Validation**:
- Email: Valid email format
- Password: Minimum 8 characters
- Name: 1-200 characters

### 3. CORS Protection

**Configured in**: `server.ts`

```typescript
app.use(cors({
  origin: FRONTEND_URL,  // Only allows requests from your frontend
  credentials: true
}));
```

**What it does**: Only allows requests from your specified frontend URL

### 4. Source Filtering

**All lead queries** filter by `source LIKE 'supreme_%'`

**What it does**: Ensures you only see/manage leads from your website, not other sources

### 5. Supabase Service Role Key

**Used for**: Server-side database operations

**Security**: 
- Never exposed to client
- Only used in backend
- Has elevated permissions (bypasses RLS)

---

## 🗄️ Database Integration

### Supabase Client Setup

**Two types of clients**:

1. **Service Role Client** (for database operations):
   - Uses `SUPABASE_SERVICEROLE_KEY`
   - Full database access
   - Used for: Contact submissions, lead management

2. **Anon Client** (for authentication):
   - Uses `SUPABASE_ANON_KEY`
   - Limited permissions
   - Used for: Login, signup, token verification

### Database Tables Used

1. **`leads` table**:
   - Stores all contact form submissions
   - Fields: `id`, `first_name`, `last_name`, `email`, `phone`, `message`, `company_name`, `service_need`, `status`, `source`, `notes`, `property_url`, `created_at`, `updated_at`

2. **Supabase Auth** (built-in):
   - Stores user accounts
   - Handles authentication
   - Manages JWT tokens

---

## 🔄 Data Flow Examples

### Contact Form Submission Flow

```
1. User fills contact form on website
   ↓
2. Frontend sends POST /api/contact/submit
   ↓
3. Backend validates input (Zod schema)
   ↓
4. Backend sanitizes all inputs
   ↓
5. Backend splits name into first_name/last_name
   ↓
6. Backend creates lead in Supabase leads table
   ↓
7. Backend returns success response
   ↓
8. Frontend shows success message
```

### Lead Management Flow

```
1. Admin logs in via /api/auth/login
   ↓
2. Frontend stores JWT token
   ↓
3. Admin views leads via /api/leads
   ↓
4. Backend filters by source='supreme_%'
   ↓
5. Backend returns leads with pagination
   ↓
6. Admin updates status via /api/leads/:id/status
   ↓
7. Backend updates lead in database
   ↓
8. Frontend refreshes lead list
```

---

## 📦 Dependencies

### Core Dependencies:
- **express**: Web server framework
- **@supabase/supabase-js**: Supabase client library
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **zod**: Schema validation

### Development Dependencies:
- **typescript**: Type safety
- **tsx**: TypeScript execution
- **@types/***: TypeScript type definitions

---

## 🚀 Scripts

### Development
```bash
npm run dev
```
- Runs server with hot reload (tsx watch)

### Production
```bash
npm run build  # Compile TypeScript
npm start      # Run compiled server
```

### Create Admin User
```bash
npm run create-admin <email> <password> <name>
```
- Creates admin user in Supabase Auth
- Auto-confirms email

---

## 🔧 Environment Variables

**Required in `backend/.env`**:

```env
PORT=3001
FRONTEND_URL=https://yourdomain.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICEROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
NODE_ENV=production
```

---

## 📊 Summary

**What the backend does**:

1. ✅ **Receives contact form submissions** from your website
2. ✅ **Validates and sanitizes** all user inputs
3. ✅ **Saves leads** to Supabase database
4. ✅ **Provides API** for lead management panel
5. ✅ **Handles authentication** for admin users
6. ✅ **Filters leads** by source (only your website)
7. ✅ **Provides pagination** for large lead lists
8. ✅ **Updates lead status** for CRM workflow
9. ✅ **Secures all endpoints** with validation and sanitization

**Key Features**:
- 🔒 Security-first (sanitization, validation, CORS)
- 📊 Lead management (CRUD operations)
- 🔐 Authentication (login/signup/verify)
- 🗄️ Database integration (Supabase)
- 📝 Input validation (Zod schemas)
- 🛡️ XSS/SQL injection protection

---

## 🎯 Use Cases

1. **Website Contact Form**: Users submit inquiries → Saved as leads
2. **Lead Management Panel**: Admins view, filter, and update lead statuses
3. **CRM Integration**: Leads can be exported or integrated with other systems
4. **Analytics**: Track lead sources, statuses, and conversion rates

---

This backend is production-ready and handles all the server-side logic for your Supreme Animation Studio website! 🚀

