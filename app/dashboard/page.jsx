"use client"
import React, { useState } from 'react'
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Dashboard = () => {

    const [videoList, setVideoList] = useState([]);

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
            </div>
        </div>
    )
}

export default Dashboard