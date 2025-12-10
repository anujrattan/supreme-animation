import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes';
import leadsRoutes from './routes/leads.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Backend Server Running');
  console.log('='.repeat(60));
  console.log(`📍 Backend URL: http://localhost:${PORT}`);
  console.log(`📍 Frontend URL: ${FRONTEND_URL}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(60) + '\n');
});

