import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { storage } from '@/config/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();
        console.log('Received URL:', url);

        // Convert the image URL to Base64
        const base64 = await toBase64(url);
        if (!base64) {
            return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
        }

        const fileName = `${Date.now()}.png`;
        const imageReference = ref(storage, fileName);

        // Upload the Base64 string to Firebase Storage
        await uploadString(imageReference, base64, 'data_url');
        console.log('Uploaded image to Firebase Storage');

        // Get the download URL
        const downloadUrl = await getDownloadURL(imageReference);
        console.log('Download URL:', downloadUrl);

        return NextResponse.json({ imageUrl: downloadUrl });
    } catch (err) {
        console.error('Error saving image:', err);
        return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
    }
}

export const toBase64 = async (url: string): Promise<string | null> => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type']; // Get content type dynamically
        return `data:${contentType};base64,${Buffer.from(response.data).toString('base64')}`;
    } catch (error) {
        console.error('Error converting URL to Base64:', error);
        return null;
    }
};
