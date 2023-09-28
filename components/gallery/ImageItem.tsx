'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from "clsx";

interface ImageItemProps {
    image: any
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
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
    >
        <img 
            ref={imageRef}
            src={image} 
            alt="image" 
            className='w-full row-end-auto col-end-auto rounded-md '
        />
    </div>
  )
}

export default ImageItem