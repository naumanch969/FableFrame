import { v } from 'convex/values';
import { mutation, query, QueryCtx } from './_generated/server';
import { auth } from './auth';
import { Id } from './_generated/dataModel';
import { populateStory } from './utils';

const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}
const populateProfile = async (ctx: QueryCtx, profileId: Id<"profiles">) => {
    return await ctx.db.get(profileId)
}

export const get = query({
    args: {},
    handler: async (ctx, { }) => {

        const comments = await ctx.db
            .query('comments')
            .collect();

        let response: any = []
        for (const comment of comments) {
            const profile = await populateProfile(ctx, comment?.profile_id)
            const story = await populateStory(ctx, comment?.story_id)
            if (profile)
                response.push({ ...comment, profile, story })
        }

        return response;
    },
});

export const get_by_story = query({
    args: {
        story_id: v.id('stories'),
    },
    handler: async (ctx, { story_id }) => {

        const comments = await ctx.db
            .query('comments')
            .withIndex('by_story_id_is_deleted', q => q.eq("story_id", story_id).eq('is_deleted', false))
            .collect();

        let response: any = []
        for (const comment of comments) {
            const profile = await populateProfile(ctx, comment?.profile_id)
            const story = await populateStory(ctx, comment?.story_id)
            response.push({ ...comment, profile, story })
        }

        return response;
    },
});


export const create = mutation({
    args: {
        story_id: v.id('stories'),
        content: v.string(),
        parent_id: v.optional(v.id("profiles")),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        let profile: any = await populateProfileByUserId(ctx, userId)

        const comment = await ctx.db.insert('comments', {
            content: args.content,
            story_id: args.story_id,
            profile_id: profile?._id,
            parent_id: args.parent_id,
            likes_count: 0,
            reports_count: 0,
            is_deleted: false,
        });

        return comment;
    },
});

export const update = mutation({
    args: {
        comment_id: v.id('comments'),
        content: v.string(),
    },
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId)

        const comment = await ctx.db.get(args.comment_id);
        if (!comment || comment.profile_id !== profile?._id) return null;

        await ctx.db.patch(args.comment_id, { content: args.content });

        return args.comment_id;
    },
});

export const remove = mutation({
    args: {
        comment_id: v.id('comments'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId)

        const comment = await ctx.db.get(args.comment_id);
        if (!comment) return null;

        if (comment.profile_id !== profile?._id) {
            const profile = await ctx.db
                .query('profiles')
                // .filter((q) => q.id(userId))
                .unique();
            if (profile?.role !== 'admin') return null;
        }

        await ctx.db.patch(args.comment_id, { is_deleted: true });

        return args.comment_id;
    },
});


export const like = mutation({
    args: {
        comment_id: v.id('comments'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const comment = await ctx.db.get(args.comment_id);
        if (!comment) return null;

        await ctx.db.patch(args.comment_id, {
            likes_count: comment.likes_count + 1,
        });

        return args.comment_id;
    },
});

export const report = mutation({
    args: {
        comment_id: v.id('comments'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const comment = await ctx.db.get(args.comment_id);
        if (!comment) return null;

        await ctx.db.patch(args.comment_id, {
            reports_count: comment.reports_count + 1,
        });

        return args.comment_id;
    },
});


export const getByUser = query({
    args: {
        profile_id: v.id('profiles'),
    },
    handler: async (ctx, { profile_id }) => {

        const comments = await ctx.db
            .query('comments')
            .withIndex('by_profile_id', q => q.eq('profile_id', profile_id))
            .collect();

        return comments;
    },
});
