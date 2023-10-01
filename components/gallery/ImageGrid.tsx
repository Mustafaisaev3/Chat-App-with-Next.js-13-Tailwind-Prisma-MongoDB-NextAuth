import ImageItem from './ImageItem'
import GalleryTopbar from './GalleryTopbar'
import { UserWithGalleryType } from '@/types'
import getCurrentUser from '@/app/actions/getCurrentUser'


const ImageGrid = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return null
  }
  const images = currentUser?.images || []
  
  return (
    <>
      <GalleryTopbar currentUser={currentUser} />
      <div className='w-full h-auto flex flex-col sm:grid grid-cols-gallery auto-rows-[10px] gap-x-[10px] p-4 bg-[#2a2a2a]' >
        {images && images.map((image) => {
          return <ImageItem image={image} key={image.id} currentUser={currentUser}  />
        })}
      </div>
    </>
  )
}

export default ImageGrid
