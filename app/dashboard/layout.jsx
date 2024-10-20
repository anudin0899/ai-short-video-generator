"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { VideoDataContext } from '../_context/VideoDataContext'
import { UserDetailContext } from '../_context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import { db } from '@/config/db'
import { Users } from '@/config/schema'



const DashboardLayout = ({ children }) => {
    const [videoData, setVideoData] = useState([]);
    const [userDetail, setuserDetail] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        user && getUserDetail()
    }, [user]);

    const getUserDetail = async () => {
        const result = await db.select().from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress.emailAddress))
        setuserDetail(result[0]);
    }

    return (

        <UserDetailContext.Provider value={{ userDetail, setuserDetail }}>
            <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                <div className=''>
                    <Header />

                    <div className='flex'>
                        <div className='hidden md:block h-screen bg-white fixed mt-[75px] w-64'>
                            <SideNav />
                        </div>
                        <div className='md:ml-64 p-10 mt-12 w-full h-screen'>
                            {children}
                        </div>
                    </div>
                </div>
            </VideoDataContext.Provider>
        </UserDetailContext.Provider>

    )
}

export default DashboardLayout