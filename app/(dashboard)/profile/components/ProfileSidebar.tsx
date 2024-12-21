import Hint from "@/components/Hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentProfile } from "@/features/profile/api/useCurrentProfile";
import { useGetDraftStories } from "@/features/story/api/use-get-draft-stories";
import { useGetLikedStories } from "@/features/story/api/use-get-liked-stories";
import { useGetMyAIStories } from "@/features/story/api/use-get-my-ai-stories";
import { useGetMyManualStories } from "@/features/story/api/use-get-my-manual-stories";
import { useGetSharedStories } from "@/features/story/api/use-get-shared-stories";
import { useProfileModal } from "@/hooks/use-profile-modal";
import { calculateAge } from "@/lib/utils";
import { Bell, MapPin, Pencil, UserRound } from "lucide-react";

const ProfileSidebar: React.FC = () => {

    const { data } = useCurrentProfile();
    const { data: likedStories } = useGetLikedStories()
    const { data: sharedStories } = useGetSharedStories()
    const { data: draftStories } = useGetDraftStories()
    const { data: myAIStories } = useGetMyAIStories()
    const { data: myManualStories } = useGetMyManualStories()

    const [_open, setOpenProfileModal] = useProfileModal()

    return (
        <Card className="w-full max-w-xs p-4 shadow-md">

            <CardHeader className="flex flex-col items-center relative ">
                <Button onClick={() => setOpenProfileModal(true)} variant='ghost' size='icon' className="absolute -top-1 -right-1 " ><Pencil /></Button>
                <Avatar className="h-32 w-32">
                    <AvatarImage src={data?.profile_picture_url} alt={data?.username} />
                    <AvatarFallback className="text-4xl capitalize" >{data?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-800 capitalize ">{data?.username || "Username"}</h2>
                    <p className="text-sm text-gray-600 ">{data?.email || "user@example.com"}</p>
                </div>
            </CardHeader>

            <CardContent className="mt-4 space-y-4">
                <div className="space-y-2" >
                    <Hint label="Location" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <MapPin className="w-6 h-6 text-foreground bg-primary/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-gray-600">
                                {data?.location || "LHR"}
                            </p>
                        </div>
                    </Hint>
                    <Hint label="Age" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <UserRound className="w-6 h-6 text-foreground bg-primary/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-gray-600">
                                {calculateAge(data?.date_of_birth!) || "19"} years old
                            </p>
                        </div>
                    </Hint>
                    <Hint label="Notifications" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <Bell className="w-6 h-6 text-foreground bg-primary/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-gray-600">
                                {JSON.stringify(data?.notification_settings) || "Enabled"}
                            </p>
                        </div>
                    </Hint>
                </div>

                {/* Bio Section */}
                <div className="space-y-1" >
                    <h3 className="text-sm font-medium text-gray-800">Bio</h3>
                    <p className="text-sm text-gray-600">
                        {data?.bio || "Creative problem-solver passionate about technology, design, and storytelling. Dedicated to crafting impactful solutions and inspiring innovation."}
                    </p>
                </div>

                {/* Stats Section */}
                <div className="space-y-1" >
                    <h3 className="text-sm font-medium text-gray-800">Story Stats</h3>
                    <div className="flex flex-col justify-between gap-1 text-sm text-gray-600">
                        <div>
                            <span className="font-medium">AI Stories:</span> {myAIStories?.length}
                        </div>
                        <div>
                            <span className="font-medium">Manual Stories:</span> {myManualStories?.length}
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
                    <h3 className="text-sm font-medium text-gray-800">Preferences</h3>
                    <p className="text-sm text-gray-600">
                        {JSON.stringify(data?.preferences) || "No preferences set."}
                    </p>
                </div>

            </CardContent>
        </Card>
    );
};

export default ProfileSidebar;
