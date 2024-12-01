import React from 'react';

const TitleInput: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Title of your story"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default TitleInput;
