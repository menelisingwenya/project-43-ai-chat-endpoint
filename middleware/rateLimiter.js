// Sliding window in-memory rate limiter for AI queries
const requestWindows = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

export function aiRateLimiter(req, res, next) {
  const identifier = req.user?.id || req.ip || 'anonymous';
  const now = Date.now();

  const windowData = requestWindows.get(identifier) || [];
  const validRequests = windowData.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (validRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'RateLimitExceeded',
      message: `Rate limit of ${MAX_REQUESTS} AI queries per minute exceeded. Please wait a few seconds.`,
      retryAfterSeconds: Math.ceil((validRequests[0] + WINDOW_MS - now) / 1000)
    });
  }

  validRequests.push(now);
  requestWindows.set(identifier, validRequests);
  next();
}
