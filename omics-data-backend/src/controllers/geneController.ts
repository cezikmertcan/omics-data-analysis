import { Request, Response } from 'express';
import geneService from '../services/geneService';
import { mean, median, variance, quantile } from 'simple-statistics';
import { Gene } from '../database';
const getGeneOptions = async (req: Request, res: Response) => {
  const options = await geneService.getGeneOptions();
  res.json(options);
};

const getGeneListByIDs = async (req: Request, res: Response) => {
  try {
    const geneIDs: string[] = req.body.geneIDs;
    if (!geneIDs || !Array.isArray(geneIDs)) {
      return res
        .status(400)
        .json({ error: 'Invalid geneIDs. Please provide a valid array.' });
    }
    const genes = await geneService.getGeneListByIDs(geneIDs);
    if (genes.length < 1) {
      res.json([]);
      return;
    }
    const values = genes.map((gene) => [
      gene.sampleA_expression_val,
      gene.sampleB_expression_val,
      gene.sampleC_expression_val,
      gene.sampleD_expression_val,
    ]);
    const transposedValues = values[0].map((col, i) =>
      values.map((row) => row[i])
    );

    const q1 = transposedValues.map((column) => {
      const sortedColumn = column.slice().sort((a, b) => a - b);
      const middle = Math.floor(sortedColumn.length / 4);
      return sortedColumn.length % 4 === 0
        ? (sortedColumn[middle - 1] + sortedColumn[middle]) / 2
        : sortedColumn[middle];
    });

    const q3 = transposedValues.map((column) => {
      const sortedColumn = column.slice().sort((a, b) => a - b);
      const middle = Math.floor((3 * sortedColumn.length) / 4);
      return sortedColumn.length % 4 === 0
        ? (sortedColumn[middle - 1] + sortedColumn[middle]) / 2
        : sortedColumn[middle];
    });
    const iqr = q3.map((q3Val, i) => q3Val - q1[i]);
    const lowerBounds = q1.map((q1Val, i) => q1Val - 1.5 * iqr[i]);
    const upperBounds = q3.map((q3Val, i) => q3Val + 1.5 * iqr[i]);
    const outliers = values.map((entry) =>
      entry.some((value, j) => value < lowerBounds[j] || value > upperBounds[j])
    );
    const resp: Gene[] = [];
    genes.forEach((gene, index) => {
      resp.push({
        ...gene.get(),
        isOutlier: outliers[index],
      });
    });
    res.json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStatistics = async (req: Request, res: Response) => {
  try {
    const geneID: string = req.params.geneID;
    if (!geneID || typeof geneID !== 'string') {
      return res
        .status(400)
        .json({ error: 'Invalid geneID. Please provide a valid string.' });
    }
    const gene = await geneService.getGeneByID(geneID);
    if (!gene) {
      return res.status(404).json({ error: 'Gene not found.' });
    }
    const geneValues: number[] = [
      gene.sampleA_expression_val,
      gene.sampleB_expression_val,
      gene.sampleC_expression_val,
      gene.sampleD_expression_val,
    ];
    return res.json({
      gene: geneID,
      mean: Number(mean(geneValues).toFixed(2)),
      median: Number(median(geneValues).toFixed(2)),
      variance: Number(variance(geneValues).toFixed(2)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default {
  getGeneOptions,
  getStatistics,
  getGeneListByIDs,
};
