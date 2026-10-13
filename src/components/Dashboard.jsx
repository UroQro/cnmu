import React from 'react';
import { Play, RotateCcw, BarChart2 } from 'lucide-react';

export default function Dashboard({ setView }) {
  const cards = [
    { id: 'sim', title: 'Generar Simulador', desc: 'Bloque de 30 preguntas aleatorias con retroalimentación en tiempo real.', icon: <Play className="w-6 h-6" />, color: 'bg-uroblue-600', hover: 'hover:border-uroblue-600' },
    { id: 'errors', title: 'Repaso de Errores', desc: 'Vuelve a intentar las preguntas que has fallado históricamente.', icon: <RotateCcw className="w-6 h-6" />, color: 'bg-amber-500', hover: 'hover:border-amber-500' },
    { id: 'history', title: 'Desempeño Global', desc: 'Métricas de rendimiento desglosadas por áreas de especialidad.', icon: <BarChart2 className="w-6 h-6" />, color: 'bg-emerald-500', hover: 'hover:border-emerald-500' }
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Bienvenido al Simulador</h2>
        <p className="text-slate-500 mt-2 font-medium">Selecciona un módulo para comenzar tu sesión de estudio de hoy.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(card => (
          <button key={card.id} onClick={() => setView(card.id)} className={`group bg-white p-6 rounded-2xl border-2 border-slate-100 ${card.hover} shadow-sm hover:shadow-md transition-all text-left flex flex-col`}>
            <div className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}