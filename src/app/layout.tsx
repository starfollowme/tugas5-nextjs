import React from 'react';

export const metadata = { title: 'CRUD Neon' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
        <div className="max-w-2xl mx-auto shadow-lg rounded-2xl bg-white p-6">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">
              Next.js CRUD with Neon
            </h1>
            <p className="text-gray-500 text-sm">
              Simple & clean CRUD app using Next.js and NeonDB
            </p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
