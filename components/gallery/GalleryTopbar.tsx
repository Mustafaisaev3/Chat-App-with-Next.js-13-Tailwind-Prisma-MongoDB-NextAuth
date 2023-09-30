'use ui'

import axios from "axios"
import { User } from "@prisma/client"
import Avatar from "../Avatar"
import { HiPhoto } from 'react-icons/hi2'
import { CldUploadButton } from "next-cloudinary";

interface GalleryTopbarProps {
    currentUser: User
}

const GalleryTopbar: React.FC<GalleryTopbarProps> = ({ currentUser }) => {
  const handleUpload = (result: any) => {
    axios.post('/api/images', {
      imageUrl: result.info.secure_url,
      userId: currentUser.id
    })
  }
  return (
    <div className="w-full h-auto p-5 mb-5 ">
        <div className="w-full h-full p-2 rounded-md bg-[#3a3a3a] flex items-center justify-between"> 
            <Avatar user={currentUser} />
            <CldUploadButton 
                options={{ maxFiles: 1 }} 
                onUpload={handleUpload} 
                uploadPreset="oub9kg25"
            >
                <div className="w-auto h-auto p-2 flex items-center gap-2 rounded-md bg-[#367b71] text-white">
                    <HiPhoto size={30} className="text-white" />
                    Upload
                </div>
            </CldUploadButton>
        </div>
    </div>
  )
}

export default GalleryTopbar