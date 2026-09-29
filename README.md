# GoFinance

GoFinance is a local finance operations dashboard with a React frontend and an Express API.

## Run locally

1. Install dependencies:
   npm install
2. Start the frontend and backend together:
   npm run dev:full
3. Open the URL printed by Vite in the terminal, usually:
   http://localhost:5173

If port 5173 is already in use, Vite will automatically move to the next available port (for example http://localhost:5174).

## Login

Use one of the seeded demo accounts:

- admin@gofinance.io / admin123
- ops@gofinance.io / demo123

## Common startup issue

If sign-in fails with a 502 or `Unexpected end of JSON input`, the backend API is usually not running. Always start it with `npm run dev:full` so both the Express API on port 3001 and the Vite app run together.
