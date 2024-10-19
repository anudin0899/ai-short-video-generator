"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

const CreateNew = () => {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [caption, setCaption] = useState();
  const [imageList, setImageList] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onCreateClickHandler = () => {
    GetVideoScript()
  }

  // Get Video Script 
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic : ' + formData.topic + ' along with AI image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field'
    // console.log(prompt);

    const result = await axios.post('/api/get-video-script', {
      prompt: prompt
    }).then(res => {
      // console.log(res.data.result);
      setVideoScript(res.data.result)
      GenerateAudioFile(res.data.result);
    })
    // setLoading(false);
  }

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = ''
    const id = uuidv4();
    videoScriptData?.forEach(item => {
      script = script + item.ContentText + ''
    })

    await axios.post('/api/generate-audio', {
      text: script,
      id: id
    }).then(resp => {
      // console.log(resp.data.Result, "audio");
      setAudioFileUrl(resp.data.Result)
      GenerateAudioCaption(resp.data.Result)
    })
    // setLoading(false);
  }

  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);
    await axios.post('api/generate-caption', {
      audioFileUrl: fileUrl
    }).then(res => {
      console.log(res.data.result);
      setCaption(res.data.result);
      GenerateImage();
    })
    // setLoading(false)

  }

  const GenerateImage = async () => {
    setLoading(true);
    let images = [];
    videoScript?.forEach(async (item) => {
      await axios.post('/api/generate-image', {
        prompt: item?.imagePrompt
      }).then(res => {
        console.log(res.data.result);
        images.push(res.data.result)
      })
    })
    setImageList(images)
    setLoading(false)

  }


  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary'>
        Create New
      </h2>

      <div className='mt-10 p-10 shadow-md '>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className='mt-10 w-full' onClick={onCreateClickHandler}>Create Short Video</Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  )
}

export default CreateNew