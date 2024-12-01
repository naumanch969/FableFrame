import React from 'react';

interface StoryCompartmentProps {
  index: number;
  content: { text: string; image: string };
  onUpdate: (index: number, newContent: { text: string; image: string }) => void;
}

const StoryCompartment: React.FC<StoryCompartmentProps> = ({ index, content, onUpdate }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(index, { ...content, text: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onUpdate(index, { ...content, image: reader.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        placeholder="Write your story here..."
        value={content.text}
        onChange={handleTextChange}
        className="w-full h-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {content.image && <img src={content.image} alt="Uploaded" className="w-full max-h-60 rounded-lg object-cover" />}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default StoryCompartment;
