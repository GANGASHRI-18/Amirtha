'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      setUsername(value);
      setError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username) {
      setError('Username is required');
      return;
    }

    if (phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate OTP');
        setLoading(false);
        return;
      }

      if (data.devOTP) {
        alert(`Development Mode - Your OTP is: ${data.devOTP}`);
      }

      localStorage.setItem('phone', phone);
      router.push('/verify-otp');
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sky-600 mb-2">Amirtha</h1>
          <p className="text-gray-600">Welcome to Premium E-commerce</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your name (letters only)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none transition-colors text-gray-900"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Only letters allowed</p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none transition-colors text-gray-900"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {phone.length}/10 digits
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || phone.length !== 10}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Generating OTP...' : 'Generate OTP'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>A 6-digit OTP will be sent to your phone</p>
        </div>
      </div>
    </div>
  );
}
