import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { Message } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type']; // Get content type dynamically
    return `data:${contentType};base64,${Buffer.from(response.data).toString('base64')}`;
  } catch (error) {
    console.error('Error converting URL to Base64:', error);
    return null;
  }
};

export const blobToBase64 = (blob: Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const alertAndReturnFalse = (message: string) => {
  toast.success(message, { position: 'top-right' });
  return false;
};

export const getRelativeTime = (date: Date) => {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}

export const uploadToConvex = async (url: any, imagePath: Blob) => {

  var imageBlob;
  if (typeof imagePath == "string") {
    const response = await fetch(imagePath);

    if (!response.ok) return null;

    imageBlob = await response.blob();
  }
  else {
    imageBlob = imagePath;
  }

  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'image/png', },
    body: imageBlob,
  });

  if (!result.ok) return null;

  const responsed = await result.json();

  console.log('result', responsed)

  return responsed.storageId;
};

export const groupByDate = (messages: Message[]) => {

  if (!messages) return {};

  return messages.reduce((acc, message) => {

    const date = new Date(message._creationTime).toISOString().split("T")[0];

    // @ts-ignore
    if (!acc[date]) {
      // @ts-ignore
      acc[date] = [];
    }

    // @ts-ignore
    acc[date].push(message);

    return acc;
  }, {});
}

export const generateImage = async (generateUploadUrl: any, prompt: string) => {
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

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_BASE_URL}${path}`
}