import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { USER_ROLES } from '@/constants';
import { auth } from './auth';


export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (userId == null) return null

        return await ctx.db.get(userId)
    }
})

export const getByEmail = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db
            .query('users')
            .filter((q) => q.eq('email', args.email))
            .first();

        return user;
    },
});

export const getById = query({
    args: {
        user_id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.user_id);
        return user;
    },
});

export const update = mutation({
    args: {
        user_id: v.id('users'),
        username: v.optional(v.string()),
        email: v.optional(v.string()),
        role: v.optional(v.union(...USER_ROLES.map(v.literal))),
        profile_picture_url: v.optional(v.string()),
        bio: v.optional(v.string()),
        date_of_birth: v.optional(v.string()),
        is_verified: v.optional(v.boolean()),
        preferences: v.optional(v.any()),
        notification_settings: v.optional(v.any()),
        location: v.optional(v.string()),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db.get(args.user_id);
        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await ctx.db.patch(args.user_id, {
            username: args.username,
            email: args.email,
            role: args.role,
            profile_picture_url: args.profile_picture_url,
            bio: args.bio,
            date_of_birth: args.date_of_birth,
            is_verified: args.is_verified,
            preferences: args.preferences,
            notification_settings: args.notification_settings,
            location: args.location,
        });

        return updatedUser;
    },
});

export const remove = mutation({
    args: {
        user_id: v.id('users'),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db.get(args.user_id);
        if (!user) {
            throw new Error('User not found');
        }

        await ctx.db.delete(args.user_id);

        return args.user_id;
    },
});
