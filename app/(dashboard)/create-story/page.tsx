"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import StorySubjectInput from './_components/StorySubjectInput'
import Genre from './_components/Genre'
import AgeGroup from './_components/AgeCategory'
import ImageStyle from './_components/ImageStyle'
import CustomLoader from './_components/CustomLoader'
import { alertAndReturnFalse, blobToBase64, stringToBase64, uploadToConvex } from '@/lib/utils'
import { useCreateStory } from '@/features/story/api/useCreateStory'
import { chatSession } from '@/config/gemini'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { storage } from '@/config/firebase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CREATE_STORY_PROMPT } from '@/constants'
import Heading from '@/components/Heading'
import axios from 'axios'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'


const CreateStory = () => {

  //////////////////////////////////// VARIABLES //////////////////////////////////////////
  const { mutate, data } = useCreateStory()
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const router = useRouter()
  const initialState = {
    prompt: "",
    title: "",
    genre: "",
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

  const onGenerate = async () => {
    if (!validateForm()) return;

    setLoading('Your story is being generated. Please wait...')
    try {

      console.log('formdata', formData)

      const FINAL_PROMPT = constructPrompt({ age_category: formData.ageCategory, genre: formData.genre, image_style: formData?.imageStyle, title: formData?.title, prompt });

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const ai_output = JSON.parse(result?.response?.text() || "{}");
      setLoading('Story generated successfully. Generating cover image...')

      console.log('ai_output', Boolean(ai_output))

      const coverImageStorageId = await generateImage(ai_output?.coverImage?.prompt || 'Create a story cover image with title as ' + formData?.title);
      setLoading('Cover image generated. Chapters generating...')

      let chapters = []

      for (const chapter of ai_output?.chapters) {
        const chapterImagePrompt = chapter?.image?.prompt || 'Create a chapter cover image with title as ' + chapter?.title
        const chapterImageStorageId = await generateImage(chapterImagePrompt + ` - ImageStyle: ${chapter?.image?.style}`);

        chapters.push({
          ...chapter,
          image: {
            prompt: chapterImagePrompt,
            style: chapter?.image?.style,
            url: chapterImageStorageId
          }
        })
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
          status: 'draft',
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

  const constructPrompt = ({ age_category, genre, image_style, title, prompt }: any) => {
    return CREATE_STORY_PROMPT
      .replace("{age_category}", age_category)
      .replace("{genre}", genre)
      .replace("{chapters}", process.env.NEXT_PUBLIC_DEFAULT_STORY_CHAPTERS_LIMIT! || '5')
      .replace("{image_style}", image_style)
      .replace("{title}", `${title} ${prompt ? `and start writing a story about it. ${prompt}` : ''}`);
  };

  const generateImage = async (prompt: string) => {
    try {

      const { data } = await axios.post('/api/generate-image', { prompt }, { responseType: 'blob' });
      if (!data) throw new Error('Failed to generate image');

      let generatedUrl: string | null = null;
      await generateUploadUrl({}, {
        throwError: true,
        onSuccess(d: any) {
          generatedUrl = d;
          return d;
        },
      });

      if (!generatedUrl) throw new Error('Upload URL not found');

      const storageId = await uploadToConvex(generatedUrl, data);

      return storageId;
    } catch (err) {
      console.error('Error generating or uploading image:', err);
    }
  };


  const resetState = () => {
    setFormData(initialState)
    setLoading('')
  }

  //////////////////////////////////// RENDER //////////////////////////////////////////
  return (
    <>
      <CustomLoader loading={loading} onClose={() => setLoading('')} />

      <div className="p-10">
        <Heading title="Create Your Story" color='primary' size='large' />
        <p className="text-lg text-primary text-center">
          Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.
        </p>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 mt-10 ">
          <StorySubjectInput userSelection={onChange} />
          <AgeGroup userSelection={onChange} />
          <Genre userSelection={onChange} />
          <ImageStyle userSelection={onChange} />
        </div>
        <div className="flex flex-col justify-end items-end w-full my-10">
          <Button
            onClick={onGenerate}
            size="xl"
            disabled={Boolean(loading)}
          >
            {'Generate Story'}
          </Button>
          <span className="text-gray-500 text-xs mt-1 " >1 Credit will use</span>
        </div>
      </div>
    </>
  )
}

export default CreateStory