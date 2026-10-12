import React, { useState } from 'react';
import preguntas from './data/preguntas.json';

export default function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Simulador Urológico - CONAMEU</h1>
        <div className="mb-4">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            {preguntas[preguntaActual].categoria}
          </span>
          <h2 className="text-xl mt-2 text-gray-800">{preguntas[preguntaActual].pregunta}</h2>
        </div>
        <div className="space-y-3 mt-6">
          {Object.entries(preguntas[preguntaActual].opciones).map(([key, value]) => (
            <button key={key} className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <span className="font-bold mr-2">{key})</span> {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}