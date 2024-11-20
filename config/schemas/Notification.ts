import {
    pgTable,
    varchar,
    text,
    boolean,
    uuid,
    timestamp,
    integer,
    pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { User } from "./User";
import { Story } from "./Story";

const notificationTypeEnum = pgEnum("notification_type", ["comment", "like", "share", "follow", "reply"]);
const notificationPriorityEnum = pgEnum("notification_priority", ["critical", "high", "normal"]);

export const Notification = pgTable("Notification", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    userId: varchar("user_id", { length: 36 }).notNull().references(() => User.id), // FK to User
    type: notificationTypeEnum("type").notNull(),   // Notification type
    content: text("content").notNull(),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    relatedEntityId: varchar("related_entity_id", { length: 36 }), // ID of the related entity (e.g., Story, User)
    entityType: varchar("entity_type", { length: 50 }), // Type of the related entity (e.g., 'story', 'user')
    priority: notificationPriorityEnum("priority").notNull().default("normal"),
    isDismissed: boolean("is_dismissed").default(false),
});

export const notificationRelations = relations(Notification, ({ one }) => ({
    user: one(User, {
        fields: [Notification.userId],
        references: [User.id],
    }),
    story: one(Story, {
        fields: [Notification.relatedEntityId],
        references: [Story.id],
    }),
}));