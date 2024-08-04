import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory({
  // points: 100, // 100 requests per windowMs
  // duration: 15 * 60 * 1000, // 15 minutes
  points: 10, // 10 requests per windowMs
  duration: 1 * 60 * 1000, // 1 minute
});

// Middleware function to handle rate limiting
export default async function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimiter.consume(req.ip); // Consume a point from the rate limiter
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle rate limit exceeded error
    res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }
}