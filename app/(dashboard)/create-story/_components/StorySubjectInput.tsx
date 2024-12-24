"use client"

import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'
import { PlaceholdersAndVanishInput } from '@/components/aceternity/placeholders-and-vanish-input'


const StorySubjectInput = ({ userSelection }: { userSelection: any }) => {

    const titlePlaceholders = [
        "Please provide a title for your story, e.g., 'The Lost Kingdom'",
        "Give your story a title, such as 'The Shadow of the Past'",
        "What your story should be named? Example: 'A Heart of Courage'",
        "Create a title for your story, like 'The Final Battle'",
        "Think of a title for your story, such as 'The Forgotten Castle'",
    ];
    
    const promptPlaceholders = [
        "Describe the setting or theme of your story. Example: 'A young princess discovers a hidden power that could save her kingdom.'",
        "Provide a prompt to inspire your story. For example, 'Two strangers meet on a stormy night, but their pasts are intertwined in ways they can't yet understand.'",
        "Write a prompt to guide the story. For example, 'A group of friends stumbles upon a time machine and is thrust into a dangerous adventure.'",
        "Give a brief description or scenario for your story. Example: 'A detective investigates a mysterious disappearance that leads him to a dark conspiracy.'",
        "Provide a creative prompt to guide the story. For instance, 'A magical artifact is found in the middle of a forest, and its true purpose is yet to be revealed.'",
    ];
    


    return (
        <div className='space-y-3 col-span-1' >
            <div className="flex flex-col gap-3">
                <label htmlFor="" className="font-bold text-xl text-primary">1. Title of the story</label>
                {/* <Input
                placeholder='Enter the subject of your story'
                className='md:max-w-lg resize-y text-md font-medium p-3 bg-background text-gray-700 h-12 '
                onChange={(e) => userSelection({
                    name: 'title',
                    value: e.target.value
                })}
            /> */}
                <PlaceholdersAndVanishInput
                    placeholders={titlePlaceholders}
                    onChange={(e) => userSelection({
                        name: 'title',
                        value: e.target.value
                    })}
                />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="" className="font-bold text-xl text-primary mt-3 ">2. Prompt</label>
                <PlaceholdersAndVanishInput
                    placeholders={promptPlaceholders}
                    onChange={(e) => userSelection({
                        name: 'prompt',
                        value: e.target.value
                    })}
                    isTextarea={true}
                    rows={7}
                />
            </div>
        </div>
    )
}

export default StorySubjectInput