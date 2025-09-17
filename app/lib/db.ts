import clientPromise from "./mongo";
import { Payment } from "@/app/types/payment";

export async function getPayments(): Promise<Payment[]> {
  const client = await clientPromise;
  const db = client.db("xpay");
  return db.collection<Payment>("payments").find({}).toArray();
}

export async function getPaymentById(id: string) {
  const client = await clientPromise;
  const db = client.db("xpay");
  return db.collection<Payment>("payments").findOne({ id });
}

export async function addPayment(payment: Payment) {
  const client = await clientPromise;
  const db = client.db("xpay");
  await db.collection<Payment>("payments").insertOne(payment);
}

export async function updatePayment(id: string, newStatus: "pending" | "paid" | "canceled") {
  const client = await clientPromise;
  const db = client.db("xpay");
  await db.collection<Payment>("payments").updateOne(
    { id },
    { $set: { status: newStatus, updatedAt: new Date().toISOString() } }
  );
}
