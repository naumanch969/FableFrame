import { v } from 'convex/values'
import { mutation, query, QueryCtx } from './_generated/server'
import { auth } from './auth'
import { STORY_AGE_CATEGORIES, STORY_GENRES, STORY_IMAGE_STYLES, STORY_STATUSES, STORY_TYPES } from '@/constants'
import { Doc, Id } from './_generated/dataModel'

const populateProfile = async (ctx: QueryCtx, profileId: Id<"profiles">) => {
    return await ctx.db.get(profileId)
}
const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}
const populateStoryLikes = async (ctx: QueryCtx, storyId: Id<"stories">) => {
    const likes = await ctx.db.query("likes").withIndex("by_story_id", (q) => q.eq("story_id", storyId)).collect()
    return likes
}
const populateStoryReports = async (ctx: QueryCtx, storyId: Id<"stories">) => {
    const likes = await ctx.db.query("story_reports").withIndex("by_story_id", (q) => q.eq("story_id", storyId)).collect()
    return likes
}
const populateStoryShares = async (ctx: QueryCtx, storyId: Id<"stories">) => {
    const shares = await ctx.db.query("shares").withIndex("by_story_id", (q) => q.eq("story_id", storyId)).collect()
    return shares
}
const populateStory = async (ctx: QueryCtx, storyId: Id<"stories">) => {
    return await ctx.db.get(storyId)
}

const populateAllStoryFields = async (ctx: QueryCtx, story: Doc<"stories">) => {
    const author = await populateProfile(ctx, story.profile_id)
    const likes = await populateStoryLikes(ctx, story._id)
    const reports = await populateStoryReports(ctx, story._id)
    const shares = await populateStoryShares(ctx, story._id)

    return {
        ...story,
        author,
        likes,
        reports,
        shares
    }
}

export const get_public = query({
    args: {},
    handler: async (ctx) => {

        const stories = await ctx.db
            .query("stories")
            .withIndex("by_is_public", q => q.eq("is_public", true))
            .collect();

        const response: any = []

        for (const story of stories) {
            const populated_story = await populateAllStoryFields(ctx, story)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response

    },
});

export const get_user_stories = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) return []

        const profile = await populateProfileByUserId(ctx, userId)

        const stories = await ctx.db
            .query('stories')
            .withIndex('by_profile_id', q => q.eq("profile_id", profile?._id))
            .collect()

        const response: any = []

        for (const story of stories) {
            const populated_story = await populateAllStoryFields(ctx, story)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
})

export const get_genre_stories = query({
    args: { genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))) },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) return []

        const stories = await ctx.db
            .query('stories')
            .withIndex('by_genre', q => q.eq("genre", args.genre))
            .collect()

        const response: any = []

        for (const story of stories) {
            const populated_story = await populateAllStoryFields(ctx, story)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
})

export const get_age_category_stories = query({
    args: { age_category: v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key))) },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) return []

        const stories = await ctx.db
            .query('stories')
            .withIndex('by_age_category', q => q.eq("age_category", args.age_category))
            .collect()

        const response: any = []

        for (const story of stories) {
            const populated_story = await populateAllStoryFields(ctx, story)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
})

export const get_popular_stories = query({
    args: {},
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) return []

        const stories = await ctx.db
            .query('stories')
            .order('asc')
            .take(10)

        const response: any = []

        for (const story of stories) {
            const populated_story = await populateAllStoryFields(ctx, story)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
})

export const get_user_recommended_stories = query({
    args: {},
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        // Fetch the user's profile
        const profile = await ctx.db
            .query("profiles")
            .withIndex("by_user_id", q => q.eq("user_id", userId))
            .unique();

        if (!profile) {
            throw new Error("Profile not found for the given user_id");
        }

        // Fetch all liked story IDs for the user's profile
        const likedStoryIds = await ctx.db
            .query("likes")
            .withIndex("by_profile_id", q => q.eq("profile_id", profile._id))
            .collect();

        const storyIds = likedStoryIds.map(like => like.story_id);

        // Fetch stories by the liked story IDs
        const likedStories = await ctx.db
            .query("stories")
            .filter(q => q.or(...storyIds.map(id => q.eq(q.field("_id"), id))))
            .collect();

        const response: any = []

        for (const story of likedStories) {
            const populated_story = await populateAllStoryFields(ctx, story!)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
})

export const get_story_by_id = query({
    args: { id: v.id("stories") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)

        return story
    }
})

