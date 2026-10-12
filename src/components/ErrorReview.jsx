import React from 'react';

export default function ErrorReview({ setView }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Repaso de Errores</h2>
      <div className="p-6 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 mb-6">
        <p className="font-medium">Módulo en construcción.</p>
        <p className="text-sm mt-2 opacity-80">Aquí se conectará Firestore para recuperar las preguntas falladas en simuladores anteriores, filtradas por categoría y con su justificación respectiva.</p>
      </div>
      <button onClick={() => setView('dashboard')} className="text-blue-600 font-medium hover:underline">← Volver al menú</button>
    </div>
  );
}