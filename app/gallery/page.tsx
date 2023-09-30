import ImageGrid from "@/components/gallery/ImageGrid"
import { UserWithGalleryType } from "@/types"
import getCurrentUser from "../actions/getCurrentUser"

const Gallery = async () => {
//   const currentUser = await getCurrentUser() 

  return (
    <div className="lg:block h-full min-h-screen bg-[#2a2a2a]">
      {/* <ImageGrid currentUser={currentUser! as UserWithGalleryType}/> */}
      {/* @ts-ignore */}
      <ImageGrid />
    </div>
  )
}

export default Gallery