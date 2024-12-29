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
        if (!userId) return null;

        // Fetch the user's profile
        const profile = await ctx.db
            .query("profiles")
            .withIndex("by_user_id", q => q.eq("user_id", userId))
            .unique();

        if (!profile) {
            return null;
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

        const story = await ctx.db.get(args.id)

        let populated_story = await populateAllStoryFields(ctx, story!)

        return {
            ...story,
            author: populated_story?.author,
            likes: populated_story?.likes?.map(like => like?.profile_id),
            reports: populated_story?.reports?.map(report => report?.profile_id),
            shares: populated_story?.shares?.map(share => share?._id),
        }

    }
})

export const get_liked_stories = query({
    args: {},
    handler: async (ctx) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) return null;

        // Fetch the user's profile
        const profile = await ctx.db
            .query("profiles")
            .withIndex("by_user_id", q => q.eq("user_id", userId))
            .unique();

        if (!profile) {
            return null;
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
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);

        const shares = await ctx.db
            .query('shares')
            .withIndex('by_to_id', q => q.eq('to_id', profile?._id))
            .collect()

        let stories = [];
        for (const share of shares) {
            const story = await populateStory(ctx, share?.story_id)
            if (story) stories.push({ ...story, shared_at: share?._creationTime })
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

export const get = query({
    args: {},
    handler: async (ctx) => {

        const manualStories = await ctx.db
            .query("stories")
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

export const get_my_manual_stories = query({
    args: {},
    handler: async (ctx) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

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
        if (!userId) return null; // Unauthenticated

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

export const get_ai_stories = query({
    args: {
        profile_id: v.optional(v.id("profiles"))
    },
    handler: async (ctx, args) => {
        
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        let profile;
        if (args.profile_id) {
            profile = await populateProfile(ctx, args.profile_id);
        }
        else {
            profile = await populateProfileByUserId(ctx, userId);
        }

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

        if (!title) return null;
        if (!genre) return null;
        if (!image_style) return null;
        if (!age_category) return null;
        if (!type) return null;
        if (!is_public) return null;
        if (!status) return null;

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        let profile: any = await populateProfileByUserId(ctx, userId)

        let content = '';
        chapters.forEach((chapter: any) => {
            content += chapter?.text;
            content += chapter?.title;
        });
        const reading_time = Math.ceil(content.split(' ').length / 150);

        let coverImageUrl = await ctx.storage.getUrl(cover_image)
        if (!coverImageUrl) coverImageUrl = '/sample_cover_image.jpeg'

        let updated_chapters = []
        for (const chapter of chapters) {
            let chapterImageUrl = chapter?.image?.url ? await ctx.storage.getUrl(chapter?.image?.url) : '/sample_cover_image.jpeg'
            if (!chapterImageUrl) chapterImageUrl = '/sample_cover_image.jpeg'
            updated_chapters.push({
                ...chapter,
                image: { ...chapter?.image, url: chapterImageUrl }
            })
        }

        const story_id = await ctx.db.insert('stories', {
            title,
            profile_id: profile?._id,
            genre,
            prompt,
            image_style,
            age_category,
            cover_image: coverImageUrl,
            type,
            is_public,
            status,
            reading_time,
            views_count: 0,
            ratings_average: 0,
            reports_count: 0,
            ai_output: JSON.stringify(ai_output),
            chapters: updated_chapters,
        });

        // Create notification
        await ctx.db.insert('notifications', {
            profile_id: profile?._id!,
            type: 'post',
            content: 'Your story has been successfully created',
            is_read: false,
            related_entity_id: story_id,
            entity_name: 'stories',
            priority: 'low',
            is_dismissed: false
        });

        const credits_used = chapters.length;
        await ctx.db.patch(profile?._id, { credit: profile.credit - credits_used });

        // Adding images // TODO: what if there's an error above and control dont get here, images r added in storage but not in table
        const urls = [{ url: coverImageUrl, storage_id: cover_image, story_id }]
        let index = 0;
        for (const chapter of chapters) {
            urls.push({
                url: updated_chapters[index]?.image?.url,
                storage_id: chapter?.image?.url,
                story_id: story_id,
            })
            index++;
        }

        for (const url of urls) {
            await ctx.db.insert('images', {
                url: url.url,
                storage_id: url.storage_id,
                story_id: url.story_id
            })
        }


        return story_id;
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

        if (!title) return null;
        if (!content) return null;
        if (!genre) return null;
        if (!image_style) return null;
        if (!age_category) return null;
        if (!type) return null;
        if (!is_public) return null;
        if (!status) return null;

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

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
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        genre: v.optional(v.union(...STORY_GENRES.map(item => v.literal(item.key)))),
        status: v.optional(v.union(...STORY_STATUSES.map(item => v.literal(item.key)))),
        cover_image: v.optional(v.string()),
        chapters: v.optional(v.array(v.any())),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("User not authenticated");
        }

        const profile = await populateProfileByUserId(ctx, userId);
        if (!profile) {
            throw new Error("User profile not found");
        }

        const story = await ctx.db.get(args.id);
        if (!story) {
            throw new Error("Story not found");
        }

        if (story.profile_id !== profile._id && profile?.role == 'user') {
            throw new Error("Unauthorized to update this story");
        }



        const updateData: Partial<typeof args> = {};
        if (args.title) updateData.title = args.title;
        if (args.content) updateData.content = args.content;
        if (args.genre) updateData.genre = args.genre;
        if (args.status) updateData.status = args.status;
        if (args.cover_image) {
            let coverImageUrl = await ctx.storage.getUrl(args.cover_image)
            if (!coverImageUrl) coverImageUrl = '/sample_cover_image.jpeg'
            updateData.cover_image = coverImageUrl;
        }
        if (args.chapters) {
            let updatedChapters = []
            for (const chapter of args.chapters) {
                let chapterImageUrl = chapter?.image?.url ? await ctx.storage.getUrl(chapter?.image?.url) : '/sample_cover_image.jpeg'
                if (!chapterImageUrl) chapterImageUrl = '/sample_cover_image.jpeg'
                updatedChapters.push({
                    ...chapter,
                    image: { ...chapter?.image, url: chapterImageUrl }
                })
            }
            updateData.chapters = updatedChapters;
        }

        await ctx.db.patch(args.id, updateData);

        return args.id;
    },
});

export const remove = mutation({
    args: {
        id: v.id("stories"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) return null;

        const profile = await populateProfileByUserId(ctx, userId)

        const story = await ctx.db.get(args.id)
        if (!story) return null;


        if (story.profile_id !== profile?._id && profile?.role == 'user')
            return null;

        // remove all likes
        const likes = await ctx.db
            .query('likes')
            .withIndex('by_story_id', q => q.eq("story_id", story._id))
            .collect()

        for (const like of likes) {
            await ctx.db.delete(like._id)
        }

        // remove all comments
        const comments = await ctx.db
            .query('comments')
            .withIndex('by_story_id', q => q.eq("story_id", story._id))
            .collect()

        for (const comment of comments) {
            await ctx.db.delete(comment._id)
        }

        // remove all shares
        const notifications = await ctx.db
            .query('notifications')
            .withIndex('by_related_entity_id', q => q.eq("related_entity_id", story._id))
            .collect()

        for (const notification of notifications) {
            await ctx.db.delete(notification._id)
        }

        // remove all shares
        const shares = await ctx.db
            .query('shares')
            .withIndex('by_story_id', q => q.eq("story_id", story._id))
            .collect()

        for (const share of shares) {
            await ctx.db.delete(share._id)
        }

        // remove all story_reports
        const reports = await ctx.db
            .query('story_reports')
            .withIndex('by_story_id', q => q.eq("story_id", story._id))
            .collect()

        for (const report of reports) {
            await ctx.db.delete(report._id)
        }

        // update message status
        const messages = await ctx.db
            .query('messages')
            .withIndex('by_story_id', q => q.eq("story_id", story._id))
            .collect()

        for (const message of messages) {
            await ctx.db.patch(message._id, { status: "story-deleted" })
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})
