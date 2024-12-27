import { v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

const populateImage = async (ctx: QueryCtx | MutationCtx, image: Doc<"images">) => {
    let obj: any = { ...image };
    if (image.story_id) {
        const story = await ctx.db.get(image.story_id);
        obj = { ...obj, story }
    }
    if (image.profile_id) {
        const profile = await ctx.db.get(image.profile_id);
        obj = { ...obj, profile }
    }
    if (!image.url) {
        const url = await ctx.storage.getUrl(image.storage_id);
        obj = { ...obj, url }
    }
    return obj
}

export const get_all_images = query({
    handler: async (ctx) => {

        const images = await ctx.db
            .query('images')
            .collect();

        let response = []
        for (const image of images) {
            const populated_image = await populateImage(ctx, image)
            response.push(populated_image)
        }
        return response;
    },
});

export const get_images_by_story_id = query({
    args: {
        story_id: v.id('stories'),
    },
    handler: async (ctx, args) => {
        const images = await ctx.db
            .query('images')
            .withIndex('by_story_id', q => q.eq('story_id', args.story_id))
            .collect();

        let response = []

        for (const image of images) {
            const populated_image = await populateImage(ctx, image)
            response.push(populated_image)
        }

        return response;
    },
});

export const get_images_by_profile_id = query({
    args: {
        profile_id: v.id('profiles'),
    },
    handler: async (ctx, args) => {
        const images = await ctx.db
            .query('images')
            .withIndex('by_profile_id', q => q.eq('profile_id', args.profile_id))
            .collect();

        let response = []

        for (const image of images) {
            const populated_image = await populateImage(ctx, image)
            response.push(populated_image)
        }

        return response;
    },
});

export const create_image = mutation({
    args: {
        url: v.optional(v.string()),
        storage_id: v.string(),
        story_id: v.optional(v.id("stories")),
        profile_id: v.optional(v.id("profiles")),
    },
    handler: async (ctx, args) => {

        const newImage = await ctx.db.insert('images', {
            url: args.url,
            storage_id: args.storage_id,
            story_id: args.story_id,
            profile_id: args.profile_id,
        });

        return newImage;
    },
});

export const bulk_create_image = mutation({
    args: {
        images: v.array(v.object({
            url: v.optional(v.string()),
            storage_id: v.string(),
            story_id: v.optional(v.id("stories")),
            profile_id: v.optional(v.id("profiles")),
        }))
    },
    handler: async (ctx, args) => {

        for (const image of args.images) {
            var url: any = image.url;
            if (!url) {
                url = await ctx.storage.getUrl(image.storage_id);
            }
            await ctx.db.insert('images', {
                url: url,
                storage_id: image.storage_id,
                story_id: image.story_id,
                profile_id: image.profile_id,
            });
        }

        return null;
    },
});


export const update_image = mutation({
    args: {
        id: v.id('images'),
        url: v.optional(v.string()),
        storage_id: v.optional(v.string()),
        story_id: v.optional(v.id("stories")),
        profile_id: v.optional(v.id("profiles")),
    },
    handler: async (ctx, args) => {

        const image = await ctx.db.get(args.id);
        if (!image) return null

        const updatedImage = await ctx.db.patch(image?._id, {
            url: args.url,
            storage_id: args.storage_id,
            story_id: args.story_id,
            profile_id: args.profile_id,
        })

        return updatedImage;
    },
});

export const deleteImage = mutation({
    args: {
        id: v.id('images'),
    },
    handler: async (ctx, args) => {

        const image = await ctx.db.get(args.id);
        if (!image) return null

        const deletedImage = await ctx.db.delete(args.id);

        return deletedImage;
    },
});
