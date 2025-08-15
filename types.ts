
export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

export interface AnalysisResult {
  sentiment: Sentiment;
  confidence: number;
  explanation: string;
}
