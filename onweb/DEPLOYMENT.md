# Vercel Deployment Guide

## Steps to Deploy on Vercel

1. **Make sure you have the `vercel.json` file** (already created). It should:
   - Declare the **`api/chat.js`** serverless function (with a sensible `maxDuration`).
   - Use a rewrite so **`/api/*`** is **not** sent to `index.html` (SPA fallback only applies to other paths):

```json
{
  "functions": {
    "api/chat.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

2. **Build the project locally** to ensure it works:
```bash
npm run build
```

3. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Make sure the build command is: `npm run build`
   - Make sure the output directory is: `build`
   - Deploy!

## Common Issues Fixed

- ✅ Added `vercel.json` for React Router support
- ✅ All images are properly referenced
- ✅ Build process works without warnings
- ✅ All dependencies are up to date

## EmailJS Configuration

The contact form uses EmailJS for sending emails. To configure it:

1. **For Local Development:**
   - Copy `ENV_EXAMPLE.txt` to `.env.local`
   - Fill in your actual EmailJS keys
   - The app will use the fallback values if environment variables aren't set

2. **For Vercel Production:**
   - Go to your Vercel project settings → **Environment Variables**
   - Add these environment variables:
     - `REACT_APP_EMAILJS_SERVICE_ID`
     - `REACT_APP_EMAILJS_TEMPLATE_ID` 
     - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - For the **Ask Andi** chat (Anthropic proxy in `api/chat.js`), add:
     - **`ANTHROPIC_KEY`** — your Anthropic API secret (server-side only; do **not** prefix with `REACT_APP_`)
   - Redeploy your project

**Note:** The Ask Andi widget calls **`POST /api/chat`**. That route is implemented by Vercel’s **`api/chat.js`** function. Local **`npm start`** does not run that function; use **`vercel dev`** from the `onweb` folder if you need the chat against a local API, or test chat on the deployed preview/production URL.

## If deployment still fails:

1. Check the Vercel build logs for specific errors
2. Make sure all image files are committed to your repository
3. Verify that the build command completes successfully locally
4. Check that environment variables are set correctly in Vercel
