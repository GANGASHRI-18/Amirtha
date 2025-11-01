# Amirtha E-commerce Platform

A full-stack e-commerce website with real OTP authentication and complete shopping functionality.

## Features

### 🔐 Authentication
- **Login Page**: Username (letters only) and Phone (10 digits) validation
- **Real OTP Generation**: SMS OTP via Twilio API (with dev mode fallback)
- **OTP Verification**: 6-digit OTP with auto-advancing input boxes
- **JWT Session Management**: Secure authentication with HTTP-only cookies

### 🛍️ E-commerce Features
- **Main Store**: Amazon/Flipkart-style product grid
- **Search Functionality**: Real-time product search
- **10 Product Categories**: Electronics, Fashion, Home, Beauty, Sports, Books, Toys, Grocery, Automotive, Health
- **Product Details**: Full product information with images, prices, and descriptions
- **Shopping Cart**: Quantity selection and order management
- **Checkout Flow**: Demo processing → Final amount display → Order confirmation

### 🎨 Design
- **Premium Color Scheme**: Sky Blue (#0EA5E9) with White
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Smooth transitions and animations
- **User-Friendly**: Intuitive navigation and interactions

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **OTP Service**: Twilio SMS API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:
Create a \`.env\` file with:
\`\`\`
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="your_twilio_phone_number"
\`\`\`

3. Set up the database:
\`\`\`bash
npx prisma generate
npx prisma db push
node scripts/seed.js
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Development Mode
When Twilio credentials are not configured, the app runs in development mode:
- OTP codes are displayed in an alert dialog
- Console logs show the OTP for testing
- All functionality works without real SMS

### Production Mode
Configure Twilio credentials in \`.env\` to enable real SMS OTP delivery.

## User Flow

1. **Login** → Enter username (letters only) and phone (10 digits)
2. **Generate OTP** → Receive 6-digit OTP via SMS
3. **Verify OTP** → Enter OTP in 6 separate boxes with auto-advancement
4. **Browse Store** → View products, search, filter by category
5. **Select Product** → View details, adjust quantity
6. **Checkout** → See demo processing → View final amount
7. **Place Order** → Confirm purchase

## Database Schema

- **Users**: username, phone, createdAt
- **Products**: name, description, price, originalPrice, imageUrl, category, stock
- **OTP**: phone, code, expiresAt, verified
- **Orders**: userId, productId, amount, status

## API Endpoints

- \`POST /api/auth/login\` - Generate OTP
- \`POST /api/auth/verify-otp\` - Verify OTP and create session
- \`GET /api/products\` - Get all products (with optional category/search filters)
- \`GET /api/products/[id]\` - Get single product details

## Project Structure

\`\`\`
/vercel/sandbox/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── verify-otp/route.ts
│   │   └── products/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── login/page.tsx
│   ├── verify-otp/page.tsx
│   ├── store/page.tsx
│   ├── product/[id]/page.tsx
│   ├── category/[name]/page.tsx
│   ├── checkout/page.tsx
│   └── page.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── twilio.ts
├── prisma/
│   └── schema.prisma
└── scripts/
    └── seed.js
\`\`\`

## License

MIT
