import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
  email: z.string().email('Invalid email address').max(255, 'Email is too long'),
  company: z.string().max(200, 'Company name is too long').optional(),
  projectNeed: z.string().min(1, 'Project need is required').max(200, 'Project need is too long'),
  budget: z.string().max(100, 'Budget is too long').optional(),
  message: z.string().min(1, 'Message is required').max(5000, 'Message is too long')
});

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    contactFormSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    next(error);
  }
};

