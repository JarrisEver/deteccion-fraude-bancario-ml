import React, { useState, useMemo } from 'react';
import {
  BarChart2,
  TrendingUp,
  FileSpreadsheet,
  Search,
  Filter,
  Info,
  ChevronDown,
  HelpCircle,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Transaction, DatasetStats } from '../types/fraud';
import { INITIAL_TABLE_PREVIEW, parseCSVFile } from '../data/kaggleBenchmark';

interface ModuleDatosProps {
  stats: DatasetStats;
  customTransactions?: Transaction[] | null;
  onDatasetUpdate: (newStats: DatasetStats, customTransactions: Transaction[]) => void;
  onResetBenchmark: () => void;
}

export const ModuleDatos: React.FC<ModuleDatosProps> = ({
  stats,
  customTransactions,
  onDatasetUpdate,
  onResetBenchmark,
}) => {
  const [filterClass, setFilterClass] = useState<'all' | 'legit' | 'fraud'>('all');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scaleMode, setScaleMode] = useState<'log' | 'linear'>('log');
  const [showVariableGuide, setShowVariableGuide] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Datos para la tabla: usar transacciones cargadas o el dataset inicial
  const rawData = customTransactions && customTransactions.length > 0
    ? customTransactions
    : INITIAL_TABLE_PREVIEW;

  // Filtrado de datos
  const filteredData = useMemo(() => {
    return rawData.filter((row) => {
      if (filterClass === 'legit' && row.Class !== 0) return false;
      if (filterClass === 'fraud' && row.Class !== 1) return false;
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const amountMatch = row.Amount.toString().includes(query);
        const timeMatch = row.Time.toString().includes(query);
        const idMatch = row.id ? row.id.toString().includes(query) : false;
        if (!amountMatch && !timeMatch && !idMatch) return false;
      }
      return true;
    });
  }, [rawData, filterClass, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const displayedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(null);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = parseCSVFile(content);

      setIsUploading(false);
      if (res.success && res.stats && res.transactions) {
        setUploadSuccess(
          `Archivo cargado: ${res.totalRows?.toLocaleString()} transacciones procesadas.`
        );
        onDatasetUpdate(res.stats, res.transactions);
      } else {
        setUploadError(res.errorMessage || 'Error al procesar el archivo CSV.');
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      setUploadError('Error al leer el archivo desde el disco.');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      {/* 3-Column Visual Grid matching Image.png */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Card 1: Distribución de clases */}
        <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400">
                  <BarChart2 className="w-3.5 h-3.5" />
                </span>
                <span>Distribución de clases</span>
              </h2>

              <button
                onClick={() => setScaleMode(scaleMode === 'log' ? 'linear' : 'log')}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
                title="Alternar entre escala logarítmica y escala lineal"
              >
                {scaleMode === 'log' ? 'Escala Log (10ⁿ)' : 'Escala Lineal'}
              </button>
            </div>

            {/* Log Bar Chart */}
            <div className="h-48 relative flex items-end justify-center gap-10 pt-4 pb-2 px-6">
              {/* Y Axis Grid lines */}
              <div className="absolute left-1 top-2 bottom-6 flex flex-col justify-between text-[10px] font-mono text-slate-400 select-none">
                <span>10⁶</span>
                <span>10⁵</span>
                <span>10⁴</span>
                <span>10³</span>
                <span>10²</span>
                <span>10¹</span>
                <span>10⁰</span>
              </div>

              {/* Background grid lines */}
              <div className="absolute inset-x-8 top-3 bottom-6 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
                <div className="border-b border-slate-600 w-full" />
              </div>

              {/* Bar 1: Legítimas */}
              <div className="flex flex-col items-center gap-1.5 z-10 w-24">
                <span className="text-[11px] font-mono font-bold text-white tabular-nums">
                  {stats.legitimateCount.toLocaleString()}
                </span>
                <div
                  className="w-16 bg-blue-500 rounded-t-md transition-all duration-500 shadow-md shadow-blue-900/50"
                  style={{
                    height: scaleMode === 'log' ? '128px' : '135px',
                  }}
                />
                <div className="text-center pt-1">
                  <div className="text-xs font-semibold text-slate-200">Legítimas</div>
                  <div className="text-[10px] text-slate-400 font-mono">(Class = 0)</div>
                </div>
              </div>

              {/* Bar 2: Fraudes */}
              <div className="flex flex-col items-center gap-1.5 z-10 w-24">
                <span className="text-[11px] font-mono font-bold text-white tabular-nums">
                  {stats.fraudCount.toLocaleString()}
                </span>
                <div
                  className="w-16 bg-rose-500 rounded-t-md transition-all duration-500 shadow-md shadow-rose-900/50"
                  style={{
                    height: scaleMode === 'log' ? '64px' : '4px',
                  }}
                />
                <div className="text-center pt-1">
                  <div className="text-xs font-semibold text-rose-300">Fraudes</div>
                  <div className="text-[10px] text-slate-400 font-mono">(Class = 1)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center border-t border-slate-800/80 pt-2 font-medium">
            Desbalance severo: Solo <strong className="text-rose-400 font-mono">{stats.fraudPercentage}%</strong> de operaciones son fraudulentas.
          </div>
        </div>

        {/* Card 2: Distribución del monto (Amount) */}
        <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-600/30 flex items-center justify-center text-sky-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <span>Distribución del monto (Amount)</span>
              </h2>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                  <span>Legítimas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
                  <span>Fraudes</span>
                </div>
              </div>
            </div>

            {/* SVG Density Curve / Histogram */}
            <div className="h-48 w-full relative">
              <svg viewBox="0 0 320 180" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="legitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="40" y1="140" x2="310" y2="140" stroke="#334155" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="140" stroke="#334155" strokeWidth="1" />
                <line x1="40" y1="110" x2="310" y2="110" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="40" y1="80" x2="310" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="40" y1="50" x2="310" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="40" y1="20" x2="310" y2="20" stroke="#1E293B" strokeDasharray="3 3" />

                {/* Y-axis labels (Cantidad) */}
                <text x="34" y="24" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">50,000</text>
                <text x="34" y="54" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">40,000</text>
                <text x="34" y="84" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">30,000</text>
                <text x="34" y="114" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">20,000</text>
                <text x="34" y="142" fill="#94A3B8" fontSize="8" textAnchor="end" className="font-mono">0</text>
                <text x="12" y="80" fill="#64748B" fontSize="8" textAnchor="middle" transform="rotate(-90 12 80)">Cantidad</text>

                {/* X-axis labels (Monto euros) */}
                <text x="40" y="152" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">0</text>
                <text x="94" y="152" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">500</text>
                <text x="148" y="152" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">1,000</text>
                <text x="202" y="152" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">1,500</text>
                <text x="256" y="152" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">2,000</text>
                <text x="310" y="152" fill="#94A3B8" fontSize="8" textAnchor="middle" className="font-mono">2,500</text>
                <text x="175" y="165" fill="#64748B" fontSize="8" textAnchor="middle">Monto (euros)</text>

                {/* Blue Curve (Legítimas - Heavy concentration in 0-100€) */}
                <path
                  d="M 40 140 
                     L 45 32 
                     Q 52 24 58 48 
                     T 72 105 
                     T 94 130 
                     T 148 137 
                     T 202 138 
                     T 256 139 
                     T 310 140 
                     L 310 140 
                     L 40 140 Z"
                  fill="url(#legitGrad)"
                />
                <path
                  d="M 40 140 
                     L 45 32 
                     Q 52 24 58 48 
                     T 72 105 
                     T 94 130 
                     T 148 137 
                     T 202 138 
                     T 256 139 
                     T 310 140"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />

                {/* Red Curve (Fraudes - Lower peak, but proportionally flatter spread across 100-800€) */}
                <path
                  d="M 40 140 
                     L 43 118 
                     Q 52 110 65 116 
                     T 90 126 
                     T 130 134 
                     T 170 137 
                     T 220 138 
                     T 310 140 
                     L 310 140 
                     L 40 140 Z"
                  fill="url(#fraudGrad)"
                />
                <path
                  d="M 40 140 
                     L 43 118 
                     Q 52 110 65 116 
                     T 90 126 
                     T 130 134 
                     T 170 137 
                     T 220 138 
                     T 310 140"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center border-t border-slate-800/80 pt-2 font-medium">
            La mayoría de compras legítimas son menores a €100. Los fraudes abarcan montos de prueba y operaciones medianas.
          </div>
        </div>

        {/* Card 3: Vista previa de las transacciones */}
        <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-2.5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </span>
                <span>Vista previa de las transacciones</span>
              </h2>

              {/* Rows Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px]">Mostrar</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-white focus:outline-none"
                >
                  <option value={5}>5 filas</option>
                  <option value={10}>10 filas</option>
                  <option value={20}>20 filas</option>
                </select>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => { setFilterClass('all'); setCurrentPage(1); }}
                  className={`px-2 py-0.5 rounded font-medium transition-colors ${
                    filterClass === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => { setFilterClass('legit'); setCurrentPage(1); }}
                  className={`px-2 py-0.5 rounded font-medium transition-colors ${
                    filterClass === 'legit'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                  }`}
                >
                  Legítimas
                </button>
                <button
                  onClick={() => { setFilterClass('fraud'); setCurrentPage(1); }}
                  className={`px-2 py-0.5 rounded font-medium transition-colors ${
                    filterClass === 'fraud'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                  }`}
                >
                  Fraudes
                </button>
              </div>

              <span className="text-[10px] text-slate-400 font-mono">
                {filteredData.length} registros
              </span>
            </div>

            {/* Compact Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 max-h-[175px]">
              <table className="w-full text-left text-[11px] font-mono">
                <thead className="bg-[#0B152E] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 sticky top-0 z-10">
                  <tr>
                    <th className="py-1.5 px-2">Time</th>
                    <th className="py-1.5 px-2">V1</th>
                    <th className="py-1.5 px-2">V2</th>
                    <th className="py-1.5 px-2">V3</th>
                    <th className="py-1.5 px-2 text-right">Amount</th>
                    <th className="py-1.5 px-2 text-center">Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {displayedRows.map((tx, idx) => (
                    <tr
                      key={tx.id ?? idx}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        tx.Class === 1 ? 'bg-rose-950/20' : ''
                      }`}
                    >
                      <td className="py-1.5 px-2 text-slate-400 tabular-nums">{tx.Time}</td>
                      <td className="py-1.5 px-2 tabular-nums">{tx.V1?.toFixed(4)}</td>
                      <td className="py-1.5 px-2 tabular-nums">{tx.V2?.toFixed(4)}</td>
                      <td className="py-1.5 px-2 tabular-nums">{tx.V3?.toFixed(4)}</td>
                      <td className="py-1.5 px-2 text-right font-semibold tabular-nums text-white">
                        {tx.Amount?.toFixed(2)}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            tx.Class === 1
                              ? 'bg-rose-600 text-white'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          }`}
                        >
                          {tx.Class}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Pagination */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-30 hover:text-white"
              >
                Ant.
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-30 hover:text-white"
              >
                Sig.
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Información técnica de variables (sin inventar significados) */}
      <div className="bg-[#101C3D] border border-slate-800 rounded-xl p-3 text-xs">
        <button
          onClick={() => setShowVariableGuide(!showVariableGuide)}
          className="w-full flex items-center justify-between text-left text-slate-300 hover:text-white font-medium"
        >
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" />
            <span>Información sobre las variables del dataset (PCA, Time, Amount, Class)</span>
          </span>
          <span className="text-[11px] text-blue-400 underline">
            {showVariableGuide ? 'Ocultar detalles' : 'Ver descripción de variables'}
          </span>
        </button>

        {showVariableGuide && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 text-[11px]">
            <div>
              <strong className="text-white">Variables V1 a V28 (PCA):</strong>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                Son 28 componentes principales numéricos resultantes de una transformación PCA (Análisis de Componentes Principales)
                aplicada a los datos brutos por la Universidad Libre de Bruselas (ULB) para garantizar confidencialidad bancaria.
                No corresponden directamente a variables descriptivas como ciudad o comercio.
              </p>
            </div>
            <div>
              <strong className="text-white">Time, Amount y Class:</strong>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                <span className="text-blue-300 font-mono">Time</span>: Segundos transcurridos desde la primera transacción del dataset (abarca 48 horas).
                <br />
                <span className="text-blue-300 font-mono">Amount</span>: Monto de la transacción en Euros (€).
                <br />
                <span className="text-blue-300 font-mono">Class</span>: Etiqueta objetivo (0 = legítima, 1 = fraude).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
