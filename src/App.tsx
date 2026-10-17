import React, { useState, useEffect, useMemo } from 'react';
import {
  Navigation,
  ActiveModuleId,
} from './components/Navigation';
import { ModuleResumen } from './components/ModuleResumen';
import { ModuleDatos } from './components/ModuleDatos';
import { ModuleEntrenamiento } from './components/ModuleEntrenamiento';
import { ModuleResultados } from './components/ModuleResultados';
import { ModuleSimulador } from './components/ModuleSimulador';
import { TechnicalDocumentationModal } from './components/TechnicalDocumentationModal';

import {
  Transaction,
  DatasetStats,
  TrainingConfig,
  EvaluationMetrics,
} from './types/fraud';
import { KAGGLE_DATASET_STATS } from './data/kaggleBenchmark';
import { mlEngine } from './ml/randomForestEngine';
import { Menu, X, Shield, Database } from 'lucide-react';

export default function App() {
  // Estado del Dataset (Benchmark por defecto de Kaggle o CSV cargado)
  const [stats, setStats] = useState<DatasetStats>(KAGGLE_DATASET_STATS);
  const [customTransactions, setCustomTransactions] = useState<Transaction[] | null>(null);

  // Configuración de ML y Umbral
  const [config, setConfig] = useState<TrainingConfig>(() => mlEngine.getConfig());
  const [isTrained, setIsTrained] = useState<boolean>(true); // Pre-entrenado para el benchmark inicial
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingStep, setTrainingStep] = useState<number>(6);
  const [trainingMessage, setTrainingMessage] = useState<string>('Modelo entrenado correctamente.');

  // Métricas reactivas (se recalculan de inmediato al mover el umbral)
  const [metrics, setMetrics] = useState<EvaluationMetrics>(() => mlEngine.evaluateCurrentThreshold());
  const prPoints = useMemo(() => mlEngine.getPrecisionRecallCurve(), [isTrained, config.imbalanceStrategy]);

  // Navegación
  const [activeModule, setActiveModule] = useState<ActiveModuleId>('inicio');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);

  // Efecto cuando cambia el umbral
  const handleThresholdChange = (newThreshold: number) => {
    mlEngine.setThreshold(newThreshold);
    setConfig((prev) => ({ ...prev, threshold: newThreshold }));
    const newMetrics = mlEngine.evaluateCurrentThreshold();
    setMetrics(newMetrics);
  };

  // Manejo de actualización de configuración del modelo
  const handleConfigChange = (newConfig: Partial<TrainingConfig>) => {
    mlEngine.setConfig(newConfig);
    setConfig((prev) => ({ ...prev, ...newConfig }));
    if (newConfig.imbalanceStrategy) {
      const newMetrics = mlEngine.evaluateCurrentThreshold();
      setMetrics(newMetrics);
    }
  };

  // Entrenamiento interactivo
  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingStep(1);
    try {
      const finalMetrics = await mlEngine.train(
        customTransactions || undefined,
        (step, msg) => {
          setTrainingStep(step);
          setTrainingMessage(msg);
        }
      );
      setMetrics(finalMetrics);
      setIsTrained(true);
    } finally {
      setIsTraining(false);
    }
  };

  // Carga de archivo CSV personalizado
  const handleDatasetUpdate = (newStats: DatasetStats, txs: Transaction[]) => {
    setStats(newStats);
    setCustomTransactions(txs);
    setIsTraining(true);
    mlEngine.train(txs, (step, msg) => {
      setTrainingStep(step);
      setTrainingMessage(msg);
    }).then((res) => {
      setMetrics(res);
      setIsTrained(true);
      setIsTraining(false);
    });
  };

  // Restaurar dataset Kaggle benchmark
  const handleResetBenchmark = () => {
    setStats(KAGGLE_DATASET_STATS);
    setCustomTransactions(null);
    mlEngine.setConfig({ imbalanceStrategy: 'class_weight_balanced', threshold: 0.50 });
    setConfig(mlEngine.getConfig());
    const res = mlEngine.evaluateCurrentThreshold();
    setMetrics(res);
  };

  // Desplazamiento suave al hacer clic en el menú
  const handleSelectModule = (modId: ActiveModuleId) => {
    setActiveModule(modId);
    setIsMobileSidebarOpen(false);

    const el = document.getElementById(`section-${modId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-blue-600 selection:text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0B132B] border-b border-slate-800 p-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-sm text-white">Fraude Bancario ML</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Dataset Kaggle ULB
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`${
          isMobileSidebarOpen ? 'fixed inset-0 z-50 flex' : 'hidden md:flex'
        }`}
      >
        <Navigation
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
          isTrained={isTrained}
          onOpenDocModal={() => setIsDocModalOpen(true)}
        />
        {/* Mobile Backdrop */}
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="flex-1 bg-black/60 md:hidden"
          />
        )}
      </div>

      {/* Main Viewport Content Area */}
      <main className="flex-1 p-3 md:p-6 overflow-y-auto space-y-4 max-w-[1600px] mx-auto w-full">
        {/* Row 1: Inicio (Header Banner & 4 KPI Cards) */}
        <section id="section-inicio" className="scroll-mt-4">
          <ModuleResumen
            stats={stats}
            isTrained={isTrained}
          />
        </section>

        {/* Row 2: Datos (3 Cards: Distribución de clases, Distribución del monto, Vista previa) */}
        <section id="section-datos" className="scroll-mt-4">
          <ModuleDatos
            stats={stats}
            customTransactions={customTransactions}
            onDatasetUpdate={handleDatasetUpdate}
            onResetBenchmark={handleResetBenchmark}
          />
        </section>

        {/* Row 3: 2 Big Panels Side-by-Side (Entrenamiento del modelo | Métricas de evaluación) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          {/* Panel 1: Entrenamiento del modelo */}
          <section id="section-entrenamiento" className="scroll-mt-4">
            <ModuleEntrenamiento
              config={config}
              onConfigChange={handleConfigChange}
              onThresholdChange={handleThresholdChange}
              onTrainModel={handleTrainModel}
              isTraining={isTraining}
              trainingStep={trainingStep}
              trainingMessage={trainingMessage}
              metrics={metrics}
              isTrained={isTrained}
            />
          </section>

          {/* Panel 2: Métricas de evaluación (Resultados) */}
          <section id="section-resultados" className="scroll-mt-4">
            <ModuleResultados
              metrics={metrics}
              prPoints={prPoints}
            />
          </section>
        </div>

        {/* Row 4: Simulador de transacciones (3 Columns) */}
        <section id="section-simulador" className="scroll-mt-4">
          <ModuleSimulador
            threshold={config.threshold}
            isTrained={isTrained}
            onDatasetUpdate={handleDatasetUpdate}
          />
        </section>
      </main>

      {/* Modal de Ficha Técnica y Fórmulas */}
      <TechnicalDocumentationModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />
    </div>
  );
}
