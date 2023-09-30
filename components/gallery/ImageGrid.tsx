'use client'

import { User } from '@prisma/client'
import React, { useState } from 'react'
import ImageModal from '@/components/modals/ImageModal'
import ImageItem from './ImageItem'
import GalleryTopbar from './GalleryTopbar'

const imgArr = [
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1586115176305-0dbffc809ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA2NTk3Nnx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDY1OTc2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
]

interface ImageGridProps {
  currentUser: User
}

const ImageGrid: React.FC<ImageGridProps> = ({ currentUser }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  return (
    <>
      <ImageModal 
        currentUser={currentUser}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
      <GalleryTopbar currentUser={currentUser} />
      <div className='w-full h-full flex flex-col sm:grid grid-cols-gallery auto-rows-[10px] gap-x-[10px] p-4 overflow-auto'>
        {imgArr.map((img, id) => {
          return <ImageItem image={img} key={id} onOpen={setIsImageModalOpen} />
        })}
      </div>
    </>
  )
}

export default ImageGrid