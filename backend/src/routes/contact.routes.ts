import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller';
import { validateContactForm } from '../middleware/validation.middleware';

const router = Router();

router.post('/submit', validateContactForm, submitContactForm);

export default router;

