'use client';

import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";

import Image from "next/image";

interface AvatarProps {
  user?: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="
        relative 
        flex
        items-center
        justify-center
        rounded-full 
        overflow-hidden
        h-7 
        w-7 
        md:h-11 
        md:w-11
      ">
        <Image
          fill
          src={user?.image || '/images/placeholder1.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive ? (
        <span 
          className="
            absolute 
            block 
            rounded-full 
            bg-green-400 
            ring-0
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          " 
        />
      ) : null}
    </div>
  );
}

export default Avatar;