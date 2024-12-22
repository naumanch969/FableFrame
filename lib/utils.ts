import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";

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

export const uploadToConvex = async (url: any, imagePath: string) => {


  const response = await fetch(imagePath);

  if (!response.ok) return null;

  const imageBlob = await response.blob();

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
