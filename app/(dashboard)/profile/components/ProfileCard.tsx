import React from 'react';

interface ProfileCardProps {
    name: string;
    email: string;
    bio: string;
    age: number;
    numberOfStories: number;
    location: string;
    profilePicture: string | null;
    drafts: number;
    likedStories: number;
    savedStories: number;
    onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    email,
    bio,
    age,
    numberOfStories,
    location,
    profilePicture,
    drafts,
    likedStories,
    savedStories,
    onEdit,
}) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
                ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                )}
                <div>
                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Bio</h3>
                <p>{bio}</p>
            </div>
            <div className="flex space-x-8">
                <div>
                    <h3 className="text-lg font-medium">Age</h3>
                    <p>{age}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Location</h3>
                    <p>{location}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Stories</h3>
                    <p>{numberOfStories}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Drafts</h3>
                    <p>{drafts}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Likes</h3>
                    <p>{likedStories}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Shares</h3>
                    <p>{savedStories}</p>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={onEdit}
                    className="bg-blue-600 text-surface-foreground px-4 py-2 rounded-md shadow-md"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
