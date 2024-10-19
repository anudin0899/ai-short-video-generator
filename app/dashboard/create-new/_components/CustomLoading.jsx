import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  
} from "@/components/ui/alert-dialog"
import Image from 'next/image'


const CustomLoading = ({ loading }) => {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='bg-white flex flex-col items-center justify-center my-10'>
                    <Image
                        src={'/work-in-progress.gif'}
                        alt='image'
                        width={100}
                        height={100}
                    />
                    <h2>Generating your Video... donot refresh</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CustomLoading