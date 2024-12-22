import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { REPORT_REASONS, STORY_REPORT_STATUSES } from '@/constants';

export const create = mutation({
    args: {
        story_id: v.id('stories'),
        profile_id: v.id('profiles'),
        reason: v.optional(v.string()),
        type: v.union(...REPORT_REASONS.map(item => v.literal(item.key))),
        status: v.union(...STORY_REPORT_STATUSES.map(item => v.literal(item.key))),
        created_at: v.string(),
    },
    handler: async (ctx, args) => {

        const newReport = await ctx.db.insert('story_reports', {
            story_id: args.story_id,
            profile_id: args.profile_id,
            reason: args.reason,
            status: args.status,
            type: args.type,
            created_at: args.created_at
        });

        return newReport;
    },
});

export const get_by_story = query({
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

export const get_by_user = query({
    args: {
        profile_id: v.id('profiles'),
    },
    handler: async (ctx, args) => {

        const reports = await ctx.db
            .query('story_reports')
            .filter((q) => q.eq(q.field('profile_id'), args.profile_id))
            .collect();

        return reports;
    },
});

export const update_status = mutation({
    args: {
        report_id: v.id('story_reports'),
        status: v.union(...STORY_REPORT_STATUSES.map(item => v.literal(item.key))),
    },
    handler: async (ctx, args) => {

        const report = await ctx.db.get(args.report_id);
        if (!report) {
            return null;
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
            return null;
        }

        await ctx.db.delete(args.report_id);

        return args.report_id;
    },
});
