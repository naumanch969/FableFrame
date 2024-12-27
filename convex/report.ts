import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { REPORT_REASONS, STORY_REPORT_STATUSES } from '@/constants';
import { populateStory, populateProfile } from './utils'
import { auth } from './auth';

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

        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const proflie = await populateProfile(ctx, args.profile_id);
        if (!proflie) return null;

        const new_report = await ctx.db.insert('story_reports', {
            story_id: args.story_id,
            profile_id: args.profile_id,
            reason: args.reason,
            status: args.status,
            type: args.type,
            created_at: args.created_at
        });

        const existing_reports = await ctx.db
            .query('story_reports')
            .withIndex('by_story_id', (q) => q.eq('story_id', args.story_id))
            .collect()

        if (existing_reports.length >= 5) {
            await ctx.db.patch(args.story_id, { status: 'blocked' })
        }

        return new_report;
    },
});

export const get = query({
    args: {},
    handler: async (ctx, args) => {

        const reports = await ctx.db
            .query('story_reports')
            .collect();

        let response = []
        for (const report of reports) {
            const story = await populateStory(ctx, report?.story_id)
            const profile = await populateProfile(ctx, report?.profile_id)
            response.push({
                ...report,
                story,
                profile
            })
        }

        return response;
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
        id: v.id('story_reports'),
    },
    handler: async (ctx, args) => {

        const report = await ctx.db.get(args.id);
        if (!report) return null;

        await ctx.db.delete(args.id);

        return args.id;
    },
});
