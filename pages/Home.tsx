
import React from 'react';
import { Link } from 'react-router-dom';
// Fix: Import missing LineChart and HandHeart icons
import { Heart, Users, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2, LineChart, HandHeart } from 'lucide-react';
import { WaveBackground } from '../constants.tsx';
import { useStore } from '../store';

const StatBox = ({ icon: Icon, label, value, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
    <div className={`p-3 rounded-full mb-4 ${colorClass}`}>
      <Icon size={32} />
    </div>
    <span className="text-3xl font-bold text-gray-900 mb-1">{value}</span>
    <span className="text-gray-500 text-sm">{label}</span>
  </div>
);

const Home = () => {
  const { getStats } = useStore();
  const stats = getStats();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <WaveBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left duration-700">
              <span className="inline-block py-1 px-4 rounded-full bg-society-saffron/10 text-society-saffron font-semibold text-sm mb-4">
                सेवा ही धर्म है
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-society-blue leading-tight mb-6">
                समाज कल्याण के लिए <br />
                <span className="text-society-saffron">एक सार्थक कदम</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                समाज कल्याण सोसाइटी के साथ जुड़ें और उन लोगों के जीवन में उजाला लाएं जिन्हें आपकी सबसे ज्यादा जरूरत है। हमारी सदस्यता लेकर आप निरंतर बदलाव का हिस्सा बन सकते हैं।
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-society-blue text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-society-blue/30 hover:bg-society-blue/90 transition-all flex items-center gap-2 group"
                >
                  सदस्य बनें
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/collections"
                  className="bg-white text-society-blue border-2 border-society-blue px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all"
                >
                  हमारी प्रगति
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative animate-in zoom-in duration-1000">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="NGO Impact"
                className="rounded-3xl shadow-2xl relative z-10 border-8 border-white"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Heart className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-society-blue">100% पारदर्शिता</p>
                  <p className="text-xs text-gray-500">हर पैसा सीधे विकास के लिए</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-society-blue mb-4">हमारा प्रभाव</h2>
            <p className="text-gray-600">आपके सहयोग से हमने अब तक ये आंकड़े छुए हैं</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBox icon={Users} label="कुल सदस्य" value={stats.totalRegistered} colorClass="bg-blue-100 text-blue-600" />
            <StatBox icon={Heart} label="सक्रिय सदस्य" value={stats.activeMembers} colorClass="bg-red-100 text-red-600" />
            <StatBox icon={LineChart} label="कुल कलेक्शन" value={`₹${stats.totalCollected}`} colorClass="bg-green-100 text-green-600" />
            <StatBox icon={HandHeart} label="कुल वितरण" value={`₹${stats.totalDisbursed}`} colorClass="bg-orange-100 text-orange-600" />
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "शिक्षा सहायता", desc: "गरीब बच्चों की स्कूल फीस और किताबों का प्रबंध करना।" },
                  { title: "स्वास्थ्य शिविर", desc: "नियमित अंतराल पर स्वास्थ्य जांच और मुफ्त दवाओं का वितरण।" },
                  { title: "गरीब सहायता", desc: "जरूरतमंद परिवारों को राशन और बुनियादी सुविधाएं प्रदान करना।" },
                  { title: "आपातकालीन मदद", desc: "प्राकृतिक आपदाओं या व्यक्तिगत आपात स्थिति में तत्काल सहायता।" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-society-saffron/30 hover:shadow-md transition-all group">
                    <div className="bg-society-blue/5 p-3 rounded-lg group-hover:bg-society-saffron/10 transition-colors">
                      <CheckCircle2 className="text-society-blue group-hover:text-society-saffron" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-society-blue mb-6">हम क्या करते हैं?</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                समाज कल्याण सोसाइटी मुख्य रूप से शिक्षा, स्वास्थ्य और सामाजिक सुरक्षा के क्षेत्रों में काम करती है। हम यह सुनिश्चित करते हैं कि आपका अंशदान सीधे उस व्यक्ति तक पहुँचे जिसे इसकी सबसे अधिक आवश्यकता है।
              </p>
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Volunteers"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-society-blue text-white overflow-hidden relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
          <div className="space-y-6">
            {[
              { q: "क्या मैं मासिक सदस्य बन सकता हूँ?", a: "हाँ, आप मात्र ₹100 प्रति माह के अंशदान से सदस्य बन सकते हैं।" },
              { q: "मेरा पैसा कहाँ खर्च किया जाता है?", a: "हमारा 100% फंड शिक्षा, स्वास्थ्य और गरीबों की सहायता के लिए इस्तेमाल होता है। आप वेबसाइट पर 'वितरण विवरण' देख सकते हैं।" },
              { q: "क्या मुझे दान की रसीद मिलेगी?", a: "हाँ, हर भुगतान के बाद आपको एक डिजिटल रसीद और पोर्टल पर अपडेट प्राप्त होगा।" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <HelpCircle className="text-society-saffron" size={20} />
                  {item.q}
                </h4>
                <p className="text-gray-300 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
