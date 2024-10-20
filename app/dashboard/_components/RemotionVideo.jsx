import React from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

const RemotionVideo = ({ script, audioFileUrl, imageList, caption, setDurationInFrame }) => {

    const { fps } = useVideoConfig();

    const frame = useCurrentFrame();

    const getDurationFrames = () => {
        setDurationInFrame(caption[caption?.length - 1]?.end / 1000 * fps)
        return caption[caption?.length - 1]?.end / 1000 * fps
    }

    const getCurrentCaption = () => {
        const currentTime = frame / 30 * 100 //convert frame number into millisecond
        const currentCaption = caption.find((word) => currentTime >= word.start && currentTime <= word.end);
        return currentCaption ? currentCaption?.text : "";
    }

    return (
        <AbsoluteFill className='bg-black'>
            {imageList?.map((item, index) => {
                const startTime = (index * getDurationFrames()) / imageList?.length;
                const duration = getDurationFrames();

                const scale = (index) => interpolate(
                    frame,
                    [startTime, startTime + duration / 2, startTime + duration],
                    index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                )
                return (
                    <>
                        <Sequence key={index} from={startTime} durationInFrames={getDurationFrames}>
                            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: `scale(${scale(index)})`
                                    }}
                                />

                                <AbsoluteFill
                                    style={{
                                        color: 'white',
                                        justifyContent: 'center',
                                        top: undefined,
                                        bottom: 50,
                                        height: 150,
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                >
                                    <h2 className='text-2xl'>{getCurrentCaption()}</h2>
                                </AbsoluteFill>
                            </AbsoluteFill>
                        </Sequence>
                    </>
                )
            })}
            <Audio src={audioFileUrl} />
        </AbsoluteFill>
    )
}

export default RemotionVideo