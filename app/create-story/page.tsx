"use client";

import React, { useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/config/gemini';
import { db } from '@/config/db';
import { Story } from '@/config/schema';
// @ts-ignore -  TODO: Fix this
import uuid4 from 'uuid4'
import CustomLoader from './_components/CustomLoader';

const CreateStory = () => {

    const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT

    const [formData, setFormData] = useState<{ storySubject: string, storyType: string, ageGroup: string, imageStyle: string }>({ ageGroup: '', imageStyle: '', storySubject: '', storyType: '' })
    const [loading, setLoading] = useState(false)

    const userSelection = ({ fieldName, fieldValue }: { fieldName: string, fieldValue: string }) => {
        setFormData(pre => ({ ...pre, [fieldName]: fieldValue }))
    }

    const validateForm = () => {
        if (!formData.storySubject) {
            alert('Please select a story subject')
            return false
        }
        if (!formData.storyType) {
            alert('Please select a story type')
            return false
        }
        if (!formData.ageGroup) {
            alert('Please select an age group')
            return false
        }
        if (!formData.imageStyle) {
            alert('Please select an image style')
            return false
        }
        return true
    }

    const generateStory = async () => {
        if (!validateForm()) return
        const FINAL_PROMPT = CREATE_STORY_PROMPT!
            .replace('{ageGrop}', formData.ageGroup)
            .replace('{storyType}', formData.storyType)
            .replace('{storySubject}', formData.storySubject)
            .replace('{imageStyle}', formData.imageStyle)
        try {

            setLoading(true)
            const result = await chatSession.sendMessage(FINAL_PROMPT)
            console.log(result?.response?.text())
            setLoading(false)
            await saveStory(result?.response?.text())

        }
        catch (err) {
            console.error('Error generating story', err)
            alert('An error occurred while generating the story. Please try again.')
            return 0.5 // Return a small delay to allow the user to see the error message before retrying
        }
        console.log(formData)
    }

    const saveStory = async (output: any) => {
        try {
            setLoading(true)
            const result = await db.insert(Story).values({
                id: uuid4(),
                storySubject: formData.storySubject,
                storyType: formData.storyType,
                ageGroup: formData.ageGroup,
                imageStyle: formData.imageStyle,
                output: JSON.parse(output),
                coverImage: ''
            }).returning({ storyId: Story.id })
            console.log(result)
            setLoading(false)
        }
        catch (err) {
            console.error(err)
            setLoading(false)
            alert('An error occurred while saving the story. Please try again.')
            return 0.5 // Return a small delay to allow the user to see the error message before retrying
        }
    }

    return (
        <>

            <CustomLoader open={loading} onClose={() => setLoading(false)} />

            <div className='p-10 md:px-20 lg:px-40' >
                <h2 className="font-extrabold text-[70px] text-primary text-center  ">Create your Story</h2>
                <p className="text-2xl text-primary text-center">Unlock your createivity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-40">
                    <StorySubjectInput userSelection={userSelection} />
                    <StoryType userSelection={userSelection} />
                    <AgeGroup userSelection={userSelection} />
                    <ImageStyle userSelection={userSelection} />
                </div>
                <div className="flex justify-end items-center w-full my-10">
                    <Button
                        onClick={generateStory}
                        className='p-10 text-2xl'
                        disabled={loading}
                    >Generate Story</Button>
                </div>
            </div>
        </>
    )
}

export default CreateStory