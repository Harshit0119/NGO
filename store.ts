
import { create } from 'zustand';
import { User, Payment, Disbursement, Stats, AuthState } from './types';
import { persist } from 'zustand/middleware';

interface SocietyStore {
  users: User[];
  payments: Payment[];
  disbursements: Disbursement[];
  auth: AuthState;
  
  // Actions
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'status'>) => User;
  updateUser: (id: string, updates: Partial<User>) => void;
  addPayment: (payment: Omit<Payment, 'id' | 'verified' | 'paidAt' | 'nextDueAt'>) => void;
  verifyPayment: (paymentId: string) => void;
  addDisbursement: (disbursement: Omit<Disbursement, 'id' | 'createdBy'>) => void;
  login: (email: string) => void;
  logout: () => void;
  
  // Computed
  getStats: () => Stats;
}

const mockUsers: User[] = [
  { id: '1', name: 'राजेश कुमार', dob: '1985-05-15', fatherName: 'श्री राम शरण', address: 'सेक्टर 15', city: 'दिल्ली', state: 'दिल्ली', pincode: '110015', phone: '9876543210', email: 'rajesh@example.com', createdAt: '2023-01-01', status: 'Active' },
  { id: '2', name: 'सुनीता शर्मा', dob: '1990-08-20', fatherName: 'श्री मोहन लाल', address: 'मालवीय नगर', city: 'जयपुर', state: 'राजस्थान', pincode: '302017', phone: '9123456789', email: 'sunita@example.com', createdAt: '2023-05-10', status: 'Active' },
];

const mockPayments: Payment[] = [
  { id: 'p1', userId: '1', amount: 1200, type: 'yearly', paidAt: '2023-01-01', nextDueAt: '2024-01-01', method: 'UPI', verified: true },
  { id: 'p2', userId: '2', amount: 100, type: 'monthly', paidAt: '2024-04-01', nextDueAt: '2024-05-01', method: 'Cash', verified: true },
];

const mockDisbursements: Disbursement[] = [
  { id: 'd1', recipientName: 'कल्याण स्कूल फंड', amount: 5000, date: '2024-02-15', purpose: 'शिक्षा सहायता', notes: 'छात्रों की फीस के लिए', createdBy: 'Admin' },
];

export const useStore = create<SocietyStore>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      payments: mockPayments,
      disbursements: mockDisbursements,
      auth: { isAdmin: false, user: null },

      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString().split('T')[0],
          status: 'Pending',
        };
        set((state) => ({ users: [...state.users, newUser] }));
        return newUser;
      },

      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
        }));
      },

      addPayment: (paymentData) => {
        const paidAt = new Date().toISOString().split('T')[0];
        const months = paymentData.amount >= 1200 ? 12 : Math.floor(paymentData.amount / 100);
        const nextDueDate = new Date();
        nextDueDate.setMonth(nextDueDate.getMonth() + (months || 1));
        
        const newPayment: Payment = {
          ...paymentData,
          id: Math.random().toString(36).substr(2, 9),
          paidAt,
          nextDueAt: nextDueDate.toISOString().split('T')[0],
          verified: false,
        };

        set((state) => ({ payments: [...state.payments, newPayment] }));
      },

      verifyPayment: (id) => {
        const payment = get().payments.find(p => p.id === id);
        if (payment) {
          set((state) => ({
            payments: state.payments.map((p) => (p.id === id ? { ...p, verified: true } : p)),
            users: state.users.map((u) => (u.id === payment.userId ? { ...u, status: 'Active' } : u))
          }));
        }
      },

      addDisbursement: (data) => {
        const newD: Disbursement = {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          createdBy: 'Admin',
        };
        set((state) => ({ disbursements: [...state.disbursements, newD] }));
      },

      login: (email) => {
        if (email === 'admin@society.org') {
          set({ auth: { isAdmin: true, user: { name: 'व्यवस्थापक', email } } });
        }
      },

      logout: () => set({ auth: { isAdmin: false, user: null } }),

      getStats: () => {
        const { users, payments, disbursements } = get();
        const totalCollected = payments.filter(p => p.verified).reduce((sum, p) => sum + p.amount, 0);
        const totalDisbursed = disbursements.reduce((sum, d) => sum + d.amount, 0);
        
        // Mocking monthly breakdown for charts
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyBreakdown = months.map(m => ({
          month: m,
          amount: Math.floor(Math.random() * 5000) + 1000
        }));

        return {
          totalRegistered: users.length,
          activeMembers: users.filter(u => u.status === 'Active').length,
          totalCollected,
          totalDisbursed,
          monthlyBreakdown,
        };
      }
    }),
    { name: 'society-storage' }
  )
);
