"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectDuration = ({ onUserSelect }) => {

    const Options = ['30 seconds', '60 seconds', '90 seconds']

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl text-primary'>Duration</h2>
            <p className='text-gray-500'>Select the duration of your video</p>

            <Select onValueChange={(value) => {
                value != 'Custom Prompt' && onUserSelect('duration', value)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg ">
                    <SelectValue placeholder="Content Duration" />
                </SelectTrigger>
                <SelectContent>
                    {Options.map((item, index) => (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDuration
