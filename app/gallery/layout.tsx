import Sidebar from "@/components/sidebar/Sidebar";


export default async function GalleryLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
}