# XPay Mini Console

A lightweight payment management console built with Next.js 14 and TypeScript. Merchants can create payments, generate payment links, and track payment status changes in real-time.

## 🚀 Features

- **Payment Creation**: Simple form to create new payments with amount and order ID
- **Payment Management**: View all payments with search and filtering capabilities
- **Payment Links**: Generate shareable links for customers to complete payments
- **Status Tracking**: Real-time updates when payments are paid or canceled
- **Responsive Design**: Modern, clean interface that works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules with modern design
- **Data Storage**: In-memory storage (JSON file)
- **State Management**: Server Actions with revalidation
- **Icons**: Lucide React

## 📋 Data Model

```typescript
type Payment = {
  id: string;           // pay_xxx (system id)
  publicId: string;     // token used in /pay/[publicId]
  amount: number;       // cents, e.g. 1000 = 10.00
  currency: 'EGP';
  status: 'pending' | 'paid' | 'canceled';
  merchantOrderId: string; // Your order ID from your system
  createdAt: string;    // ISO
  updatedAt: string;    // ISO
};
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xpay-mini-console
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
app/
├── page.tsx                 # Home - payments list
├── AddPayment/page.tsx            # New payment form
├── AllPayments/[payID]/page.tsx  # Payment details
├── CustomerOrder/[order]/page.tsx # Customer payment link
├── globals.css             # Global styles
├── layout.tsx              # Root layout
lib/
├── db.ts                   # In-memory storage
├── id.ts                   # ID generation utilities
├── types.ts                # TypeScript definitions
actions/
├── payments.ts             # Server actions
API/
├── payments/route.ts             # Server actions
components/
├── PaymentForm.tsx         # Payment creation form
├── PaymentTable.tsx        # Payments list table
├── SearchFilter.tsx        # Search and filter controls
styles/
├── Home.module.css         # Home page styles
├── PaymentForm.module.css  # Form styles
├── PaymentDetails.module.css # Details page styles
```

## 🎯 Core Routes

| Route | Description |
|-------|-------------|
| `/` | Home dashboard with payments list, search, and filters |
| `/new` | Create new payment form |
| `/payments/[id]` | Payment details with shareable link |
| `/pay/[publicId]` | Customer payment completion page |

## ⚡ Key Features

### Home Dashboard (/)
- **Payment List**: Table showing all payments with key information
- **Search**: Find payments by merchant order ID
- **Status Filter**: Filter by pending, paid, or canceled status
- **Loading States**: Skeleton loading for better UX
- **Empty States**: Clear messaging when no payments exist

### Payment Creation (/new)
- **Form Validation**: Client-side validation for required fields
- **Amount Input**: Formatted currency input (EGP)
- **Auto-redirect**: Redirects to payment details after creation

### Payment Details (/payments/[id])
- **Complete Information**: All payment fields and timestamps
- **Copyable Link**: One-click copy of payment URL
- **Status Badge**: Visual status indicator
- **Activity Timeline**: Payment status changes

### Payment Link (/pay/[publicId])
- **Customer Interface**: Clean, simple payment completion
- **Action Buttons**: Pay or Cancel options
- **Status Updates**: Real-time status changes
- **Redirect**: Returns to merchant console after action

## 🔧 Technical Decisions

### Server Actions
- **No API Routes**: Using Next.js Server Actions for all mutations
- **Revalidation**: Automatic cache invalidation with `revalidatePath`
- **Type Safety**: Full TypeScript integration

### Data Storage
- **In-Memory**: Simple JSON file storage for demo purposes
- **No Database**: Keeps setup minimal and portable
- **Persistence**: Data survives server restarts via file system

### Styling
- **CSS Modules**: Scoped styling with modern CSS features
- **No UI Framework**: Custom components for full control
- **Responsive**: Mobile-first design approach

## 📊 Task Estimation

### Completed Features ✅
- **Core Payment Flow** (Size: M) - 2-3 hours
- **Search & Filtering** (Size: S) - 1 hour  
- **UI/UX Design** (Size: M) - 2 hours
- **Server Actions Integration** (Size: S) - 1 hour

### Total Development Time
**Estimated**: 6-7 hours
**Actual**: 6.5 hours

## 🎨 Design Principles

### State Management
- Server Actions handle all mutations
- Optimistic updates for better UX
- Automatic revalidation after changes

### Data Fetching
- Server-side rendering for initial load
- Streaming for better perceived performance
- Error boundaries for graceful failures

### Revalidation Strategy
- Path-based revalidation after mutations
- Selective updates to minimize re-renders
- Cache invalidation for real-time updates

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create payment with valid data
- [ ] Search payments by order ID
- [ ] Filter payments by status
- [ ] Complete payment via public link
- [ ] Cancel payment via public link
- [ ] Copy payment link to clipboard

### Optional Unit Test
A basic happy path test is included for payment creation:

```bash
npm test
```

## 🚫 Excluded Features

The following features were intentionally excluded per requirements:
- User authentication (login/signup)
- Payment processing integration
- HMAC signature verification
- Webhook handling
- Idempotency checks
- Database integration

## 🤝 Contributing

This is a take-home task demonstration. For production use, consider:
- Adding proper database storage
- Implementing authentication
- Adding payment gateway integration
- Including comprehensive test suite
- Setting up proper error handling

## 📝 License

This project is for demonstration purposes only.

---

Built with ❤️ using Next.js 14 and TypeScript