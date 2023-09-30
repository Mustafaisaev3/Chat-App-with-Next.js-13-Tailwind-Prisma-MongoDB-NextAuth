'use client'

import React, { useState } from 'react'
import ImageItem from './ImageItem'
import GalleryTopbar from './GalleryTopbar'
import { UserWithGalleryType } from '@/types'

interface ImageGridProps {
  currentUser: UserWithGalleryType
}

const ImageGrid: React.FC<ImageGridProps> = ({ currentUser }) => {

  return (
    <>
      <GalleryTopbar currentUser={currentUser} />
      <div className='w-full h-auto flex flex-col sm:grid grid-cols-gallery auto-rows-[10px] gap-x-[10px] p-4 bg-[#2a2a2a]' >
        {currentUser.images ? (currentUser.images.map((image) => {
          return <ImageItem image={image} key={image.id} currentUser={currentUser}  />
        })) : null}
      </div>
    </>
  )
}

export default ImageGrid
