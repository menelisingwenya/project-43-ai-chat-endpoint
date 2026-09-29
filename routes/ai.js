import { Router } from 'express';
import { chat, summarize, rag } from '../controllers/aiController.js';
import { authenticateToken } from '../../../phase-02-backend-development/backend/src/middleware/auth.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Protected chat endpoint with rate limiting
router.post('/chat', authenticateToken, aiRateLimiter, chat);

// Additional AI convenience endpoints
router.post('/summarize', authenticateToken, aiRateLimiter, summarize);
router.post('/rag', authenticateToken, aiRateLimiter, rag);

export default router;
