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
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            {editing ? (
                <ProfileForm
                    initialName={profile.name}
                    initialEmail={profile.email}
                    initialBio={profile.bio}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <ProfileCard
                    name={profile.name}
                    email={profile.email}
                    bio={profile.bio}
                    onEdit={handleEdit}
                />
            )}
            <ConfirmDialog />
        </div>
    );
};

export default ProfilePage;
