import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  imageId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
  ) {
    try {
      const { imageId } = params;
      const currentUser = await getCurrentUser();
  
      if (!currentUser?.id) {
        return NextResponse.json(null);
      }
  
      const existingImage = await prisma.image.findUnique({
        where: {
          id: imageId
        },
      });
  
      if (!existingImage) {
        return new NextResponse('Invalid ID', { status: 400 });
      }
  
      const deletedImage = await prisma.image.deleteMany({
        where: {
          id: imageId,
        },
      });
  
      return NextResponse.json(deletedImage)
    } catch (error) {
      return NextResponse.json(null);
    }
  }