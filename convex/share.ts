import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { SHARE_RESTRICTIONS } from '@/constants';

export const create = mutation({
    args: {
        from_id: v.id('profiles'),
        to_id: v.id('profiles'),
        story_id: v.id('stories'),
        shared_at: v.string(),
        restriction: v.union(...SHARE_RESTRICTIONS.map(item => v.literal(item.key))),
        message: v.string(),
        expires_at: v.string(),
    },
    handler: async (ctx, args) => {

        const newShare = await ctx.db.insert('shares', {
            from_id: args.from_id,
            to_id: args.to_id,
            story_id: args.story_id,
            shared_at: args.shared_at,
            restriction: args.restriction,
            message: args.message,
            expires_at: args.expires_at,
        });

        return newShare;
    },
});

export const get_by_story = query({
    args: {
        story_id: v.id('stories'),
    },
    handler: async (ctx, args) => {

        const shares = await ctx.db
            .query('shares')
            .filter((q) => q.eq(q.field('story_id'), args.story_id))
            .collect();

        return shares;
    },
});

export const remove = mutation({
    args: {
        share_id: v.id('shares'),
    },
    handler: async (ctx, args) => {

        const share = await ctx.db.get(args.share_id);
        if (!share) {
            throw new Error('Share not found');
        }

        await ctx.db.delete(args.share_id);

        return args.share_id;
    },
});
