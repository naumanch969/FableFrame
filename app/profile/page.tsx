"use client";
import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';
import { useConfirm } from '@/hooks/use-confirm';

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'A passionate writer.',
        age: 30,
        numberOfStories: 5,
        location: 'New York',
        profilePicture: null as File | null,
    });
    const [editing, setEditing] = useState(false);
    const [ConfirmDialog, confirm] = useConfirm('Discard Changes?', 'Are you sure you want to discard unsaved changes?');

    const handleEdit = () => setEditing(true);

    const handleSave = (updatedProfile: typeof profile) => {
        setProfile(updatedProfile);
        setEditing(false);
    };

    const handleCancel = async () => {
        const confirmed = await confirm();
        if (confirmed) setEditing(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-6">
            {/* Profile Section: Display ProfileCard or ProfileForm */}
            {editing ? (
                <ProfileForm
                    initialName={profile.name}
                    initialEmail={profile.email}
                    initialBio={profile.bio}
                    initialAge={profile.age}
                    initialNumberOfStories={profile.numberOfStories}
                    initialLocation={profile.location}
                    initialProfilePicture={profile.profilePicture}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <ProfileCard
                    name={profile.name}
                    email={profile.email}
                    bio={profile.bio}
                    age={profile.age}
                    numberOfStories={profile.numberOfStories}
                    location={profile.location}
                    profilePicture={profile.profilePicture}
                    onEdit={handleEdit}
                />
            )}
            <ConfirmDialog />
        </div>
    );
};

export default ProfilePage;
