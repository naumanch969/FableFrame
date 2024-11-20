import { pgTable, varchar, timestamp, text, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { User } from "./User";
import { Story } from "./Story";

const shareRestrictionEnum = pgEnum("share_restriction", ["read-only", "limited-time", "full-access"]);

export const Share = pgTable("Share", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    fromId: varchar("from_id", { length: 36 }).notNull().references(() => User.id), // FK to users
    toId: varchar("to_id", { length: 36 }).references(() => User.id), // Nullable FK for public sharing
    storyId: varchar("story_id", { length: 36 }).notNull().references(() => Story.id), // FK to Story
    sharedAt: timestamp("shared_at").notNull().defaultNow(),
    restriction: shareRestrictionEnum("restriction").default("full-access"),
    message: text("message"), // Optional sharing message
    expiresAt: timestamp("expires_at"), // Optional expiration timestamp
});

// Optional relationships
export const shareRelations = relations(Share, ({ one }) => ({
    fromUser: one(User, {
        fields: [Share.fromId],
        references: [User.id],
    }),
    toUser: one(User, {
        fields: [Share.toId],
        references: [User.id],
    }),
    story: one(Story, {
        fields: [Share.storyId],
        references: [Story.id],
    }),
}));
