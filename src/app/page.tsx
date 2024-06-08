"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

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
          <h1 className="text-2xl font-bold text-gray-800">Cloud9 Billing</h1>
        </div>
      </header>

      <main className="mt-6 space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing Summary</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-200">Description</th>
                <th className="py-2 px-4 border-b bg-gray-200">Amount ($)</th>
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
                <tr key={invoice.id}>
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

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Invoice Details
                  </Dialog.Title>
                  <div className="mt-2">
                    {selectedInvoice && (
                      <div>
                        <p><strong>Date:</strong> {selectedInvoice.date}</p>
                        <p><strong>Amount:</strong> ${selectedInvoice.amount.toFixed(2)}</p>
                        {/* Add more details as needed */}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}