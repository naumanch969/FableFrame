import { NextRequest, NextResponse } from 'next/server'
import Replicate from "replicate";
import { writeFile } from "fs/promises";


export async function POST(req: NextRequest)  {
  try {

    const data = await req.json()
    const { prompt } = data;

    const replicate = new Replicate({
      auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
    });

    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt,
        quality: 80,
        go_fast: true,
        num_outputs: 1,
        aspect_ratio: '1:1',
        output_format: 'png',
        output_quality: 80
      }
    });

    const now = new Date();
    const dateString = now.toISOString().replace(/[:.]/g, '-');  // Example: '2024-12-22T15-30-45'
    const limitedPrompt = prompt.length > 100 ? prompt.slice(0, 100) : prompt;

    let filePath;
    for (const [index, item] of Object.entries(output)) {
      filePath = `/storage/output_${index}_${dateString}_${limitedPrompt}.png`
      await writeFile(`public/${filePath}`, item);
    }

    return NextResponse.json({ image_url: filePath });

  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

