import React, { useState } from 'react';
import preguntasDB from '../data/preguntas.json';
import { RotateCcw, Check, Brain, ArrowLeft } from 'lucide-react';

export default function ErrorReview({ setView }) {
  const [cards] = useState(preguntasDB.slice(0, 5)); // Simula preguntas falladas
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIdx < cards.length - 1) setCurrentIdx(i => i + 1);
    else setCurrentIdx(0); // Loop for demo
  };

  const currentCard = cards[currentIdx];

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setView('dashboard')} className="flex items-center text-slate-500 hover:text-uroblue-600 font-bold"><ArrowLeft className="w-4 h-4 mr-2"/> Volver</button>
        <span className="text-slate-400 font-bold">Tarjeta {currentIdx + 1} de {cards.length}</span>
      </div>

      <div className="relative w-full aspect-[4/3] perspective-1000">
        <div className={`w-full h-full absolute transition-all duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* FRONT */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center items-center text-center backface-hidden cursor-pointer hover:border-uroblue-300 transition-colors" onClick={() => setIsFlipped(true)}>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-6 absolute top-6">{currentCard.categoria}</span>
            <Brain className="w-12 h-12 text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 leading-relaxed">{currentCard.pregunta}</h2>
            <p className="absolute bottom-6 text-slate-400 font-medium text-sm animate-pulse">Haz clic para revelar la respuesta</p>
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 text-white">
            <div>
              <h3 className="text-emerald-400 font-black text-xl mb-4">Respuesta Correcta: {currentCard.respuesta_correcta}</h3>
              <p className="text-lg font-medium opacity-90 leading-relaxed mb-6">{currentCard.opciones[currentCard.respuesta_correcta]}</p>
              <div className="bg-slate-700 p-4 rounded-xl">
                <p className="text-sm leading-relaxed text-slate-300"><span className="font-bold text-white">Justificación:</span> {currentCard.justificacion}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <button onClick={nextCard} className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-colors">Otra vez</button>
              <button onClick={nextCard} className="bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white py-3 rounded-xl font-bold transition-colors">Difícil</button>
              <button onClick={nextCard} className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white py-3 rounded-xl font-bold transition-colors">Fácil</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}