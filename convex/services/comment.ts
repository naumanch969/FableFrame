import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { auth } from './auth';

export const create = mutation({
    args: {
        story_id: v.id('stories'),
        content: v.string(),
        parent_id: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error('Unauthenticated');

        const comment = await ctx.db.insert('comments', {
            content: args.content,
            story_id: args.story_id,
            author_id: userId,
            status: "pending", // Default status
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
        if (!userId) throw new Error('Unauthenticated');

        const comment = await ctx.db.get(args.comment_id);
        if (!comment || comment.author_id !== userId)
            throw new Error('Unauthorized to edit this comment');

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
        if (!userId) throw new Error('Unauthenticated');

        const comment = await ctx.db.get(args.comment_id);
        if (!comment) throw new Error('Comment not found');

        if (comment.author_id !== userId) {
            const userRole = await ctx.db
                .query('users')
                .filter((q) => q.id(userId))
                .unique();
            if (userRole?.role !== 'admin') throw new Error('Unauthorized');
        }

        await ctx.db.patch(args.comment_id, { is_deleted: true });

        return args.comment_id;
    },
});

export const getByStory = query({
    args: {
        story_id: v.id('stories'),
    },
    handler: async (ctx, args) => {

        const comments = await ctx.db
            .query('comments')
            .filter((q) => 
                q.eq(q.field('story_id'), args.story_id)
                 .eq('is_deleted', false)
            )
            .collect();

        return comments;
    },
});



export const like = mutation({
    args: {
        comment_id: v.id('comments'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error('Unauthenticated');

        const comment = await ctx.db.get(args.comment_id);
        if (!comment) throw new Error('Comment not found');

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
        if (!userId) throw new Error('Unauthenticated');

        const comment = await ctx.db.get(args.comment_id);
        if (!comment) throw new Error('Comment not found');

        await ctx.db.patch(args.comment_id, {
            reports_count: comment.reports_count + 1,
        });

        return args.comment_id;
    },
});

export const updateStatus = mutation({
    args: {
        comment_id: v.id('comments'),
        status: v.union(
            v.literal("approved"),
            v.literal("pending"),
            v.literal("rejected"),
            v.literal("flagged")
        ),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error('Unauthenticated');

        const user = await ctx.db.get(userId);
        if (user?.role !== 'admin') throw new Error('Unauthorized');

        await ctx.db.patch(args.comment_id, { status: args.status });

        return args.comment_id;
    },
});

export const getByUser = query({
    args: {
        user_id: v.id('users'),
    },
    handler: async (ctx, args) => {

        const comments = await ctx.db
            .query('comments')
            .filter((q) => q.eq(q.field('author_id'), args.user_id).eq('is_deleted', false))
            .collect();

        return comments;
    },
});
