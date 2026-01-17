
import React from 'react';
import { useStore } from '../store';
import { Search, MapPin, Calendar, FileText } from 'lucide-react';

const Members = () => {
  const { users, payments } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');

  const getMemberDetails = (userId: string) => {
    const userPayments = payments.filter(p => p.userId === userId && p.verified);
    const totalPaid = userPayments.reduce((sum, p) => sum + p.amount, 0);
    const lastPayment = userPayments.length > 0 
      ? userPayments.sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime())[0]
      : null;
    return { totalPaid, lastPaymentDate: lastPayment?.paidAt || '-' };
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Name', 'City', 'Join Date', 'Status', 'Total Paid'];
    const rows = filteredUsers.map(u => {
      const details = getMemberDetails(u.id);
      return [u.name, u.city, u.createdAt, u.status, details.totalPaid];
    });
    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "members.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-society-blue">हमारे सम्मानित सदस्य</h1>
          <p className="text-gray-500">समाज कल्याण सोसाइटी के साथ जुड़े सभी कर्मठ सदस्यों की सूची।</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
        >
          <FileText size={18} />
          CSV डाउनलोड करें
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="नाम या शहर से खोजें..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-society-blue/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-xl border border-gray-200 outline-none bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">सभी स्टेटस</option>
            <option value="Active">सक्रिय (Active)</option>
            <option value="Expired">अवधि समाप्त (Expired)</option>
            <option value="Pending">लंबित (Pending)</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
              <tr>
                <th className="px-6 py-4">सदस्य का नाम</th>
                <th className="px-6 py-4">स्थान</th>
                <th className="px-6 py-4">जुड़ने की तिथि</th>
                <th className="px-6 py-4">कुल योगदान</th>
                <th className="px-6 py-4">स्थिति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => {
                const details = getMemberDetails(user.id);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">ID: {user.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400" />
                        {user.city}, {user.state}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        {user.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-society-blue">
                      ₹{details.totalPaid}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    कोई सदस्य नहीं मिला।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;
