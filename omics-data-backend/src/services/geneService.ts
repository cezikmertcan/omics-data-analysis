import { Gene } from '../database';

const getGeneByID = async (geneID: string): Promise<Gene | null> => {
  return await Gene.findByPk(geneID);
};

const getGeneListByIDs = async (geneIDs: string[]): Promise<Gene[]> => {
  return await Gene.findAll({
    where: { gene: geneIDs },
  });
};

const getGeneOptions = async (): Promise<
  { value: string; label: string }[]
> => {
  const all = await Gene.findAll();
  return all.map((g) => ({
    label: g.gene,
    value: g.gene,
  }));
};

export default {
  getGeneByID,
  getGeneListByIDs,
  getGeneOptions,
};
