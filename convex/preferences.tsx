import { v } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import { FONT_TYPE, GENDERS, LENGTH, PROFILE_VISIBILITY, STORY_AGE_CATEGORIES, STORY_GENRES, THEMES } from '@/constants';
import { auth } from './auth';
import { createInitialPreferences, populateProfileByUserId } from './utils';

export const get_preferences = query({
    args: {},
    handler: async (ctx) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthonticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const userPreferences = await ctx.db
            .query('preferences')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .first();

        return userPreferences;
    }
});

export const create_preferences = mutation({
    args: {},
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthonticated");

        const profile = await populateProfileByUserId(ctx, userId);

        // Check if preferences already exist
        const p = await ctx.db.query('preferences').withIndex('by_profile_id', (q) => q.eq('profile_id', profile._id)).first();
        if (p) return p._id;

        const existingPreferencesId = await createInitialPreferences(ctx, profile._id);

        return existingPreferencesId
    }
});

export const update_preferences = mutation({
    args: {
        theme: v.optional(v.union(...THEMES.map(item => v.literal(item.key)))),
        language: v.optional(v.string()), // e.g., 'en', 'es'
        font_size: v.optional(v.union(...LENGTH.map(item => v.literal(item.key)))),
        notifications: v.optional(v.object({
            likes: v.boolean(),
            shares: v.boolean(),
            new_features: v.boolean(),
            story: v.boolean(),
            friends: v.boolean(),
            account: v.boolean(),
        })),
        story_preferences: v.optional(v.object({
            genres: v.array(v.union(...STORY_GENRES.map(item => v.literal(item.key)))),
            age_category: v.array(v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key)))),
            preferred_length: v.array(v.union(...LENGTH.map(item => v.literal(item.key)))),
            content_filter: v.boolean(),
        })),
        accessibility: v.optional(v.object({
            text_to_speech: v.object({
                voice: v.union(...GENDERS.map(item => v.literal(item.key))),
                pitch: v.number(),
                speed: v.number(),
            }),
            font_type: v.union(...FONT_TYPE.map(item => v.literal(item.key))),
            auto_narration: v.boolean(),
        })),

        profile_visibility: v.optional(v.union(...PROFILE_VISIBILITY.map(item => v.literal(item.key)))),
        genre_frequency: v.optional(v.array(v.object({ genre: v.union(...STORY_GENRES.map(item => v.literal(item.key))), frequency: v.number() }))),
        category_frequency: v.optional(v.array(v.object({ category: v.union(...STORY_AGE_CATEGORIES.map(item => v.literal(item.key))), frequency: v.number() }))),
    },
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthonticated")

        const profile = await populateProfileByUserId(ctx, userId)

        const preferences = await ctx.db
            .query('preferences')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile?._id))
            .first();

        if (!preferences) throw new Error("Preferences not found");

        const preferences_id = await ctx.db.patch(preferences._id, args)

        return preferences_id
    }
});

export const delete_preferences = mutation({
    args: {
        profile_id: v.id("profiles"),
    },
    handler: async (ctx, { profile_id }) => {
        const preferences = await ctx.db
            .query('preferences')
            .withIndex('by_profile_id', (q) => q.eq('profile_id', profile_id))
            .first();

        if (!preferences) {
            throw new Error('Preferences not found.');
        }

        await ctx.db.delete(preferences._id)

        return { success: true };
    }
});
