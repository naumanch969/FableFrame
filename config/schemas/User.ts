import { pgTable, varchar, text, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const User = pgTable("User", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    role: varchar("role", { length: 20 }).default("user").notNull(), // "user" or "admin"
    profilePictureUrl: varchar("profile_picture_url", { length: 255 }), // Optional
    bio: text("bio"), // Optional
    dateOfBirth: timestamp("date_of_birth", { withTimezone: true }), // Optional
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    preferences: jsonb("preferences"), // JSON object for user settings
    notificationSettings: jsonb("notification_settings"), // JSON object for notifications
    location: varchar("location", { length: 100 }), // Optional
});

