import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema: './config/schema.ts',
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:y0LQkPhKDUM4@ep-dark-sound-a5liivx7.us-east-2.aws.neon.tech/fableframe?sslmode=require"
    },
    verbose: true,
    strict: true
})