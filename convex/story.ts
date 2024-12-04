import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { auth } from './auth'
import { STORY_GENRES, STORY_STATUSES } from '@/constants'


export const create = mutation({
    args: { title: v.string(), content: v.string() },
    handler: async (ctx, args) => {

        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error('Unauthenticated')

        const storyId = await ctx.db.insert('stories', {
            title: args.title,
            content: args.content,
            author_id: userId,
            genre: "general",
            image_style: "3D-cartoon",
            age_category: "adult",
            cover_image: "",
            type: "manual",
            is_public: true,
            status: 'draft',
            views_count: 0,
            ratings_average: 0,
            reports_count: 0,
        })

        return storyId
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) return []

        const stories = await ctx.db
            .query('stories')
            .withIndex('by_author_id', q => q.eq("author_id", userId))
            .collect()

        return stories
    }
})

export const getById = query({
    args: { id: v.id("stories") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)

        return story
    }
})

export const update = mutation({
    args: {
        id: v.id("stories"),
        title: v.string(),
        content: v.string(),
        genre: v.union(...STORY_GENRES.map(v.literal)),
        status: v.union(...STORY_STATUSES.map(v.literal)),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)
        if (!story || story.author_id !== userId)
            throw new Error('Unauthorized')

        await ctx.db.patch(args.id, {
            title: args.title,
            content: args.content,
            genre: args.genre,
            status: args.status,
        })

        return args.id
    }
})

export const remove = mutation({
    args: {
        id: v.id("stories"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) throw new Error("Unauthenticated")

        const story = await ctx.db.get(args.id)
        if (!story) throw new Error('Story not found')

        if (story.author_id !== userId) {
            throw new Error('Unauthorized')
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})