export const get_liked_stories = query({
    args: {},
    handler: async (ctx) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        // Fetch the user's profile
        const profile = await ctx.db
            .query("profiles")
            .withIndex("by_user_id", q => q.eq("user_id", userId))
            .unique();

        if (!profile) {
            throw new Error("Profile not found for the given user_id");
        }

        // Fetch all liked story IDs for the user's profile
        const likedStoryIds = await ctx.db
            .query("likes")
            .withIndex("by_profile_id", q => q.eq("profile_id", profile._id))
            .collect();

        const storyIds = likedStoryIds.map(like => like.story_id);

        // Fetch stories by the liked story IDs
        const likedStories = await ctx.db
            .query("stories")
            .filter(q => q.or(...storyIds.map(id => q.eq(q.field("_id"), id))))
            .collect();

        const response: any = []

        for (const story of likedStories) {
            const populated_story = await populateAllStoryFields(ctx, story!)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    },
});

export const get_shared_stories = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const shares = await ctx.db
            .query('shares')
            .withIndex('by_to_id', q => q.eq('to_id', profile?._id))
            .collect()

        let stories = [];
        for (const share of shares) {
            const story = await populateStory(ctx, share?.story_id)
            if (story)
                stories.push(story)
        }

        const response: any = []

        for (const story of stories) {
            const populated_story = await populateAllStoryFields(ctx, story!)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
});

export const get_my_manual_stories = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const manualStories = await ctx.db
            .query("stories")
            .withIndex("by_profile_id_and_type", q => q.eq("profile_id", profile?._id).eq('type', 'manual'))
            .collect();

        const response: any = []

        for (const story of manualStories) {
            const populated_story = await populateAllStoryFields(ctx, story)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
});

export const get_draft_stories = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const draftStories = await ctx.db
            .query("stories")
            .withIndex("by_profile_id_and_status", q => q.eq("profile_id", profile?._id).eq('status', 'draft'))
            .collect();

        const response: any = []

        for (const story of draftStories) {
            const populated_story = await populateAllStoryFields(ctx, story!)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
});

export const get_my_ai_stories = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const aiStories = await ctx.db
            .query("stories")
            .withIndex("by_profile_id_and_type", q => q.eq("profile_id", profile?._id).eq('type', 'ai_generated'))
            .collect();

        const response: any = []

        for (const story of aiStories) {
            const populated_story = await populateAllStoryFields(ctx, story!)
            response.push({
                ...story,
                author: populated_story?.author,
                likes: populated_story?.likes?.map(like => like?.profile_id),
                reports: populated_story?.reports?.map(report => report?.profile_id),
                shares: populated_story?.shares?.map(share => share?._id),
            })
        }

        return response
    }
});

export const create_ai = mutation({
    args: {
        title: v.string(),
        prompt: v.string(),
        genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))),
        image_style: v.union(...STORY_IMAGE_STYLES.map(item => v.literal(item.key))),
        age_category: v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key))),
        type: v.union(...STORY_TYPES.map(item => v.literal(item.key))),
        is_public: v.boolean(),
        status: v.union(...STORY_STATUSES.map(item => v.literal(item.key))),
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

        let profile: any = await populateProfileByUserId(ctx, userId)

        let content = '';
        chapters.forEach((chapter: any) => {
            content += chapter?.text;
            content += chapter?.title;
        });
        const reading_time = Math.ceil(content.split(' ').length / 200);

        const storyId = await ctx.db.insert('stories', {
            title,
            profile_id: profile?._id,
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
            chapters,
        });


        await ctx.db.patch(profile?._id, { credit: profile.credit - 1 });

        return storyId;
    }
});

export const create_manual = mutation({
    args: {
        title: v.string(),
        content: v.string(), // Full story content
        genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))),
        image_style: v.union(...STORY_IMAGE_STYLES.map(item => v.literal(item.key))),
        age_category: v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key))),
        type: v.union(...STORY_TYPES.map(item => v.literal(item.key))), // Should include "manual" as a type
        is_public: v.boolean(),
        status: v.union(...STORY_STATUSES.map(item => v.literal(item.key))),
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

        let profile: any = await populateProfileByUserId(ctx, userId)

        // Insert the story into the database
        const storyId = await ctx.db.insert("stories", {
            title,
            profile_id: profile?._id,
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

        // Deduct 3 credits from the user's profile
        await ctx.db.patch(profile?._id, { credit: profile.credit - 3 });

        return storyId;
    },
});

export const update = mutation({
    args: {
        id: v.id("stories"),
        title: v.string(),
        content: v.string(),
        genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))),
        status: v.union(...STORY_STATUSES.map(item => v.literal(item.key))),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const profile = await populateProfileByUserId(ctx, userId)

        const story = await ctx.db.get(args.id)
        if (!story || story.profile_id !== profile?._id)
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

        const profile = await populateProfileByUserId(ctx, userId)

        if (story.profile_id !== profile?._id) {
            throw new Error('Unauthorized')
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})
