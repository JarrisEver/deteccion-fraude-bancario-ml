import React, { useState, useEffect } from 'react';
import {
  Play,
  Search,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Upload,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
} from 'lucide-react';
import { Transaction, SimulationResult, DatasetStats } from '../types/fraud';
import { SIMULATOR_PRESETS, PresetTransaction, parseCSVFile } from '../data/kaggleBenchmark';
import { mlEngine } from '../ml/randomForestEngine';

interface ModuleSimuladorProps {
  threshold: number;
  isTrained: boolean;
  onDatasetUpdate: (newStats: DatasetStats, customTransactions: Transaction[]) => void;
}

export const ModuleSimulador: React.FC<ModuleSimuladorProps> = ({
  threshold,
  isTrained,
  onDatasetUpdate,
}) => {
  const [selectedExample, setSelectedExample] = useState<string>('preset_fraud_extreme_v14');

  // Valores de la transacción
  const [txData, setTxData] = useState<Transaction>(() => ({
    ...SIMULATOR_PRESETS[1].data,
    Time: 406,
    Amount: 150.00,
    V1: -1.2,
    V2: 0.5,
    V3: 1.1,
    V4: -0.3,
    V5: 0.8,
    V6: -1.5,
    V28: 0.2,
  }));

  const [showAllVariables, setShowAllVariables] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<SimulationResult | null>(() => {
    return isTrained ? mlEngine.predictTransaction({
      ...SIMULATOR_PRESETS[1].data,
      Time: 406,
      Amount: 150.00,
      V1: -1.2,
      V2: 0.5,
      V3: 1.1,
      V4: -0.3,
      V5: 0.8,
      V6: -1.5,
      V28: 0.2,
    }) : null;
  });

  // Re-evaluar predicción si cambia el umbral
  useEffect(() => {
    if (isTrained && txData) {
      const res = mlEngine.predictTransaction(txData);
      setPrediction(res);
    }
  }, [threshold, isTrained]);

  // Selección de preset
  const handlePresetSelect = (presetId: string) => {
    setSelectedExample(presetId);
    const preset = SIMULATOR_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const updated: Transaction = {
        ...preset.data,
        Time: preset.data.Time || 406,
        Amount: preset.data.Amount || 150.00,
      };
      setTxData(updated);
      if (isTrained) {
        setPrediction(mlEngine.predictTransaction(updated));
      }
    }
  };

  const handleInputChange = (field: keyof Transaction, val: number) => {
    setTxData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAnalyze = () => {
    if (!isTrained) return;
    const res = mlEngine.predictTransaction(txData);
    setPrediction(res);
  };

  // Cargar CSV
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = parseCSVFile(content);
      if (res.success && res.stats && res.transactions) {
        onDatasetUpdate(res.stats, res.transactions);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <span className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400">
          <Play className="w-4 h-4 fill-current" />
        </span>
        <h2 className="text-base font-bold text-white tracking-tight">
          Simulador de transacciones
        </h2>
      </div>

      {/* 3 Columns Grid matching Image.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Column 1: Ingresar datos de una transacción (col-span-5) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white">
              Ingresar datos de una transacción
            </h3>

            {/* Time & Amount */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Time (segundos)</label>
                <input
                  type="number"
                  value={txData.Time}
                  onChange={(e) => handleInputChange('Time', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Amount (euros)</label>
                <input
                  type="number"
                  step="0.01"
                  value={txData.Amount}
                  onChange={(e) => handleInputChange('Amount', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono font-semibold"
                />
              </div>
            </div>

            {/* Quick PCA row: V1, V2, V3, V4, V5, V6, ... V28 */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span>Variables predictoras (PCA)</span>
                <button
                  onClick={() => setShowAllVariables(!showAllVariables)}
                  className="text-blue-400 hover:text-blue-300 text-[10px] flex items-center gap-0.5"
                >
                  {showAllVariables ? 'Colapsar V1-V28' : 'Ver las 28 variables'}
                  {showAllVariables ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Inline input row matching image.png: V1, V2, V3, V4, V5, V6, ..., V28 */}
              <div className="grid grid-cols-7 gap-1.5 text-center font-mono">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V1</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V1 ?? -1.2}
                    onChange={(e) => handleInputChange('V1', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V2</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V2 ?? 0.5}
                    onChange={(e) => handleInputChange('V2', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V3</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V3 ?? 1.1}
                    onChange={(e) => handleInputChange('V3', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V4</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V4 ?? -0.3}
                    onChange={(e) => handleInputChange('V4', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V5</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V5 ?? 0.8}
                    onChange={(e) => handleInputChange('V5', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V6</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V6 ?? -1.5}
                    onChange={(e) => handleInputChange('V6', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">V28</span>
                  <input
                    type="number"
                    step="0.1"
                    value={txData.V28 ?? 0.2}
                    onChange={(e) => handleInputChange('V28', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded px-1 py-1 text-center text-[11px] text-white"
                  />
                </div>
              </div>

              {/* All 28 Variables Expanded Grid */}
              {showAllVariables && (
                <div className="mt-2 max-h-36 overflow-y-auto p-2 bg-slate-950/90 rounded border border-slate-800 grid grid-cols-4 gap-1.5 text-[10px] font-mono">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((num) => {
                    const key = `V${num}` as keyof Transaction;
                    return (
                      <div key={num} className="space-y-0.5">
                        <span className="text-slate-500 text-[9px]">V{num}</span>
                        <input
                          type="number"
                          step="0.1"
                          value={(txData as any)[key] ?? 0}
                          onChange={(e) => handleInputChange(key, parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1 py-0.5 text-slate-300 text-[10px]"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!isTrained}
            className="w-full py-2.5 px-4 rounded-lg font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-900/40 cursor-pointer mt-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Analizar transacción</span>
          </button>
        </div>

        {/* Column 2: Resultado de la predicción (col-span-4) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white">
              Resultado de la predicción
            </h3>

            {prediction ? (
              <>
                {/* Result Status Banner */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    {prediction.isFraud ? (
                      <AlertTriangle className="w-7 h-7 text-rose-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`text-sm font-bold ${prediction.isFraud ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {prediction.isFraud ? 'Sospechosa de fraude' : 'Transacción legítima'}
                      </h4>
                      <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                        Probabilidad de fraude: <strong className="text-white font-bold">{prediction.probability.toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Risk Progress Bar */}
                  <div className="relative pt-1">
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          prediction.isFraud
                            ? 'bg-rose-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.max(3, prediction.riskScore)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 absolute right-0 top-3">
                      {prediction.riskScore}%
                    </span>
                  </div>
                </div>

                {/* Principales factores (importancia de variables) */}
                <div className="space-y-1 pt-1 text-[11px]">
                  <div className="font-semibold text-slate-300">
                    Principales factores (importancia de variables):
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-slate-400 font-mono text-[10px]">
                    <li><span className="text-white">V14</span> (mayor contribución)</li>
                    <li><span className="text-white">V17</span></li>
                    <li><span className="text-white">Amount</span></li>
                    <li><span className="text-white">V12</span></li>
                  </ol>
                </div>
              </>
            ) : (
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 text-center">
                El modelo aún no ha sido entrenado. Entrena el modelo para habilitar la predicción.
              </div>
            )}
          </div>

          {/* Yellow/Amber Recommendation Box matching image.png */}
          <div className="bg-[#2E2813] border border-amber-600/40 rounded-lg p-2.5 flex items-start gap-2.5 text-xs text-amber-200">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Recomendación: </span>
              <span className="text-[11px] text-amber-100/90 leading-tight">
                {prediction?.isFraud
                  ? 'Revisar manualmente esta transacción y verificar con el titular.'
                  : 'Operación con bajo riesgo. Autorizar normalmente.'}
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Ejemplos de transacciones del dataset (col-span-3) */}
        <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white">
              Ejemplos de transacciones del dataset
            </h3>

            {/* Dropdown: Seleccionar ejemplo */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">Seleccionar ejemplo</label>
              <select
                value={selectedExample}
                onChange={(e) => handlePresetSelect(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              >
                <option value="preset_fraud_extreme_v14">Transacción fraudulenta (ejemplo)</option>
                <option value="preset_legit_coffee">Transacción legítima habitual</option>
                <option value="preset_fraud_night_quick">Fraude de monto moderado</option>
                <option value="preset_legit_high_amount">Compra legítima de alto monto</option>
                <option value="preset_borderline_case">Transacción en zona límite</option>
              </select>
            </div>

            {/* Button: Cargar mi propio CSV */}
            <label className="w-full py-2 px-3 rounded-lg border border-blue-500/80 bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
              <FileSpreadsheet className="w-4 h-4 text-blue-400" />
              <span>Cargar mi propio CSV</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Helper note */}
          <div className="text-[10px] text-slate-400 leading-tight pt-2 border-t border-slate-800/80">
            Formato requerido: mismo que el dataset de Kaggle. Columnas: Time, V1-V28, Amount, Class.
          </div>
        </div>
      </div>
    </div>
  );
};
