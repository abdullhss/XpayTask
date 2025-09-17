"use client"
import React from "react";
import "./customerOrder.css";
import { Payment } from "@/app/(merchant)/AllPayments/page";

const samplePayment: Payment = {
  id: "98765",
  Name: "Ali Mohamed",
  status: "pending",
  amount: 420,
  location: "Giza, Egypt",
};

const CustomerOrderPage = () => {
  const handlePay = () => {
    alert(`Payment ${samplePayment.id} is now paid ✅`);
  };

  const handleCancel = () => {
    alert(`Payment ${samplePayment.id} has been canceled ❌`);
  };

  return (
    <div className="customer-container">
      <h1 className="title">My Payment</h1>

      <div className="payment-card">
        <div className="card-header">
          <h2 className="payment-name">{samplePayment.Name}</h2>
          <span className={`status ${samplePayment.status}`}>
            {samplePayment.status}
          </span>
        </div>

        <div className="card-body">
          <div className="payment-row">
            <span className="label">Payment ID:</span>
            <span className="value">#{samplePayment.id}</span>
          </div>
          <div className="payment-row">
            <span className="label">Amount:</span>
            <span className="value">${samplePayment.amount.toFixed(2)}</span>
          </div>
          <div className="payment-row">
            <span className="label">Location:</span>
            <span className="value">{samplePayment.location}</span>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn pay" onClick={handlePay}>
            Pay
          </button>
          <button className="btn cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderPage;
