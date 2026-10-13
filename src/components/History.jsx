import React from 'react';
import { ArrowLeft, Target, Trophy, Clock } from 'lucide-react';

export default function History({ setView }) {
  const areas = [
    { name: 'Cáncer de Próstata', score: 85, color: 'bg-emerald-500' },
    { name: 'Urología Pediátrica', score: 72, color: 'bg-emerald-400' },
    { name: 'Embriología y Anatomía', score: 60, color: 'bg-amber-500' },
    { name: 'Litiasis Urinaria', score: 45, color: 'bg-red-500' },
  ];

  const pastExams = [
    { date: '12 Oct 2026', score: 76, time: '24m' },
    { date: '05 Oct 2026', score: 68, time: '30m' },
    { date: '28 Sep 2026', score: 55, time: '35m' },
  ];

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <button onClick={() => setView('dashboard')} className="flex items-center text-slate-500 hover:text-uroblue-600 font-bold mb-6"><ArrowLeft className="w-4 h-4 mr-2"/> Volver</button>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-uroblue-100 text-uroblue-600 rounded-xl flex items-center justify-center"><Trophy className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-500 font-bold">Promedio Global</p><p className="text-2xl font-black">66.3%</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center"><Target className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-500 font-bold">Exámenes Realizados</p><p className="text-2xl font-black">3</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-500 font-bold">Tiempo Promedio</p><p className="text-2xl font-black">29m</p></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6">Desempeño por Área</h3>
          <div className="space-y-5">
            {areas.map(area => (
              <div key={area.name}>
                <div className="flex justify-between text-sm font-bold mb-1"><span>{area.name}</span><span className="text-slate-500">{area.score}%</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2.5"><div className={`${area.color} h-2.5 rounded-full`} style={{ width: `${area.score}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6">Historial de Simuladores</h3>
          <div className="space-y-4">
            {pastExams.map((exam, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50">
                <div><p className="font-bold text-slate-800">{exam.date}</p><p className="text-xs text-slate-500 font-medium">{exam.time} invertidos</p></div>
                <div className={`font-black text-lg ${exam.score >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>{exam.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}