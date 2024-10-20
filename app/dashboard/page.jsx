"use client"
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { db } from '@/config/db';
import { VideoData } from '@/config/schema';
import VideoList from './_components/VideoList';


const Dashboard = () => {


    const [videoList, setVideoList] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        user && GetVideoList()
    }, [user]);

    const GetVideoList = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress))
        setVideoList(result)
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button className='bg-black'>+ Create New</Button>
                </Link>
            </div>

            {/* Empty state */}
            <div>
                {videoList?.length == 0 &&
                    <div>
                        <EmptyState />
                    </div>
                }

                {/* List of Video */}
                <VideoList videoList={videoList} />

            </div>
        </div>
    )
}

export default Dashboard