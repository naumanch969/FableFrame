import {
    pgTable,
    serial,
    text,
    varchar,
    integer,
    timestamp,
    boolean,
    jsonb,
    pgEnum,
    doublePrecision,
  } from "drizzle-orm/pg-core";
  import { sql, relations } from "drizzle-orm";
  
  const genreEnum = pgEnum("genre", ["fantasy", "mystery", "romance", "sci-fi", "thriller", "non-fiction", "poetry"]);
  const ageCategoryEnum = pgEnum("age_category", ["children", "young_adult", "adult"]);
  const statusEnum = pgEnum("status", ["draft", "published", "archived"]);
  
  export const User = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
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
  
  export const stories = pgTable("stories", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    authorId: varchar("author_id", { length: 36 }).notNull().references(() => User.id), // Foreign Key
    genre: genreEnum("genre").notNull(),
    ageCategory: ageCategoryEnum("age_category"),
    isPublic: boolean("is_public").notNull().default(true),
    likesCount: integer("likes_count").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    status: statusEnum("status").notNull().default("draft"),
    tags: jsonb("tags").default(sql`'[]'::jsonb`),
    viewsCount: integer("views_count").notNull().default(0),
    commentsCount: integer("comments_count").notNull().default(0),
    coverImage: varchar("cover_image", { length: 255 }),
    readingTime: integer("reading_time"),
    narrationAudio: varchar("narration_audio", { length: 255 }),
    ratingsAverage: doublePrecision("ratings_average").notNull().default(0),
    reportsCount: integer("reports_count").notNull().default(0),
  });
  
  // Define relationships
  export const storyRelations = relations(stories, ({ one }) => ({
    author: one(User, {
      fields: [stories.authorId],
      references: [User.id],
    }),
  }));
  