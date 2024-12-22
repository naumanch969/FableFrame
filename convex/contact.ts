import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
    args: {},
    handler: async (ctx, args) => {

        const users = await ctx.db
            .query('contacts')
            .collect()

        return users;
    },
});

export const get_by_email = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db
            .query('contacts')
            .filter((q) => q.eq('email', args.email))
            .first();

        return user;
    },
});

export const get_by_id = query({
    args: {
        user_id: v.id('contacts'),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.user_id);
        return user;
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        message: v.string(),
        created_at: v.string(),
    },
    handler: async (ctx, args) => {

        const new_contact = await ctx.db.insert('contacts', {
            name: args.name,
            email: args.email,
            message: args.message,
            created_at: args.created_at,
        });

        return new_contact;
    },
});

export const remove = mutation({
    args: {
        user_id: v.id('contacts'),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db.get(args.user_id);
        if (!user) return null;

        await ctx.db.delete(args.user_id);

        return args.user_id;
    },
});
