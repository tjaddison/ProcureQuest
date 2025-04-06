// Game type definitions

export type Supplier = {
  name: string;
  contractNumber: string;
  annualSpend: string;
};

export type Decision = {
  id: string;
  text: string;
  isOptimal: boolean;
  impact: {
    budget: number;
    risk: number;
    stability: number;
    reputation: number;
  };
  explanation?: string;
};

export type Scenario = {
  id: number;
  title: string;
  issue: string;
  challenge: string;
  opportunity: string;
  suppliers: Supplier[];
  decision: {
    prompt: string;
    options: Decision[];
    optimalDecision: string;
    quote: string;
    transitionCost: string;
  };
  marketData?: {
    trends?: string[];
    risks?: string[];
    opportunities?: string[];
  };
  supplierPerformance?: Record<string, {
    deliveryRisk: 'Low' | 'Medium' | 'High';
    qualityScore?: number;
    innovationRating?: number;
  }>;
  completed?: boolean;
};

export type GameMetrics = {
  budget: number;
  risk: number;
  stability: number;
  reputation: number;
};

export type PlayerState = {
  name: string;
  currentScenarioId: number;
  completedScenarios: number[];
  metrics: GameMetrics;
  decisions: Record<number, string>; // scenarioId -> decisionId
  score: number;
  lastUpdated: number;
};

export type MultiplayerState = {
  roomId: string;
  players: Record<string, PlayerState>;
  host: string;
  scenarioLock?: number;
};