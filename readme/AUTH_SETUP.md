# Authentication Setup Guide

This guide explains how to set up authentication for the lead management panel.

## Prerequisites

1. Supabase project with Auth enabled
2. Environment variables configured (see below)

## Environment Variables

### Backend (.env)
Add the following to your `backend/.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICEROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend (.env)
Add the following to your root `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Creating an Admin User

### Option 1: Using the Script (Recommended)

Run the create-admin script from the backend directory:

```bash
cd backend
npm run create-admin <email> <password> <name>
```

Example:
```bash
npm run create-admin admin@supremeanimation.com "SecurePass123" "Admin User"
```

**Note:** Password must be at least 8 characters long.

### Option 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add User" or "Invite User"
4. Enter email and password
5. Set email as confirmed
6. Add user metadata: `{ "name": "Admin User", "role": "admin" }`

### Option 3: Using Supabase SQL

You can also create users directly via SQL, but the script method is recommended.

## API Endpoints

### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
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

### POST `/api/auth/signup`
Create a new account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**Response:**
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

### POST `/api/auth/verify`
Verify an access token.

**Request:**
```json
{
  "access_token": "jwt_token_here"
}
```

**Response:**
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

## Frontend Authentication Flow

1. User visits `/manage` route
2. If not authenticated, login form is shown
3. User enters email/password and submits
4. Backend authenticates with Supabase Auth
5. JWT token is returned and stored in localStorage
6. User is redirected to lead management panel
7. Token is verified on each page load
8. If token is invalid/expired, user is logged out

## Security Notes

- Passwords must be at least 8 characters
- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Tokens are verified on each request to the management panel
- Service role key is only used server-side, never exposed to client

## Troubleshooting

### "Missing Supabase ANON_KEY environment variable"
- Make sure `SUPABASE_ANON_KEY` is set in `backend/.env`
- Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in root `.env`

### "Invalid email or password"
- Verify the user exists in Supabase Auth
- Check if email confirmation is required (script auto-confirms)
- Verify password is correct

### Token verification fails
- Token may have expired (default: 1 hour)
- Check if token is being sent correctly
- Verify Supabase URL and keys are correct

