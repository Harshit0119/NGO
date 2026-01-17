
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store';
import { User, PaymentMethod, PaymentType } from '../types';
import { CheckCircle2, Clipboard, ShieldCheck, CreditCard } from 'lucide-react';

const Register = () => {
  const { addUser, addPayment } = useStore();
  const [step, setStep] = React.useState<'form' | 'payment' | 'success'>('form');
  const [registeredUser, setRegisteredUser] = React.useState<User | null>(null);
  const [payAmount, setPayAmount] = React.useState<number>(100);
  const [copied, setCopied] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Omit<User, 'id' | 'createdAt' | 'status'>>();

  const onSubmit = (data: any) => {
    const user = addUser(data);
    setRegisteredUser(user);
    setStep('payment');
  };

  const handlePayment = (method: PaymentMethod) => {
    if (registeredUser) {
      addPayment({
        userId: registeredUser.id,
        amount: payAmount,
        type: payAmount >= 1200 ? 'yearly' : 'monthly',
        method,
        reference: method === 'UPI' ? 'UPI-PENDING-' + Date.now() : ''
      });
      setStep('success');
    }
  };

  const copyUPI = () => {
    navigator.clipboard.writeText('society@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-society-blue mb-4">पंजीकरण सफल!</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          धन्यवाद, {registeredUser?.name}! आपका पंजीकरण अनुरोध प्राप्त हो गया है। एडमिन द्वारा आपके भुगतान की पुष्टि होने के बाद आपकी सदस्यता सक्रिय हो जाएगी।
        </p>
        <button
          onClick={() => window.location.href = '#/'}
          className="bg-society-blue text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90"
        >
          होम पेज पर जाएं
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {step === 'form' && (
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-society-blue mb-2 text-center">सदस्यता पंजीकरण</h2>
            <p className="text-gray-500 text-center mb-10">कृपया अपनी जानकारी सही-सही भरें।</p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">पूरा नाम*</label>
                <input
                  {...register('name', { required: 'नाम अनिवार्य है' })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                  placeholder="उदा. राहुल कुमार"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">जन्म तिथि*</label>
                <input
                  type="date"
                  {...register('dob', { required: 'जन्म तिथि अनिवार्य है' })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                />
                {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">पिता का नाम*</label>
                <input
                  {...register('fatherName', { required: 'पिता का नाम अनिवार्य है' })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                  placeholder="पिता का नाम"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">मोबाइल नंबर*</label>
                <input
                  {...register('phone', { required: 'मोबाइल नंबर अनिवार्य है', pattern: { value: /^[0-9]{10}$/, message: '10 अंकों का मान्य नंबर डालें' } })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                  placeholder="98XXXXXXXX"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-semibold text-gray-700">पता*</label>
                <textarea
                  {...register('address', { required: 'पता अनिवार्य है' })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                  rows={2}
                  placeholder="मकान नंबर, गली, क्षेत्र..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">शहर*</label>
                <input
                  {...register('city', { required: 'शहर अनिवार्य है' })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">पिनकोड*</label>
                <input
                  {...register('pincode', { required: 'पिनकोड अनिवार्य है' })}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">आधार कार्ड (वैकल्पिक)</label>
                <input
                  {...register('aadhaar')}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                  placeholder="XXXX XXXX XXXX"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">व्यवसाय</label>
                <input
                  {...register('occupation')}
                  className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-society-blue outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-society-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
                >
                  पंजीकरण पूरा करें
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'payment' && (
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-society-blue mb-6">भुगतान विकल्प चुनें</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <button
                onClick={() => setPayAmount(100)}
                className={`p-6 rounded-2xl border-2 transition-all ${payAmount === 100 ? 'border-society-blue bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <p className="text-xl font-bold mb-1">₹100 / माह</p>
                <p className="text-sm text-gray-500">मासिक सदस्यता</p>
              </button>
              <button
                onClick={() => setPayAmount(1200)}
                className={`p-6 rounded-2xl border-2 transition-all ${payAmount === 1200 ? 'border-society-blue bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <p className="text-xl font-bold mb-1">₹1200 / वर्ष</p>
                <p className="text-sm text-gray-500">वार्षिक सदस्यता (अनुशंसित)</p>
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200 inline-block w-full max-w-sm">
              <div className="flex justify-center mb-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=society@upi&pn=Samaj%20Kalyan%20Society&am=100" alt="UPI QR" className="rounded-lg shadow-sm" />
              </div>
              <p className="text-xs text-gray-400 mb-3">स्कैन करके ₹{payAmount} का भुगतान करें</p>
              <div className="flex items-center justify-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300">
                <span className="font-mono text-society-blue font-bold">society@upi</span>
                <button onClick={copyUPI} className="text-gray-400 hover:text-society-blue">
                  <Clipboard size={18} />
                </button>
              </div>
              {copied && <p className="text-xs text-society-saffron mt-2 font-medium">UPI आईडी कॉपी की गई!</p>}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handlePayment('UPI')}
                className="w-full bg-society-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
              >
                <CreditCard size={20} />
                मैंने भुगतान कर दिया है
              </button>
              <button
                onClick={() => handlePayment('Cash')}
                className="text-gray-500 hover:text-society-blue text-sm font-medium"
              >
                कैश (नकद) भुगतान के लिए एडमिन से मिलें
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <ShieldCheck size={14} />
              आपका डेटा सुरक्षित है
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
