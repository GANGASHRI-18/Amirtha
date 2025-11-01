# Quick Setup Guide

## 🚀 Quick Start

The application is already set up and ready to run!

### Start the Development Server

\`\`\`bash
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Testing the Application

### Development Mode (No Twilio Required)

The app is configured to work in development mode without Twilio:

1. **Login Page** (http://localhost:3000/login)
   - Username: Enter any name (letters only) - e.g., "John"
   - Phone: Enter any 10-digit number - e.g., "9876543210"
   - Click "Generate OTP"
   - **The OTP will be shown in an alert dialog!**

2. **OTP Verification** (http://localhost:3000/verify-otp)
   - Enter the 6-digit OTP from the alert
   - The boxes auto-advance as you type
   - Click "Verify OTP"

3. **Store Page** (http://localhost:3000/store)
   - Browse 40 products across 10 categories
   - Use the search bar to find products
   - Filter by category using the buttons
   - Click any product to view details

4. **Product Page**
   - View product details, images, and pricing
   - Adjust quantity
   - Click "Buy Now"

5. **Checkout Page**
   - Watch the demo processing animation
   - View final amount with tax and delivery charges
   - Click "Place Order"
   - See order confirmation

## 🔧 Optional: Enable Real SMS OTP

To enable real SMS OTP delivery via Twilio:

1. Sign up for a Twilio account at https://www.twilio.com
2. Get your Account SID, Auth Token, and Phone Number
3. Update the `.env` file:

\`\`\`env
TWILIO_ACCOUNT_SID="your_actual_account_sid"
TWILIO_AUTH_TOKEN="your_actual_auth_token"
TWILIO_PHONE_NUMBER="your_actual_twilio_number"
\`\`\`

4. Restart the development server

## 📊 Database

The SQLite database is already set up with:
- 40 products across 10 categories
- All necessary tables (Users, Products, OTP, Orders)

To reset the database:
\`\`\`bash
npx prisma db push --force-reset
node scripts/seed.js
\`\`\`

## 🎨 Features Implemented

✅ Login with username (letters only) and phone (10 digits) validation
✅ Real OTP generation (with dev mode fallback)
✅ 6-box OTP input with auto-advancement
✅ Premium Sky Blue + White color scheme
✅ Amazon/Flipkart-style store interface
✅ Search functionality
✅ 10 product categories
✅ Product detail pages
✅ Demo checkout flow
✅ Final amount calculation with tax and delivery
✅ Responsive design
✅ Smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite + Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **OTP**: Twilio SMS API (with dev mode)

## 📝 Notes

- The app uses localStorage for client-side session management
- In development mode, OTP codes are displayed in alerts
- All images are loaded from Unsplash CDN
- The database file is located at `prisma/dev.db`

Enjoy your e-commerce platform! 🎉
