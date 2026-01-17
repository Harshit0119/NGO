
export type UserStatus = 'Active' | 'Expired' | 'Pending';

export interface User {
  id: string;
  name: string;
  dob: string;
  fatherName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  aadhaar?: string;
  occupation?: string;
  createdAt: string;
  status: UserStatus;
}

export type PaymentType = 'monthly' | 'yearly';
export type PaymentMethod = 'UPI' | 'Cash' | 'Other';

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  type: PaymentType;
  paidAt: string;
  nextDueAt: string;
  method: PaymentMethod;
  reference?: string;
  verified: boolean;
}

export interface Disbursement {
  id: string;
  recipientName: string;
  amount: number;
  date: string;
  purpose: string;
  notes?: string;
  createdBy: string;
}

export interface Stats {
  totalRegistered: number;
  activeMembers: number;
  totalCollected: number;
  totalDisbursed: number;
  monthlyBreakdown: { month: string; amount: number }[];
}

export interface AuthState {
  isAdmin: boolean;
  user: any | null;
}
