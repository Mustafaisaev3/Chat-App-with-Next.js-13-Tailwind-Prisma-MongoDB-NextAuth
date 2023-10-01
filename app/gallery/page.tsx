import ImageGrid from "@/components/gallery/ImageGrid"

const Gallery = async () => {

  return (
    <div className="lg:block h-full min-h-screen bg-[#2a2a2a]">
      {/* @ts-ignore */}
      <ImageGrid />
    </div>
  )
}

export default Gallery