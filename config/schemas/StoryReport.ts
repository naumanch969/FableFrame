import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { Story } from "./Story";
import { User } from "./User";

const storyReportStatusEnum = pgEnum("story_report_status", ["pending", "resolved", "dismissed"]);

export const StoryReport = pgTable("story_reports", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    storyId: varchar("story_id", { length: 36 }).notNull().references(() => Story.id), // FK to the Story table
    userId: varchar("user_id", { length: 36 }).notNull().references(() => User.id), // FK to the User table
    reason: varchar("reason", { length: 255 }).notNull(),
    status: storyReportStatusEnum("status").notNull().default("pending"), // Status of the report
    createdAt: timestamp("created_at").notNull().defaultNow(),
});
