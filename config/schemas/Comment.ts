import {
    pgTable,
    varchar,
    text,
    integer,
    timestamp,
    boolean
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { User } from "./User";
import { Story } from "./Story";

export const Comment = pgTable("Comment", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    content: text("content").notNull(), // Content content
    authorId: varchar("author_id", { length: 36 }).notNull().references(() => User.id), // FK to User
    storyId: varchar("story_id", { length: 36 }).notNull().references(() => Story.id), // FK to Story
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    status: varchar("status", { length: 50 }).notNull().default("approved"), // Default status is 'approved'
    parentId: varchar("parent_id", { length: 36 }), // Nullable parentId for replies
    likesCount: integer("likes_count").notNull().default(0),
    reportsCount: integer("reports_count").notNull().default(0), // Number of reports
    isDeleted: boolean("is_deleted").notNull().default(false), // Flag to indicate if comment is deleted
});

// Optional Relationships
export const commentRelations = relations(Comment, ({ one }) => ({
    author: one(User, {
        fields: [Comment.authorId],
        references: [User.id]
    }),
    story: one(Story, {
        fields: [Comment.storyId],
        references: [Story.id]
    }),
}));
