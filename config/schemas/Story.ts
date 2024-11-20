import {
    pgTable,
    varchar,
    text,
    boolean,
    integer,
    timestamp,
    real,
    pgEnum,

} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { User } from "./User";

const storyStatusEnum = pgEnum("story_status", ["published", "draft", "deleted", "archived"]);
const storyTypeEnum = pgEnum("story_type", ["ai_generated", "manual"]);
const imageStyleEnum = pgEnum("image_style", ["3D-cartoon", "paper-cut", "water-color", "pixel-style"]);
const storyGenreEnum = pgEnum("genre", ["general", "fantasy", "sci-fi", "mystery", "romance", "horror", "thriller", "adventure", "historical", "non-fiction", "drama", "comedy"]);
const ageCategoryEnum = pgEnum("age_category", [
    "children", // (e.g., 0 - 12)
    "teens", // (e.g., 13 - 19)
    "young_adult", // (e.g., 20 - 30)
    "adult", // (e.g., 30 +)
    "mature" // (e.g., 18 + or more specific content)
]);

export const Story = pgTable("Story", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    authorId: varchar("author_id", { length: 36 }).notNull().references(() => User.id), // FK to User
    genre: storyGenreEnum("genre").notNull().default("general"),
    imageStyle: imageStyleEnum("genre").notNull(),
    ageCategory: ageCategoryEnum("age_category").notNull(),
    coverImage: varchar("cover_image").notNull(),
    type: storyTypeEnum("type").notNull().default("ai_generated"),
    isPublic: boolean("is_public").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    status: storyStatusEnum("status").notNull().default("draft"),
    viewsCount: integer("views_count").notNull().default(0),
    readingTime: integer("reading_time"),
    ratingsAverage: real("ratings_average").notNull().default(0),
    reportsCount: integer("reports_count").notNull().default(0),
    // narrationAudio: varchar("narration_audio", { length: 255 }), // URL or path
});

// Optional relationships
export const storyRelations = relations(Story, ({ one }) => ({
    author: one(User, {
        fields: [Story.authorId],
        references: [User.id],
    }),
}));
