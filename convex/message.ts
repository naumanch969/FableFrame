import { Id } from "./_generated/dataModel";
import { query, mutation, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}

export const get_messages = query({
    args: {
        chat_id: v.id("chats"),
    },
    handler: async (ctx, { chat_id }) => {
        const messages = await ctx.db
            .query("messages")
            .withIndex('by_chat_id', q => q.eq("chat_id", chat_id))
            .collect();

        return messages;
    },
});

export const send_message = mutation({
    args: {
        chat_id: v.id("chats"),
        receiver_id: v.id("profiles"),
        text: v.string(),
    },
    handler: async (ctx, { receiver_id, chat_id, text }) => {

        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const profile = await populateProfileByUserId(ctx, userId);

        const newMessage = await ctx.db.insert("messages", {
            sender_id: profile?._id,
            receiver_id,
            text,
            chat_id
        });

        return newMessage;
    },
});

export const mark_as_read = mutation({
    args: {
        message_id: v.id("messages"),
        user_id: v.id("profiles"),
    },
    handler: async (ctx, { message_id, user_id }) => {
        const message = await ctx.db.get(message_id);
        if (!message) throw new Error("Message not found");

        // Only mark as read if the user is the receiver
        if (message.receiver_id !== user_id) throw new Error("User is not the receiver");

        await ctx.db.patch(message_id, {
            read_by: user_id,
        });

        return message_id;
    },
});

export const delete_message = mutation({
    args: { message_id: v.id("messages") },
    handler: async (ctx, { message_id }) => {
        const message = await ctx.db.get(message_id);
        if (!message) throw new Error("Message not found");

        await ctx.db.delete(message_id);
        return message_id
    },
});
