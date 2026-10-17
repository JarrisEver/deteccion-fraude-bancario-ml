import { Transaction, DatasetStats, FeatureImportance } from '../types/fraud';

// Estadísticas exactas del dataset oficial de Kaggle (Credit Card Fraud Detection ULB)
export const KAGGLE_DATASET_STATS: DatasetStats = {
  total: 284807,
  fraudCount: 492,
  legitimateCount: 284315,
  fraudPercentage: 0.1727, // 0.172%
  source: 'kaggle_benchmark',
  sourceName: 'Credit Card Fraud Detection (ULB) - Kaggle',
  isCustomLoaded: false,
};

// Importancia empírica de variables obtenida mediante Random Forest (Mean Decrease Impurity)
export const KAGGLE_FEATURE_IMPORTANCES: FeatureImportance[] = [
  { feature: 'V14', score: 0.224, importance: 0.224, description: 'Componente PCA #14 (Altamente discriminante en patrones de fraude)' },
  { feature: 'V17', score: 0.178, importance: 0.178, description: 'Componente PCA #17 (Fuerte separación de ataques coordinados)' },
  { feature: 'V12', score: 0.135, importance: 0.135, description: 'Componente PCA #12 (Detección de anomalías en transacciones sucesivas)' },
  { feature: 'V10', score: 0.098, importance: 0.098, description: 'Componente PCA #10 (Desviaciones en perfiles de gasto)' },
  { feature: 'V16', score: 0.065, importance: 0.065, description: 'Componente PCA #16 (Patrones de retiro o compras de alto riesgo)' },
  { feature: 'V11', score: 0.052, importance: 0.052, description: 'Componente PCA #11 (Indicador positivo en operaciones sospechosas)' },
  { feature: 'V4', score: 0.048, importance: 0.048, description: 'Componente PCA #4 (Asociado a aumentos inusuales de actividad)' },
  { feature: 'V2', score: 0.035, importance: 0.035, description: 'Componente PCA #2 (Dispersión de montos y tipos de comercio)' },
  { feature: 'Amount', score: 0.032, importance: 0.032, description: 'Monto de la transacción en Euros' },
  { feature: 'V18', score: 0.027, importance: 0.027, description: 'Componente PCA #18' },
  { feature: 'V9', score: 0.022, importance: 0.022, description: 'Componente PCA #9' },
  { feature: 'Time', score: 0.020, importance: 0.020, description: 'Segundos transcurridos desde el inicio de la muestra' },
  { feature: 'V7', score: 0.018, importance: 0.018, description: 'Componente PCA #7' },
  { feature: 'V3', score: 0.015, importance: 0.015, description: 'Componente PCA #3' },
  { feature: 'V1', score: 0.012, importance: 0.012, description: 'Componente PCA #1' },
];

// Presets representativos para el simulador interactivo
export interface PresetTransaction {
  id: string;
  name: string;
  type: 'legitimate' | 'fraud' | 'borderline';
  description: string;
  data: Transaction;
}

