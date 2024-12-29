import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { auth } from './auth';
import { populateProfile, populateProfileByUserId } from './utils';
import { PLANS } from '@/constants';


export const get_subscription_by_profile_id = query({
    args: {
        profile_id: v.optional(v.id("profiles"))
    },
    handler: async (ctx, args) => {

        const user_id = await auth.getUserId(ctx)
        if (user_id == null) return null

        let profile;
        if (args.profile_id) {
            profile = await populateProfile(ctx, args.profile_id)
        }
        else {
            profile = await populateProfileByUserId(ctx, user_id)
        }

        const subscription = await ctx.db
            .query('subscriptions')
            .withIndex('by_profile_id', q => q.eq('profile_id', profile?._id))
            .first()

        if (!subscription) return null

        const DAY_IN_MS = 86_400_000

        const stripe_current_period_end = new Date(subscription.stripe_current_period_end!);

        const is_active =
            subscription.stripe_price_id &&
            stripe_current_period_end?.getTime()! + DAY_IN_MS > Date.now()

        return { ...subscription, is_active: !!is_active };
    }
})


export const create_my_subscription = mutation({
    args: {
        profile_id: v.id("profiles"),
        stripe_subscription_id: v.string(),
        stripe_customer_id: v.string(),
        stripe_price_id: v.string(),
        stripe_current_period_end: v.string(),
        plan: v.union(...PLANS.map(item => v.literal(item.key))),
    },
    handler: async (ctx, args) => {

        console.log('c args', args)

        const profile = await populateProfile(ctx, args.profile_id)
        if (!profile) return null

        const subscription = await ctx.db
            .query('subscriptions')
            .withIndex('by_profile_id', q => q.eq('profile_id', profile?._id!))
            .first()

        if (subscription) return { success: false, message: 'Subscription already exists' }

        await ctx.db.insert('subscriptions', {
            profile_id: profile?._id,
            stripe_subscription_id: args.stripe_subscription_id,
            stripe_customer_id: args.stripe_customer_id,
            stripe_price_id: args.stripe_price_id,
            stripe_current_period_end: args.stripe_current_period_end,
            plan: args.plan
        })

        return { success: true }
    }
})

export const update_my_subscription = mutation({
    args: {
        stripe_subscription_id: v.string(),
        stripe_customer_id: v.optional(v.string()),
        stripe_price_id: v.optional(v.string()),
        stripe_current_period_end: v.optional(v.string()),
        plan: v.optional(v.union(...PLANS.map(item => v.literal(item.key)))),
    },
    handler: async (ctx, args) => {

        console.log('u args', args)

        const subscription = await ctx.db
            .query('subscriptions')
            .withIndex('by_subscription_id', q => q.eq('stripe_subscription_id', args.stripe_subscription_id))
            .first()

        if (!subscription) return null

        await ctx.db
            .patch(subscription?._id, {
                stripe_subscription_id: args.stripe_subscription_id,
                stripe_customer_id: args.stripe_customer_id,
                stripe_price_id: args.stripe_price_id,
                stripe_current_period_end: args.stripe_current_period_end,
                plan: args.plan,
            })


        return { success: true }
    }
})