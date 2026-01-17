
import React from 'react';
import { useStore } from '../store';
import { ShieldCheck, UserCheck, CreditCard, PieChart, Plus, CheckCircle } from 'lucide-react';

const Admin = () => {
  const { auth, login, users, payments, verifyPayment, disbursements, addDisbursement, getStats } = useStore();
  const [email, setEmail] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'users' | 'payments' | 'disbursements'>('users');
  
  // Disbursement form state
  const [showDModal, setShowDModal] = React.useState(false);
  const [dForm, setDForm] = React.useState({ recipientName: '', amount: 0, purpose: 'शिक्षा सहायता', date: new Date().toISOString().split('T')[0] });

  if (!auth.isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-50 text-society-blue rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-society-blue mb-2">एडमिन लॉगिन</h2>
          <p className="text-gray-500 mb-8">केवल अधिकृत व्यवस्थापकों के लिए</p>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="ईमेल: admin@society.org"
              className="w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-society-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="पासवर्ड"
              className="w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-society-blue"
            />
            <button
              onClick={() => login(email)}
              className="w-full bg-society-blue text-white py-3 rounded-xl font-bold hover:bg-opacity-90"
            >
              लॉगिन करें
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 flex items-center gap-4">
          <div className="w-16 h-16 bg-society-blue rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-society-blue">प्रशासक डैशबोर्ड</h1>
            <p className="text-gray-500">स्वागत है, {auth.user?.name}। आप सोसाइटी का प्रबंधन यहाँ से कर सकते हैं।</p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowDModal(true)}
            className="bg-society-saffron text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md"
          >
            <Plus size={20} /> वितरण जोड़ें
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-society-blue text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
        >
          <UserCheck size={18} /> सदस्य प्रबंधन ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'payments' ? 'bg-society-blue text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
        >
          <CreditCard size={18} /> भुगतान पुष्टिकरण ({payments.filter(p => !p.verified).length})
        </button>
        <button
          onClick={() => setActiveTab('disbursements')}
          className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'disbursements' ? 'bg-society-blue text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
        >
          <PieChart size={18} /> वितरण रिकॉर्ड
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4">नाम</th>
                  <th className="px-6 py-4">मोबाइल / ईमेल</th>
                  <th className="px-6 py-4">स्थान</th>
                  <th className="px-6 py-4">स्टेटस</th>
                  <th className="px-6 py-4">एक्शन</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-bold">{u.name}</p>
                      <p className="text-xs text-gray-400">पिता: {u.fatherName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p>{u.phone}</p>
                      <p className="text-gray-400 text-xs">{u.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.city}, {u.state}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-society-blue text-sm font-bold hover:underline">एडिट</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4">सदस्य</th>
                  <th className="px-6 py-4">राशि</th>
                  <th className="px-6 py-4">प्रकार / माध्यम</th>
                  <th className="px-6 py-4">तारीख</th>
                  <th className="px-6 py-4">एक्शन</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.filter(p => !p.verified).map((p) => {
                  const user = users.find(u => u.id === p.userId);
                  return (
                    <tr key={p.id}>
                      <td className="px-6 py-4 font-bold">{user?.name}</td>
                      <td className="px-6 py-4 text-society-saffron font-bold">₹{p.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <p className="capitalize">{p.type}</p>
                        <p className="text-gray-400 text-xs">{p.method}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">{p.paidAt}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => verifyPayment(p.id)}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-green-200"
                        >
                          <CheckCircle size={14} /> वेरिफाई करें
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {payments.filter(p => !p.verified).length === 0 && (
              <div className="py-12 text-center text-gray-400">सभी भुगतान सत्यापित हैं।</div>
            )}
          </div>
        )}

        {activeTab === 'disbursements' && (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4">प्राप्तकर्ता</th>
                  <th className="px-6 py-4">राशि</th>
                  <th className="px-6 py-4">उद्देश्य</th>
                  <th className="px-6 py-4">तारीख</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {disbursements.map((d) => (
                  <tr key={d.id}>
                    <td className="px-6 py-4 font-bold">{d.recipientName}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">₹{d.amount}</td>
                    <td className="px-6 py-4 text-sm">{d.purpose}</td>
                    <td className="px-6 py-4 text-sm">{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Disbursement Modal */}
      {showDModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold text-society-blue mb-6">नया वितरण जोड़ें</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">प्राप्तकर्ता का नाम</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-society-blue"
                  onChange={(e) => setDForm({ ...dForm, recipientName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">राशि (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-society-blue"
                  onChange={(e) => setDForm({ ...dForm, amount: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">उद्देश्य</label>
                <select
                  className="w-full px-4 py-2 rounded-xl border outline-none bg-white"
                  onChange={(e) => setDForm({ ...dForm, purpose: e.target.value })}
                >
                  <option value="शिक्षा सहायता">शिक्षा सहायता</option>
                  <option value="स्वास्थ्य शिविर">स्वास्थ्य शिविर</option>
                  <option value="गरीब सहायता">गरीब सहायता</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowDModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50"
                >
                  कैंसिल
                </button>
                <button
                  onClick={() => {
                    addDisbursement(dForm);
                    setShowDModal(false);
                  }}
                  className="flex-1 bg-society-blue text-white px-4 py-3 rounded-xl font-bold hover:bg-opacity-90 shadow-lg"
                >
                  सेव करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
