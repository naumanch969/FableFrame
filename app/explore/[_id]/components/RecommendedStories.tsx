import React from 'react';
import StoryItem from '@/components/StoryItem';

interface RecommendedStoriesProps {
  stories: any[];
  title: string;
  isLoading: boolean;
}

const RecommendedStories: React.FC<RecommendedStoriesProps> = ({ stories, title, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Show Skeletons while loading */}
          {new Array(8).fill(0).map((_, index) => (
            <div key={index}>
              <StoryItem.Skeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-4">
        No {title} available.
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stories?.slice(0, 8)?.map((story) => (
          <StoryItem key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedStories;
