import { Payment } from "@/app/types/payment";

// Persist across dev HMR and serverless invocations (demo only)
const globalStore = globalThis as unknown as { __payments__?: Payment[] };
if (!globalStore.__payments__) {
  globalStore.__payments__ = [];
}
const payments = globalStore.__payments__!;

export function getPayments() {
  return payments;
}

export function getPaymentById(id: string) {
  return payments.find((p) => p.id === id);
}

export function addPayment(payment: Payment) {
  payments.push(payment);
}

export function updatePayment(
  id: string,
  newStatus: "pending" | "paid" | "canceled"
) {
  const idx = payments.findIndex((p) => p.id === id);
  if (idx !== -1) {
    payments[idx] = { ...payments[idx], status: newStatus };
  }
}