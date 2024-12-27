import { Card } from '@/components/ui/card';
import { Input } from '@/components/aceternity/input';
import { Button } from '@/components/ui/button';
import { useGetCommentsByStory } from '@/features/comments/api/useGetCommentsByStory';
import { useStoryId } from '@/hooks/use-story-id';
import React, { useState } from 'react';
import { Comment } from '@/types';
import { useCreateComment } from '@/features/comments/api/useCreateComment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRelativeTime } from '@/lib/utils';

const CommentBox: React.FC = () => {

  const storyId = useStoryId();
  const { data: comments, isLoading } = useGetCommentsByStory(storyId);
  const { mutate } = useCreateComment()
  const [text, setText] = useState<string>('');

  const onCreateComment = () => {
    if (!text.trim()) return;

    mutate({
      formData: {
        content: text,
        story_id: storyId,
        parent_id: undefined
      }
    })
    setText('');
  };

  const CommentItem = ({ comment }: { comment: Comment }) => {

    const commentTimestamp = getRelativeTime(new Date(comment?._creationTime!))

    return (
      <div className={`rounded-lg flex justify-between items-start gap-1 p-2 hover:bg-muted text-muted-foreground `}>
        <div className="flex justify-between items-start gap-2 w-full">
          <Avatar className='w-10 h-10 bg-black text-surface-foreground ' >
            <AvatarImage src={comment?.profile?.profile_picture_url} />
            <AvatarFallback className='capitalize bg-inherit' >{comment?.profile?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col ">
            <div className="w-full flex justify-between items-center">
              <h5 className="text-xs font-medium truncate text-surface-foreground ">{comment?.profile?.username}</h5>
              <span className="text-[10px]">{commentTimestamp}</span>
            </div>
            <p className="text-sm ">{comment.content}</p>
          </div>
        </div>
      </div>
    );
  };


  return (
    <Card className="p-6 space-y-4 w-full bg-background ">

      <form className="relative flex items-center justify-between gap-2 h-full ">
        <Input
          type="text"
          placeholder={"How did the story go for you? Share your thoughts..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onCreateComment(); } }}
        />
        <Button variant='gradient' className='absolute right-1 top-1/2 transform -translate-y-1/2 h-[80%]' onClick={(e) => { e.preventDefault(); onCreateComment(); }}>
          Post it
        </Button>
      </form>

      {isLoading
        ? (
          <p>Loading comments...</p>
        )
        : comments && comments.length > 0 ? (
          <div className="space-y-3">
            {comments.map((comment: Comment, index: number) => (
              <CommentItem comment={comment} key={index} />
            ))}
          </div>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

    </Card>
  );
};

export default CommentBox;
