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
