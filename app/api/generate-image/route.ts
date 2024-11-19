import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
    try {

        const { prompt } = await req.json();

        const resp = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.NEXT_PUBLIC_DEEPAI_API_KEY!
            },
            body: JSON.stringify({
                text: prompt,
            })
        });

        const data = await resp.json();
        console.log(data);

        return NextResponse.json({ "Data": data })
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'An error occurred while generating the image' });
    }
}