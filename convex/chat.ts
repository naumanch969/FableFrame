import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { auth } from "./auth";

const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}
const populateProfile = async (ctx: QueryCtx, profileId: Id<"profiles">) => {
    return await ctx.db.get(profileId)
}


export const get = query({
    args: {},
    handler: async (ctx) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);

        const chats = await ctx.db
            .query("chats")
            .collect();

        const userChats = chats.filter(chat => chat.participants.some(participant => participant === profile?._id));

        let response = []

        for (const chat of userChats) {
            let participant_profiles = [];
            for (const participantId of chat?.participants) {
                const participantProfile = await populateProfile(ctx, participantId)
                if (participantProfile) participant_profiles.push(participantProfile)
            }
            if (participant_profiles.length > 0) response.push({ ...chat, participant_profiles })
        }

        return response;
    },
});

export const get_by_id = query({
    args: { chat_id: v.id("chats") },
    handler: async (ctx, { chat_id }) => {

        const chat = await ctx.db.get(chat_id);
        if (!chat) return null;

        let participant_profiles = []

        for (const participantId of chat.participants) {
            const participantProfile = await populateProfile(ctx, participantId)
            if (participantProfile) participant_profiles.push(participantProfile)
        }

        return { ...chat, participant_profiles }
    },
});

export const create = mutation({
    args: {
        other_profile_id: v.id("profiles"),
    },
    handler: async (ctx, { other_profile_id }) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) return null; // Unauthenticated

        const profile = await populateProfileByUserId(ctx, userId);

        const newChat = await ctx.db.insert("chats", {
            last_message: "",
            last_message_timestamp: new Date().toISOString(),
            participants: [profile?._id, other_profile_id],
        });

        return newChat;
    },
});

export const delete_chat = mutation({
    args: { chat_id: v.id("chats") },
    handler: async (ctx, { chat_id }) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) return null;

        await ctx.db.delete(chat_id);
        return chat_id;
    },
});
