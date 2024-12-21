import { Doc, Id } from "@/convex/_generated/dataModel"

export type SignInFlow = "signIn" | "signUp"

export type ProfileId = Id<"profiles">

export type Profile = Doc<"profiles">
export type Chat = Doc<"chats"> & { participant_profiles: Profile[] }
export type Comment = Doc<"comments"> & { profile: Profile }
export type Story = Doc<"stories"> & { author: Profile, shares: Id<"stories">[], likes: ProfileId[], reports: ProfileId[] }