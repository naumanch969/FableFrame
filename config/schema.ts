import { pgTable, serial, text, varchar, json } from "drizzle-orm/pg-core";

export const Story = pgTable("story", {
    id: serial('id').primaryKey(),
    storySubject: text('story_subject'),
    storyType: varchar('story_type'),
    ageGroup: text('age_group'),
    imageStyle: text('image_style'),
    output: json('output'),
    coverImage: varchar('cover_image'),
})