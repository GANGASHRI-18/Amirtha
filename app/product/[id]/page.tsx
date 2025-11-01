'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setProduct(data.product);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    fetchProduct();
  }, [params.id, router]);

  const handleBuy = () => {
    if (product) {
      localStorage.setItem('checkout', JSON.stringify({
        product,
        quantity,
        totalAmount: product.price * quantity
      }));
      router.push('/checkout');
    }
  };

  const discount = () => {
    if (!product) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sky-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-4">Product not found</p>
          <Link href="/store" className="text-sky-600 hover:underline">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/store" className="text-sky-600 hover:text-sky-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Store
            </Link>
            <h1 className="text-2xl font-bold text-sky-600">Amirtha</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                {discount()}% OFF
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-sky-600">₹{product.price}</span>
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                </div>
                <p className="text-green-600 font-medium">
                  You save ₹{product.originalPrice - product.price}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-800 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.stock} items available
                </p>
              </div>

              <div className="mb-6 p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span>₹{product.price * quantity}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Discount</span>
                  <span className="text-green-600">-₹{(product.originalPrice - product.price) * quantity}</span>
                </div>
                <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-sky-600">₹{product.price * quantity}</span>
                </div>
              </div>

              <button
                onClick={handleBuy}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg"
              >
                Buy Now
              </button>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 mx-auto mb-1 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-gray-600">Quality Assured</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 mx-auto mb-1 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 mx-auto mb-1 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
