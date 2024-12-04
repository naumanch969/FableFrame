import { COMMENT_STATUSES, NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES, SHARE_RESTRICTIONS, STORY_AGE_CATEGORIES, STORY_GENRES, STORY_IMAGE_STYLES, STORY_REPORT_STATUSES, STORY_STATUSES, STORY_TYPES, USER_ROLES } from "@/constants";
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from 'convex/values'

const schema = defineSchema({
    ...authTables,
    users: defineTable({
        username: v.string(),
        email: v.string(),
        role: v.union(...USER_ROLES.map(v.literal)),
        profile_picture_url: v.optional(v.string()),
        bio: v.optional(v.string()),
        date_of_birth: v.optional(v.string()),
        is_verified: v.boolean(),
        preferences: v.optional(v.any()),
        notification_settings: v.optional(v.any()),
        location: v.optional(v.string()),
    })
        .index("by_email", ["email"])
        .index("by_role", ["role"])
        .index("by_is_verified", ["is_verified"])
        .index("by_username", ["username"]),

    stories: defineTable({
        title: v.string(),
        content: v.string(),
        author_id: v.id("users"),
        genre: v.union(...STORY_GENRES.map(v.literal)),
        image_style: v.union(...STORY_IMAGE_STYLES.map(v.literal)),
        age_category: v.union(...STORY_AGE_CATEGORIES.map(v.literal)),
        cover_image: v.string(),
        type: v.union(...STORY_TYPES.map(v.literal)),
        is_public: v.boolean(),
        status: v.union(...STORY_STATUSES.map(v.literal)),
        views_count: v.number(),
        reading_time: v.optional(v.number()),
        ratings_average: v.number(),
        reports_count: v.number(),
    })
        .index("by_author_id", ["author_id"])
        .index("by_genre", ["genre"])
        .index("by_status", ["status"])
        .index("by_is_public", ["is_public"])
        .index("by_views_count", ["views_count"])
        .index("by_age_category", ["age_category"]),

    comments: defineTable({
        content: v.string(),
        author_id: v.id("users"),
        story_id: v.id("stories"),
        status: v.union(...COMMENT_STATUSES.map(v.literal)),
        parent_id: v.optional(v.string()),
        likes_count: v.number(),
        reports_count: v.number(),
        is_deleted: v.boolean(),
    }),

    hashtags: defineTable({
        hashtag: v.string(),
    }),

    notifications: defineTable({
        user_id: v.id("users"),
        type: v.union(...NOTIFICATION_TYPES.map(v.literal)),
        content: v.string(),
        is_read: v.boolean(),
        related_entity_id: v.optional(v.string()),
        entity_type: v.optional(v.string()),
        priority: v.union(...NOTIFICATION_PRIORITIES.map(v.literal)),
        is_dismissed: v.boolean(),
    }),

    shares: defineTable({
        from_id: v.id("users"),
        to_id: v.id("users"),
        story_id: v.id("stories"),
        shared_at: v.string(),
        restriction: v.union(...SHARE_RESTRICTIONS.map(v.literal)),
        message: v.string(),
        expires_at: v.string(),
    }),

    story_reports: defineTable({
        story_id: v.id("stories"),
        user_id: v.id("users"),
        reason: v.string(),
        status: v.union(...STORY_REPORT_STATUSES.map(v.literal)),
        created_at: v.string(),
    }),
})

export default schema;
