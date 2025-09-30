# Vercel Deployment Guide

## Steps to Deploy on Vercel

1. **Make sure you have the `vercel.json` file** (already created) with the following content:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
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
   - Go to your Vercel project settings
   - Add these environment variables:
     - `REACT_APP_EMAILJS_SERVICE_ID`
     - `REACT_APP_EMAILJS_TEMPLATE_ID` 
     - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - Redeploy your project

## If deployment still fails:

1. Check the Vercel build logs for specific errors
2. Make sure all image files are committed to your repository
3. Verify that the build command completes successfully locally
4. Check that environment variables are set correctly in Vercel
