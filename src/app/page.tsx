"use client";

import { useState } from "react";
import Image from "next/image";

const Modal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-50" onClick={onClose}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-lg font-medium text-gray-900">Invoice Details</h3>
            <div className="mt-2">
              {invoice && (
                <div>
                  <p><strong>Date:</strong> {invoice.date}</p>
                  <p><strong>Amount:</strong> ${invoice.amount.toFixed(2)}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const totalAmount = billingData.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="text-blue-500 text-3xl">☁️</div>
          <h1 className="text-3xl font-bold text-gray-800">Cloud9 Billing</h1>
        </div>
      </header>

      <main className="mt-6 space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Billing Summary
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-200">Description</th>
                <th className="py-2 px-4 border-b bg-gray-200">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {billingData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Previous Invoices</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-200">Date</th>
                <th className="py-2 px-4 border-b bg-gray-200">Amount ($)</th>
                <th className="py-2 px-4 border-b bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{invoice.date}</td>
                  <td className="py-2 px-4 border-b text-right">{invoice.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-right">
                    <button className="text-blue-500 hover:underline" onClick={() => openModal(invoice)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} invoice={selectedInvoice} />
    </div>
  );
}