import React from 'react';
import {
  Target,
  BarChart3,
  CheckCircle2,
  Share2,
  Gauge,
  Settings,
  Info,
} from 'lucide-react';
import { EvaluationMetrics, PRCurvePoint } from '../types/fraud';

interface ModuleResultadosProps {
  metrics: EvaluationMetrics;
  prPoints: PRCurvePoint[];
}

export const ModuleResultados: React.FC<ModuleResultadosProps> = ({
  metrics,
  prPoints,
}) => {
  const cm = metrics.confusionMatrix;

  return (
    <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400">
            <Settings className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-white tracking-tight">
            Métricas de evaluación
          </h2>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Umbral: <span className="text-blue-400 font-bold">τ = {metrics.threshold.toFixed(2)}</span>
        </div>
      </div>

      {/* 5 Metric Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
        {/* AUPRC - Highlighted Gold Standard */}
        <div className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-3 flex items-center gap-3 shadow-inner">
          <div className="w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white font-mono tabular-nums leading-tight">
              {metrics.auprc.toFixed(3)}
            </div>
            <div className="text-[10px] font-semibold text-purple-300 mt-0.5 leading-tight">
              AUPRC
              <br />
              <span className="text-[9px] text-slate-400 font-normal">(Precision-Recall)</span>
            </div>
          </div>
        </div>

        {/* Precision */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white font-mono tabular-nums leading-tight">
              {metrics.precision.toFixed(3)}
            </div>
            <div className="text-[10px] font-semibold text-slate-300 mt-0.5">
              Precisión
            </div>
          </div>
        </div>

        {/* Recall */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white font-mono tabular-nums leading-tight">
              {metrics.recall.toFixed(3)}
            </div>
            <div className="text-[10px] font-semibold text-slate-300 mt-0.5">
              Recall
            </div>
          </div>
        </div>

        {/* F1-score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-orange-400 font-mono tabular-nums leading-tight">
              {metrics.f1Score.toFixed(3)}
            </div>
            <div className="text-[10px] font-semibold text-slate-300 mt-0.5">
              F1-score
            </div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-9 h-9 rounded-lg bg-slate-700/30 border border-slate-600/40 flex items-center justify-center text-slate-400 shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-300 font-mono tabular-nums leading-tight">
              {metrics.accuracy.toFixed(3)}
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-0.5">
              Accuracy <span className="text-[9px] text-slate-500 font-normal">(referencia)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Subcomponents Side by Side: Matriz de confusión + Curva Precision-Recall */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Subcomponent 1: Matriz de confusión */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="font-semibold text-white text-xs mb-3 flex items-center justify-between">
              <span>Matriz de confusión</span>
              <span className="text-[10px] text-slate-400 font-normal">Datos de prueba</span>
            </div>

            {/* 2x2 Heatmap Layout */}
            <div className="text-xs font-mono">
              {/* Header: Columns (Predicha) */}
              <div className="grid grid-cols-12 gap-1.5 text-center text-[10px] font-sans font-semibold text-slate-400 mb-1">
                <div className="col-span-3"></div>
                <div className="col-span-4 text-slate-300">Legítima (0)</div>
                <div className="col-span-5 text-slate-300">Fraude (1)</div>
              </div>

              {/* Row 1: Real Legítima */}
              <div className="grid grid-cols-12 gap-1.5 items-stretch mb-1.5">
                <div className="col-span-3 flex items-center justify-end pr-1 text-[11px] font-sans font-medium text-slate-300">
                  Legítima (0)
                </div>
                {/* TN (56,815) - Deep Blue */}
                <div
                  className="col-span-4 bg-[#0A3266] border border-blue-600/40 rounded-lg p-2.5 text-center text-white flex flex-col justify-center shadow-inner"
                  title="Verdadero Negativo (TN): Transacciones legítimas autorizadas con éxito"
                >
                  <span className="text-base font-bold tabular-nums">
                    {cm.trueNegatives.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-sans text-blue-200 mt-0.5">VN</span>
                </div>
                {/* FP (47) - Light Blue/White with dark text */}
                <div
                  className="col-span-5 bg-[#C5DCFA] border border-blue-300 rounded-lg p-2.5 text-center text-slate-900 flex flex-col justify-center"
                  title="Falso Positivo (FP): Falsa alarma, cliente legítimo bloqueado erróneamente"
                >
                  <span className="text-base font-bold tabular-nums">
                    {cm.falsePositives.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-sans text-slate-800 mt-0.5 font-semibold">FP (Falsa alarma)</span>
                </div>
              </div>

              {/* Row 2: Real Fraude */}
              <div className="grid grid-cols-12 gap-1.5 items-stretch">
                <div className="col-span-3 flex items-center justify-end pr-1 text-[11px] font-sans font-medium text-slate-300">
                  Fraude (1)
                </div>
                {/* FN (17) - Light Blue/White with dark text */}
                <div
                  className="col-span-4 bg-[#C5DCFA] border border-blue-300 rounded-lg p-2.5 text-center text-slate-900 flex flex-col justify-center"
                  title="Falso Negativo (FN): Fraude omitido por el modelo (pérdida económica)"
                >
                  <span className="text-base font-bold tabular-nums">
                    {cm.falseNegatives.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-sans text-slate-800 mt-0.5 font-semibold">FN (No detectado)</span>
                </div>
                {/* TP (82) - Bright Red */}
                <div
                  className="col-span-5 bg-[#DC2626] border border-red-500 rounded-lg p-2.5 text-center text-white flex flex-col justify-center shadow-md shadow-red-950/40"
                  title="Verdadero Positivo (TP): Fraude detectado e interceptado a tiempo"
                >
                  <span className="text-base font-bold tabular-nums">
                    {cm.truePositives.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-sans text-white/95 mt-0.5 font-semibold">VP (Fraude OK)</span>
                </div>
              </div>

              <div className="text-center text-[10px] font-sans text-slate-400 mt-1.5">
                Predicha
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400 space-y-0.5">
            <div><strong className="text-slate-300">FP (Falsas alarmas):</strong> Compras legítimas bloqueadas.</div>
            <div><strong className="text-rose-400">FN (Pérdidas):</strong> Fraudes que superaron los controles.</div>
          </div>
        </div>

        {/* Subcomponent 2: Curva Precision-Recall */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="font-semibold text-white text-xs mb-1.5 flex items-center justify-between">
              <span>Curva Precision-Recall</span>
              <span className="text-[10px] font-mono text-purple-300">AUPRC = {metrics.auprc}</span>
            </div>

            {/* SVG Plot matching Image.png */}
            <div className="w-full h-44 relative bg-[#0B152E] rounded-lg p-2 border border-slate-800">
              <svg viewBox="0 0 260 160" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                <line x1="32" y1="130" x2="250" y2="130" stroke="#334155" strokeWidth="1" />
                <line x1="32" y1="15" x2="32" y2="130" stroke="#334155" strokeWidth="1" />
                <line x1="32" y1="107" x2="250" y2="107" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="32" y1="84" x2="250" y2="84" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="32" y1="61" x2="250" y2="61" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="32" y1="38" x2="250" y2="38" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="32" y1="15" x2="250" y2="15" stroke="#1E293B" strokeDasharray="3 3" />

                {/* Y Axis Labels (Precisión) */}
                <text x="26" y="18" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">1.0</text>
                <text x="26" y="41" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">0.8</text>
                <text x="26" y="64" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">0.6</text>
                <text x="26" y="87" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">0.4</text>
                <text x="26" y="110" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">0.2</text>
                <text x="26" y="133" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">0.0</text>
                <text x="12" y="75" fill="#64748B" fontSize="8" textAnchor="middle" transform="rotate(-90 12 75)">Precisión</text>

                {/* X Axis Labels (Recall) */}
                <text x="32" y="142" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">0.0</text>
                <text x="86" y="142" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">0.5</text>
                <text x="140" y="142" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">0.6</text>
                <text x="194" y="142" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">0.8</text>
                <text x="248" y="142" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">1.0</text>
                <text x="140" y="154" fill="#64748B" fontSize="8" textAnchor="middle">Recall</text>

                {/* Red Dashed Trivial Baseline Line (AUPRC = 0.0017 near 0.0) */}
                <line
                  x1="32"
                  y1="128"
                  x2="250"
                  y2="128"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Shaded Area under PR Curve */}
                <path
                  d="M 32 18 
                     L 140 22 
                     Q 185 28 215 50 
                     T 238 90 
                     T 248 115 
                     L 248 130 
                     L 32 130 Z"
                  fill="#3B82F6"
                  fillOpacity="0.18"
                />

                {/* Blue Curve */}
                <path
                  d="M 32 18 
                     L 140 22 
                     Q 185 28 215 50 
                     T 238 90 
                     T 248 115"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-2 text-[10px] flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-blue-500 rounded inline-block" />
              <span className="text-slate-300">Random Forest (AUPRC = {metrics.auprc})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 border-t border-dashed border-red-500 inline-block" />
              <span>Clasificador trivial (AUPRC = 0.0017)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
