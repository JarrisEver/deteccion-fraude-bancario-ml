import React from 'react';
import { Database, CheckCircle2, AlertTriangle, PieChart, Shield, FileSpreadsheet } from 'lucide-react';
import { DatasetStats } from '../types/fraud';

interface ModuleResumenProps {
  stats: DatasetStats;
  isTrained: boolean;
}

export const ModuleResumen: React.FC<ModuleResumenProps> = ({ stats, isTrained }) => {
  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-[#101C3D] border border-slate-800 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight">
              Sistema Inteligente de Detección de Fraudes Bancarios
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Aplicación de Machine Learning supervisado mediante Random Forest
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 flex items-center gap-2 font-medium shadow-inner">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>{stats.sourceName}</span>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="bg-[#101C3D] border border-slate-800/90 rounded-xl p-4 flex items-center gap-4 shadow-md hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-900/30">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-blue-400 font-mono tabular-nums leading-tight">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Transacciones en total
            </div>
          </div>
        </div>

        {/* Card 2: Legítimas */}
        <div className="bg-[#101C3D] border border-slate-800/90 rounded-xl p-4 flex items-center gap-4 shadow-md hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-900/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums leading-tight">
              {stats.legitimateCount.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Transacciones legítimas <span className="text-slate-400 text-[11px] font-mono">(Class = 0)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Fraudes */}
        <div className="bg-[#101C3D] border border-slate-800/90 rounded-xl p-4 flex items-center gap-4 shadow-md hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-900/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-rose-400 font-mono tabular-nums leading-tight">
              {stats.fraudCount.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Transacciones fraudulentas <span className="text-slate-400 text-[11px] font-mono">(Class = 1)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Porcentaje */}
        <div className="bg-[#101C3D] border border-slate-800/90 rounded-xl p-4 flex items-center gap-4 shadow-md hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-900/30">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-sky-400 font-mono tabular-nums leading-tight">
              {stats.fraudPercentage}%
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Porcentaje de fraude
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
