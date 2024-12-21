import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Ellipsis, Flag } from "lucide-react";
import { Button } from './ui/button';
import { useCreateReportModal } from '@/hooks/use-create-report-modal';
import { useSelectedStory } from '@/hooks/use-selected-story';
import { Story } from '@/types';

const StoryReportButton = ({ story }: { story: Story }) => {

  const [_openReportModal, setOpenReportModal] = useCreateReportModal()
  const [_story, setStory] = useSelectedStory()

  const onReport = () => {
    setStory(story)
    setOpenReportModal(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24">
        <DropdownMenuItem>
          <button
            onClick={onReport}
            className="flex items-center gap-1 w-full text-left cursor-pointer "
          >
            <Flag className="w-4 h-4" /> Report
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StoryReportButton