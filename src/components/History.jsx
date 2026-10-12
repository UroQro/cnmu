import React from 'react';

export default function History({ setView }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Historial y Desempeño</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-slate-50 border rounded-xl">
          <h3 className="font-bold text-slate-700 mb-2">Fortalezas</h3>
          <ul className="text-sm space-y-2 text-emerald-700">
            <li>• Cáncer de Próstata (85%)</li>
            <li>• Urología Pediátrica (80%)</li>
          </ul>
        </div>
        <div className="p-6 bg-slate-50 border rounded-xl">
          <h3 className="font-bold text-slate-700 mb-2">Áreas de Oportunidad</h3>
          <ul className="text-sm space-y-2 text-red-700">
            <li>• Tumores Renales (45%)</li>
            <li>• Litiasis (50%)</li>
          </ul>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-6 italic">Nota: Los datos dinámicos se calcularán a partir de los documentos guardados en Firestore al finalizar cada examen.</p>
      <button onClick={() => setView('dashboard')} className="text-blue-600 font-medium hover:underline">← Volver al menú</button>
    </div>
  );
}