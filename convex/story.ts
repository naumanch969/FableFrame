import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { auth } from './auth'
import { STORY_AGE_CATEGORIES, STORY_GENRES, STORY_IMAGE_STYLES, STORY_STATUSES, STORY_TYPES, USER_ROLES } from '@/constants'

// export const generateStoryContent = action({
//     args: {
//         prompt: v.string(),
//     },
//     handler: async ({ prompt }: any) => {
//         try {
//             const result = await chatSession.sendMessage(prompt);
//             const ai_output = JSON.parse(result?.response?.text() || "{}");
//             return ai_output;
//         } catch (error) {
//             console.error("Error generating story:", error);
//             throw new Error("Failed to generate story content.");
//         }
//     },
// });


export const create_ai = mutation({
    args: {
        title: v.string(),
        prompt: v.string(),
        genre: v.union(...STORY_GENRES.map(v.literal)),
        image_style: v.union(...STORY_IMAGE_STYLES.map(v.literal)),
        age_category: v.union(...STORY_AGE_CATEGORIES.map(v.literal)),
        type: v.union(...STORY_TYPES.map(v.literal)),
        is_public: v.boolean(),
        status: v.union(...STORY_STATUSES.map(v.literal)),
        cover_image: v.string(),
        ai_output: v.any(),
        chapters: v.array(v.any())
    },
    handler: async (ctx, args) => {
        const { title, prompt, genre, image_style, age_category, type, is_public, status, ai_output, cover_image, chapters } = args;

        if (!title) throw new Error("Title is required");
        if (!genre) throw new Error("Genre is required");
        if (!image_style) throw new Error("Image style is required");
        if (!age_category) throw new Error("Age category is required");
        if (!type) throw new Error("Type is required");
        if (!is_public) throw new Error("Public flag is required");
        if (!status) throw new Error("Status is required");

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error('Unauthenticated');

        let content = '';
        chapters.forEach((chapter: any) => {
            content += chapter?.text;
        });
        const reading_time = Math.ceil(content.split(' ').length / 200);

        const storyId = await ctx.db.insert('stories', {
            title,
            author_id: userId,
            genre,
            prompt,
            image_style,
            age_category,
            cover_image,
            type,
            is_public,
            status,
            reading_time,
            views_count: 0,
            ratings_average: 0,
            reports_count: 0,
            ai_output: JSON.stringify(ai_output),
            chapters
        });

        let profile: any = await ctx.db.query('profiles').withIndex('by_user_id', q => q.eq("user_id", userId)).first();
        if (!profile) {
            const user = await ctx.db.get(userId);

            profile = await ctx.db.insert('profiles', {
                user_id: userId,
                username: user?.name!,
                email: user?.email!,
                credit: 120,
                role: USER_ROLES[0],
                profile_picture_url: '',
                bio: '',
                date_of_birth: '',
                is_verified: true,
                preferences: {},
                notification_settings: {},
                location: ''
            });

            profile = await ctx.db.get(profile);
        }

        await ctx.db.patch(profile?._id, { credit: profile.credit - 3 });

        return storyId;
    }
});

export const create_manual = mutation({
    args: {
        title: v.string(),
        content: v.string(), // Full story content
        genre: v.union(...STORY_GENRES.map(v.literal)),
        image_style: v.union(...STORY_IMAGE_STYLES.map(v.literal)),
        age_category: v.union(...STORY_AGE_CATEGORIES.map(v.literal)),
        type: v.union(...STORY_TYPES.map(v.literal)), // Should include "manual" as a type
        is_public: v.boolean(),
        status: v.union(...STORY_STATUSES.map(v.literal)),
        cover_image: v.string(), // URL for the cover image
        chapters: v.array(v.any()), // Manual stories can also have chapters
    },
    handler: async (ctx, args) => {
        const {
            title,
            content,
            genre,
            image_style,
            age_category,
            type,
            is_public,
            status,
            cover_image,
            chapters,
        } = args;

        if (!title) throw new Error("Title is required");
        if (!content) throw new Error("Content is required");
        if (!genre) throw new Error("Genre is required");
        if (!image_style) throw new Error("Image style is required");
        if (!age_category) throw new Error("Age category is required");
        if (!type) throw new Error("Type is required");
        if (!is_public) throw new Error("Public flag is required");
        if (!status) throw new Error("Status is required");

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        // Calculate reading time
        const reading_time = Math.ceil(content.split(" ").length / 200);

        // Insert the story into the database
        const storyId = await ctx.db.insert("stories", {
            title,
            author_id: userId,
            genre,
            image_style,
            age_category,
            cover_image,
            type,
            is_public,
            status,
            reading_time,
            views_count: 0,
            ratings_average: 0,
            reports_count: 0,
            ai_output: "", // Not applicable for manual stories
            prompt: "", // Not applicable for manual stories
            chapters,
        });

        // Fetch or create the user profile
        let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
        if (!profile) {
            const user = await ctx.db.get(userId);

            profile = await ctx.db.insert("profiles", {
                user_id: userId,
                username: user?.name!,
                email: user?.email!,
                credit: 120,
                role: USER_ROLES[0],
                profile_picture_url: "",
                bio: "",
                date_of_birth: "",
                is_verified: true,
                preferences: {},
                notification_settings: {},
                location: "",
            });

            profile = await ctx.db.get(profile);
        }

        // Deduct 3 credits from the user's profile
        await ctx.db.patch(profile?._id, { credit: profile.credit - 3 });

        return storyId;
    },
});


export const get_public = query({
    args: {},
    handler: async (ctx) => {

        const stories = await ctx.db
            .query('stories')
            .collect()

        return stories
    }
})

export const get_user = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) return []

        const stories = await ctx.db
            .query('stories')
            .withIndex('by_author_id', q => q.eq("author_id", userId))
            .collect()

        return stories
    }
})

export const getById = query({
    args: { id: v.id("stories") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)

        return story
    }
})

export const update = mutation({
    args: {
        id: v.id("stories"),
        title: v.string(),
        content: v.string(),
        genre: v.union(...STORY_GENRES.map(v.literal)),
        status: v.union(...STORY_STATUSES.map(v.literal)),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)
        if (!story || story.author_id !== userId)
            throw new Error('Unauthorized')

        await ctx.db.patch(args.id, {
            title: args.title,
            genre: args.genre,
            status: args.status,
        })

        return args.id
    }
})

export const remove = mutation({
    args: {
        id: v.id("stories"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)
        if (!story) throw new Error('Story not found')

        if (story.author_id !== userId) {
            throw new Error('Unauthorized')
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})
