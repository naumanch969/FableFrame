import React from 'react';

type ProfileCardProps = {
    name: string;
    email: string;
    bio: string;
    age: number;
    numberOfStories: number;
    location: string;
    profilePicture: File | null;
    onEdit: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    email,
    bio,
    age,
    numberOfStories,
    location,
    profilePicture,
    onEdit,
}) => {
    const profilePicUrl = profilePicture ? URL.createObjectURL(profilePicture) : '/default-profile.png';

    return (
        <div className="flex space-x-8">
            {/* Left: Profile Picture */}
            <div className="flex-shrink-0">
                <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-200"
                />
            </div>
            
            {/* Right: Profile Information */}
            <div className="flex-grow space-y-4">
                <h2 className="text-3xl font-semibold text-gray-900">{name}</h2>
                <p className="text-lg text-gray-600">{bio}</p>

                <div className="flex space-x-8 text-gray-700">
                    <div>
                        <p className="font-medium">Age</p>
                        <p>{age}</p>
                    </div>
                    <div>
                        <p className="font-medium">Location</p>
                        <p>{location}</p>
                    </div>
                    <div>
                        <p className="font-medium">Stories</p>
                        <p>{numberOfStories}</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onEdit}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
