"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [billingData, setBillingData] = useState([
    { id: 1, description: "Compute Instance", amount: 120.0 },
    { id: 2, description: "Storage", amount: 80.0 },
    { id: 3, description: "Data Transfer", amount: 50.0 },
  ]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/24",
    cardHolder: "John Doe",
  });

  const [invoices, setInvoices] = useState([
    { id: 1, date: "2023-01-01", amount: 250.0 },
    { id: 2, date: "2023-02-01", amount: 300.0 },
  ]);

  const totalAmount = billingData.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="text-blue-500 text-3xl">☁️</div>
          <h1 className="text-2xl font-bold text-gray-800">Cloud9 Billing</h1>
        </div>
      </header>

      <main className="mt-6 space-y-6">
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

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Card Number:</span>
              <span>{paymentInfo.cardNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Expiry Date:</span>
              <span>{paymentInfo.expiryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Card Holder:</span>
              <span>{paymentInfo.cardHolder}</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Previous Invoices</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Amount ($)</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-2 px-4 border-b">{invoice.date}</td>
                  <td className="py-2 px-4 border-b text-right">{invoice.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-right">
                    <button className="text-blue-500 hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}