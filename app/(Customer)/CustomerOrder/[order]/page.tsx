"use client"
import React, { useEffect, useState } from "react";
import "./customerOrder.css";
import { Payment } from "@/app/types/payment";
import { useParams } from "next/navigation";

const CustomerOrderPage = () => {
  const params = useParams<{ order: string }>();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const id = params?.order;
    if (!id) return;
    fetch(`/api/payments?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setPayment)
      .catch((err) => setError(err.message));
  }, [params?.order]);

  const updateStatus = async (status: "paid" | "canceled") => {
    if (!payment) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/payments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: payment.id, status }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setPayment(updated);
    } catch (e: any) {
      setError(e.message || "Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) return <div className="customer-container">{error}</div>;
  if (!payment) return <div className="customer-container">Loading...</div>;

  return (
    <div className="customer-container">
      <h1 className="title">My Payment</h1>

      <div className="payment-card">
        <div className="card-header">
          <h2 className="payment-name">{payment.Name}</h2>
          <span className={`status ${payment.status}`}>{payment.status}</span>
        </div>

        <div className="card-body">
          <div className="payment-row">
            <span className="label">Payment ID:</span>
            <span className="value">#{payment.id}</span>
          </div>
          <div className="payment-row">
            <span className="label">Amount:</span>
            <span className="value">${payment.amount.toFixed(2)}</span>
          </div>
          <div className="payment-row">
            <span className="label">Location:</span>
            <span className="value">{payment.location}</span>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn pay" disabled={isUpdating || payment.status !== "pending"} onClick={() => updateStatus("paid")}>
            Pay
          </button>
          <button className="btn cancel" disabled={isUpdating || payment.status !== "pending"} onClick={() => updateStatus("canceled")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderPage;
