import {  Conversation, Message, User, Image } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};

export type UserWithGalleryType = User & {
  images: Image[]
}

'#367b71'
'#52b6a7 - hover'