"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloud, FaDollarSign, FaFileInvoiceDollar } from "react-icons/fa";

export default function Home() {
  const [billingData, setBillingData] = useState([
    { id: 1, description: "Compute Instance", amount: 120.0 },
    { id: 2, description: "Storage", amount: 80.0 },
    { id: 3, description: "Data Transfer", amount: 50.0 },
  ]);

  const totalAmount = billingData.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <FaCloud className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Cloud9 Billing</h1>
        </div>
      </header>

      <main className="mt-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Summary</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {billingData.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="py-2 px-4 border-b text-right">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 px-4 border-t font-bold">Total</td>
                <td className="py-2 px-4 border-t text-right font-bold">{totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </main>
    </div>
  );
}