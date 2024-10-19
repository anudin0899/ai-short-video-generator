"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {

    const { user, isSignedIn, isLoaded } = useUser();

    return (
        <div className='p-4 fixed top-0 w-full z-20 bg-white px-10 flex justify-between items-center shadow-md'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.svg'}  width="100" height="100" alt="Logo" />
                <h2 className='font-bold text-xl'>Ai Shorts</h2>
            </div>

            <div className='flex gap-4 items-center'>
                <Button>Dashboard</Button>
                {isSignedIn ? <UserButton /> :
                    <Link href={'sign-in'}>
                        <Button>Get Started</Button>
                    </Link>
                }
            </div>


        </div>
    )
}

export default Header