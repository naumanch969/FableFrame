import { INITIAL_PROFILE_PREFERENCES, NOTIFICATION_TYPES } from "@/constants";
import { Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";



export const populateProfileByUserId = async (ctx: QueryCtx, userId: Id<"users">) => {
    let profile: any = await ctx.db.query("profiles").withIndex("by_user_id", (q) => q.eq("user_id", userId)).first();
    return profile
}
export const populateProfile = async (ctx: QueryCtx, profileId: Id<"profiles">) => {
    return await ctx.db.get(profileId)
}

export const createNotification = async (ctx: MutationCtx, data: {
    content: string,
    entity_name: string,
    is_dismissed: boolean,
    is_read: boolean,
    priority: string,
    profile_id: Id<"profiles">,
    type: typeof NOTIFICATION_TYPES[number]['key'],
    link: string,
    related_entity_id: string
}) => {

    const notificationId = await ctx.db.insert('notifications', {
        profile_id: data.profile_id,
        content: data.content,
        entity_name: data.entity_name,
        is_dismissed: false,
        is_read: false,
        priority: data.priority,
        type: data.type,
        link: data.link,
        related_entity_id: data.related_entity_id
    })

    return notificationId
}

export const createInitialPreferences = async (ctx: MutationCtx, profile_id: Id<"profiles">) => {
    let preferences = INITIAL_PROFILE_PREFERENCES
    preferences.profile_id = profile_id

    const preferencesId = await ctx.db.insert('preferences', {
        ...preferences,
        profile_id,
    })

    return preferencesId
}