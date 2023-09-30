'use client';

import Modal from '@/components/modals/Modal';
import Image from 'next/image';
import { MdDelete, MdFileDownload } from 'react-icons/md'
import { BsArrowsFullscreen, } from 'react-icons/bs'
import { saveAs } from 'file-saver'

interface GalleryImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const GalleryImageModal: React.FC<GalleryImageModalProps> = ({ 
  isOpen, 
  onClose, 
  src
}) => {
  if (!src) {
    return null;
  }

  const handleDownloadImage = () => {
    saveAs(src, 'image')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDark={true}>
      <div className='w-auto h-auto min-w-96 min-h-96'>
        <Image 
          className="object-contain !static" 
          fill 
          alt="Image" 
          src={src}
        />
        <div className='w-full h-auto flex items-center justify-center gap-4 pt-4'>
            <div className='w-auto h-auto p-2 bg-[#3a3a3a] rounded-md cursor-pointer' onClick={handleDownloadImage}>
                <MdFileDownload size={30} color={'green'} />
            </div>
            <div className='w-auto h-auto p-2 bg-[#3a3a3a] rounded-md cursor-pointer'>
                <MdDelete size={30} color={'red'} />
            </div>
            <div className='w-auto h-auto p-2 bg-[#3a3a3a] rounded-md cursor-pointer'>
                <a href={src} download target="_blank">
                    <BsArrowsFullscreen size={30} color={'blue'} />
                </a>
            </div>
        </div>
      </div>
    </Modal>
  )
}

export default GalleryImageModal;