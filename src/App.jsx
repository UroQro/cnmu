import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Simulator from './components/Simulator';
import ErrorReview from './components/ErrorReview';
import History from './components/History';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uroblue-600"></div></div>;
  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-uroblue-100">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-8 h-8 bg-uroblue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">CONAMEU Prep</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-slate-500 hidden md:block">{user.email}</span>
          <button onClick={() => setCurrentView('dashboard')} className="text-sm font-semibold text-slate-600 hover:text-uroblue-600 transition-colors">Menú</button>
          <button onClick={() => auth.signOut()} className="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors">Salir</button>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6 mt-4">
        {currentView === 'dashboard' && <Dashboard setView={setCurrentView} />}
        {currentView === 'sim' && <Simulator setView={setCurrentView} user={user} />}
        {currentView === 'errors' && <ErrorReview setView={setCurrentView} />}
        {currentView === 'history' && <History setView={setCurrentView} />}
      </main>
    </div>
  );
}