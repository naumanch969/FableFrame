"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import StorySubjectInput from './_components/StorySubjectInput'
import Genre from './_components/Genre'
import AgeGroup from './_components/AgeCategory'
import ImageStyle from './_components/ImageStyle'
import CustomLoader from './_components/CustomLoader'
import { alertAndReturnFalse, blobToBase64, stringToBase64 } from '@/lib/utils'
import { useCreateStory } from '@/features/story/api/use-create-story'
import { chatSession } from '@/config/gemini'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { storage } from '@/config/firebase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateStory = () => {

  //////////////////////////////////// VARIABLES //////////////////////////////////////////
  const { mutate, data } = useCreateStory()
  const router = useRouter()
  const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT || "";

  //////////////////////////////////// STATES //////////////////////////////////////////
  const [formData, setFormData] = useState({
    prompt: "",
    title: "",
    genre: "",
    ageCategory: "",
    imageStyle: "",
  });
  const [loading, setLoading] = useState(false)

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

    setLoading(true)
    try {

      console.log('formdata', formData)

      const FINAL_PROMPT = constructPrompt({ age_category: formData.ageCategory, genre: formData.genre, image_style: formData?.imageStyle, title: formData?.title, prompt });

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const ai_output = JSON.parse(result?.response?.text() || "{}");

      console.log('ai_output', ai_output)

      let coverImageUrl;
      const cover_image = await generateImage('Create a story cover image');
      coverImageUrl = await saveStoryCoverToFirebase(cover_image!);

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
          cover_image: coverImageUrl,
          chapters: ai_output?.chapters,
          title: ai_output?.title || formData.title,
        }
      })

      toast.success("Story generated successfully", { position: 'top-right' })

    } catch (error) {
      console.log(error)
      toast.error("Failed to generate story", { position: 'top-right' })
    }
    setLoading(false)
  }

  const constructPrompt = ({ age_category, genre, image_style, title, prompt }: any) => {
    return CREATE_STORY_PROMPT
      .replace("{age_category}", age_category)
      .replace("{genre}", genre)
      .replace("{image_style}", image_style)
      .replace("{title}", `${title} ${prompt ? `and start writing a story about it. ${prompt}` : ''}`);
  };

  const saveStoryCoverToFirebase = async (url: string | Blob): Promise<string> => {
    try {
      let base64: string | null = null;

      if (typeof url === 'string') {
        base64 = await stringToBase64(url);
      } else if (url instanceof Blob) {
        base64 = await blobToBase64(url);
      }

      if (!base64) {
        throw new Error("Invalid image URL or Blob");
      }

      const fileName = `${Date.now()}.png`;
      const imageReference = ref(storage, fileName);

      console.log(fileName, 'fileName')
      await uploadString(imageReference, base64, 'data_url');
      console.log('Uploaded image to Firebase Storage');

      const downloadUrl = await getDownloadURL(imageReference);
      console.log('Download URL:', downloadUrl);

      return downloadUrl;
    } catch (err) {
      throw new Error("Failed to save story cover image.");
    }
  };


  const generateImage = async (prompt: string) => {
    try {

      // TODO: use image gen api
      // const response = await fetch("https://api-inference-huggingface.co/models/Melonie/text_to_image_finetuned", {
      //     headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}` },
      //     method: 'POST',
      //     body: JSON.stringify({ inputs: prompt })
      // })

      // const data = await response.blob();
      const data = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwgHAy2Y8VC3wlkTatDNLirXVTrNEWnam3A&s"

      return data;
    }
    catch (err) {
      console.error("Error generating image:", err);
    }
  }



  //////////////////////////////////// RENDER //////////////////////////////////////////
  return (
    <>
      <CustomLoader open={loading} onClose={() => setLoading(false)} />

      <div className="p-10">
        <h2 className="font-extrabold text-3xl text-primary text-center mb-2">
          Create Your Story
        </h2>
        <p className="text-lg text-primary text-center">
          Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 ">
          <StorySubjectInput userSelection={onChange} />
          <Genre userSelection={onChange} />
          <AgeGroup userSelection={onChange} />
          <ImageStyle userSelection={onChange} />
        </div>
        <div className="flex flex-col justify-end items-end w-full my-10">
          <Button
            onClick={onGenerate}
            size="xl"
            disabled={loading}
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