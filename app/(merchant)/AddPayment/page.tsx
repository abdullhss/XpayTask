"use client";
import React, { useState } from "react";
import "./AddPayment.css";
import { CheckCircle, DollarSign, Hash, ListRestart, PlusIcon, User, MapPin, Copy } from "lucide-react";
import { createPayment } from "@/app/actions/payments";

export default function AddPayment() {
  const [amount, setAmount] = useState("");
  const [merchantOrderId, setMerchantOrderId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setCreatedId(null);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("name", name);
      formData.append("location", location);

      const id = await createPayment(formData);
      setCreatedId(id);
      handleReset();
    } catch (err) {
      console.error("Error creating payment:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setAmount("");
    setMerchantOrderId("");
    setName("");
    setLocation("");
  };

  return (
    <div className="payment-container">
      {/* Background decorative elements */}
      <div className="bg-decoration">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
      </div>

      <div className="payment-card">
        {/* Header section */}
        <div className="card-header">
          <div className="payment-icon">
            <PlusIcon />
          </div>
          <h1 className="card-title">Create Payment</h1>
          <p className="card-subtitle">Secure and fast payment processing</p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="payment-form">
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <span className="label-text">Name</span>
              <span className="label-required">*</span>
            </label>
            <div className="input-wrapper">
              <div className="input-prefix">
                <User />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Enter customer name"
                required
                minLength={2}
                maxLength={100}
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="location">
              <span className="label-text">Location</span>
              <span className="label-required">*</span>
            </label>
            <div className="input-wrapper">
              <div className="input-prefix">
                <MapPin />
              </div>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                placeholder="Enter customer location"
                required
                minLength={2}
                maxLength={150}
              />
            </div>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="amount">
              <span className="label-text">Amount</span>
              <span className="label-currency">EGP</span>
            </label>
            <div className="input-wrapper">
              <div className="input-prefix">
                <DollarSign />
              </div>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                placeholder="Enter amount in EGP"
                required
                min="1"
                step="0.01"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className={`btn btn-primary ${isProcessing ? "btn-processing" : ""}`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="btn-loader"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle />
                  <span>Create Payment</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              disabled={isProcessing}
            >
              <ListRestart />
              <span>Reset Form</span>
            </button>
          </div>
        </form>

        {createdId && (
          <div className="success-message">
             Payment created successfully! ID: {createdId}
            <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <code style={{ padding: "2px 6px" }}>/CustomerOrder/{createdId}</code>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  const url = `${window.location.origin}/CustomerOrder/${createdId}`;
                  navigator.clipboard.writeText(url);
                }}
              >
                <Copy />
                <span>Copy payment link</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
