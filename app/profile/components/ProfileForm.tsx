import React, { useState } from 'react';

interface ProfileFormProps {
    initialName: string;
    initialEmail: string;
    initialBio: string;
    initialAge: number;
    initialNumberOfStories: number;
    initialLocation: string;
    initialProfilePicture: string | null;
    onSave: (updatedProfile: any) => void;
    onCancel: () => void;
}

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
        onSave({
            username: name,
            email: email,
            bio: bio,
            date_of_birth: age,
            preferences: { numberOfStories },
            location: location,
            profile_picture_url: profilePicture,
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files![0]))}
                    className="hidden"
                    id="profile-picture"
                />
                <label htmlFor="profile-picture" className="w-16 h-16 bg-gray-300 rounded-full cursor-pointer">
                    {profilePicture && <img src={profilePicture} alt="Profile" className="w-full h-full rounded-full" />}
                </label>
                <div>
                    <h2 className="text-2xl font-semibold">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-b-2 border-gray-300 focus:outline-none"
                        />
                    </h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full border-b-2 border-gray-300 focus:outline-none"
                    />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Bio</h3>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none"
                />
            </div>
            <div className="flex space-x-8">
                <div>
                    <h3 className="text-lg font-medium">Age</h3>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="border-b-2 border-gray-300 focus:outline-none"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium">Stories</h3>
                    <input
                        type="number"
                        value={numberOfStories}
                        onChange={(e) => setNumberOfStories(Number(e.target.value))}
                        className="border-b-2 border-gray-300 focus:outline-none"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium">Location</h3>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-b-2 border-gray-300 focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileForm;
