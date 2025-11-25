import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertRegistrationSchema,
  insertSponsorSchema,
  insertSupportTicketSchema,
  insertSpeakerSchema,
} from "@shared/schema";

// Simple admin authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const isAdmin = req.session?.isAdmin;
  if (!isAdmin) {
    return res.status(401).json({ error: "Unauthorized - Admin access required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin session status check
  app.get("/api/admin/session", async (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // Admin Login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username === "cmr" && password === "cmr@2026") {
        req.session.isAdmin = true;
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    req.session.isAdmin = false;
    res.json({ success: true });
  });

  // Registrations (Admin Protected)
  app.get("/api/registrations", requireAdmin, async (_req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/registrations", async (req, res) => {
    try {
      const validated = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validated);
      res.status(201).json(registration);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Sponsors
  app.get("/api/sponsors", async (_req, res) => {
    try {
      const sponsors = await storage.getAllSponsors();
      res.json(sponsors);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/sponsors", requireAdmin, async (req, res) => {
    try {
      const validated = insertSponsorSchema.parse(req.body);
      const sponsor = await storage.createSponsor(validated);
      res.status(201).json(sponsor);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/sponsors/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSponsor(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Support Tickets (Admin Protected)
  app.get("/api/support", requireAdmin, async (_req, res) => {
    try {
      const tickets = await storage.getAllSupportTickets();
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/support", async (req, res) => {
    try {
      const validated = insertSupportTicketSchema.parse(req.body);
      const ticket = await storage.createSupportTicket(validated);
      res.status(201).json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/support/:id/reply", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { reply } = req.body;
      
      if (!reply || typeof reply !== "string") {
        return res.status(400).json({ error: "Reply is required" });
      }

      const ticket = await storage.replySupportTicket(id, reply);
      res.json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Speakers
  app.get("/api/speakers", async (_req, res) => {
    try {
      const speakers = await storage.getAllSpeakers();
      res.json(speakers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/speakers", requireAdmin, async (req, res) => {
    try {
      const validated = insertSpeakerSchema.parse(req.body);
      const speaker = await storage.createSpeaker(validated);
      res.status(201).json(speaker);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/speakers/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSpeaker(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
