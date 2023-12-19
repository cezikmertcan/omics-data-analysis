import { Statistics } from './Statistics';

export interface GeneData {
  gene: string;
  sampleA_expression_val: number;
  sampleB_expression_val: number;
  sampleC_expression_val: number;
  sampleD_expression_val: number;
  color: string;
  isOutlier: boolean;
  statistics: Statistics;
}
