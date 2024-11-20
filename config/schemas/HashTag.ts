import { pgTable, varchar } from "drizzle-orm/pg-core";

export const HashTag = pgTable("HashTag", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    hashtag: varchar("hashtag", { length: 100 }).notNull().unique(), // Unique constraint on hashtag
  });
  