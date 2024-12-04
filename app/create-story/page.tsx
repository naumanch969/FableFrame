"use client";

import React, { useContext, useState } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/config/gemini";
import { db } from "@/config/db";
import { Story, User } from "@/config/schema";
import axios from "axios";
import CustomLoader from "./_components/CustomLoader";
import { toast } from "react-toastify";
import { root } from "postcss";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";
import Link from "next/link"

const CreateStory = () => {
  const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT || "";

  const user = null;
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext)

  const [formData, setFormData] = useState({
    storySubject: "",
    storyType: "",
    ageGroup: "",
    imageStyle: "",
  });

  const [loading, setLoading] = useState(false);

  const handleUserSelection = ({ fieldName, fieldValue }: { fieldName: string, fieldValue: string }) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const validateForm = (): boolean => {
    const { storySubject, storyType, ageGroup, imageStyle } = formData;
    console.log(formData)
    if (!storySubject) return alertAndReturnFalse("Please select a story subject.");
    if (!storyType) return alertAndReturnFalse("Please select a story type.");
    if (!ageGroup) return alertAndReturnFalse("Please select an age group.");
    if (!imageStyle) return alertAndReturnFalse("Please select an image style.");

    return true;
  };

  const alertAndReturnFalse = (message: string) => {
    alert(message);
    return false;
  };

  // Generate the story using the AI API
  const generateStory = async () => {

    if (userDetail?.credit <= 0) return toast("You don't have enough credit to generate story", { type: "error" });

    if (!validateForm()) return;

    const { storySubject, storyType, ageGroup, imageStyle } = formData;

    const FINAL_PROMPT = CREATE_STORY_PROMPT
      .replace("{ageGrop}", ageGroup)
      .replace("{storyType}", storyType)
      .replace("{storySubject}", storySubject)
      .replace("{imageStyle}", imageStyle);

    try {
      setLoading(true);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response?.text() || "{}");
      console.log("Generated story:", story);

      // const url = await generateImage(story.output)

      const imageUrl = await saveStoryCoverToFirebase("https://th.bing.com/th?id=OIP.IISM9PvVY1fkWaR8QnyLfgHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.1&pid=3.1&rm=2");

      await saveStoryToDatabase(story, imageUrl);

      await deductCredit();

      toast("Story generated successfully!", { type: "success" });

      router.push('/view-story/' + story.id)
    } catch (err) {
      console.error("Error generating story:", err);
      toast("An error occurred while generating the story. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (prompt: string) => {
    try {
      const imageUrl = await axios.post("/api/generate-image", { prompt });
      return imageUrl
    }
    catch (err) {
      console.error("Error generating image:", err);
      toast("An error occurred while generating the image. Please try again.", { type: "error" });
    }
  }

  // Save story cover to Firebase and return the image URL
  const saveStoryCoverToFirebase = async (url: string): Promise<string> => {
    try {
      const response = await axios.post("/api/save-image", { url });
      return response?.data?.imageUrl || "";
    } catch (err) {
      toast("An error occurred while saving the story cover image. Please try again.", { type: "error" });
      throw new Error("Failed to save story cover image.");
    }
  };

  // Save the story to the database
  const saveStoryToDatabase = async (story: any, coverImage: string) => {
    try {
      const { storySubject, storyType, ageGroup, imageStyle } = formData;

      const result = await db
        .insert(Story)
        .values({
          storySubject,
          storyType,
          ageGroup,
          imageStyle,
          output: story,
          coverImage,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          userName: user?.fullName
        })
        .returning({ id: Story.id });

      console.log("Story saved to database:", result);
    } catch (err) {
      console.error("Error saving story to database:", err);
      toast("An error occurred while saving the story. Please try again.", { type: "error" });
    }
  };

  const deductCredit = async () => {
    try {
      const result = await db
        .update(User)
        .set({ credit: Number(userDetail.credit - 1) })
        .where(eq(User.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
        .returning({ id: User.id });
    }
    catch (err) {
      console.error("Error deducting credit:", err);
    }
  }

  return (
    <>
      <CustomLoader open={loading} onClose={() => setLoading(false)} />

      <div className="p-10">
        <h2
          className="font-extrabold text-[70px] text-primary text-center"
        >
          Create Your Story
        </h2>
        <p className="text-2xl text-primary text-center">
          Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-40">
          <StorySubjectInput userSelection={handleUserSelection} />
          <StoryType userSelection={handleUserSelection} />
          <AgeGroup userSelection={handleUserSelection} />
          <ImageStyle userSelection={handleUserSelection} />
        </div>
        <div className="flex flex-col justify-end items-end w-full my-10">
          <Button
            onClick={generateStory}
            className="text-2xl"
            size="xl"
            disabled={loading}
          >
            Generate Story
          </Button>
          <Link href="../write-story"> 
            <Button
              className="text-2xl"
              size="xl"
              disabled={loading}
            >
              Write Story
            </Button>
          </Link>
          
          <span className="">1 Credit will use</span>
        </div>
      </div>
    </>
  );
};

export default CreateStory;
