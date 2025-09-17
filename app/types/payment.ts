export type PaymentStatus = "pending" | "paid" | "canceled";

export interface Payment {
  id: string;
  Name: string;
  status: PaymentStatus;
  amount: number;
  location: string;
}


