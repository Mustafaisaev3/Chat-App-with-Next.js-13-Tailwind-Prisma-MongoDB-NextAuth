'use client';

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/hooks/useOtherUser";
// import useActiveList from "@/hooks/useActiveList";

import Avatar from "@/components/Avatar";
import ProfileDrawer from './ProfileDrawer';

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const { members } = useActiveList();
  // const isActive = members.indexOf(otherUser?.email!) !== -1;
  // const statusText = useMemo(() => {
  //   if (conversation.isGroup) {
  //     return `${conversation.users.length} members`;
  //   }

  //   return isActive ? 'Active' : 'Offline'
  // }, [conversation, isActive]);

  return (
  <>
    <ProfileDrawer 
      data={conversation} 
      isOpen={drawerOpen} 
      onClose={() => setDrawerOpen(false)}
    />
    <div 
      className="
        bg-[#2a2a2a]
        text-white
        w-full 
        flex 
        border-b-[1px] 
        border-[#4a4a4a]
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    >
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations" 
          className="
            lg:hidden 
            block 
            text-[#367b71]
            hover:text-[#52b6a7]
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {/* {statusText} */}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => setDrawerOpen(true)}
        className="
          text-[#367b71]
          cursor-pointer
          hover:text-[#52b6a7]
          transition
        "
      />
    </div>
    </>
  );
}
 
export default Header;