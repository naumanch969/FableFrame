import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { Story } from "./Story";
import { User } from "./User";

export const StoryLikes = pgTable("story_likes", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID 
    storyId: varchar("story_id", { length: 36 }).notNull().references(() => Story.id), // FK to Story
    userId: varchar("user_id", { length: 36 }).notNull().references(() => User.id), // FK to User
    createdAt: timestamp("created_at").notNull().defaultNow(), // Timestamp of when the like happened
});
