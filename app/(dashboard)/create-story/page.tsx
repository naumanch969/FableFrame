"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import StorySubjectInput from './_components/StorySubjectInput'
import Genre from './_components/Genre'
import AgeGroup from './_components/AgeCategory'
import ImageStyle from './_components/ImageStyle'
import Chapters from './_components/Chapters'
import CustomLoader from './_components/CustomLoader'
import { alertAndReturnFalse, generateImage } from '@/lib/utils'
import { useCreateStory } from '@/features/story/api/useCreateStory'
import { chatSession } from '@/config/gemini'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CREATE_STORY_PROMPT } from '@/constants'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'
import Hint from '@/components/Hint'

const CreateStory = () => {

  //////////////////////////////////// VARIABLES //////////////////////////////////////////
  const { mutate } = useCreateStory()
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const router = useRouter()
  const initialState = {
    prompt: "",
    title: "",
    genre: "",
    chapters: 6,
    ageCategory: "",
    imageStyle: "",
  }

  //////////////////////////////////// STATES //////////////////////////////////////////
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState('')

  //////////////////////////////////// FUNCTIONS //////////////////////////////////////////
  const onChange = ({ name, value }: { name: string, value: string }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = (): boolean => {
    const { title, genre, ageCategory, imageStyle } = formData;

    if (!title) return alertAndReturnFalse("Please enter a title.");
    if (!genre) return alertAndReturnFalse("Please select a genre.");
    if (!ageCategory) return alertAndReturnFalse("Please select an age category.");
    if (!imageStyle) return alertAndReturnFalse("Please select an image style.");

    return true;
  };

  const onGenerate = async (status: 'draft' | 'published') => {
    if (!validateForm()) return;

    setLoading('Your story is being generated. Please wait...')
    try {

      console.log('formdata', formData)

      const FINAL_PROMPT = constructPrompt({
        age_category: formData.ageCategory,
        genre: formData.genre,
        image_style: formData?.imageStyle,
        title: formData?.title,
        prompt,
        chapters: formData?.chapters
      });

      console.log('FINAL', FINAL_PROMPT)

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const ai_output = JSON.parse(result?.response?.text() || "{}");
      setLoading('Story generated successfully. Generating cover image...')

      console.log('ai_output', Boolean(ai_output))

      const coverImageStorageId = await generateImage(generateUploadUrl, ai_output?.coverImage?.prompt || 'Create a story cover image with title as ' + formData?.title);
      setLoading('Cover image generated. Chapters generating...')

      let chapters = []

      let index = 1;
      for (const chapter of ai_output?.chapters) {
        setLoading(`Generating chapter ${index}...`)
        const chapterImagePrompt = chapter?.image?.prompt || 'Create a chapter cover image with title as ' + chapter?.title
        const chapterImageStorageId = await generateImage(generateUploadUrl, chapterImagePrompt + ` - ImageStyle: ${chapter?.image?.style}`);

        chapters.push({
          ...chapter,
          image: {
            prompt: chapterImagePrompt,
            style: chapter?.image?.style,
            url: chapterImageStorageId
          }
        })

        index++;
      }

      setLoading('Chapters generated. Saving story for you...')
      console.log('chapters', Boolean(chapters))

      await mutate({
        formData: {
          prompt: formData.prompt,
          genre: formData.genre,
          image_style: formData.imageStyle,
          age_category: formData.ageCategory,
          type: 'ai_generated',
          is_public: true,
          status,
          ai_output,
          cover_image: coverImageStorageId,
          chapters,
          title: ai_output?.title || formData.title,
        }
      }, {
        onSuccess: (id: any) => {
          router.push('/explore/' + id)
          resetState()
        }
      })

      toast.success("Story generated successfully", { position: 'top-right' })

    } catch (error) {
      console.log(error)
      toast.error("Failed to generate story", { position: 'top-right' })
      setLoading('')
    }
  }

  const constructPrompt = ({ age_category, genre, image_style, title, prompt, chapters }: any) => {
    return CREATE_STORY_PROMPT
      .replace("{age_category}", age_category)
      .replace("{genre}", genre)
      .replace("{chapters}", chapters)
      .replace("{image_style}", image_style)
      .replace("{title}", `${title} ${prompt ? `and start writing a story about it. ${prompt}` : ''}`);
  };


  const resetState = () => {
    setFormData(initialState)
    setLoading('')
  }

  //////////////////////////////////// RENDER //////////////////////////////////////////
  return (
    <>
      <CustomLoader loading={loading} onClose={() => setLoading('')} />

      <div className="py-8">

        <h1 className="text-2xl md:text-5xl font-bold text-surface-foreground dark:text-surface-foreground">
          Create your story
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-4 text-surface-foreground dark:text-neutral-200">
          Unlock your creativity with AI: Craft stories like never before! Let our AI bring your <>imagination</> to life, one story at a time.
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 mt-10 ">
          <StorySubjectInput userSelection={onChange} />
          <AgeGroup userSelection={onChange} />
          <Genre userSelection={onChange} />
          <ImageStyle userSelection={onChange} />
          <Chapters userSelection={onChange} value={formData?.chapters} />
        </div>
        <div className="flex flex-col justify-end items-end w-full my-10">
          <div className='flex gap-2' >
            <Hint label="Generate a draft of your story.">
              <Button onClick={() => onGenerate('draft')} variant='secondary' size="cta" disabled={Boolean(loading)}  >
                Generate Story and Draft
              </Button>
            </Hint>
            <Hint label="Generate and save your story.">
              <Button onClick={() => onGenerate('published')} variant='gradient' size="cta" disabled={Boolean(loading)}  >
                Generate Story and Save
              </Button>
            </Hint>
          </div>
          <span className="text-gray-500 text-xs mt-1 " >1 Credit will use</span>
        </div>

      </div>
    </>
  )
}

export default CreateStory