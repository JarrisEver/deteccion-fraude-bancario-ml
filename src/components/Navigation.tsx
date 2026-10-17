import React from 'react';
import {
  CreditCard,
  Home,
  Database,
  Settings,
  Play,
  BarChart3,
  FileText,
} from 'lucide-react';

export type ActiveModuleId = 'inicio' | 'datos' | 'entrenamiento' | 'simulador' | 'resultados';

interface NavigationProps {
  activeModule: ActiveModuleId;
  onSelectModule: (module: ActiveModuleId) => void;
  isTrained: boolean;
  onOpenDocModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeModule,
  onSelectModule,
  isTrained,
  onOpenDocModal,
}) => {
  const navItems = [
    { id: 'inicio' as ActiveModuleId, label: 'Inicio', icon: Home },
    { id: 'datos' as ActiveModuleId, label: 'Datos', icon: Database },
    { id: 'entrenamiento' as ActiveModuleId, label: 'Entrenamiento', icon: Settings },
    { id: 'simulador' as ActiveModuleId, label: 'Simulador', icon: Play },
    { id: 'resultados' as ActiveModuleId, label: 'Resultados', icon: BarChart3 },
  ];

  return (
    <aside className="w-56 md:w-60 bg-[#0B132B] text-slate-200 border-r border-slate-800 flex flex-col shrink-0 min-h-screen select-none">
      {/* Brand & App Title */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/40">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white leading-tight">
              Fraude Bancario
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">ML Supervisado</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="p-3 flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Model Status & Docs Footer */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#070D1E] space-y-2.5">
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Modelo</div>
            <div className="font-semibold text-white text-xs">Random Forest</div>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isTrained
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                : 'bg-amber-950 text-amber-400 border border-amber-800/60'
            }`}
          >
            {isTrained ? 'Entrenado' : 'Sin entrenar'}
          </span>
        </div>

        <button
          onClick={onOpenDocModal}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>Ficha Técnica y Métricas</span>
        </button>

        <div className="text-[10px] text-slate-500 text-center leading-tight pt-1">
          Kaggle Credit Card Fraud
          <br />
          284,807 operaciones
        </div>
      </div>
    </aside>
  );
};
