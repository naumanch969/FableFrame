import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES } from '@/constants';

export const create_notification = mutation({
    args: {
        profile_id: v.id('profiles'),
        type: v.union(...NOTIFICATION_TYPES.map(item => v.literal(item.key))),
        content: v.string(),
        is_read: v.boolean(),
        related_entity_id: v.optional(v.string()),
        entity_type: v.optional(v.string()),
        priority: v.union(...NOTIFICATION_PRIORITIES.map(item => v.literal(item.key))),
        is_dismissed: v.boolean(),
    },
    handler: async (ctx, args) => {

        const newNotification = await ctx.db.insert('notifications', {
            profile_id: args.profile_id,
            type: args.type,
            content: args.content,
            is_read: args.is_read,
            related_entity_id: args.related_entity_id,
            entity_name: args.entity_type!,
            priority: args.priority,
            is_dismissed: args.is_dismissed,
        });

        return newNotification;
    },
});

export const get_notifications = query({
    args: {
        profile_id: v.id('profiles'),
    },
    handler: async (ctx, args) => {
        const notifications = await ctx.db
            .query('notifications')
            .filter((q) => q.eq(q.field('profile_id'), args.profile_id))
            .collect();

        return notifications;
    },
});


export const update_notification = mutation({
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

export const remove_notification = mutation({
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

export const mark_as_read = mutation({
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
