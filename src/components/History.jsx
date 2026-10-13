import React from 'react';
import { ArrowLeft, Trophy, Target } from 'lucide-react';

export default function History({ setView }) {
  return (
    <div className="max-w-4xl mx-auto fade-in">
      <button onClick={() => setView('dashboard')} className="flex items-center text-slate-500 hover:text-uroblue-600 font-bold mb-6"><ArrowLeft className="w-4 h-4 mr-2"/> Volver</button>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-uroblue-100 text-uroblue-600 rounded-xl flex items-center justify-center"><Trophy className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-500 font-bold">Promedio Global</p><p className="text-2xl font-black">-- %</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center"><Target className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-500 font-bold">Simuladores Realizados</p><p className="text-2xl font-black">0</p></div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center py-20">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Aún no hay datos suficientes</h3>
        <p className="text-slate-500">Realiza tu primer simulador para ver tus estadísticas y áreas de oportunidad.</p>
      </div>
    </div>
  );
}