import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { STORY_REPORT_STATUSES } from '@/constants';

export const create = mutation({
    args: {
        story_id: v.id('stories'),
        user_id: v.id('users'),
        reason: v.string(),
        status: v.union(...STORY_REPORT_STATUSES.map(v.literal)),
        created_at: v.string(),
    },
    handler: async (ctx, args) => {

        const newReport = await ctx.db.insert('story_reports', {
            story_id: args.story_id,
            user_id: args.user_id,
            reason: args.reason,
            status: args.status,
            created_at: args.created_at,
        });

        return newReport;
    },
});

export const getByStory = query({
    args: {
        story_id: v.id('stories'),
    },
    handler: async (ctx, args) => {

        const reports = await ctx.db
            .query('story_reports')
            .filter((q) => q.eq(q.field('story_id'), args.story_id))
            .collect();

        return reports;
    },
});

export const getByUser = query({
    args: {
        user_id: v.id('users'),
    },
    handler: async (ctx, args) => {

        const reports = await ctx.db
            .query('story_reports')
            .filter((q) => q.eq(q.field('user_id'), args.user_id))
            .collect();

        return reports;
    },
});

export const updateStatus = mutation({
    args: {
        report_id: v.id('story_reports'),
        status: v.union(...STORY_REPORT_STATUSES.map(v.literal)),
    },
    handler: async (ctx, args) => {

        const report = await ctx.db.get(args.report_id);
        if (!report) {
            throw new Error('Report not found');
        }

        await ctx.db.patch(args.report_id, { status: args.status });

        return args.report_id;
    },
});

export const remove = mutation({
    args: {
        report_id: v.id('story_reports'),
    },
    handler: async (ctx, args) => {

        const report = await ctx.db.get(args.report_id);
        if (!report) {
            throw new Error('Report not found');
        }

        await ctx.db.delete(args.report_id);

        return args.report_id;
    },
});