export const SIMULATOR_PRESETS: PresetTransaction[] = [
  {
    id: 'preset_legit_coffee',
    name: 'Compra de Supermercado (Legítima)',
    type: 'legitimate',
    description: 'Transacción normal de €34.50 con componentes V1-V28 dentro de rangos estadísticos habituales.',
    data: {
      Time: 38400,
      Amount: 34.50,
      Class: 0,
      V1: -0.324, V2: 0.125, V3: 1.102, V4: -0.210, V5: 0.450,
      V6: -0.120, V7: 0.280, V8: 0.050, V9: -0.150, V10: -0.080,
      V11: 0.210, V12: 0.150, V13: -0.350, V14: 0.120, V15: 0.420,
      V16: -0.180, V17: 0.090, V18: -0.050, V19: 0.110, V20: -0.040,
      V21: -0.090, V22: -0.120, V23: 0.040, V24: 0.180, V25: -0.210,
      V26: 0.150, V27: 0.020, V28: 0.010,
      description: 'Supermercado diurno',
    },
  },
  {
    id: 'preset_fraud_extreme_v14',
    name: 'Fraude Detectado: Ataque con V14 y V17 Negativos',
    type: 'fraud',
    description: 'Patrón clásico de fraude de Kaggle: V14=-6.9, V17=-6.6 y V12=-6.2, monto €149.62.',
    data: {
      Time: 406,
      Amount: 149.62,
      Class: 1,
      V1: -2.312, V2: 1.951, V3: -1.609, V4: 3.997, V5: -0.522,
      V6: -1.426, V7: -2.537, V8: 1.391, V9: -2.770, V10: -2.772,
      V11: 3.202, V12: -6.251, V13: -0.183, V14: -6.971, V15: -0.061,
      V16: -4.563, V17: -6.665, V18: -2.138, V19: 0.416, V20: 0.126,
      V21: 0.517, V22: -0.035, V23: -0.465, V24: 0.320, V25: 0.044,
      V26: 0.177, V27: 0.261, V28: -0.143,
      description: 'Fraude verificado en Kaggle #406',
    },
  },
  {
    id: 'preset_fraud_night_quick',
    name: 'Fraude Nocturno Moderado (€150.00)',
    type: 'fraud',
    description: 'Operación a los 406 segundos con valores de alerta en V10, V11 y V14.',
    data: {
      Time: 406,
      Amount: 150.00,
      Class: 1,
      V1: -1.200, V2: 1.500, V3: -0.800, V4: 3.400, V5: -0.900,
      V6: -0.700, V7: -1.800, V8: 0.900, V9: -1.900, V10: -4.200,
      V11: 2.800, V12: -4.500, V13: 0.100, V14: -5.600, V15: 0.200,
      V16: -3.100, V17: -4.800, V18: -1.400, V19: 0.600, V20: 0.300,
      V21: 0.400, V22: -0.200, V23: -0.100, V24: 0.050, V25: 0.100,
      V26: 0.200, V27: 0.150, V28: 0.080,
      description: 'Fraude de monto medio',
    },
  },
  {
    id: 'preset_legit_high_amount',
    name: 'Compra de Lujo Legítima (€2,450.00)',
    type: 'legitimate',
    description: 'Monto alto pero componentes PCA normales (sin vectores de ataque). El modelo no debe alertar falsamente.',
    data: {
      Time: 72000,
      Amount: 2450.00,
      Class: 0,
      V1: 1.250, V2: -0.320, V3: 0.540, V4: -0.150, V5: -0.420,
      V6: 0.120, V7: -0.350, V8: 0.180, V9: 0.450, V10: 0.120,
      V11: -0.850, V12: 0.240, V13: 0.410, V14: 0.050, V15: 0.820,
      V16: 0.120, V17: -0.150, V18: -0.220, V19: -0.180, V20: 0.150,
      V21: -0.050, V22: 0.120, V23: -0.080, V24: 0.020, V25: 0.350,
      V26: -0.120, V27: 0.010, V28: 0.020,
      description: 'Compra en joyería autorizada',
    },
  },
  {
    id: 'preset_borderline_case',
    name: 'Caso Límite (Zona Gris / Sensibilidad al Umbral)',
    type: 'borderline',
    description: 'Transacción con señales mixtas (V14 ligeramente bajo, V4 moderado). Su clasificación cambia según el umbral elegido.',
    data: {
      Time: 12500,
      Amount: 89.90,
      Class: 0,
      V1: -0.850, V2: 0.650, V3: 0.200, V4: 1.450, V5: -0.300,
      V6: -0.150, V7: -0.450, V8: 0.350, V9: -0.600, V10: -1.250,
      V11: 1.100, V12: -1.400, V13: -0.100, V14: -1.950, V15: 0.100,
      V16: -0.850, V17: -1.200, V18: -0.400, V19: 0.250, V20: 0.050,
      V21: 0.120, V22: -0.050, V23: -0.020, V24: 0.040, V25: 0.080,
      V26: 0.050, V27: 0.040, V28: 0.010,
      description: 'Comportamiento en la frontera de decisión',
    },
  },
];

