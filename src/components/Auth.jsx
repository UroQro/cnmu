import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Stethoscope } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Credenciales incorrectas o el usuario ya existe.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-uroblue-900 p-8 text-center relative">
          <Stethoscope className="w-12 h-12 text-white mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-extrabold text-white tracking-tight">CONAMEU Prep</h2>
          <p className="text-uroblue-100 mt-2 text-sm font-medium">Plataforma Avanzada de Entrenamiento</p>
        </div>
        <div className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
              <input type="email" required className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-uroblue-500 focus:bg-white outline-none transition-all" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
              <input type="password" required className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-uroblue-500 focus:bg-white outline-none transition-all" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-uroblue-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-uroblue-700 transition-all shadow-md mt-4">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <button onClick={() => setIsLogin(!isLogin)} className="text-slate-500 hover:text-uroblue-600 font-semibold text-sm transition-colors">
              {isLogin ? '¿Nuevo residente? Crea tu cuenta aquí' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}