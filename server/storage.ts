import {
  users,
  registrations,
  sponsors,
  supportTickets,
  speakers,
  type User,
  type InsertUser,
  type Registration,
  type InsertRegistration,
  type Sponsor,
  type InsertSponsor,
  type SupportTicket,
  type InsertSupportTicket,
  type Speaker,
  type InsertSpeaker,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllRegistrations(): Promise<Registration[]>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  
  getAllSponsors(): Promise<Sponsor[]>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  deleteSponsor(id: number): Promise<void>;
  
  getAllSupportTickets(): Promise<SupportTicket[]>;
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  replySupportTicket(id: number, reply: string): Promise<SupportTicket>;
  
  getAllSpeakers(): Promise<Speaker[]>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;
  deleteSpeaker(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations).orderBy(desc(registrations.createdAt));
  }

  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const [newRegistration] = await db.insert(registrations).values(registration).returning();
    return newRegistration;
  }

  async getAllSponsors(): Promise<Sponsor[]> {
    return await db.select().from(sponsors).orderBy(desc(sponsors.createdAt));
  }

  async createSponsor(sponsor: InsertSponsor): Promise<Sponsor> {
    const [newSponsor] = await db.insert(sponsors).values(sponsor).returning();
    return newSponsor;
  }

  async deleteSponsor(id: number): Promise<void> {
    await db.delete(sponsors).where(eq(sponsors.id, id));
  }

  async getAllSupportTickets(): Promise<SupportTicket[]> {
    return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
  }

  async createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket> {
    const [newTicket] = await db.insert(supportTickets).values(ticket).returning();
    return newTicket;
  }

  async replySupportTicket(id: number, reply: string): Promise<SupportTicket> {
    const [updatedTicket] = await db
      .update(supportTickets)
      .set({ 
        adminReply: reply, 
        status: "closed",
        repliedAt: new Date()
      })
      .where(eq(supportTickets.id, id))
      .returning();
    return updatedTicket;
  }

  async getAllSpeakers(): Promise<Speaker[]> {
    return await db.select().from(speakers).orderBy(speakers.order);
  }

  async createSpeaker(speaker: InsertSpeaker): Promise<Speaker> {
    const [newSpeaker] = await db.insert(speakers).values(speaker).returning();
    return newSpeaker;
  }

  async deleteSpeaker(id: number): Promise<void> {
    await db.delete(speakers).where(eq(speakers.id, id));
  }
}

export const storage = new DatabaseStorage();
