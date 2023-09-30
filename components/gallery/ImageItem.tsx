'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from "clsx";

interface ImageItemProps {
    image: any,
    onOpen?: any
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onOpen }) => {
  const [span, setSpan] = useState<number | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const imgHeight = imageRef.current!.clientHeight
    setSpan(Math.ceil(imgHeight / 10 + 1))

  }, [imageRef.current?.clientHeight])

  return (
    <div 
        className={clsx(`          
          rounded-md 
          mb-[10px]
        `,
          span ? 'block' : 'hidden'
        )} 
        style={{gridRowEnd: span ? `span ${span}`: ''}}
        onClick={() => onOpen(true)}
    >
        <img 
            ref={imageRef}
            src={image} 
            alt="image" 
            className='w-full row-end-auto col-end-auto rounded-md hover:opacity-[0.5] cursor-pointer'
        />
    </div>
  )
}

export default ImageItem