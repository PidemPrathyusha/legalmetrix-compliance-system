export type Page =
  | 'role-select'
  | 'landing'
  | 'dashboard'
  | 'scanner'
  | 'inspections'
  | 'reports'
  | 'result'
  | 'mfr-dashboard'
  | 'mfr-check'
  | 'mfr-result'
  | 'mfr-fixes'
  | 'consumer'
  | 'consumer-result';

export type AppMode = 'inspector' | 'manufacturer';

export type ComplianceStatus = 'compliant' | 'potential' | 'pending';

export interface Inspection {
  id: string;
  product: string;
  category: string;
  netQuantity: string;
  mrp: string;
  manufacturer: string;
  countryOfOrigin: string;
  consumerCare: string;
  score: number;
  status: ComplianceStatus;
  date: string;
  time: string;
  inspector: string;
}

export interface DetectedField {
  label: string;
  value: string;
  confidence: number;
  compliant: boolean;
  note?: string;
}

export interface ProductAnalysis {
  product: string;
  category: string;
  netQuantity: string;
  mrp: string;
  manufacturer: string;
  countryOfOrigin: string;
  consumerCare: string;
  score: number;
  status: string;
  detectedFields: DetectedField[];
}

export interface PackageCheck {
  id: string;
  product: string;
  category: string;
  netQuantity: string;
  mrp: string;
  score: number;
  status: ComplianceStatus;
  date: string;
  time: string;
  issues: number;
}

export interface FixSuggestion {
  field: string;
  detected: string;
  reason: string;
  action: string;
  severity: 'medium' | 'low';
}
