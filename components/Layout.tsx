
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Users, LineChart, HandHeart, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useStore } from '../store';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { auth, logout } = useStore();

  const navLinks = [
    { name: 'होम', path: '/' },
    { name: 'पंजीकरण', path: '/register' },
    { name: 'सदस्य', path: '/members' },
    { name: 'फंड कलेक्शन', path: '/collections' },
    { name: 'वितरण विवरण', path: '/disbursements' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-society-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                SKS
              </div>
              <span className="text-society-blue font-bold text-lg hidden sm:block">समाज कल्याण सोसाइटी</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'text-society-saffron font-bold border-b-2 border-society-saffron'
                    : 'text-gray-600 hover:text-society-blue'
                } transition-colors px-1 py-2 text-sm font-medium`}
              >
                {link.name}
              </Link>
            ))}
            {auth.isAdmin ? (
              <button
                onClick={logout}
                className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
              >
                लॉगआउट
              </button>
            ) : (
              <Link
                to="/admin"
                className="bg-society-blue text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                <ShieldCheck size={18} />
                एडमिन
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-society-blue"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-society-blue hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-society-blue font-bold"
            >
              एडमिन लॉगिन
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-society-blue text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-society-blue font-bold">S</div>
              <h3 className="text-xl font-bold">समाज कल्याण सोसाइटी</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              हमारा लक्ष्य समाज के हर जरूरतमंद व्यक्ति तक पहुँच बनाना और उनके जीवन में सकारात्मक परिवर्तन लाना है। सेवा ही हमारा परम धर्म है।
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-society-saffron">त्वरित लिंक</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/register" className="hover:text-white transition-colors">पंजीकरण करें</Link></li>
              <li><Link to="/members" className="hover:text-white transition-colors">सदस्यों की सूची</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">वित्तीय पारदर्शिता</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">प्रशासक लॉगिन</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-society-saffron">संपर्क करें</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>{CONTACT_INFO.address}</li>
              <li>फोन: {CONTACT_INFO.phone}</li>
              <li>ईमेल: {CONTACT_INFO.email}</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} समाज कल्याण सोसाइटी। सर्वाधिकार सुरक्षित।</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
