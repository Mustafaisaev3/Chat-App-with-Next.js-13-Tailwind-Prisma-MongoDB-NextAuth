import Sidebar from "@/components/sidebar/Sidebar";


export default async function GalleryLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full min-h-screen">
        {children}
      </div>
    </Sidebar>
  );
}