import React from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'



const DashboardLayout = ({ children }) => {
    return (
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
    )
}

export default DashboardLayout