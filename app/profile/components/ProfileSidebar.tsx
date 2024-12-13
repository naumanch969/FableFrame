import Hint from "@/components/Hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { Bell, MapPin, UserRound } from "lucide-react";
import React from "react";

const ProfileSidebar: React.FC = () => {
    const { data } = useCurrentUser();

    return (
        <Card className="w-full max-w-xs p-4 shadow-md">
            <CardHeader className="flex flex-col items-center">
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
                            <MapPin className="w-6 h-6 text-primary bg-primary/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-gray-600">
                                {data?.location || "LHR"}
                            </p>
                        </div>
                    </Hint>
                    <Hint label="Age" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <UserRound className="w-6 h-6 text-primary bg-primary/20 border border-primary p-1 rounded-md" />
                            <p className="text-sm text-gray-600">
                                {data?.date_of_birth || "19"} years old
                            </p>
                        </div>
                    </Hint>
                    <Hint label="Notifications" align="start" >
                        <div className="flex justify-start items-center gap-2">
                            <Bell className="w-6 h-6 text-primary bg-primary/20 border border-primary p-1 rounded-md" />
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
                            <span className="font-medium">Drafts:</span> {2}
                        </div>
                        <div>
                            <span className="font-medium">Manual Stories:</span> {10}
                        </div>
                        <div>
                            <span className="font-medium">AI Stories:</span> {23}
                        </div>
                        <div>
                            <span className="font-medium">Liked Stories:</span> {30}
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
