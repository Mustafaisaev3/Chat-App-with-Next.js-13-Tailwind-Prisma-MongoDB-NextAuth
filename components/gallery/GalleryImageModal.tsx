'use client';

import axios from 'axios'
import { useRouter } from 'next/navigation';
import Modal from '@/components/modals/Modal';
import Image from 'next/image';
import { MdDelete, MdFileDownload } from 'react-icons/md'
import { BsArrowsFullscreen, } from 'react-icons/bs'
import { saveAs } from 'file-saver'

interface GalleryImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  image?: any | null;
}

const GalleryImageModal: React.FC<GalleryImageModalProps> = ({ 
  isOpen, 
  onClose, 
  image
}) => {
  const router = useRouter()

  if (!image) {
    return null;
  }

  const handleDownloadImage = () => {
    saveAs(image.imageUrl, 'image')
  }

  const handleDeleteImage = () => {
    axios.delete(`/api/images/${image.id}`)
      .then(() => onClose())
      .finally(() => router.refresh())
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDark={true}>
      <div className='w-auto h-auto min-w-96 min-h-96'>
        <Image 
          className="object-contain !static" 
          fill 
          alt="Image" 
          src={image.imageUrl}
        />
        <div className='w-full h-auto flex items-center justify-center gap-4 pt-4'>
            <div className='w-auto h-auto p-2 bg-[#3a3a3a] rounded-md cursor-pointer' onClick={handleDownloadImage}>
                <MdFileDownload size={30} color={'#19ff19'} />
            </div>
            <div className='w-auto h-auto p-2 bg-[#3a3a3a] rounded-md cursor-pointer' onClick={handleDeleteImage}>
                <MdDelete size={30} color={'#ff3c3c'} />
            </div>
            <div className='w-auto h-auto p-2 bg-[#3a3a3a] rounded-md cursor-pointer'>
                <a href={image.imageUrl} download target="_blank">
                    <BsArrowsFullscreen size={30} color={'#0087ff'} />
                </a>
            </div>
        </div>
      </div>
    </Modal>
  )
}

export default GalleryImageModal;