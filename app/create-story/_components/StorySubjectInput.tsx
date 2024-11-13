import React from 'react'
import { Textarea } from "@/components/ui/textarea"


const StorySubjectInput = ({ userSelection }: { userSelection: any }) => {
    return (
        <div className='' >
            <label htmlFor="" className="font-bold text-4xl text-primary">1. Subject of the story</label>
            <Textarea
                placeholder='Enter the subject of your story'
                className='mt-3 max-w-lg resize-y min-h-[230px] text-2xl p-5 '
                onChange={(e) => userSelection({
                    fieldValue: e.target.value,
                    fieldName: 'storySubject'
                })}
            />

        </div>
    )
}

export default StorySubjectInput