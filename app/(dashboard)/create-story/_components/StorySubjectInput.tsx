"use client"

import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'


const StorySubjectInput = ({ userSelection }: { userSelection: any }) => {
    return (
        <div className='space-y-3 col-span-1' >
            <label htmlFor="" className="font-bold text-xl text-foreground">1. Title of the story</label>
            <Input
                placeholder='Enter the subject of your story'
                className='md:max-w-lg resize-y text-md font-medium p-3 bg-background text-gray-700 h-12 '
                onChange={(e) => userSelection({
                    name: 'title',
                    value: e.target.value
                })}
            />
            <label htmlFor="" className="font-bold text-xl text-foreground">2. Prompt</label>
            <Textarea
                placeholder='Enter the subject of your story'
                className='md:max-w-lg resize-y text-md font-medium p-3 bg-background text-gray-700 '
                rows={7}
                onChange={(e) => userSelection({
                    name: 'prompt',
                    value: e.target.value
                })}
            />
        </div>
    )
}

export default StorySubjectInput