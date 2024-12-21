"use client";

import { useState } from 'react';
import { TextFormattingToolbar } from './TextFormattingToolbar';
import { Button } from '@/components/ui/button';

const StoryWritingPage = () => {
    const [content, setContent] = useState<string>('');
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const handleSave = () => {
        // Save content logic here (e.g., API call or local storage)
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000); // Show saved message temporarily
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Write Your Story</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <TextFormattingToolbar setContent={setContent} content={content} />
                <div
                    contentEditable
                    className="w-full min-h-[400px] p-4 bg-gray-50 text-gray-800 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
                {isSaved && <p className="text-green-500 text-center mt-2">Your story has been saved!</p>}
            </div>
        </div>
    );
};

export default StoryWritingPage;
