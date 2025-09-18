"use client";
import React, { useEffect, useState } from "react";
import "./AllPayments.css";
import { useRouter } from "next/navigation";
import { Clock, DollarSign, X, Copy } from "lucide-react";
import { Payment } from "@/app/types/payment";
import { showToast } from "@/app/components/toast";

export type { Payment };

const AllPayments = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data: Payment[]) => setPayments(data))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredPayments(
      payments.filter((payment) => {
        const matchesName = payment.Name.toLowerCase().includes(
          searchName.toLowerCase()
        );
        const matchesStatus =
          searchStatus === "all" || payment.status === searchStatus;
        return matchesName && matchesStatus;
      })
    );
  }, [payments, searchName, searchStatus]);

  const handleRowClick = (id: string) => {
    router.push(`/AllPayments/${id}`);
  };

  const copyLink = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/CustomerOrder/${id}`;
    await navigator.clipboard.writeText(url);
    showToast("Link copied");
  };

  return (
    <div className="payments-container">
      <div className="title">Payment Status</div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading payments...</p>
        </div>
      ) : (
        <>
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
                <th>Actions</th>
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
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => copyLink(payment.id, e)}
                    >
                      <Copy style={{ cursor: "pointer" }} />
                      <span style={{ cursor: "pointer" }}>Copy link</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <p className="no-results">No payments found</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllPayments;
