import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from 'convex/values'

const schema = defineSchema({
    ...authTables,
    story: defineTable({
        name: v.string(),
    }),

})

export default schema