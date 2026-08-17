import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import {
  listHandler,
  createHandler,
  getByDateHandler,
  updateByDateHandler,
  statsHandler,
  insightsHandler,
} from '../controllers/journal.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/stats', statsHandler);
router.get('/insights', insightsHandler);
router.get('/', listHandler);
router.post('/', createHandler);
router.get('/:date', getByDateHandler);
router.patch('/:date', updateByDateHandler);

export default router;