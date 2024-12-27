"use client"
import React, { useState } from 'react'
import { useGetImages } from '@/features/images/api/useGetImages'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select'
import { Input } from '@/components/aceternity/input'

const CustomSkeleton = () => (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
)

const Images = () => {

    const { data: images, isLoading } = useGetImages()
    const [searchQuery, setSearchQuery] = useState('')
    const [cardType, setCardType] = useState<'detailed' | 'minimal'>('minimal')

    // Filter images based on search query
    const filteredImages = images?.filter((image) => {
        const lowercasedQuery = searchQuery.toLowerCase()
        return (
            image.profile?.username.toLowerCase().includes(lowercasedQuery) ||
            image.story?.title.toLowerCase().includes(lowercasedQuery) ||
            image.storage_id.toLowerCase().includes(lowercasedQuery) ||
            image.url?.toLowerCase().includes(lowercasedQuery)
        )
    })

    return (
        <div className="">

            <div className="flex justify-between items-center gap-4 mb-4 " >
                <h1 className="text-3xl font-semibold text-center">Images Gallery</h1>

                <div className="flex justify-end gap-2" >
                    {/* Search Bar */}
                    <div className="mb-6 flex justify-center w-60">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by username, title, storage_id, or URL"
                        />
                    </div>

                    {/* Select Dropdown */}
                    <div className="mb-6 flex justify-center w-fit">
                        <Select value={cardType} onValueChange={(value) => setCardType(value as "detailed" | "minimal")} >
                            <SelectTrigger className='bg-surface py-2.5 '>
                                <SelectValue placeholder="Filter by genre" />
                            </SelectTrigger>
                            <SelectContent className='bg-surface '>
                                <SelectItem value={"minimal"}>Minimal Card</SelectItem>
                                <SelectItem value={"detailed"}>Detailed Card</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>


            {/* Loading Skeletons */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array(8)
                        .fill(0)
                        .map((_, idx) => (
                            <div key={idx} className="w-full">
                                <CustomSkeleton />
                            </div>
                        ))}
                </div>
            ) : (
                // Displaying filtered images
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages?.map((image, index) => (
                        <Card key={index} className="w-full">
                            <img
                                src={image.url || '/default-image.jpg'} // Fallback if image URL is missing
                                alt={image.storage_id}
                                className="h-64 object-cover rounded-lg"
                            />
                            {cardType === 'detailed' ? (
                                <CardContent>
                                    {image?.profile && <p className="text-sm text-gray-600 truncate">Username: {image?.profile?.username}</p>}
                                    {image?.story && <p className="text-sm text-gray-600 truncate">Story: {image?.story?.title}</p>}
                                    <p className="text-sm text-gray-600 truncate">Storage ID: {image.storage_id}</p>
                                    <p className="text-sm text-gray-600 truncate">URL: {image.url}</p>
                                </CardContent>
                            ) : null}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Images
