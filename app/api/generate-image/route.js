import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1,
        }

        const output = await replicate.run("bytedance/sdxl-lightni")
        // console.log(output);
        ConvertImage(output[0]);

        return NextResponse.json({ 'result': output[0] })

    } catch (e) {
        console.log(e);
        return NextResponse({ 'error': e })
    }
}

const ConvertImage = (imageUrl) => {
    try {

    } catch (error) {
        console.log(error);

    }
}