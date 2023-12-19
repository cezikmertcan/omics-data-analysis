import express from 'express';
import geneController from '../controllers/geneController';
const router = express.Router();
router.get('/options', geneController.getGeneOptions);
router.post('/genes', geneController.getGeneListByIDs);
router.get('/:geneID/statistics', geneController.getStatistics);
export default router;
