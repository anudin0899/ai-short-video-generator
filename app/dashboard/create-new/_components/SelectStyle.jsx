import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({ onUserSelect }) => {

    const [selectedOption, setSelectedOption] = useState();

    const styleOtions = [
        {
            name: 'Realstic',
            image: '/img/comic.jpg'
        },
        {
            name: 'Cartoon',
            image: '/img/cartoon.jpg'
        },
        {
            name: 'Comic',
            image: '/img/comic.jpg'
        },
        {
            name: 'Historic',
            image: '/img/historic.jpg'
        },
        {
            name: 'WaterColor',
            image: '/img/comic.jpg'
        },
        {
            name: 'GTA',
            image: '/img/cartoon.jpg'
        },

    ]
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl text-primary'>Style</h2>
            <p className='text-gray-500'>Select your video style</p>
            <div className='grid grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-3'>
                {styleOtions.map((item, index) => (
                    <div key={index}
                        className={`relative hover:scale-105 
                        transition-all cursor-pointer 
                        ${selectedOption == item?.name && 'border-4 border-blue-300 rounded-xl'}`}
                    >
                        <Image
                            src={item.image}
                            alt='image'
                            width={100}
                            height={100}
                            onClick={() => {
                                setSelectedOption(item.name)
                                onUserSelect('imageStyle', item.name)
                            }}
                            className='h-48 rounded-lg object-cover w-full'
                        />
                        <h2 className='absolute p-1 text-white text-center
                         bg-black bottom-0 w-full rounded-b-lg'>
                            {item.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle