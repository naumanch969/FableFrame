"use client"

import { Play } from 'lucide-react';
import React from 'react'

const StoryPages = ({ chapter }: { chapter: any }) => {


    const playSpeech = (text: string) => {
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis);
    }


    return (
        <div className='' >
            <h2 className="text-2xl font-bold text-primary">
                {chapter?.chapter_title}
                <span onClick={() => playSpeech(chapter?.chapter_content)} className='bg-primary' ><Play /></span>
            </h2>
            <p className="text-xl p-10 mt-3 rounded-lg bg-slate-100">{chapter?.chapter_text}</p>
        </div>
    )
}

export default StoryPages