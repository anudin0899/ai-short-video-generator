"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import PlayerDialog from '../_components/PlayerDialog';
import { db } from '@/config/db';
import { useUser } from '@clerk/nextjs';
import { Users, VideoData } from '@/config/schema';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { toast } from 'sonner';

const CreateNew = () => {

  const { user } = useUser();



  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [caption, setCaption] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false)
  const [videoId, setVideoId] = useState()

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onCreateClickHandler = () => {
    if (!userDetail?.credits >= 0) {
      toast("You don't have enough Credits")
      return;
    }
    GetVideoScript()
  }

  // Get Video Script 
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic : ' + formData.topic + ' along with AI image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field'
    // console.log(prompt);

    const res = await axios.post('/api/get-video-script', {
      prompt: prompt
    })
    if (res.data.result) {
      setVideoData(prev => ({
        ...prev,
        'videoScript': res.data.result
      }))
    }
    // console.log(res.data.result);
    setVideoScript(res.data.result)
    GenerateAudioFile(res.data.result);

    // setLoading(false);
  }

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = ''
    const id = uuidv4();
    videoScriptData?.forEach(item => {
      script = script + item.ContentText + ''
    })

    const resp = await axios.post('/api/generate-audio', {
      text: script,
      id: id
    });
    // console.log(resp.data.Result, "audio");

    if (resp.data.result) {
      setVideoData(prev => ({
        ...prev,
        'audioFileUrl': resp.data.result
      }))
    }

    setAudioFileUrl(resp?.data?.Result)
    // resp.data.result && await GenerateImage(videoScriptData);
    resp.data.Result && await GenerateAudioCaption(resp.data.Result, videoScriptData)

    // setLoading(false);
  }

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    const res = await axios.post('api/generate-caption', {
      audioFileUrl: fileUrl
    });
    // console.log(res.data.result);

    if (res.data.result) {
      setVideoData(prev => ({
        ...prev,
        'caption': res.data.result
      }))
    }

    setCaption(res?.data?.result);
    res.data.result && await GenerateImage(videoScriptData);

    // setLoading(false)

  }

  const GenerateImage = async (videoScriptData) => {
    setLoading(true);
    let images = [];

    for (const element of videoScriptData) {
      try {
        const res = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt
        })
        console.log(res?.data);
        images.push(res.data.result)
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    if (res.data.result) {
      setVideoData(prev => ({
        ...prev,
        'imageList': images
      }))
    }

    console.log(images, videoScript, audioFileUrl, caption);

    setImageList(images)
    setLoading(false)
  }

  useEffect(() => {
    console.log(videoData);
    if (Object.keys(videoData).length == 4) {
      SavedVideoData(videoData)
    }

  }, [videoData])

  const SavedVideoData = async (videoData) => {
    setLoading(true)
    // console.log(videoData);
    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl ?? '',
      caption: videoData?.caption ?? '',
      imageList: videoData?.imageList ?? '',
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData?.id })

    await UpdateUserCredits();
    setVideoId(result[0]?.id);
    setPlayVideo(true);
    setLoading(false);
  }

  const UpdateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: userDetail?.credits - 10
    }).where(eq(Users?.email, user.primaryEmailAddress?.emailAddress))
    setUserDetail(prev => ({
      ...prev,
      "credits": userDetail?.credits - 10
    }))
    setVideoData(null);
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
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  )
}

export default CreateNew