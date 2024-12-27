import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { USER_ROLES } from '@/constants';
import { auth } from './auth';
import { populateProfile, populateProfileByUserId } from './utils';

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
        if (!user) return null;

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
        user_id: v.id('users'),
    },
    handler: async (ctx, args) => {

        const user = await ctx.db.get(args.user_id);
        if (!user) return null;

        const profile = await populateProfileByUserId(ctx, args.user_id);

        // Remove all messages by receiver_id
        const receivedMessages = await ctx.db
            .query('messages')
            .withIndex('by_receiver_id', (q) => q.eq('receiver_id', profile?.id))
            .collect();

        for (const message of receivedMessages) {
            await ctx.db.delete(message._id);
        }

        // Remove all messages by sender_id
        const sentMessages = await ctx.db
            .query('messages')
            .withIndex('by_sender_id', (q) => q.eq('sender_id', profile?._id))
            .collect();

        for (const message of sentMessages) {
            await ctx.db.delete(message._id);
        }

        // Remove all likes
        const likes = await ctx.db
            .query('likes')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .collect();

        for (const like of likes) {
            await ctx.db.delete(like._id);
        }

        // Remove all comments
        const comments = await ctx.db
            .query('comments')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .collect();

        for (const comment of comments) {
            await ctx.db.delete(comment._id);
        }

        // Remove all notifications
        const notifications = await ctx.db
            .query('notifications')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .collect();

        for (const notification of notifications) {
            await ctx.db.delete(notification._id);
        }

        // Remove all chats
        const chats = await ctx.db
            .query('chats')
            .collect();

        const userChats = chats?.filter(c => c.participants.includes(profile?._id))

        for (const chat of userChats) {
            await ctx.db.delete(chat._id);
        }

        // Remove all friends by profile_id
        const friendsByProfile = await ctx.db
            .query('friends')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .collect();

        for (const friend of friendsByProfile) {
            await ctx.db.delete(friend._id);
        }

        // Remove all friends by friend_id
        const friendsByFriend = await ctx.db
            .query('friends')
            .withIndex('by_friend_id', (q) => q.eq('friend_id', profile?._id))
            .collect();

        for (const friend of friendsByFriend) {
            await ctx.db.delete(friend._id);
        }

        // Remove all friend_requests by sender_id
        const friendRequestsBySender = await ctx.db
            .query('friend_requests')
            .withIndex('by_sender_id', (q) => q.eq('sender_id', profile?._id))
            .collect();

        for (const request of friendRequestsBySender) {
            await ctx.db.delete(request._id);
        }

        // Remove all friend_requests by receiver_id
        const friendRequestsByReceiver = await ctx.db
            .query('friend_requests')
            .withIndex('by_receiver_id', (q) => q.eq('receiver_id', profile?._id))
            .collect();

        for (const request of friendRequestsByReceiver) {
            await ctx.db.delete(request._id);
        }

        // Remove all story_reports
        const storyReports = await ctx.db
            .query('story_reports')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .collect();

        for (const report of storyReports) {
            await ctx.db.delete(report._id);
        }

        // Remove all shares by from_id
        const sharesByFrom = await ctx.db
            .query('shares')
            .withIndex('by_from_id', (q) => q.eq('from_id', profile?.id))
            .collect();

        for (const share of sharesByFrom) {
            await ctx.db.delete(share._id);
        }

        // Remove all shares by to_id
        const sharesByTo = await ctx.db
            .query('shares')
            .withIndex('by_to_id', (q) => q.eq('to_id', profile?.id))
            .collect();

        for (const share of sharesByTo) {
            await ctx.db.delete(share._id);
        }

        // Remove all preferences
        const preferences = await ctx.db
            .query('preferences')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?.id))
            .collect();

        for (const preference of preferences) {
            await ctx.db.delete(preference._id);
        }

        // Remove all stories
        const stories = await ctx.db
            .query('stories')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?.id))
            .collect();

        for (const story of stories) {
            await ctx.db.delete(story._id);
        }

        // Finally, delete the user profile
        await ctx.db.delete(profile?.id);

        // TODO: Delete user from auth

        return profile?.id;
    },
});

