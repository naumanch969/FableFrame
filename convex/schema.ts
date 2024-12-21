import { ENTITIES_NAMES, FONT_TYPE, FRIEND_REQUESTS, GENDERS, LENGTH, NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES, PROFILE_VISIBILITY, REPORT_REASONS, SHARE_RESTRICTIONS, STORY_AGE_CATEGORIES, STORY_GENRES, STORY_IMAGE_STYLES, STORY_REPORT_STATUSES, STORY_STATUSES, STORY_TYPES, THEMES, USER_ROLES } from "@/constants";
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from 'convex/values'

const schema = defineSchema({
    ...authTables,
    profiles: defineTable({
        user_id: v.id("users"), // users table auto generated by authTables
        username: v.string(),
        email: v.string(),
        credit: v.number(),
        role: v.union(...USER_ROLES.map(item => v.literal(item.key))),
        profile_picture_url: v.optional(v.string()),
        bio: v.optional(v.string()),
        date_of_birth: v.optional(v.string()),
        is_verified: v.boolean(),
        preferences: v.optional(v.any()),
        notification_settings: v.optional(v.any()),
        location: v.optional(v.string()),
        // profile_color
    })
        .index("by_user_id", ["user_id"])
        .index("by_email", ["email"])
        .index("by_role", ["role"])
        .index("by_is_verified", ["is_verified"])
        .index("by_username", ["username"]),

    friend_requests: defineTable({
        sender_id: v.id("profiles"),
        receiver_id: v.id("profiles"),
        status: v.optional(v.union(...FRIEND_REQUESTS.map(item => v.literal(item.key)))) // TODO: make it unoptional if req
    })
        .index("by_sender_id", ["sender_id"])
        .index("by_receiver_id", ["receiver_id"])
        .index("by_sender_id_receiver_id_status", ["sender_id", "receiver_id", "status"])
        .index("by_receiver_id_status", ["receiver_id", "status"])
        .index("by_sender_id_status", ["sender_id", "status"])
        .index("by_status", ["status"]),

    friends: defineTable({
        profile_id: v.id("profiles"),
        friend_id: v.id("profiles"),
    })
        .index("by_profile_id", ["profile_id"])
        .index("by_profile_id_friend_id", ["profile_id", "friend_id"])
        .index("by_friend_id", ["friend_id"]),

    stories: defineTable({
        title: v.string(),
        profile_id: v.id("profiles"),
        genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))),
        image_style: v.union(...STORY_IMAGE_STYLES.map(item => v.literal(item.key))),
        age_category: v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key))),
        cover_image: v.string(),
        prompt: v.string(),
        type: v.union(...STORY_TYPES.map(item => v.literal(item.key))),
        is_public: v.boolean(),
        status: v.union(...STORY_STATUSES.map(item => v.literal(item.key))),
        views_count: v.number(),
        reading_time: v.optional(v.number()),
        ratings_average: v.number(),
        reports_count: v.number(),
        ai_output: v.string(),
        chapters: v.array(v.any()),
    })
        .index("by_profile_id", ["profile_id"])
        .index("by_genre", ["genre"])
        .index("by_status", ["status"])
        .index("by_is_public", ["is_public"])
        .index("by_views_count", ["views_count"])
        .index("by_profile_id_and_status", ["profile_id", "status"])
        .index("by_profile_id_and_type", ["profile_id", "type"])
        .index("by_age_category", ["age_category"]),

    likes: defineTable({
        story_id: v.id("stories"),
        profile_id: v.id("profiles"),
    })
        .index("by_profile_id", ["profile_id"])
        .index("by_story_id", ["story_id"]),

    comments: defineTable({
        content: v.string(),
        profile_id: v.id("profiles"),
        story_id: v.id("stories"),
        parent_id: v.optional(v.id("profiles")),
        likes_count: v.number(),
        reports_count: v.number(),
        is_deleted: v.boolean(),
    })
        .index("by_story_id", ["story_id"])
        .index("by_profile_id", ["profile_id"])
        .index("by_story_id_is_deleted", ["story_id", "is_deleted"])
    ,

    hashtags: defineTable({
        hashtag: v.string(),
    }),

    notifications: defineTable({
        profile_id: v.id("profiles"),
        type: v.union(...NOTIFICATION_TYPES.map(item => v.literal(item.key))),
        content: v.string(),
        is_read: v.boolean(),
        related_entity_id: v.optional(v.string()),
        link: v.optional(v.string()),
        entity_name: v.union(...ENTITIES_NAMES.map(item => v.literal(item.key))),
        priority: v.union(...NOTIFICATION_PRIORITIES.map(item => v.literal(item.key))),
        is_dismissed: v.boolean(),
    }),

    shares: defineTable({
        from_id: v.id("profiles"),
        to_id: v.id("profiles"),
        story_id: v.id("stories"),
        shared_at: v.string(),
        restriction: v.union(...SHARE_RESTRICTIONS.map(item => v.literal(item.key))),
        message: v.string(),
        expires_at: v.string(),
    })
        .index("by_from_id", ["from_id"])
        .index("by_to_id", ["to_id"])
        .index("by_story_id", ["story_id"])
        .index("by_restriction", ["restriction"]),

    story_reports: defineTable({
        story_id: v.id("stories"),
        profile_id: v.id("profiles"),
        type: v.union(...REPORT_REASONS.map(item => v.literal(item.key))),
        reason: v.optional(v.string()),
        status: v.union(...STORY_REPORT_STATUSES.map(item => v.literal(item.key))),
        created_at: v.string(),
    })
        .index("by_story_id", ["story_id"]),

    contacts: defineTable({
        name: v.string(),
        email: v.string(),
        message: v.string(),
        created_at: v.string(),
    })
        .index("by_email", ["email"]),

    chats: defineTable({
        last_message: v.optional(v.string()),
        last_message_timestamp: v.optional(v.string()),
        participants: v.array(v.id("profiles")),
        // TODO: we can store last 5 messages
    })
        .index("by_last_message_timestamp", ["last_message_timestamp"]),

    messages: defineTable({
        chat_id: v.id("chats"),
        receiver_id: v.id("profiles"),
        sender_id: v.id("profiles"),
        read_by: v.array(v.id("profiles")),
        text: v.optional(v.string()),
    })
        .index("by_chat_id", ["chat_id"])
        .index("by_sender_id", ["sender_id"])
        .index("by_receiver_id", ["receiver_id"]),

    preferences: defineTable({
        profile_id: v.id("profiles"),
        theme: v.union(...THEMES.map(item => v.literal(item.key))),
        language: v.string(), // e.g., 'en', 'es'
        font_size: v.union(...LENGTH.map(item => v.literal(item.key))),
        notifications: v.object({
            likes: v.boolean(),
            shares: v.boolean(),
            new_features: v.boolean(),
            story: v.boolean(),
            friends: v.boolean(),
            account: v.boolean(),
        }),
        story_preferences: v.object({
            genres: v.array(v.union(...STORY_GENRES.map(item => v.literal(item.key)))),
            age_category: v.array(v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key)))),
            preferred_length: v.array(v.union(...LENGTH.map(item => v.literal(item.key)))),
            content_filter: v.boolean(),
        }),
        accessibility: v.object({
            text_to_speech: v.object({
                voice: v.union(...GENDERS.map(item => v.literal(item.key))),
                pitch: v.number(),
                speed: v.number(),
            }),
            font_type: v.union(...FONT_TYPE.map(item => v.literal(item.key))),
            auto_narration: v.boolean(),
        }),

        profile_visibility: v.union(...PROFILE_VISIBILITY.map(item => v.literal(item.key))),

        genre_frequency: v.array(v.object({ genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))), frequency: v.number() })),
        category_frequency: v.array(v.object({ category: v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key))), frequency: v.number() })),

    })
        .index("by_profile_id", ["profile_id"])


})

export default schema;
