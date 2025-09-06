import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleSignup, handleLogin, handleVerify } from "./routes/auth";
import projectsRouter from "./routes/projects";
import { authenticateToken } from "./middleware/auth";
import { initializeDatabase, getUsersByRole } from "./db";

export function createServer() {
  const app = express();

  // Initialize database
  initializeDatabase().catch(console.error);

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/verify", authenticateToken, handleVerify);

  // Projects routes
  app.use("/api/projects", projectsRouter);

  // Users routes
  app.get("/api/users", authenticateToken, async (req, res) => {
    try {
      const { role } = req.query;
      if (role && typeof role === 'string') {
        const users = await getUsersByRole(role);
        res.json({ success: true, users });
      } else {
        res.status(400).json({ success: false, message: 'Role parameter is required' });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  return app;
}
