import GradientText from "@/components/GradientText";
import Hint from "@/components/Hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetPreference } from "@/features/preference/api/useGetPreferences";
import { useGetProfile } from "@/features/profile/api/useGetProfile";
import { useGetDraftStories } from "@/features/story/api/useGetDraftStories";
import { useGetLikedStories } from "@/features/story/api/useGetLikedStories";
import { useGetAIStories } from "@/features/story/api/useGetMyAIStories";
import { useGetSharedStories } from "@/features/story/api/useGetSharedStories";
import { useGetMySubscription } from "@/features/subscriptions/api/useGetMySubscription";
import { usePreferencesModal } from "@/hooks/use-preferences-modal";
import { useProfileId } from "@/hooks/use-profile-id";
import { useProfileModal } from "@/hooks/use-profile-modal";
import { calculateAge } from "@/lib/utils";
import { Bell, MapPin, Pencil, UserRound } from "lucide-react";

const ProfileSidebar: React.FC = () => {

    const profile_id = useProfileId()
    const { data: myProfile } = useGetProfile();
    const { data: userProfile } = useGetProfile(profile_id);
    const { data: likedStories } = useGetLikedStories()
    const { data: sharedStories } = useGetSharedStories()
    const { data: draftStories } = useGetDraftStories()
    const { data: myAIStories } = useGetAIStories(profile_id)
    const { data: subscription } = useGetMySubscription(profile_id)
    const { data: preferences } = useGetPreference();

    const [_openProfileModal, setOpenProfileModal] = useProfileModal()
    const [_openPreferencesModal, setOpenPreferencesModal] = usePreferencesModal()


    const isMyProfile = myProfile?._id == profile_id || !profile_id
    const isPro = !!subscription?.is_active
    const profile = profile_id ? userProfile : myProfile


    const onUpgrade = () => {
        console.log("Upgrade to premium")
    }

    return (
        <Card className="w-full max-w-xs p-4 shadow-md bg-surface ">

            <CardHeader className="flex flex-col items-center relative ">
                <Button onClick={() => setOpenProfileModal(true)} variant='ghost' size='icon' className="absolute -top-1 -right-1 " ><Pencil /></Button>
                <Avatar className="h-32 w-32">
                    <AvatarImage src={profile?.profile_picture_url} alt={profile?.username} />
                    <AvatarFallback className="text-4xl capitalize" >{profile?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-lg font-bold text-neutral-foreground capitalize ">
                        {profile?.username || "Username"} {isPro && <GradientText className="text-xs">(Pro User)</GradientText>}
                    </h2>
                    <p className="text-sm text-surface-foreground ">{profile?.email || "user@example.com"}</p>
                </div>
            </CardHeader>

            <CardContent className="mt-4 space-y-4">
                <div className="space-y-2" >
                    <Hint label="Location" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <MapPin className="w-6 h-6 text-foreground bg-theme-gradient/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-surface-foreground">
                                {profile?.location || "LHR"}
                            </p>
                        </div>
                    </Hint>
                    <Hint label="Age" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <UserRound className="w-6 h-6 text-foreground bg-theme-gradient/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-surface-foreground">
                                {calculateAge(profile?.date_of_birth!) || "19"} years old
                            </p>
                        </div>
                    </Hint>
                    <Hint label="Notifications" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <Bell className="w-6 h-6 text-primary bg-theme-gradient/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-surface-foreground">
                                {JSON.stringify(profile?.notification_settings) || "Enabled"}
                            </p>
                        </div>
                    </Hint>
                </div>

                {/* Bio Section */}
                <div className="space-y-2" >
                    {
                        isMyProfile &&
                        <>
                            <div className='flex gap-1' >
                                <h3 className="text-sm font-medium text-neutral-foreground">Credits: </h3>
                                <p className="text-sm text-surface-foreground">
                                    {profile?.credit} Credit{profile?.credit! > 1 ? 's' : ''} left
                                </p>
                            </div>
                            {
                                !isPro &&
                                <Button
                                    variant='gradient'
                                    disabled={isPro}
                                    onClick={onUpgrade}
                                >
                                    {isPro ? "Premium Member" : "Upgrade to Premium"}
                                </Button>
                            }
                        </>
                    }
                </div>

                {/* Bio Section */}
                <div className="space-y-1" >
                    <h3 className="text-sm font-medium text-neutral-foreground">Bio</h3>
                    <p className="text-sm text-surface-foreground">
                        {profile?.bio || "Creative problem-solver passionate about technology, design, and storytelling. Dedicated to crafting impactful solutions and inspiring innovation."}
                    </p>
                </div>

                {
                    isMyProfile &&
                    <>
                        {/* Stats Section */}
                        <div className="space-y-1" >
                            <h3 className="text-sm font-medium text-neutral-foreground">Story Stats</h3>
                            <div className="flex flex-col justify-between gap-1 text-sm text-surface-foreground">
                                <div>
                                    <span className="font-medium">AI Stories:</span> {myAIStories?.length}
                                </div>
                                <div>
                                    <span className="font-medium">Drafts:</span> {draftStories?.length}
                                </div>
                                <div>
                                    <span className="font-medium">Liked Stories:</span> {likedStories?.length}
                                </div>
                                <div>
                                    <span className="font-medium">Shared Stories:</span> {sharedStories?.length}
                                </div>
                            </div>
                        </div>
                        {/* Preferences Section */}
                        <div className="space-y-1" >
                            <h3 className="text-sm font-medium text-neutral-foreground">Preferences</h3>
                            <div className="flex flex-col justify-between gap-1 text-sm text-surface-foreground">
                                <div>
                                    <span className="font-medium">Theme:</span> {preferences?.theme}
                                </div>
                                <div>
                                    <span className="font-medium">Language:</span> {preferences?.language}
                                </div>
                                <div>
                                    <span className="font-medium">Visibility:</span> {preferences?.profile_visibility}
                                </div>
                                <div>
                                    <span className="font-medium">Notifications:</span> {preferences?.notifications && Object.values(preferences?.notifications).filter(Boolean).length} enabled
                                </div>
                                <Button onClick={() => setOpenPreferencesModal(true)} variant='secondary' className="mt-2" >Update Preferences</Button>
                            </div>
                        </div>
                    </>
                }


            </CardContent>
        </Card>
    );
};

export default ProfileSidebar;
