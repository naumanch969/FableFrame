import React from 'react';

interface ChapterToggleProps {
  isChaptersEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const ChapterToggle: React.FC<ChapterToggleProps> = ({ isChaptersEnabled, onToggle }) => {
  return (
    <div className="flex items-center mt-4">
      <label className="mr-4 text-gray-600">Enable Chapters</label>
      <input
        type="checkbox"
        checked={isChaptersEnabled}
        onChange={(e) => onToggle(e.target.checked)}
        className="h-5 w-5 text-blue-600 rounded-lg focus:ring-blue-500"
      />
    </div>
  );
};

export default ChapterToggle;
