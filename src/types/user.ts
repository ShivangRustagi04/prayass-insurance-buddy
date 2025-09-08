export interface UserDetails {
  age: number;
  income_range: string;
  occupation: string;
  family_members: number;
  existing_insurance: string[];
  health_conditions: string[];
  language: string;
}

export interface PolicyData {
  premium_range: string;
  coverage_amount: string;
  policy_term: string;
  key_features: string[];
  suitability_score: number;
  claim_settlement_ratio: number;
  flexibility_score: number;
  policy_name: string;
  avg_premium: number;
  coverage_value: number;
  affordability_score?: number;
  coverage_score?: number;
  benefits_score?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface PolicyRecommendation {
  name: string;
  company: string;
  premium: string;
  coverage: string;
  suitability: number;
  keyFeatures: string[];
  description: string;
}