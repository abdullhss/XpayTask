"use client";
import React, { useState } from "react";
import "./AllPayments.css";
import { useRouter } from "next/navigation";
import { Clock, DollarSign, X } from "lucide-react";

export interface Payment {
  id: string;
  Name: string;
  status: "pending" | "paid" | "canceled";
  amount: number;
  location: string;
}

const payments: Payment[] = [
  { id: "pay_001", Name: "Ahmed", status: "pending", amount: 100, location: "New York" },
  { id: "pay_002", Name: "Sara", status: "paid", amount: 200, location: "Alex" },
  { id: "pay_003", Name: "Omar", status: "canceled", amount: 300, location: "Cairo" },
  { id: "pay_004", Name: "Ahmed", status: "paid", amount: 500, location: "Dubai" },
];

const AllPayments = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");

  const handleRowClick = (id: string) => {
    router.push(`/AllPayments/${id}`);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesName = payment.Name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = searchStatus === "all" || payment.status === searchStatus;
    return matchesName && matchesStatus;
  });

  return (
    <div className="payments-container">
      <div className="title">Payment Status</div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          className="status-select"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr
              key={payment.id}
              className="clickable-row"
              onClick={() => handleRowClick(payment.id)}
            >
              <td>{payment.id}</td>
              <td>{payment.Name}</td>
              <td>{payment.amount} EGP</td>
              <td>
                <span className={`status ${payment.status}`}>
                  {payment.status === "pending" && <Clock />}
                  {payment.status === "paid" && <DollarSign />}
                  {payment.status === "canceled" && <X />}
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPayments.length === 0 && (
        <p className="no-results">No payments found</p>
      )}
    </div>
  );
};

export default AllPayments;
