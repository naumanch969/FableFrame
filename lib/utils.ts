import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

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
