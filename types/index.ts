import { Doc, Id } from "@/convex/_generated/dataModel"

export type SignInFlow = "signIn" | "signUp"

export type ProfileId = Id<"profiles">

export type Profile = Doc<"profiles">
export type Chat = Doc<"chats"> & { participant_profiles: Profile[] }
export type Comment = Doc<"comments"> & { profile: Profile, story: Story }
export type Story = Doc<"stories"> & { author: Profile, shares: Id<"stories">[], likes: ProfileId[], reports: ProfileId[] }
export type SharedStory = Doc<"stories"> & { author: Profile, shares: Id<"stories">[], likes: ProfileId[], reports: ProfileId[], shared_at: number }
export type Message = Doc<"messages">
export type StoryReport = Doc<"story_reports"> & { story: Story, profile: Profile }
export type Contact = Doc<"contacts">
export type Subscription = Doc<"subscriptions"> & { is_active: boolean }