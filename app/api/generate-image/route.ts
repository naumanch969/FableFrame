import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
    try {

        const { prompt } = await req.json();

        // const resp = await fetch('https://api.deepai.org/api/text2img', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'api-key': process.env.NEXT_PUBLIC_DEEPAI_API_KEY!
        //     },
        //     body: JSON.stringify({
        //         text: prompt,
        //     })
        // });

        // const data = await resp.json();
        // console.log(data);

        const response = await fetch("https://api-inference-huggingface.co/models/Melonie/text_to_image_finetuned", {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}` },
            method: 'POST',
            body: JSON.stringify({ inputs: prompt })
        })

        const data = await response.blob();

        return NextResponse.json({ "Data": data })
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'An error occurred while generating the image' });
    }
}