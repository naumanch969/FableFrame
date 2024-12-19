import { query } from './_generated/server';
import { auth } from './auth';

export const get_current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)
        if (userId == null) return null

        const user = await ctx.db.get(userId)

        return user;
    }
})

export const get_users = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Unauthenticated");

        const users = await ctx.db
            .query("users")
            .collect();

        return users
    }
});
