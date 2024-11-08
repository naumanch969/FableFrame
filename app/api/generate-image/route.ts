// import { NextRequest, NextResponse } from 'next/server'
// import Replicate from "replicate";
// import { writeFile } from "fs/promises";

// export async function POST(req: NextRequest) {

//   const data = await req.json()
//   const { prompt } = data;

//   const replicate = new Replicate({
//     auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
//   });

//   const output = await replicate.run("black-forest-labs/flux-schnell", {
//     input: {
//       prompt,
//       quality: 80,
//       go_fast: true,
//       num_outputs: 1,
//       aspect_ratio: '1:1',
//       output_format: 'png',
//       output_quality: 80
//     }
//   });

//   const now = new Date();
//   const dateString = now.toISOString().replace(/[:.]/g, '-');  // Example: '2024-12-22T15-30-45'
//   const limitedPrompt = prompt.length > 100 ? prompt.slice(0, 100) : prompt;

//   // Save the image to the public/storage folder
//   let filePath;
//   for (const [index, item] of Object.entries(output)) {
//     filePath = `/storage/output_${index}_${dateString}_${limitedPrompt}.png`
//     console.log('item', item)
//     await writeFile(`public${filePath}`, item);
//   }

//   return NextResponse.json({ image_url: filePath });
// }


import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { prompt } = data;

  const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
  });

  const output = await replicate.run('black-forest-labs/flux-schnell', {
    input: {
      prompt,
      quality: 80,
      go_fast: true,
      num_outputs: 1,
      aspect_ratio: '1:1',
      output_format: 'png',
      output_quality: 80,
    },
  });

  // Assuming the output is a ReadableStream
  // @ts-ignore
  const resultStream = output[0]; // Replace with the actual image output key if different

  if (resultStream instanceof ReadableStream) {
    const reader = resultStream.getReader();
    console.log('reader', reader);
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    // Combine chunks into a single buffer
    const imageBuffer = Buffer.concat(chunks);

    console.log('imageBuffer', imageBuffer)
    // Send the image back as a response
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="output_${Date.now()}.png"`,
      },
    });
  } else {
    return NextResponse.json({ error: 'Unexpected output format from Replicate' }, { status: 400 });
  }
}
