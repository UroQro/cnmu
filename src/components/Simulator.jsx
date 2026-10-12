import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/auth'; // Import updated for actual use: import { db } from '../firebase';
import preguntasDB from '../data/preguntas.json';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Simulator({ setView, user }) {
  const [preguntas, setPreguntas] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [errores, setErrores] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Tomar 30 preguntas aleatorias
    const shuffled = [...preguntasDB].sort(() => 0.5 - Math.random()).slice(0, 30);
    setPreguntas(shuffled);
  }, []);

  const handleAnswer = (key) => {
    if (isAnswered) return;
    setSelectedAns(key);
    setIsAnswered(true);
    
    const correct = key === preguntas[currentIdx].respuesta_correcta;
    if (correct) {
      setScore(s => s + 1);
    } else {
      setErrores(prev => [...prev, { ...preguntas[currentIdx], respuesta_usuario: key }]);
    }
  };

  const nextQuestion = async () => {
    if (currentIdx + 1 < preguntas.length) {
      setCurrentIdx(i => i + 1);
      setSelectedAns(null);
      setIsAnswered(false);
    } else {
      setFinished(true);
      // Aquí se enviaría el resultado a Firestore (db, 'users', user.uid, 'exams')
    }
  };

  if (preguntas.length === 0) return <div>Cargando simulador...</div>;

  if (finished) {
    const calif = Math.round((score / preguntas.length) * 100);
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
        <h2 className="text-3xl font-bold mb-4">Simulador Terminado</h2>
        <div className={`text-6xl font-black mb-6 ${calif >= 70 ? 'text-emerald-500' : 'text-red-500'}`}>{calif}%</div>
        <p className="text-lg mb-8">Acertaste {score} de {preguntas.length} preguntas.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setView('dashboard')} className="px-6 py-3 bg-slate-200 hover:bg-slate-300 font-bold rounded-lg transition-colors">Volver al Menú</button>
          <button onClick={() => setView('errors')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">Revisar Errores</button>
        </div>
      </div>
    );
  }

  const p = preguntas[currentIdx];
  const isCorrect = selectedAns === p.respuesta_correcta;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{p.categoria}</span>
        <span className="text-slate-500 font-medium">Pregunta {currentIdx + 1} / {preguntas.length}</span>
      </div>
      
      <h2 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">{p.pregunta}</h2>
      
      <div className="space-y-3 mb-8">
        {Object.entries(p.opciones).map(([key, val]) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
          if (!isAnswered) {
            btnClass += "border-slate-200 hover:border-blue-400 hover:bg-blue-50";
          } else {
            if (key === p.respuesta_correcta) btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
            else if (key === selectedAns) btnClass += "border-red-500 bg-red-50 text-red-900";
            else btnClass += "border-slate-200 opacity-50";
          }

          return (
            <button key={key} onClick={() => handleAnswer(key)} disabled={isAnswered} className={btnClass}>
              <span className="font-bold mr-3">{key})</span> {val}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`p-6 rounded-xl mb-6 flex gap-4 ${isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
          <div className="shrink-0 mt-1">
            {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">{isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta es ${p.respuesta_correcta}`}</h4>
            <p className="opacity-90 leading-relaxed">{p.justificacion}</p>
          </div>
        </div>
      )}

      {isAnswered && (
        <div className="flex justify-end">
          <button onClick={nextQuestion} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            {currentIdx + 1 === preguntas.length ? 'Finalizar Simulador' : 'Siguiente Pregunta'}
          </button>
        </div>
      )}
    </div>
  );
}