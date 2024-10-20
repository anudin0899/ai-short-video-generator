import React from 'react'
import { Thumbnail } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

const VideoList = ({ videoList }) => {

    const [openPlayDialog, setOpenPlayDialog] = useState(false);
    const [videoId, setVideoId] = useState();

    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {videoList?.map((video, index) => (
                <div
                    onClick={() => {
                        setOpenPlayDialog(Date.now());
                        setVideoId(video?.id);
                    }}
                    className='cursor-pointer hover:scale-105 transition-all '>
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={2500}
                        compositionHeight={400}
                        frameToDisplay={30}
                        durationInFrames={120}
                        style={{
                            borderRadius: 15
                        }}
                        fps={30}
                        inputProps={{
                            ...video,
                            setDurationFrame: (value) => console.log(value)
                        }}
                    />
                </div>
            ))}
            <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
        </div>
    )
}

export default VideoList