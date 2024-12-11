import React, { useState } from 'react';

type ProfileFormProps = {
    initialName: string;
    initialEmail: string;
    initialBio: string;
    onSave: (data: { name: string; email: string; bio: string }) => void;
    onCancel: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ initialName, initialEmail, initialBio, onSave, onCancel }) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [bio, setBio] = useState(initialBio);

    const handleSubmit = () => {
        onSave({ name, email, bio });
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2 border rounded"
                ></textarea>
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Cancel
                </button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                </button>
            </div>
        </div>
    );
};

export default ProfileForm;
