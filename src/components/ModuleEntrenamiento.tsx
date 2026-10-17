import React from 'react';
import { Settings, Play, CheckCircle2, RefreshCw } from 'lucide-react';
import { TrainingConfig, EvaluationMetrics } from '../types/fraud';

interface ModuleEntrenamientoProps {
  config: TrainingConfig;
  onConfigChange: (newConfig: Partial<TrainingConfig>) => void;
  onThresholdChange: (newThreshold: number) => void;
  onTrainModel: () => Promise<void>;
  isTraining: boolean;
  trainingStep: number;
  trainingMessage: string;
  metrics: EvaluationMetrics | null;
  isTrained: boolean;
}

export const ModuleEntrenamiento: React.FC<ModuleEntrenamientoProps> = ({
  config,
  onConfigChange,
  onThresholdChange,
  onTrainModel,
  isTraining,
  trainingStep,
  trainingMessage,
  metrics,
  isTrained,
}) => {
  const stepsList = [
    'Cargando datos...',
    'Preprocesando...',
    'Dividiendo entrenamiento y prueba...',
    'Entrenando Random Forest...',
    'Evaluando modelo...',
    'Modelo entrenado correctamente.',
  ];

  return (
    <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 mb-4">
        <span className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400">
          <Settings className="w-4 h-4" />
        </span>
        <h2 className="text-base font-bold text-white tracking-tight">
          Entrenamiento del modelo
        </h2>
      </div>

      {/* 2-Column Subgrid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* Sub-column 1: Configuration Form */}
        <div className="space-y-3.5">
          {/* Algoritmo */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Algoritmo</label>
            <select
              disabled={isTraining}
              value={config.algorithm}
              onChange={(e) => onConfigChange({ algorithm: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="random_forest">Random Forest</option>
            </select>
          </div>

          {/* División de datos */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">División de datos</label>
            <select
              disabled={isTraining}
              value={config.testSplitRatio}
              onChange={(e) => onConfigChange({ testSplitRatio: parseFloat(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value={0.20}>80% entrenamiento - 20% prueba</option>
              <option value={0.30}>70% entrenamiento - 30% prueba</option>
            </select>
          </div>

          {/* Manejo de desbalance */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Manejo de desbalance</label>
            <select
              disabled={isTraining}
              value={config.imbalanceStrategy}
              onChange={(e) => onConfigChange({ imbalanceStrategy: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="class_weight_balanced">class_weight = &apos;balanced&apos;</option>
              <option value="undersampling">Submuestreo aleatorio</option>
              <option value="none">Sin balancear</option>
            </select>
          </div>

          {/* Umbral de clasificación */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Umbral de clasificación
              </label>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-blue-300 border border-slate-700/80 tabular-nums">
                {config.threshold.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.01"
              value={config.threshold}
              onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Blue Button: Entrenar modelo */}
          <button
            onClick={onTrainModel}
            disabled={isTraining}
            className="w-full mt-2 py-2.5 px-4 rounded-lg font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-900/40 cursor-pointer"
          >
            {isTraining ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Entrenando modelo...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Entrenar modelo</span>
              </>
            )}
          </button>
        </div>

        {/* Sub-column 2: Progress & Summary */}
        <div className="space-y-4">
          {/* Progreso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Progreso</span>
              <span className="font-mono text-emerald-400">
                {isTraining ? `${Math.min(95, Math.round((trainingStep / 6) * 100))}%` : isTrained ? '100%' : '0%'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{
                  width: isTraining ? `${(trainingStep / 6) * 100}%` : isTrained ? '100%' : '0%',
                }}
              />
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 pt-1">
              {stepsList.map((stepText, idx) => {
                const stepNum = idx + 1;
                const isFinished = isTrained || (!isTraining && isTrained) || (isTraining && trainingStep >= stepNum);
                const isCurrent = isTraining && trainingStep === stepNum;
                return (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    {isFinished ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span
                      className={`${
                        isFinished
                          ? 'text-slate-300'
                          : isCurrent
                          ? 'text-white font-semibold'
                          : 'text-slate-500'
                      }`}
                    >
                      {stepText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumen del entrenamiento */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs space-y-2">
            <div className="font-semibold text-white text-[11px] border-b border-slate-800 pb-1.5">
              Resumen del entrenamiento
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Registros de entrenamiento</span>
                <span className="text-white font-bold tabular-nums">
                  {metrics?.trainTotalCount.toLocaleString() ?? '227,846'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Registros de prueba</span>
                <span className="text-white font-bold tabular-nums">
                  {metrics?.testTotalCount.toLocaleString() ?? '56,961'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Fraudes en entrenamiento</span>
                <span className="text-rose-400 font-bold tabular-nums">
                  {metrics?.trainFraudCount ?? 393}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Fraudes en prueba</span>
                <span className="text-rose-400 font-bold tabular-nums">
                  {metrics?.testFraudCount ?? 99}
                </span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight">
              Parámetros principales:{' '}
              <span className="font-mono text-slate-300">
                n_estimators = 100, max_depth = None, class_weight = &apos;balanced&apos;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
