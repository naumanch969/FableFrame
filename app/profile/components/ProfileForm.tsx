import React, { useState } from 'react';

type ProfileFormProps = {
    initialName: string;
    initialEmail: string;
    initialBio: string;
    initialAge: number;
    initialNumberOfStories: number;
    initialLocation: string;
    initialProfilePicture: File | null;
    onSave: (data: {
        name: string;
        email: string;
        bio: string;
        age: number;
        numberOfStories: number;
        location: string;
        profilePicture: File | null;
    }) => void;
    onCancel: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
    initialName,
    initialEmail,
    initialBio,
    initialAge,
    initialNumberOfStories,
    initialLocation,
    initialProfilePicture,
    onSave,
    onCancel,
}) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [bio, setBio] = useState(initialBio);
    const [age, setAge] = useState(initialAge);
    const [numberOfStories, setNumberOfStories] = useState(initialNumberOfStories);
    const [location, setLocation] = useState(initialLocation);
    const [profilePicture, setProfilePicture] = useState(initialProfilePicture);

    const handleSubmit = () => {
        onSave({ name, email, bio, age, numberOfStories, location, profilePicture });
    };

    return (
        <div className="space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-3 border rounded-md"
                        rows={4}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">Number of Stories</label>
                    <input
                        type="number"
                        value={numberOfStories}
                        onChange={(e) => setNumberOfStories(Number(e.target.value))}
                        className="w-full p-3 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                        className="w-full p-3 border rounded-md"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ProfileForm;
