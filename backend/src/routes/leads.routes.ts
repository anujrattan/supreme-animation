import { Router } from 'express';
import { getLeads, getLeadById, updateLeadStatus } from '../controllers/leads.controller';

const router = Router();

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.patch('/:id/status', updateLeadStatus);

export default router;

