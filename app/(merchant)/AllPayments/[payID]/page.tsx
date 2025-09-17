import React from 'react'
import {Payment} from  "../page"
import "./singlePayment.css"


const PaymentCard = (payment : Payment) => {
    payment = { id: "pay_001", Name: "Ahmed", status: "pending" , amount: 100, location: "New York"} ;

  return (
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
    </div>
  );
};

export default PaymentCard;