# FluxForge Setup Notes

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Environment Variables

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory with the following variables:
```env
# Required for AI Features (Google Generative AI)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here

# Optional: Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

### Backend (`strapi-ai-saas/.env`)
Create a `.env` file in the `strapi-ai-saas` directory with the following variables:
```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (Generate new random strings for production)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt

# Database (SQLite by default, change if using Postgres/MySQL)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## Running the Application

1. **Start Backend (Strapi)**
   ```bash
   cd strapi-ai-saas
   npm install
   npm run develop
   ```

2. **Start Frontend (Next.js)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Accessing the apps**
   - Frontend: http://localhost:3000
   - Backend Admin: http://localhost:1337/admin
