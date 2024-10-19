import { storage } from "@/config/FirebaseConfig";
import TextToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";


const fs = require('fs');
const util = require('util');
const path = require('path');

const client = new TextToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_CLOUD_API_KEY
});

export async function POST(req) {
    const { text, id } = await req.json();
    // console.log(text,id,"aaa");

    const storageRef = ref(storage, 'ai-short-files/' + id + '.mp3')
    // console.log(storageRef);


    // Construct the request
    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    const audioBuffer = Buffer.from(response.audioContent, 'binary');
    // const fileSizeInBytes = audioBuffer.length;  // File size in bytes

    // Define the folder path
    const folderPath = path.join(process.cwd(), 'audio-files');

    // Ensure the folder exists, if not, create it
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    // Define the file path using the unique ID
    const filePath = path.join(folderPath, `${id}.mp3`);

    try {
        // Write the audio buffer to a local file
        await util.promisify(fs.writeFile)(filePath, audioBuffer, 'binary');
        console.log(`Audio content written to file: ${filePath}`);

        // Return the file path or URL to the client
        return NextResponse.json({ Result: filePath });
    } catch (error) {
        console.error('File saving failed:', error);
        return NextResponse.json({ error: 'Failed to save audio file' });
    }

    // try {
    //     await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });
    //     const downloadUrl = await getDownloadURL(storageRef);
    //     console.log(downloadUrl);
    //     return NextResponse.json({ Result: downloadUrl });
    // } catch (error) {
    //     console.error('Upload failed:', error);
    //     return NextResponse.json({ error: 'Upload failed due to retry limit' });
    // }

    // const uploads = await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });
    // console.log(uploads);

    // const downloadUrl = await getDownloadURL(storageRef);

    // console.log(downloadUrl);


    // return NextResponse.json({ Result: downloadUrl })

    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile('output.mp3', response.audioContent, 'binary');
    // console.log('Audio content written to file: output.mp3');




}


