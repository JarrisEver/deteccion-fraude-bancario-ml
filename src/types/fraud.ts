export interface Transaction {
  id?: string | number;
  Time: number;
  Amount: number;
  Class: number; // 0 = Legitimate, 1 = Fraud
  V1: number;
  V2: number;
  V3: number;
  V4: number;
  V5: number;
  V6: number;
  V7: number;
  V8: number;
  V9: number;
  V10: number;
  V11: number;
  V12: number;
  V13: number;
  V14: number;
  V15: number;
  V16: number;
  V17: number;
  V18: number;
  V19: number;
  V20: number;
  V21: number;
  V22: number;
  V23: number;
  V24: number;
  V25: number;
  V26: number;
  V27: number;
  V28: number;
  description?: string;
  sourceType?: 'kaggle_sample' | 'custom_csv' | 'synthetic';
}

export interface DatasetStats {
  total: number;
  fraudCount: number;
  legitimateCount: number;
  fraudPercentage: number;
  source: 'kaggle_benchmark' | 'custom_csv' | 'synthetic_demo';
  sourceName: string;
  isCustomLoaded: boolean;
}

export interface TrainingConfig {
  algorithm: 'random_forest';
  testSplitRatio: number; // e.g. 0.20 (80/20) or 0.30 (70/30)
  imbalanceStrategy: 'class_weight_balanced' | 'undersampling' | 'none';
  threshold: number; // 0.05 to 0.95 (default 0.50)
  nEstimators: number; // default 100
  maxDepth: number; // default 12
}

export interface ConfusionMatrix {
  trueNegatives: number;  // Legítima predicha como Legítima
  falsePositives: number; // Legítima predicha como Fraude (Falsa alarma)
  falseNegatives: number; // Fraude predicho como Legítima (Fraude no detectado)
  truePositives: number;  // Fraude predicho como Fraude (Fraude detectado)
}

export interface EvaluationMetrics {
  confusionMatrix: ConfusionMatrix;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auprc: number; // Area under Precision-Recall curve
  threshold: number;
  testTotalCount: number;
  testFraudCount: number;
  testLegitCount: number;
  trainTotalCount: number;
  trainFraudCount: number;
  trainLegitCount: number;
}

export interface PRCurvePoint {
  threshold: number;
  precision: number;
  recall: number;
}

export interface FeatureImportance {
  feature: string;
  score: number;
  importance: number; // 0 to 1
  description: string;
}

export interface SimulationFactor {
  feature: string;
  value: number;
  impactScore: number;
  direction: 'increases_risk' | 'decreases_risk' | 'neutral';
  explanation: string;
}

export interface SimulationResult {
  isFraud: boolean;
  probability: number;
  riskScore: number; // 0 to 100
  thresholdUsed: number;
  topFactors: SimulationFactor[];
  recommendation: {
    action: 'ALLOW' | 'CHALLENGE_2FA' | 'BLOCK_AND_ALERT';
    title: string;
    description: string;
    severity: 'success' | 'warning' | 'danger';
  };
}
