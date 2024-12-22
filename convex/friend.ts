import { v } from 'convex/values';
import { mutation, query, QueryCtx } from './_generated/server';
import { auth } from './auth';
import { Id } from './_generated/dataModel';

const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}
const populateProfile = async (ctx: QueryCtx, profileId: Id<"profiles">) => {
    return await ctx.db.get(profileId)
}

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);
        if (!profile) return null;

        const friendsByProfileId = await ctx.db
            .query("friends")
            .withIndex("by_profile_id", (q) => q.eq("profile_id", profile._id))
            .collect();

        const friendsByFriendId = await ctx.db
            .query("friends")
            .withIndex("by_friend_id", (q) => q.eq("friend_id", profile._id))
            .collect();

        const allFriends = Array.from(
            new Map(
                [...friendsByProfileId, ...friendsByFriendId].map((f) => [f._id, f])
            ).values()
        );

        const response = await Promise.all(
            allFriends.map(async (f) => {
                const friendId =
                    f.profile_id === profile._id ? f.friend_id : f.profile_id;
                return await populateProfile(ctx, friendId);
            })
        );

        return response;
    },
});


// Mutation to add a new friend
export const add = mutation({
    args: {
        friend_id: v.id("profiles"),
    },
    handler: async (ctx, { friend_id }) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId)

        const id = await ctx.db.insert('friends', {
            profile_id: profile?._id,
            friend_id,
        });
        return id;
    },
});

// Mutation to remove a friend
export const remove = mutation({
    args: {
        friend_id: v.id("profiles"),
    },
    handler: async (ctx, { friend_id }) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId)

        const friend = await ctx.db.query('friends').withIndex('by_profile_id_friend_id', q => q.eq("profile_id", profile?._id).eq("friend_id", friend_id)).first()

        const id = await ctx.db.delete(friend?._id!)

        return id
    },
});

