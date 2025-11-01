'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CheckoutData {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
  };
  quantity: number;
  totalAmount: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [showDemo, setShowDemo] = useState(true);
  const [demoProgress, setDemoProgress] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const checkout = localStorage.getItem('checkout');
    if (!checkout) {
      router.push('/store');
      return;
    }

    const data = JSON.parse(checkout);
    setCheckoutData(data);
  }, [router]);

  useEffect(() => {
    if (showDemo && demoProgress < 100) {
      const timer = setTimeout(() => {
        setDemoProgress(prev => Math.min(prev + 2, 100));
      }, 50);
      return () => clearTimeout(timer);
    } else if (demoProgress === 100) {
      setTimeout(() => setShowDemo(false), 500);
    }
  }, [showDemo, demoProgress]);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      localStorage.removeItem('checkout');
      router.push('/store');
    }, 3000);
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sky-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Order</h2>
            <p className="text-gray-600 mb-6">Please wait while we prepare your order...</p>

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-sky-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${demoProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{demoProgress}%</p>
            </div>

            <div className="space-y-2 text-left text-sm text-gray-600">
              <div className={`flex items-center gap-2 ${demoProgress > 20 ? 'text-green-600' : ''}`}>
                {demoProgress > 20 ? '✓' : '○'} Verifying product availability
              </div>
              <div className={`flex items-center gap-2 ${demoProgress > 40 ? 'text-green-600' : ''}`}>
                {demoProgress > 40 ? '✓' : '○'} Calculating shipping
              </div>
              <div className={`flex items-center gap-2 ${demoProgress > 60 ? 'text-green-600' : ''}`}>
                {demoProgress > 60 ? '✓' : '○'} Applying discounts
              </div>
              <div className={`flex items-center gap-2 ${demoProgress > 80 ? 'text-green-600' : ''}`}>
                {demoProgress > 80 ? '✓' : '○'} Preparing invoice
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase</p>
          <p className="text-sm text-gray-500">Redirecting to store...</p>
        </div>
      </div>
    );
  }

  const deliveryCharge = checkoutData.totalAmount > 1000 ? 0 : 50;
  const tax = Math.round(checkoutData.totalAmount * 0.18);
  const finalAmount = checkoutData.totalAmount + deliveryCharge + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/product/${checkoutData.product.id}`} className="text-sky-600 hover:text-sky-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <h1 className="text-2xl font-bold text-sky-600">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            
            <div className="flex gap-4 mb-6">
              <img
                src={checkoutData.product.imageUrl}
                alt={checkoutData.product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{checkoutData.product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Quantity: {checkoutData.quantity}</p>
                <p className="text-lg font-bold text-sky-600">₹{checkoutData.product.price}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{checkoutData.totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (18% GST)</span>
                <span>₹{tax}</span>
              </div>
              {deliveryCharge === 0 && (
                <p className="text-xs text-green-600">🎉 Free delivery on orders above ₹1000</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h2>
            
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg p-6 text-white mb-6">
              <p className="text-sm mb-2">Total Amount</p>
              <p className="text-4xl font-bold">₹{finalAmount}</p>
              <p className="text-sm mt-2 opacity-90">
                You saved ₹{(checkoutData.product.originalPrice - checkoutData.product.price) * checkoutData.quantity}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="border-2 border-sky-500 rounded-lg p-4 bg-sky-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive</p>
                  </div>
                  <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Place Order - ₹{finalAmount}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing this order, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
