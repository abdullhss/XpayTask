import { NextResponse } from "next/server";
import { getPayments, getPaymentById, updatePayment } from "@/app/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const payment = await getPaymentById(id);
    if (!payment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(payment);
  }

  const payments = await getPayments();
  return NextResponse.json(payments);
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null as any);

  if (
    !body ||
    typeof body.id !== "string" ||
    !["pending", "paid", "canceled"].includes(body.status)
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await getPaymentById(body.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await updatePayment(body.id, body.status);
  const updated = await getPaymentById(body.id);

  return NextResponse.json(updated);
}
