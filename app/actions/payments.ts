"use server";

import { addPayment, updatePayment } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { Payment } from "@/app/types/payment";

export async function createPayment(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const name = String(formData.get("name"));
  const location = String(formData.get("location"));

  const payment: Payment = {
    id: "pay_" + randomUUID(),
    amount,
    status: "pending",
    Name: name,
    location,
  };

  addPayment(payment);

  revalidatePath("/");
  return payment.id;
}

export async function markPaid(id: string) {
  updatePayment(id, "paid");
  revalidatePath("/");
  revalidatePath(`/payments/${id}`);
}

export async function markCanceled(id: string) {
  updatePayment(id, "canceled");
  revalidatePath("/");
  revalidatePath(`/payments/${id}`);
}
