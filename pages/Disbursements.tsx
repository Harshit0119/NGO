
import React from 'react';
import { useStore } from '../store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HandHeart, Tag, Calendar, Info } from 'lucide-react';

const Disbursements = () => {
  const { disbursements, getStats } = useStore();
  const stats = getStats();
  const netBalance = stats.totalCollected - stats.totalDisbursed;

  const data = disbursements.reduce((acc: any[], d) => {
    const existing = acc.find(item => item.name === d.purpose);
    if (existing) {
      existing.value += d.amount;
    } else {
      acc.push({ name: d.purpose, value: d.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#1e3a8a', '#f97316', '#10b981', '#6366f1'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-society-blue">वितरण और खर्चे</h1>
          <p className="text-gray-500">एकत्रित फंड का कहाँ और कैसे उपयोग किया गया।</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">नेट बैलेंस</p>
            <p className="text-xl font-bold text-green-800">₹{netBalance}</p>
          </div>
          <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100">
            <p className="text-xs text-red-600 font-bold uppercase tracking-wider">कुल खर्च</p>
            <p className="text-xl font-bold text-red-800">₹{stats.totalDisbursed}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">वितरण सूची</h3>
          {disbursements.length > 0 ? disbursements.map((d) => (
            <div key={d.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-society-blue">
                  <HandHeart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{d.recipientName}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Tag size={12} /> {d.purpose}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} /> {d.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-society-saffron">₹{d.amount}</p>
                {d.notes && (
                  <button className="text-xs text-society-blue underline flex items-center gap-1 ml-auto">
                    <Info size={12} /> विवरण देखें
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="bg-gray-50 rounded-2xl py-12 text-center text-gray-400">
              अभी कोई वितरण विवरण उपलब्ध नहीं है।
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-society-blue mb-6">उपयोग का वर्गीकरण</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.length > 0 ? data : [{name: 'Empty', value: 1}]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(data.length > 0 ? data : [{name: 'Empty', value: 1}]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                  <span className="text-gray-600">{entry.name}</span>
                </div>
                <span className="font-bold text-gray-800">₹{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disbursements;
