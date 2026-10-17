import React from 'react';
import { X, BookOpen, ShieldCheck, Cpu, Target, FileText } from 'lucide-react';

interface TechnicalDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDocumentationModal: React.FC<TechnicalDocumentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Ficha Técnica y Glosario Académico
              </h2>
              <p className="text-xs text-slate-400">
                Fundamentos matemáticos y metodológicos del proyecto
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed">
          {/* Section 1: Definición del problema y desbalance */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>1. Clasificación Binaria y Desbalance Extremo</span>
            </h3>
            <p>
              El problema consiste en clasificar cada transacción X (vector de 30 variables continuas) en una de dos clases:
              Y = 0 (legítima) o Y = 1 (fraude).
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div>Total de observaciones: N = 284,807</div>
              <div>Transacciones legítimas: N₀ = 284,315 (99.828%)</div>
              <div>Transacciones fraudulentas: N₁ = 492 (0.172%)</div>
              <div className="text-amber-400">Tasa base de prevalencia: P(Y=1) ≈ 0.001727</div>
            </div>
          </div>

          {/* Section 2: Algoritmo Random Forest y ponderación */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>2. Random Forest y Manejo de Clases (`class_weight = &apos;balanced&apos;`)</span>
            </h3>
            <p>
              Random Forest es un método de ensamble (Bagging) de B árboles de decisión independientes.
              En cada división (split) se evalúa una muestra aleatoria de m = √p variables para minimizar la impureza de Gini ponderada.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2">
              <div>Impureza de Gini: G = 1 - (p₀² + p₁²)</div>
              <div>
                Ponderación inversa de clases:
                <br />
                w_k = N / (2 · N_k) → w₀ ≈ 0.5008, w₁ ≈ 289.43
              </div>
              <div className="text-blue-300">
                Efecto: Cometer un error clasificando un fraude como legítimo se penaliza ~578 veces más que el caso opuesto.
              </div>
            </div>
          </div>

          {/* Section 3: Fórmulas de Evaluación */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Métricas de Rendimiento frente al Desbalance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white">Precision (Valor Predictivo Positivo):</span>
                <div className="font-mono text-blue-400 text-[11px]">Precision = TP / (TP + FP)</div>
                <p className="text-[11px] text-slate-400">
                  De todas las alertas de fraude generadas por el sistema, ¿qué fracción son verdaderos fraudes?
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white">Recall (Sensibilidad o Tasa de Acierto):</span>
                <div className="font-mono text-emerald-400 text-[11px]">Recall = TP / (TP + FN)</div>
                <p className="text-[11px] text-slate-400">
                  De todos los fraudes reales que ocurrieron, ¿qué fracción logró detectar el modelo?
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white">F1-Score (Media Armónica):</span>
                <div className="font-mono text-sky-400 text-[11px]">F1 = 2 · (Precision · Recall) / (Precision + Recall)</div>
                <p className="text-[11px] text-slate-400">
                  Compensa ambos errores cuando ambos tipos de fallo tienen repercusión económica.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white">AUPRC (Área bajo la Curva P-R):</span>
                <div className="font-mono text-purple-400 text-[11px]">AUPRC = Área bajo Precision-Recall [0, 1]</div>
                <p className="text-[11px] text-slate-400">
                  El estándar dorado para clases raras. Evalúa todos los umbrales de decisión sin verse inflado por el volumen gigante de verdaderos negativos (TN).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: La Paradoja de la Exactitud */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-1.5">
            <h4 className="font-bold text-amber-300">
              La Paradoja de la Exactitud (Accuracy Paradox)
            </h4>
            <p className="text-slate-300 text-[11px]">
              La métrica de exactitud es Accuracy = (TP + TN) / N. Si un modelo trivial siempre predice Y = 0,
              obtiene Accuracy = 284,315 / 284,807 ≈ 99.828%. A pesar de esta cifra aparentemente impecable,
              su Recall = 0.0 y su AUPRC ≈ 0.0017. Este ejemplo ilustra por qué la exactitud es inaceptable en problemas de fraude bancario.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Entendido, cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
