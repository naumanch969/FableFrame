import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const URLToBase64 = async (url: string): Promise<string | null> => {
  try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const contentType = response.headers['content-type']; // Get content type dynamically
      return `data:${contentType};base64,${Buffer.from(response.data).toString('base64')}`;
  } catch (error) {
      console.error('Error converting URL to Base64:', error);
      return null;
  }
};
