import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      imageUrl,
      userId
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!currentUser?.id || currentUser?.id !== userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const newImage = await prisma.image.create({
      data: {
        userId: userId,
        imageUrl,
      }
    });

    return NextResponse.json(newImage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 });
  }
}