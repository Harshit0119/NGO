
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Members = lazy(() => import('./pages/Members'));
const Collections = lazy(() => import('./pages/Collections'));
const Disbursements = lazy(() => import('./pages/Disbursements'));
const Admin = lazy(() => import('./pages/Admin'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-society-blue border-t-society-saffron rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/members" element={<Members />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/disbursements" element={<Disbursements />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div className="py-20 text-center">Page not found</div>} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
