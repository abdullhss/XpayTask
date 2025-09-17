"use client"
import React, { useEffect, useState } from 'react'
import { Payment } from  "@/app/types/payment"
import "./singlePayment.css"
import { useParams } from 'next/navigation'
import { Copy } from 'lucide-react'
import { showToast } from '@/app/components/toast'

const PaymentCard = () => {
  const params = useParams<{ payID: string }>();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.payID;
    if (!id) return;
    fetch(`/api/payments?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setPayment)
      .catch(err => setError(err.message));
  }, [params?.payID]);

  if (error) return <div className="payment-card"><div className="card-body">{error}</div></div>
  if (!payment) return <div className="payment-card"><div className="card-body">Loading...</div></div>

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
        <div className="payment-row">
          <span className="label">Customer link:</span>
          <span className="value" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <code>/CustomerOrder/{payment.id}</code>
            <button className="btn btn-secondary" style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(`${window.location.origin}/CustomerOrder/${payment.id}`).then(() => showToast('Link copied'))}>
              <Copy style={{ cursor: 'pointer' }} />
              <span style={{ cursor: 'pointer' }}>Copy link</span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;