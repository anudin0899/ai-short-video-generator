"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

const Header = () => {

    const { user, isSignedIn, isLoaded } = useUser();

    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    return (
        <div className='p-4 fixed top-0 w-full z-20 bg-white px-10 flex justify-between items-center shadow-md'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.svg'} width="100" height="100" alt="Logo" />
                <h2 className='font-bold text-xl'>Ai Shorts</h2>
            </div>

            <div className='flex gap-4 items-center'>
                <div className='flex items-center gap-1'>
                    <Image
                        src={'/img/coin.png'}
                        alt='credits-icon'
                        width={20}
                        height={20}
                    />
                    <h2>{userDetail?.credits}</h2>
                </div>
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