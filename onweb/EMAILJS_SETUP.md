# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply directly to this email to respond to {{from_name}}.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## Step 5: Update Contact.js
Replace these placeholder values in `/src/pages/Contact.js`:

```javascript
const serviceId = 'YOUR_SERVICE_ID';        // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

## Step 6: Test the Form
1. Start your development server: `npm start`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the message

## Template Variables Used
- `{{from_name}}` - First Name + Last Name
- `{{from_email}}` - Sender's email address
- `{{message}}` - The message content
- `{{to_name}}` - Your name (set to "Andi")
- `{{reply_to}}` - Reply-to email (same as sender's email)

## Free Tier Limits
- 200 emails per month
- Perfect for personal portfolio sites
- No credit card required

## Troubleshooting
- Make sure all IDs are correct
- Check that your email service is properly connected
- Verify the template variables match exactly
- Check browser console for any error messages
