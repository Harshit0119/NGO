
import React from 'react';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Wallet, Calendar } from 'lucide-react';

const Collections = () => {
  const { getStats, payments } = useStore();
  const stats = getStats();

  const yearlyCount = payments.filter(p => p.type === 'yearly' && p.verified).length;
  const monthlyCount = payments.filter(p => p.type === 'monthly' && p.verified).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold text-society-blue mb-2">वित्तीय विवरण (फंड कलेक्शन)</h1>
        <p className="text-gray-500">सोसाइटी में एकत्रित हुए फंड की पारदर्शिता और सारांश।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={24} /></div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-gray-500 text-sm mb-1">कुल पंजीकृत सदस्य</p>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalRegistered}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Wallet size={24} /></div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-gray-500 text-sm mb-1">कुल एकत्रित राशि</p>
          <h3 className="text-2xl font-bold text-gray-900">₹{stats.totalCollected}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Calendar size={24} /></div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Yearly</span>
          </div>
          <p className="text-gray-500 text-sm mb-1">वार्षिक भुगतान</p>
          <h3 className="text-2xl font-bold text-gray-900">{yearlyCount} सदस्य</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={24} /></div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Monthly</span>
          </div>
          <p className="text-gray-500 text-sm mb-1">मासिक भुगतान</p>
          <h3 className="text-2xl font-bold text-gray-900">{monthlyCount} सदस्य</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-society-blue mb-8">मासिक कलेक्शन रुझान</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {stats.monthlyBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === stats.monthlyBreakdown.length - 1 ? '#f97316' : '#1e3a8a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-society-blue text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-6">कलेक्शन सारांश</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <p className="text-gray-400 text-sm">कुल सक्रिय सदस्य</p>
                <p className="text-2xl font-bold">{stats.activeMembers}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">कलेक्शन प्रतिशत</p>
                <p className="text-lg font-bold">85%</p>
              </div>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <p className="text-gray-400 text-sm">औसत मासिक दान</p>
                <p className="text-2xl font-bold">₹1500</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed italic">
              "आपके द्वारा दी गई छोटी सी राशि भी किसी के जीवन में बड़ा बदलाव ला सकती है। धन्यवाद!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
