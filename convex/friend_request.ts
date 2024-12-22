import { v } from 'convex/values';
import { mutation, query, QueryCtx } from './_generated/server';
import { FRIEND_REQUESTS } from '@/constants';
import { Id } from './_generated/dataModel';
import { auth } from './auth';

const populateProfile = async (ctx: QueryCtx, profileId: Id<"profiles">) => {
    return await ctx.db.get(profileId)
}
const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}

export const get_send_requests = query({
    args: {},
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        let profile: any = await populateProfileByUserId(ctx, userId)

        const requests = await ctx.db
            .query("friend_requests")
            .withIndex("by_sender_id_status", (q) => q.eq("sender_id", profile?._id).eq("status", "pending"))
            .collect();

        if (!requests.length) {
            return [];
        }

        let response = []

        for (const request of requests) {
            const r_profile = await populateProfile(ctx, request.receiver_id)
            response.push(r_profile)
        }

        return response
    },
});

export const get_received_requests = query({
    args: {},
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        let profile: any = await populateProfileByUserId(ctx, userId)

        const requests = await ctx.db
            .query("friend_requests")
            .withIndex("by_receiver_id_status", (q) => q.eq("receiver_id", profile?._id).eq("status", "pending"))
            .collect();

        if (!requests.length) {
            return [];
        }

        let response = []

        for (const request of requests) {
            const s_profile = await populateProfile(ctx, request.sender_id)
            response.push(s_profile)
        }

        return response
    },
});


export const send_request = mutation({
    args: {
        receiver_id: v.id("profiles"),
    },
    handler: async (ctx, { receiver_id }) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        let profile: any = await populateProfileByUserId(ctx, userId)

        const rid = await ctx.db.insert('friend_requests', {
            sender_id: profile?._id,
            receiver_id,
            status: 'pending',
        });

        return rid
    },
});

export const accept_request = mutation({
    args: {
        sender_id: v.id("profiles"),
    },
    handler: async (ctx, { sender_id }) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);
        if (!profile) return null;

        // Fetch the friend request
        const request = await ctx.db
            .query('friend_requests')
            .withIndex('by_sender_id_receiver_id_status', (q) =>
                q.eq("sender_id", sender_id)
                    .eq("receiver_id", profile._id)
                    .eq("status", "pending")
            )
            .unique();

        if (!request) {
            return null;
        }

        // Update request status to accepted
        const rid = await ctx.db.patch(request._id, { status: "accepted" });

        // Add to friends table
        await ctx.db.insert("friends", {
            friend_id: profile._id,
            profile_id: sender_id,
        });

        return rid;
    },
});

export const reject_request = mutation({
    args: {
        sender_id: v.id("profiles"),
    },
    handler: async (ctx, { sender_id }) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);
        if (!profile) return null;

        // Fetch the friend request
        const request = await ctx.db
            .query('friend_requests')
            .withIndex('by_sender_id_receiver_id_status', (q) =>
                q.eq("sender_id", sender_id)
                    .eq("receiver_id", profile._id)
                    .eq("status", "pending")
            )
            .unique();

        if (!request) {
            return null;
        }

        // Update request status to rejected
        const rid = await ctx.db.patch(request._id, { status: "rejected" });

        return rid;
    },
});

export const delete_request = mutation({
    args: {
        receiver_id: v.id("profiles"),
    },
    handler: async (ctx, { receiver_id }) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);
        if (!profile) return null;

        // Fetch the friend request
        const request = await ctx.db
            .query('friend_requests')
            .withIndex('by_sender_id_receiver_id_status', (q) =>
                q
                    .eq("sender_id", profile._id)
                    .eq("receiver_id", receiver_id)
                    .eq("status", "pending")
            )
            .unique();

        if (!request) {
            return null;
        }

        const rid = await ctx.db.delete(request._id!)

        return rid
    },
});