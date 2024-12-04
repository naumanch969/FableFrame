import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const create = mutation({
    args: {
        hashtag: v.string(),
    },
    handler: async (ctx, args) => {

        const existingHashtag = await ctx.db
            .query('hashtags')
            .filter((q) => q.eq('hashtag', args.hashtag))
            .unique();

        if (existingHashtag) {
            throw new Error('Hashtag already exists');
        }

        const newHashtag = await ctx.db.insert('hashtags', {
            hashtag: args.hashtag,
        });

        return newHashtag;
    },
});

export const get = query({
    handler: async (ctx) => {
        const hashtags = await ctx.db.query('hashtags').collect();
        return hashtags;
    },
});

export const remove = mutation({
    args: {
        hashtag_id: v.id('hashtags'),
    },
    handler: async (ctx, args) => {
        const hashtag = await ctx.db.get(args.hashtag_id);
        if (!hashtag) {
            throw new Error('Hashtag not found');
        }

        await ctx.db.delete(args.hashtag_id);

        return args.hashtag_id;
    },
});

export const checkIfExists = query({
    args: {
        hashtag: v.string(),
    },
    handler: async (ctx, args) => {
        const existingHashtag = await ctx.db
            .query('hashtags')
            .filter((q) => q.eq('hashtag', args.hashtag))
            .unique();

        return existingHashtag ? true : false;
    },
});
