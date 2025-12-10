# Supreme Animation Studio

A modern portfolio website for Supreme Animation Studio built with Next.js and Express.

## Project Structure

```
supremeAnimation/
├── src/              # Next.js frontend application
├── backend/          # Express backend server
├── public/           # Static assets
├── readme/           # Documentation files
└── package.json      # Root package.json with scripts to run both projects
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database)

### Initial Setup

1. **Install all dependencies** (frontend + backend):

```bash
npm run install:all
```

2. **Set up environment variables**:

   **Frontend** - Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your backend URL (default: `http://localhost:3001`)

   **Backend** - Copy `backend/.env.example` to `backend/.env`:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Update `backend/.env` with:

   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `PORT`: Backend server port (default: 3001)
   - `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

3. **Set up Supabase database**:
   - Go to your Supabase project SQL Editor
   - Run the SQL from `backend/supabase-setup.sql` to create the `contact_submissions` table

### Running the Application

**Run both frontend and backend together:**

```bash
npm run dev:all
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

The console will clearly display both URLs when the servers start.

**Run individually:**

Frontend only:

```bash
npm run dev
```

Backend only:

```bash
cd backend && npm run dev
```

## Backend API

The backend server provides the following endpoints:

- `POST /api/contact/submit` - Submit contact form
- `GET /health` - Health check

See `readme/BACKEND_README.md` for detailed API documentation.

## Documentation

All documentation files are located in the `readme/` folder:

- **Deployment Guides**: See `readme/DEPLOYMENT_STEP_BY_STEP.md` for detailed deployment instructions
- **Backend Documentation**: See `readme/BACKEND_OVERVIEW.md` for complete backend functionality
- **Authentication Setup**: See `readme/AUTH_SETUP.md` for auth configuration

## Environment Variables

### Frontend (.env)

- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Backend (backend/.env)

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICEROLE_KEY` - Supabase service role key
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `PORT` - Backend server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Framer Motion, Three.js
- **Backend**: Express.js, TypeScript, Supabase
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS Modules, Tailwind CSS (where applicable)

## License

Private project - Supreme Animation Studio
