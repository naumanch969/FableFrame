import { mutation } from './_generated/server';
import { v } from "convex/values";
import { auth } from './auth';

export const toggle_like_dislike_story = mutation({
    args: {
        story_id: v.id("stories"),
    },
    handler: async (ctx, { story_id }) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error('Unauthenticated');

        const profile = await ctx.db.query('profiles').filter(q => q.eq(q.field('user_id'), userId)).unique();
        if (!profile) throw new Error('Profile not found for the given user_id');

        const profile_id = profile?._id;

        // Check if the like record already exists
        const existingLike = await ctx.db
            .query("likes")
            .filter(q => q.and(q.eq(q.field("profile_id"), profile_id), q.eq(q.field("story_id"), story_id)))
            .unique();

        if (existingLike) {
            // If the like exists, remove it (dislike action)
            await ctx.db.delete(existingLike._id);
            return { message: "Story disliked" };
        }

        // If the like doesn't exist, add it (like action)
        await ctx.db.insert("likes", { profile_id, story_id });
        return { message: "Story liked" };
    },
});
