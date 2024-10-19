"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {

    const path = usePathname();
    

    const MenuOptions = [
        {
            id: 1,
            name: 'Dashboard',
            path: '/dashboard',
            icon: PanelsTopLeft
        },
        {
            id: 2,
            name: 'Create New',
            path: '/dashboard/create-new',
            icon: FileVideo
        },
        {
            id: 3,
            name: 'Upgrade',
            path: '/dashboard/upgrade',
            icon: ShieldPlus
        },
        {
            id: 4,
            name: 'Account',
            path: '/dashboard/account',
            icon: CircleUser
        }
    ]

    return (
        <div className='w-64 h-screen shadow-md p-5'>
            <div className='grid gap-3'>
                {MenuOptions && MenuOptions.map((option, index) => (
                    <Link href={option.path} key={index}>
                        <div
                            className={`flex items-center p-3 gap-3
                            hover:bg-primary hover:text-white 
                            rounded-md cursor-pointer 
                            ${path == option.path && 'bg-primary text-white'}`}
                        >
                            <option.icon />
                            <h2 className='font-semibold'>{option.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav