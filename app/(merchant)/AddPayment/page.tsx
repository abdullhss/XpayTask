"use client";
import React, { useState } from "react";
import "./AddPayment.css";
import { CheckCircle, DollarSign, Hash, ListRestart, PlusIcon, User, MapPin } from "lucide-react";

export default function AddPayment() {
  const [amount, setAmount] = useState("");
  const [merchantOrderId, setMerchantOrderId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      console.log({ amount, merchantOrderId, name, location });
      setIsProcessing(false);
    }, 2000);
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
                step="1"
              />
            </div>
          </div>

          {/* Merchant Order ID */}
          <div className="form-group">
            <label className="form-label" htmlFor="merchantOrderId">
              <span className="label-text">Order ID</span>
              <span className="label-required">*</span>
            </label>
            <div className="input-wrapper">
              <div className="input-prefix">
                <Hash />
              </div>
              <input
                id="merchantOrderId"
                type="text"
                value={merchantOrderId}
                onChange={(e) => setMerchantOrderId(e.target.value)}
                className="form-input"
                placeholder="Enter unique order identifier"
                required
                minLength={3}
                maxLength={50}
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
      </div>
    </div>
  );
}
