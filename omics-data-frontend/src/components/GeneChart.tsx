import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartType } from 'chart.js/auto';
import { GeneChartProps } from '../interfaces/GeneChartProps';

const GeneChart: React.FC<GeneChartProps> = ({ geneData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart<"line", any> | null>(null);


  useEffect(() => {
    if (!chartRef.current)
      return;
    const ctx = chartRef.current.getContext('2d');
    if (geneData.length < 0)
      return;
    const datasets = geneData.map((gene) => ({
      label: gene.gene,
      data: {
        "Sample A": gene.sampleA_expression_val,
        "Sample B": gene.sampleB_expression_val,
        "Sample C": gene.sampleC_expression_val,
        "Sample D": gene.sampleD_expression_val
      },
      borderColor: gene.color
    }));
    if (!ctx) return;
    if (chartInstance) {
      chartInstance.destroy();
    }
    const chart = new Chart(ctx, {
      type: 'line',
      data: { datasets },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            mode: "index"
          },
        },
        interaction: {
          intersect: false
        },
        scales: {
          x: {
            display: true,
            title: { display: true }
          },
          y: {
            display: true,
            title: { display: true, text: "Expression" },
            suggestedMax: 11,
            suggestedMin: -1
          }
        }
      },
    });
    setChartInstance(chart)
  }, [geneData]);

  return <div style={{ width: 800, margin: "auto" }}><canvas ref={chartRef} /></div>;
};

export default GeneChart;
