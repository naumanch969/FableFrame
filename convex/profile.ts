import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { USER_ROLES } from '@/constants';
import { auth } from './auth';

export const get_current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (userId == null) return null

        const profile = await ctx.db
            .query('profiles')
            .withIndex('by_user_id', (q) => q.eq('user_id', userId))
            .first()

        return profile;
    }
})

export const get = query({
    args: {},
    handler: async (ctx, args) => {

        const users = await ctx.db
            .query('profiles')
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
            .query('profiles')
            .filter((q) => q.eq('email', args.email))
            .first();

        return user;
    },
});

export const get_by_id = query({
    args: {
        user_id: v.id('profiles'),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.user_id);
        return user;
    },
});

export const create = mutation({
    args: {
        user_id: v.id('users'),
        username: v.string(),
        email: v.string(),
        role: v.optional(v.union(...USER_ROLES.map(item => v.literal(item.key)))),
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
        if (!user) throw new Error('User not found');

        const profile = await ctx.db.query('profiles').withIndex('by_user_id', (q) => q.eq('user_id', args.user_id)).first();
        if (profile) return profile?._id

        const new_profile = await ctx.db.insert('profiles', {
            user_id: args.user_id,
            username: args.username,
            email: args.email,
            role: 'user',
            profile_picture_url: args.profile_picture_url,
            bio: args.bio,
            date_of_birth: args.date_of_birth,
            is_verified: true,
            preferences: args.preferences,
            notification_settings: args.notification_settings,
            location: args.location,
            credit: 100,
        });

        return new_profile;
    },
});

export const update = mutation({
    args: {
        profile_id: v.id('profiles'),
        username: v.optional(v.string()),
        profile_picture_url: v.optional(v.string()),
        bio: v.optional(v.string()),
        date_of_birth: v.optional(v.string()),
        preferences: v.optional(v.any()),
        notification_settings: v.optional(v.any()),
        location: v.optional(v.string()),
    },
    handler: async (ctx, args) => {

        const profile = await ctx.db.get(args.profile_id)

        const updatedUser = await ctx.db.patch(profile?._id!, {
            username: args.username,
            profile_picture_url: args.profile_picture_url,
            bio: args.bio,
            date_of_birth: args.date_of_birth,
            preferences: args.preferences,
            notification_settings: args.notification_settings,
            location: args.location,
        });

        return updatedUser;
    },
});

export const remove = mutation({
    args: {
        user_id: v.id('profiles'),
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
