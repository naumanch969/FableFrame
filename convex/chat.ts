import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { auth } from "./auth";

const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}

export const get = query({
    args: {},
    handler: async (ctx) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const chats = await ctx.db
            .query("chats")
            .collect();

        const userChats = chats.filter(chat =>
            chat.participants.some(participant => participant === profile?._id)
        );

        return userChats;
    },
});

export const get_by_id = query({
    args: { chat_id: v.id("chats") },
    handler: async (ctx, { chat_id }) => {
        const chat = await ctx.db.get(chat_id);
        if (!chat) throw new Error("Chat not found");
        return chat;
    },
});

export const create = mutation({
    args: {
        other_profile_id: v.id("profiles"),
    },
    handler: async (ctx, { other_profile_id }) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const newChat = await ctx.db.insert("chats", {
            last_message: "",
            last_message_timestamp: new Date().toISOString(),
            participants: [profile?._id, other_profile_id],
            messages: [],
        });

        return newChat;
    },
});

export const delete_chat = mutation({
    args: { chat_id: v.id("chats") },
    handler: async (ctx, { chat_id }) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthonticated")

        await ctx.db.delete(chat_id);
        return chat_id;
    },
});
