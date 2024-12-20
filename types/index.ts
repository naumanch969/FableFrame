import { Doc } from "@/convex/_generated/dataModel"

export type SignInFlow = "signIn" | "signUp"

export type Chat = Doc<"chats"> & { participant_profiles: Doc<"profiles">[] }
export type Profile = Doc<"profiles">
export type Comment = Doc<"comments"> & { profile: Doc<"profiles"> }