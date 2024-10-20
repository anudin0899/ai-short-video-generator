import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { VideoData } from '@/config/schema';
import { useRouter } from 'next/router';

const PlayerDialog = ({ playVideo, videoId }) => {

    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrame, setDurationInFrame] = useState(100);

    useEffect(() => {
        setOpenDialog(!openDialog)
        videoId && GetVideoData();
    }, [playVideo])

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData.id, videoId));
        setVideoData(result[0]);

    }

    return (
        <div>
            <Dialog open={openDialog}>
                <DialogContent className='bg-white flex flex-col items-center'>
                    <DialogHeader>
                        <DialogTitle className='text-3xl font-bold my-5'>Your videos</DialogTitle>
                        <DialogDescription>
                            <Player
                                component={RemotionVideo}
                                durationInFrames={Number(durationInFrame.toFixed(0))}
                                compositionWidth={300}
                                compositionHeight={450}
                                controls={true}
                                fps={30}
                                inputProps={{
                                    ...videoData,
                                    setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                                }}

                            />
                            <div className='flex gap-10 mt-10'>
                                <Button variant='ghost' onClick={() => {
                                    router.replace('/dashboard')
                                    setOpenDialog(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button>Export</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default PlayerDialog