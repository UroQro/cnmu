import React from 'react';
import { PlayCircle, AlertTriangle, BarChart3 } from 'lucide-react';

export default function Dashboard({ setView }) {
  const options = [
    { id: 'sim', title: 'Generar Simulador', desc: 'Examen de 30 preguntas aleatorias con retroalimentación inmediata.', icon: <PlayCircle className="w-8 h-8 text-blue-500" />, color: 'border-blue-200 hover:border-blue-500' },
    { id: 'errors', title: 'Repasar Errores', desc: 'Revisa las preguntas que has fallado y su justificación.', icon: <AlertTriangle className="w-8 h-8 text-amber-500" />, color: 'border-amber-200 hover:border-amber-500' },
    { id: 'history', title: 'Historial de Resultados', desc: 'Analiza tu progreso, áreas de fortaleza y debilidad.', icon: <BarChart3 className="w-8 h-8 text-emerald-500" />, color: 'border-emerald-200 hover:border-emerald-500' }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Panel de Entrenamiento</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {options.map(opt => (
          <button key={opt.id} onClick={() => setView(opt.id)} className={`bg-white p-6 rounded-xl border-2 transition-all duration-200 text-left flex flex-col items-start gap-4 shadow-sm hover:shadow-md ${opt.color}`}>
            <div className="p-3 bg-slate-50 rounded-lg">{opt.icon}</div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">{opt.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}