import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { GeneOption } from './interfaces/GeneOption';
import { GeneData } from './interfaces/GeneData';
import GeneChart from './components/GeneChart';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:81';

function App() {
  const [selectedGenes, setSelectedGenes] = useState<GeneOption[]>([]);
  const [geneOptions, setGeneOptions] = useState<GeneOption[]>([]);
  const [geneData, setGeneData] = useState<GeneData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geneOptions = async () => {
      try {
        const response = await axios.get<GeneOption[]>(`${API_BASE_URL}/gene/options`)
        setGeneOptions(response.data);
      } catch {
        console.error('Error fetching gene options:', error);
        setError('An error occurred while fetching gene options.');
      }
    }
    geneOptions();
  }, [])
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/gene/genes`, {
        geneIDs: selectedGenes.map(g => g.value)
      });

      setGeneData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('An error occurred while fetching data.');
      setGeneData([]);
    }
  };

  const handleAnalysis = async (gene: GeneData) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/gene/${gene.gene}/statistics`);
      gene.statistics = response.data;
      setGeneData([...geneData]);
      setError(null);
    } catch (error) {
      console.error(`Error analyzing data for gene ${gene.gene}:`, error);
      setError('An error occurred while fetching analysis data.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Omics Data Frontend</h1>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="geneIDs" style={{ marginRight: '10px' }}>Select Gene IDs:</label>
        <Select
          isMulti
          options={geneOptions}
          value={selectedGenes}
          onChange={(selectedOptions) => setSelectedGenes(selectedOptions as { value: string; label: string; }[])}
        />
        <button style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }} onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      {geneData.length > 0 && (
        <div>
          <h2>Gene Data:</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Gene</th>
                <th style={tableHeaderStyle}>Sample A Value</th>
                <th style={tableHeaderStyle}>Sample B Value</th>
                <th style={tableHeaderStyle}>Sample C Value</th>
                <th style={tableHeaderStyle}>Sample D Value</th>
                <th style={tableHeaderStyle}>Analysis Result</th>
              </tr>
            </thead>
            <tbody>
              {geneData.map((gene) => (
                <tr key={gene.gene} style={{ background: gene.isOutlier ? "#f26f6f" : "" }}>
                  <td style={tableCellStyle}>{gene.gene}<strong>{gene.isOutlier ? " [Outlier]" : ""}</strong></td>
                  <td style={tableCellStyle}>{gene.sampleA_expression_val}</td>
                  <td style={tableCellStyle}>{gene.sampleB_expression_val}</td>
                  <td style={tableCellStyle}>{gene.sampleC_expression_val}</td>
                  <td style={tableCellStyle}>{gene.sampleD_expression_val}</td>
                  <td style={tableCellStyle}>
                    {gene.statistics == null ? (
                      <button style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleAnalysis(gene)}>Analyze</button>
                    ) : (
                      <>Mean - {gene.statistics.mean}, Median - {gene.statistics.median}, Variance - {gene.statistics.variance}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <GeneChart geneData={geneData}></GeneChart>
          </div>
        </div>
      )}
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  background: '#f2f2f2',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
};
export default App;
