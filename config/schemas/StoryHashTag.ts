import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { Story } from "./Story";
import { HashTag } from "./HashTag";

export const storyHashtags = pgTable("story_hashtags", {
    storyId: varchar("story_id", { length: 36 }).notNull().references(() => Story.id), // Foreign key to Story
    hashtagId: varchar("hashtag_id", { length: 36 }).notNull().references(() => HashTag.id), // Foreign key to Hashtag
    createdAt: timestamp("created_at").notNull().defaultNow(), // Timestamp of when the hashtag was added
});
