import React from 'react';

type ProfileCardProps = {
    name: string;
    email: string;
    bio: string;
    onEdit: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, bio, onEdit }) => (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="text-gray-700"><strong>Name:</strong> {name}</p>
        <p className="text-gray-700"><strong>Email:</strong> {email}</p>
        <p className="text-gray-700"><strong>Bio:</strong> {bio || 'No bio available'}</p>
        <button
            onClick={onEdit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Edit Profile
        </button>
    </div>
);

export default ProfileCard;
