import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES } from '@/constants';

export const create = mutation({
    args: {
        user_id: v.id('users'),
        type: v.union(...NOTIFICATION_TYPES.map(v.literal)),
        content: v.string(),
        is_read: v.boolean(),
        related_entity_id: v.optional(v.string()),
        entity_type: v.optional(v.string()),
        priority: v.union(...NOTIFICATION_PRIORITIES.map(v.literal)),
        is_dismissed: v.boolean(),
    },
    handler: async (ctx, args) => {

        const newNotification = await ctx.db.insert('notifications', {
            user_id: args.user_id,
            type: args.type,
            content: args.content,
            is_read: args.is_read,
            related_entity_id: args.related_entity_id,
            entity_type: args.entity_type,
            priority: args.priority,
            is_dismissed: args.is_dismissed,
        });
        
        return newNotification;
    },
});

export const get = query({
    args: {
        user_id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const notifications = await ctx.db
            .query('notifications')
            .filter((q) => q.eq(q.field('user_id'), args.user_id))  
            .collect();

        return notifications;
    },
});


export const update = mutation({
    args: {
        notification_id: v.id('notifications'),
        is_read: v.boolean(),
        is_dismissed: v.boolean(),
    },
    handler: async (ctx, args) => {

        const notification = await ctx.db.get(args.notification_id);
        if (!notification) {
            throw new Error('Notification not found');
        }

        await ctx.db.patch(args.notification_id, {
            is_read: args.is_read,
            is_dismissed: args.is_dismissed,
        });

        return args.notification_id;
    },
});

export const remove = mutation({
    args: {
        notification_id: v.id('notifications'),
    },
    handler: async (ctx, args) => {

        const notification = await ctx.db.get(args.notification_id);
        if (!notification) {
            throw new Error('Notification not found');
        }

        await ctx.db.delete(args.notification_id);

        return args.notification_id;
    },
});

export const markAsRead = mutation({
    args: {
        notification_id: v.id('notifications'),
    },
    handler: async (ctx, args) => {

        const notification = await ctx.db.get(args.notification_id);
        if (!notification) {
            throw new Error('Notification not found');
        }

        await ctx.db.patch(args.notification_id, { is_read: true });

        return args.notification_id;
    },
});