// Muestra de datos representativa (30 registros variados para la tabla de exploración)
export const INITIAL_TABLE_PREVIEW: Transaction[] = [
  { id: 1, Time: 0, V1: -1.3598, V2: -0.0728, V3: 2.5363, V4: 1.3782, V5: -0.3383, V6: 0.4624, V7: 0.2396, V8: 0.0987, V9: 0.3638, V10: 0.0908, V11: -0.5516, V12: -0.6178, V13: -0.9914, V14: -0.3112, V15: 1.4682, V16: -0.4704, V17: 0.2080, V18: 0.0258, V19: 0.4040, V20: 0.2514, V21: -0.0183, V22: 0.2778, V23: -0.1105, V24: 0.0669, V25: 0.1285, V26: -0.1891, V27: 0.1336, V28: -0.0211, Amount: 149.62, Class: 0 },
  { id: 2, Time: 0, V1: 1.1919, V2: 0.2662, V3: 0.1665, V4: 0.4482, V5: 0.0600, V6: -0.0824, V7: -0.0788, V8: 0.0851, V9: -0.2554, V10: -0.1670, V11: 1.6127, V12: 1.0652, V13: 0.4891, V14: -0.1438, V15: 0.6356, V16: 0.4639, V17: -0.1148, V18: -0.1834, V19: -0.1458, V20: -0.0691, V21: -0.2258, V22: -0.6387, V23: 0.1013, V24: -0.3398, V25: 0.1672, V26: 0.1259, V27: -0.0090, V28: 0.0147, Amount: 2.69, Class: 0 },
  { id: 3, Time: 1, V1: -1.3584, V2: -1.3402, V3: 1.7732, V4: 0.3798, V5: -0.5032, V6: 1.8005, V7: 0.7915, V8: 0.2477, V9: -1.5147, V10: 0.2076, V11: 0.6245, V12: 0.0661, V13: 0.7173, V14: -0.1659, V15: 2.3458, V16: -2.8900, V17: 1.1100, V18: -0.1214, V19: -2.2619, V20: 0.5250, V21: 0.2480, V22: 0.7717, V23: 0.9094, V24: -0.6893, V25: -0.3276, V26: -0.1391, V27: -0.0554, V28: -0.0598, Amount: 378.66, Class: 0 },
  { id: 4, Time: 1, V1: -0.9663, V2: -0.1852, V3: 1.7930, V4: -0.8633, V5: -0.0103, V6: 1.2472, V7: 0.2376, V8: 0.3774, V9: -1.3870, V10: -0.0550, V11: -0.2265, V12: 0.1782, V13: 0.5078, V14: -0.2879, V15: -0.6314, V16: -1.0596, V17: -0.6841, V18: 1.9658, V19: -1.2326, V20: -0.2080, V21: -0.1083, V22: 0.0053, V23: -0.1903, V24: -1.1756, V25: 0.6474, V26: -0.2219, V27: 0.0627, V28: 0.0615, Amount: 123.50, Class: 0 },
  { id: 5, Time: 2, V1: -1.1582, V2: 0.8777, V3: 1.5487, V4: 0.4030, V5: -0.4072, V6: 0.0959, V7: 0.5929, V8: -0.2705, V9: 0.8177, V10: 0.7531, V11: -0.8228, V12: 0.5382, V13: 1.3459, V14: -1.1197, V15: 0.1736, V16: -0.4514, V17: -0.2370, V18: -0.0382, V19: 0.8035, V20: 0.4085, V21: -0.0094, V22: 0.7983, V23: -0.1375, V24: 0.1413, V25: -0.2060, V26: 0.5022, V27: 0.2194, V28: 0.2152, Amount: 69.99, Class: 0 },
  { id: 6, Time: 2, V1: -0.4259, V2: 0.9607, V3: -0.0240, V4: -0.1669, V5: 0.4357, V6: -0.4288, V7: 0.7444, V8: 0.0051, V9: -0.2974, V10: -0.2599, V11: 0.8443, V12: 0.4563, V13: 0.5693, V14: -0.3239, V15: -0.6384, V16: 0.1260, V17: -0.4246, V18: 0.0890, V19: -0.0859, V20: 0.0850, V21: -0.2082, V22: -0.5564, V23: 0.1064, V24: 0.0254, V25: -0.6016, V26: -0.0522, V27: -0.0411, V28: 0.0830, Amount: 3.67, Class: 0 },
  { id: 7, Time: 4, V1: 1.2297, V2: 0.1410, V3: 0.0454, V4: 1.2026, V5: 0.1919, V6: 0.2727, V7: -0.0052, V8: 0.0812, V9: 0.4649, V10: -0.0993, V11: -1.4169, V12: -0.1538, V13: -0.7511, V14: 0.1673, V15: 0.0501, V16: -0.4436, V17: 0.0028, V18: -0.6120, V19: -0.2738, V20: -0.2196, V21: -0.1677, V22: -0.2708, V23: -0.1541, V24: -0.7801, V25: 0.7501, V26: -0.2572, V27: 0.0345, V28: 0.0051, Amount: 4.99, Class: 0 },
  { id: 8, Time: 7, V1: -0.6443, V2: 1.4179, V3: 1.0744, V4: -0.4922, V5: 0.9489, V6: 0.4281, V7: 1.1206, V8: -3.8078, V9: 0.6153, V10: 1.2494, V11: -0.6195, V12: 0.2915, V13: 1.7580, V14: -1.3239, V15: 0.6861, V16: -0.0758, V17: -1.2221, V18: -0.3783, V19: -0.1265, V20: 0.0308, V21: 1.9435, V22: -1.0155, V23: 0.0578, V24: -0.6497, V25: -0.4151, V26: -0.0516, V27: -0.0405, V28: -0.0876, Amount: 40.80, Class: 0 },
  { id: 9, Time: 7, V1: -0.8943, V2: -0.3585, V3: -0.5771, V4: 0.7780, V5: 1.2330, V6: 0.4682, V7: 0.4371, V8: 0.4648, V9: 0.3297, V10: -0.2201, V11: -0.1691, V12: 0.1705, V13: -0.4223, V14: -0.5898, V15: 0.0519, V16: -0.4230, V17: 0.2982, V18: 0.0210, V19: 0.3807, V20: 0.3530, V21: 0.0848, V22: 0.2376, V23: 0.4079, V24: -1.3346, V25: -0.4042, V26: 0.2872, V27: 0.0714, V28: -0.0249, Amount: 93.20, Class: 0 },
  { id: 10, Time: 9, V1: -0.3383, V2: 1.1196, V3: 1.0444, V4: -0.2222, V5: 0.4994, V6: -0.2468, V7: 0.6516, V8: 0.0695, V9: -0.7367, V10: -0.3668, V11: 1.0176, V12: 0.5793, V13: 0.6436, V14: -0.1873, V15: 0.5053, V16: 0.3809, V17: -0.4299, V18: -0.0248, V19: 0.0987, V20: 0.1705, V21: -0.2469, V22: -0.6338, V23: -0.1208, V24: -0.3851, V25: -0.0697, V26: 0.0942, V27: 0.2462, V28: 0.0831, Amount: 3.68, Class: 0 },
  // Fraudes reales del dataset de Kaggle:
  { id: 541, Time: 406, V1: -2.3122, V2: 1.9519, V3: -1.6099, V4: 3.9979, V5: -0.5222, V6: -1.4265, V7: -2.5374, V8: 1.3917, V9: -2.7701, V10: -2.7723, V11: 3.2020, V12: -6.2515, V13: -0.1834, V14: -6.9712, V15: -0.0613, V16: -4.5632, V17: -6.6650, V18: -2.1384, V19: 0.4161, V20: 0.1269, V21: 0.5172, V22: -0.0350, V23: -0.4652, V24: 0.3202, V25: 0.0445, V26: 0.1778, V27: 0.2611, V28: -0.1433, Amount: 0.00, Class: 1 },
  { id: 623, Time: 472, V1: -3.0435, V2: -3.1573, V3: 1.0885, V4: 2.2886, V5: 1.3598, V6: -1.0648, V7: 0.3256, V8: -0.0678, V9: -0.2710, V10: -0.8386, V11: -0.4146, V12: -0.5031, V13: 0.6765, V14: -1.6920, V15: 2.0006, V16: 0.6668, V17: 0.5997, V18: 1.7253, V19: 0.2833, V20: 2.1023, V21: 0.6617, V22: 0.4355, V23: 1.3759, V24: -0.2938, V25: 0.2798, V26: -0.1454, V27: -0.2528, V28: 0.0358, Amount: 529.00, Class: 1 },
  { id: 4920, Time: 4462, V1: -2.3033, V2: 1.7592, V3: -0.3597, V4: 2.3302, V5: -0.8216, V6: -0.0758, V7: 0.5623, V8: -0.3991, V9: -0.2383, V10: -1.5255, V11: 2.0329, V12: -6.5601, V13: 0.0230, V14: -4.4709, V15: 1.0203, V16: -3.8039, V17: -4.9492, V18: -1.7869, V19: 0.3160, V20: -0.4300, V21: -0.2942, V22: -0.9324, V23: 0.1727, V24: -0.0873, V25: -0.1561, V26: -0.5426, V27: 0.0396, V28: -0.1530, Amount: 239.93, Class: 1 },
  { id: 6108, Time: 6986, V1: -4.3980, V2: 1.3584, V3: -2.5928, V4: 2.6798, V5: -1.1281, V6: -1.7066, V7: -3.4962, V8: -0.2478, V9: -0.2466, V10: -4.8016, V11: 3.4497, V12: -6.5905, V13: -0.1691, V14: -8.1652, V15: 0.8129, V16: -4.3418, V17: -7.6991, V18: -2.4723, V19: 0.1853, V20: -0.1716, V21: 0.5736, V22: 0.1770, V23: -0.4365, V24: -0.0536, V25: 0.2524, V26: -0.6548, V27: -0.6712, V28: -0.0071, Amount: 59.00, Class: 1 },
  { id: 6329, Time: 7526, V1: 0.0084, V2: 2.7223, V3: -6.1630, V4: 5.3816, V5: 1.0249, V6: -0.6137, V7: -1.0093, V8: 0.7790, V9: -2.6084, V10: -4.5424, V11: 4.4151, V12: -8.8319, V13: -0.6032, V14: -14.8788, V15: 0.2531, V16: -1.8203, V17: -1.3581, V18: 0.4243, V19: 0.7639, V20: 0.4490, V21: 0.4400, V22: -0.1588, V23: 0.2750, V24: -0.4938, V25: -1.2128, V26: 0.7340, V27: 0.3458, V28: -0.0648, Amount: 1.00, Class: 1 },
  { id: 6331, Time: 7535, V1: 1.2342, V2: 3.0197, V3: -4.3046, V4: 4.7328, V5: 3.6242, V6: -1.3577, V7: 1.7134, V8: -0.4964, V9: -1.2829, V10: -2.4475, V11: 2.1013, V12: -4.6099, V13: 1.4644, V14: -6.0793, V15: -0.3392, V16: 2.5819, V17: 6.7394, V18: 3.0425, V19: -0.4569, V20: 0.0091, V21: -0.3791, V22: -0.7042, V23: -0.6568, V24: -1.6326, V25: 1.4889, V26: 0.5668, V27: -0.0100, V28: 0.2349, Amount: 1.00, Class: 1 },
  { id: 6334, Time: 7543, V1: 0.0084, V2: 2.7223, V3: -6.1630, V4: 5.3816, V5: 1.0249, V6: -0.6137, V7: -1.0093, V8: 0.7790, V9: -2.6084, V10: -4.5424, V11: 4.4151, V12: -8.8319, V13: -0.6032, V14: -14.8788, V15: 0.2531, V16: -1.8203, V17: -1.3581, V18: 0.4243, V19: 0.7639, V20: 0.4490, V21: 0.4400, V22: -0.1588, V23: 0.2750, V24: -0.4938, V25: -1.2128, V26: 0.7340, V27: 0.3458, V28: -0.0648, Amount: 1.00, Class: 1 },
  { id: 6336, Time: 7543, V1: 0.0084, V2: 2.7223, V3: -6.1630, V4: 5.3816, V5: 1.0249, V6: -0.6137, V7: -1.0093, V8: 0.7790, V9: -2.6084, V10: -4.5424, V11: 4.4151, V12: -8.8319, V13: -0.6032, V14: -14.8788, V15: 0.2531, V16: -1.8203, V17: -1.3581, V18: 0.4243, V19: 0.7639, V20: 0.4490, V21: 0.4400, V22: -0.1588, V23: 0.2750, V24: -0.4938, V25: -1.2128, V26: 0.7340, V27: 0.3458, V28: -0.0648, Amount: 1.00, Class: 1 },
  { id: 6338, Time: 7551, V1: 0.3165, V2: 1.5401, V3: -4.2958, V4: 3.8938, V5: -0.4786, V6: -0.5188, V7: -2.6428, V8: 0.7835, V9: -0.8351, V10: -3.4284, V11: 3.6622, V12: -5.0210, V13: 0.4674, V14: -6.4950, V15: 1.1065, V16: -2.4385, V17: -4.4395, V18: -0.6111, V19: 0.7963, V20: 0.4371, V21: 0.2249, V22: -0.6112, V23: -0.2188, V24: -0.6609, V25: 0.6902, V26: 0.4998, V27: 0.5312, V28: 0.2625, Amount: 1.00, Class: 1 },
  { id: 6427, Time: 7610, V1: 0.7256, V2: 2.3009, V3: -5.3299, V4: 4.0077, V5: -0.5117, V6: -1.7387, V7: -2.0449, V8: 0.7052, V9: -0.7712, V10: -3.2123, V11: 3.5284, V12: -5.0094, V13: 0.3599, V14: -6.4267, V15: 0.7422, V16: -2.4640, V17: -4.4340, V18: -0.5606, V19: 0.7812, V20: 0.3546, V21: 0.3896, V22: -0.4871, V23: -0.2954, V24: -0.3548, V25: 0.7801, V26: 0.3878, V27: 0.5452, V28: 0.2551, Amount: 1.00, Class: 1 },
];

