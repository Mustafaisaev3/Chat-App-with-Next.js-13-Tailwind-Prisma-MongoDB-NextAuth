import prisma from "@/libs/prismadb";

const getGalleryImages = async (
  userId: string
) => {
  try {
    const images = await prisma.image.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return images;
  } catch (error: any) {
    return [];
  }
};

export default getGalleryImages;