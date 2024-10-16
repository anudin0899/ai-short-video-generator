import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
             <div className='h-screen'>
                <Image src={'/img/login_logo.jpg'} alt='logo'
                    width={500} height={500}
                    className='w-full h-full object-cover' />
            </div>
            <div className='flex items-center justify-center h-screen'>
                <SignUp />
            </div>
        </div>
    )
}