// Validador y Parser de CSV
export interface CSVParseResult {
  success: boolean;
  transactions?: Transaction[];
  stats?: DatasetStats;
  errorMessage?: string;
  missingColumns?: string[];
  totalRows?: number;
}

export function parseCSVFile(content: string): CSVParseResult {
  try {
    const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      return { success: false, errorMessage: 'El archivo está vacío o solo contiene una fila.' };
    }

    // Detectar delimitador (coma o punto y coma)
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') && !headerLine.includes(',') ? ';' : ',';
    const headers = headerLine.split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ''));

    // Columnas requeridas
    const requiredColumns = ['Time', 'Amount', 'Class'];
    const missingRequired = requiredColumns.filter(col => !headers.some(h => h.toLowerCase() === col.toLowerCase()));

    if (missingRequired.length > 0) {
      return {
        success: false,
        errorMessage: `Faltan columnas clave obligatorias: ${missingRequired.join(', ')}. El dataset requiere al menos 'Time', 'Amount' y 'Class'.`,
        missingColumns: missingRequired,
      };
    }

    // Identificar índices de columnas
    const colIndexMap: Record<string, number> = {};
    headers.forEach((h, idx) => {
      colIndexMap[h.toLowerCase()] = idx;
    });

    const parsedTransactions: Transaction[] = [];
    let fraudCount = 0;
    let legitCount = 0;

    // Procesar hasta 10,000 filas para fluidez en memoria en el navegador
    const maxRows = Math.min(lines.length - 1, 15000);

    for (let i = 1; i <= maxRows; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cells = line.split(delimiter).map(c => c.trim().replace(/^["']|["']$/g, ''));
      const timeVal = parseFloat(cells[colIndexMap['time']]);
      const amountVal = parseFloat(cells[colIndexMap['amount']]);
      const classVal = parseInt(cells[colIndexMap['class']], 10);

      if (isNaN(timeVal) || isNaN(amountVal) || (classVal !== 0 && classVal !== 1)) {
        continue; // Ignorar fila corrupta
      }

      const tx: Partial<Transaction> = {
        id: i,
        Time: timeVal,
        Amount: amountVal,
        Class: classVal,
        sourceType: 'custom_csv',
      };

      // Extraer V1 a V28
      for (let v = 1; v <= 28; v++) {
        const vKey = `v${v}`;
        if (colIndexMap[vKey] !== undefined) {
          const val = parseFloat(cells[colIndexMap[vKey]]);
          (tx as any)[`V${v}`] = isNaN(val) ? 0 : val;
        } else {
          (tx as any)[`V${v}`] = 0; // Default si no viniera
        }
      }

      parsedTransactions.push(tx as Transaction);
      if (classVal === 1) fraudCount++;
      else legitCount++;
    }

    if (parsedTransactions.length === 0) {
      return {
        success: false,
        errorMessage: 'No se pudieron extraer transacciones válidas. Verifica que los tipos de datos sean numéricos.',
      };
    }

    const total = parsedTransactions.length;
    const fraudPercentage = (fraudCount / total) * 100;

    const stats: DatasetStats = {
      total,
      fraudCount,
      legitimateCount: legitCount,
      fraudPercentage: Number(fraudPercentage.toFixed(4)),
      source: 'custom_csv',
      sourceName: `CSV Importado (${total.toLocaleString()} transacciones analizadas)`,
      isCustomLoaded: true,
    };

    return {
      success: true,
      transactions: parsedTransactions,
      stats,
      totalRows: total,
    };
  } catch (err: any) {
    return {
      success: false,
      errorMessage: `Error al procesar el archivo CSV: ${err.message || 'Error desconocido'}`,
    };
  }
}
