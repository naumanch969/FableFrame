import { pgTable, serial, text, varchar, json, integer, timestamp, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core";

export const Story = pgTable("story", {
    id: serial('id').primaryKey(),
    storySubject: text('story_subject'),
    storyType: varchar('story_type'),
    ageGroup: text('age_group'),
    imageStyle: text('image_style'),
    output: json('output'),
    coverImage: varchar('cover_image'),
    userEmail: varchar('user_email'),
    userName: varchar('user_name'),
    userImage: varchar('user_image'),
    createdAt: text('created_at'),
    updatedAt: text('updated_at'),
})

export const User = pgTable("user", {
    id: serial('id').primaryKey(),
    userName: varchar('user_name'),
    userEmail: varchar('user_email'),
    userImage: varchar('user_image'),
    credit: integer('credit').default(3),
    createdAt: text('created_at'),
    updatedAt: text('updated_at'),
})

export const users = pgTable("users", {
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

const genreEnum = pgEnum("genre", ["fantasy", "mystery", "romance", "sci-fi", "thriller", "non-fiction", "poetry"]);
const ageCategoryEnum = pgEnum("age_category", ["children", "young_adult", "adult"]);
const statusEnum = pgEnum("status", ["draft", "published", "archived"]);

export const stories = pgTable("stories", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    authorId: varchar("author_id", { length: 36 }).notNull().references(() => users.id), // Foreign Key
    genre: genreEnum("genre").notNull(),
    ageCategory: ageCategoryEnum("age_category"),
    isPublic: boolean("is_public").notNull().default(true),
    likesCount: integer("likes_count").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    status: statusEnum("status").notNull().default("draft"),
    tags: array(varchar("tags", { length: 50 }), "text").default([]),
    viewsCount: integer("views_count").notNull().default(0),
    commentsCount: integer("comments_count").notNull().default(0),
    coverImage: varchar("cover_image", { length: 255 }),
    readingTime: integer("reading_time"),
    narrationAudio: varchar("narration_audio", { length: 255 }),
    ratingsAverage: float("ratings_average").notNull().default(0),
    reportsCount: integer("reports_count").notNull().default(0),
});

// Define relationships (optional but helpful)
export const storyRelations = relations(stories, ({ one }) => ({
    author: one(users, {
        fields: [stories.authorId],
        references: [users.id],
    }),
}));
