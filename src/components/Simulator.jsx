import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

export default function Simulator({ setView }) {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "preguntas"));
        const data = querySnapshot.docs.map(doc => doc.data());
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 30);
        setPreguntas(shuffled);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar preguntas:", error);
      }
    };
    fetchPreguntas();
  }, []);

  const handleAnswer = (key) => {
    if (isAnswered) return;
    setSelectedAns(key);
    setIsAnswered(true);
    if (key === preguntas[currentIdx].respuesta_correcta) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setCurrentIdx(i => i + 1);
    setSelectedAns(null);
    setIsAnswered(false);
  };

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin h-10 w-10 border-b-2 border-uroblue-600 rounded-full"></div></div>;
  if (preguntas.length === 0) return <div className="text-center p-20 font-bold text-slate-500">Aún no hay preguntas en la base de datos de Firebase. Sube el archivo JSON.</div>;

  if (currentIdx >= preguntas.length) {
    const calif = Math.round((score / preguntas.length) * 100);
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center mt-10 fade-in">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Simulación Completada</h2>
        <div className="relative w-48 h-48 mx-auto mb-8 mt-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className={`${calif >= 70 ? 'text-emerald-500' : 'text-amber-500'}`} strokeDasharray={`${calif}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-slate-800">{calif}%</div>
        </div>
        <p className="text-lg font-bold text-slate-700 mb-8">Acertaste {score} de {preguntas.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 px-6 py-3 bg-uroblue-600 text-white font-bold rounded-xl shadow-md">Ir al Menú <ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>
    );
  }

  const p = preguntas[currentIdx];
  const isCorrect = selectedAns === p.respuesta_correcta;

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
        <span className="bg-uroblue-50 text-uroblue-700 text-sm font-bold px-4 py-1.5 rounded-lg border border-uroblue-100">{p.categoria}</span>
        <div className="font-bold text-slate-400">Pregunta {currentIdx + 1} de {preguntas.length}</div>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-8">{p.pregunta}</h2>
        <div className="space-y-4">
          {Object.entries(p.opciones).map(([key, val]) => {
            let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ";
            let icon = null;
            if (!isAnswered) {
              btnClass += "border-slate-100 bg-slate-50 hover:border-uroblue-400 hover:bg-uroblue-50 cursor-pointer text-slate-700";
            } else {
              btnClass += "cursor-default ";
              if (key === p.respuesta_correcta) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm";
                icon = <Check className="w-5 h-5 text-emerald-600 ml-auto" />;
              } else if (key === selectedAns) {
                btnClass += "border-red-400 bg-red-50 text-red-900";
                icon = <X className="w-5 h-5 text-red-500 ml-auto" />;
              } else {
                btnClass += "border-slate-100 bg-slate-50 opacity-50";
              }
            }
            return (
              <button key={key} onClick={() => handleAnswer(key)} disabled={isAnswered} className={btnClass}>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 ${!isAnswered ? 'bg-white border border-slate-200 group-hover:text-uroblue-600' : key === p.respuesta_correcta ? 'bg-emerald-200 text-emerald-800' : key === selectedAns ? 'bg-red-200 text-red-800' : 'bg-slate-200'}`}>{key}</span>
                <span className="font-semibold leading-snug">{val}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>
      {isAnswered && (
        <div className={`p-6 rounded-2xl mb-6 shadow-sm border flex gap-4 fade-in-up ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
          <div className="shrink-0 mt-1">{isCorrect ? <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="text-emerald-600" /></div> : <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><X className="text-red-600" /></div>}</div>
          <div>
            <h4 className={`font-black text-lg mb-2 ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>{isCorrect ? '¡Correcto!' : `Incorrecto. Opción ${p.respuesta_correcta}`}</h4>
            <p className="font-medium opacity-80 text-slate-800">{p.justificacion}</p>
          </div>
        </div>
      )}
      {isAnswered && (
        <div className="flex justify-end fade-in">
          <button onClick={nextQuestion} className="flex items-center gap-2 bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-slate-900 shadow-md">
            {currentIdx + 1 === preguntas.length ? 'Finalizar' : 'Siguiente'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}