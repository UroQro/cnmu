import React, { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function ErrorReview({ setView }) {
  const [isFlipped, setIsFlipped] = useState(false);
  // Datos estáticos para demo, luego se conectará a Firebase
  const currentCard = {
    categoria: "Oncología", pregunta: "¿Subtipo histológico más común del carcinoma de células renales?",
    respuesta_correcta: "C", opciones: { C: "Células claras" }, justificacion: "Representa aprox. el 75-80% de los casos."
  };

  return (
    <div className="max-w-xl mx-auto fade-in">
      <button onClick={() => setView('dashboard')} className="flex items-center text-slate-500 hover:text-uroblue-600 font-bold mb-6"><ArrowLeft className="w-4 h-4 mr-2"/> Volver</button>
      <div className="relative w-full aspect-[4/3] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`w-full h-full absolute transition-all duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* FRONT */}
          <div className="absolute w-full h-full bg-white rounded-3xl shadow-md border border-slate-200 p-10 flex flex-col justify-center items-center text-center backface-hidden">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full absolute top-8">{currentCard.categoria}</span>
            <RotateCcw className="w-12 h-12 text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-800">{currentCard.pregunta}</h2>
            <p className="absolute bottom-8 text-slate-400 font-bold text-sm animate-pulse">Clic para revelar</p>
          </div>
          {/* BACK */}
          <div className="absolute w-full h-full bg-slate-800 rounded-3xl shadow-xl p-10 flex flex-col justify-center text-center backface-hidden rotate-y-180">
            <h3 className="text-emerald-400 font-black text-2xl mb-4">Respuesta: {currentCard.opciones[currentCard.respuesta_correcta]}</h3>
            <p className="text-slate-300 font-medium leading-relaxed">{currentCard.justificacion}</p>
            <div className="absolute bottom-8 left-0 w-full flex justify-center gap-4 px-8">
               <span className="text-slate-400 text-sm">Clic para volver a ocultar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}