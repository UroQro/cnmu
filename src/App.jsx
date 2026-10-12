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
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, sim, errors, history
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-900 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          CONAMEU Prep
        </h1>
        <div className="flex gap-4">
          <button onClick={() => setCurrentView('dashboard')} className="text-slate-600 hover:text-blue-600 font-medium">Menú</button>
          <button onClick={() => auth.signOut()} className="text-red-600 hover:text-red-800 font-medium">Salir</button>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto p-6">
        {currentView === 'dashboard' && <Dashboard setView={setCurrentView} />}
        {currentView === 'sim' && <Simulator setView={setCurrentView} user={user} />}
        {currentView === 'errors' && <ErrorReview setView={setCurrentView} user={user} />}
        {currentView === 'history' && <History setView={setCurrentView} user={user} />}
      </main>
    </div>
  );
}