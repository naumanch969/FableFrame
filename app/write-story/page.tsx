"use client"
import React, { useState } from 'react';
import TitleInput from './components/TitleInput';
import StoryCompartment from './components/StoryCompartment';
import ChapterToggle from './components/ChapterToggle';
import { toast } from 'sonner';

const WriteStory: React.FC = () => {
  const [isChaptersEnabled, setIsChaptersEnabled] = useState(false);
  const [storyContent, setStoryContent] = useState([{ text: '', image: '' }]);

  const handleChapterToggle = (enabled: boolean) => {
    setIsChaptersEnabled(enabled);
    if (!enabled) {
      // Reset to a single story compartment if chapters are disabled
      setStoryContent([{ text: '', image: '' }]);
    }
  };

  const updateStoryContent = (index: number, newContent: { text: string; image: string }) => {
    const updatedContent = [...storyContent];
    updatedContent[index] = newContent;
    setStoryContent(updatedContent);
  };

  const addNewCompartment = () => {
    setStoryContent([...storyContent, { text: '', image: '' }]);
  };

  const handleSaveDraft = () => {
    console.log('Story saved as draft:', storyContent);
    toast.success('Your story has been saved as a draft.', { position: 'top-right' });
  };

  const handlePublish = () => {
    console.log('Story published:', storyContent);
    toast.success('Your story has been published!', { position: 'top-right' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <TitleInput />
      <ChapterToggle isChaptersEnabled={isChaptersEnabled} onToggle={handleChapterToggle} />
      <div className="space-y-6">
        {storyContent.map((compartment, index) => (
          <StoryCompartment
            key={index}
            index={index}
            content={compartment}
            onUpdate={updateStoryContent}
          />
        ))}
      </div>
      {isChaptersEnabled && (
        <button
          onClick={addNewCompartment}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Section
        </button>
      )}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={handleSaveDraft}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Save as Draft
        </button>
        <button
          onClick={handlePublish}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default WriteStory;
