import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import geneRoutes from './routes/geneRoutes';
import { Gene, sequelize } from './database';
import cors from 'cors';
import { promises as fsPromises } from 'fs';
import { Mock } from './interfaces/mock';
const mockFilePath = './mock.json';
getMockValues();

(async () => {
  await sequelize.sync({ force: true });
  const values = await getMockValues();
  Gene.bulkCreate(values as any[]);
})();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use('/gene', geneRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
[];
async function getMockValues(): Promise<Mock[]> {
  const data = await fsPromises.readFile(mockFilePath, 'utf8');
  let mockData: Mock[] = JSON.parse(data);
  return mockData;
}
