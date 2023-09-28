'use client';

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import clsx from "clsx";
import MobileItem from "./MobileItem";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import { useState } from "react";

interface MobileFooterProps {
  currentUser: User
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [isOptionOpen, setIsOptionOpen] = useState(false)

  if (isOpen) {
    return null;
  }

  return ( 
    <>
      <SettingsModal 
          currentUser={currentUser}
          isOpen={isOptionOpen}
          onClose={() => setIsOptionOpen(false)}
      />
      <div 
        className="
          fixed 
          justify-between 
          w-full 
          bottom-0 
          z-40 
          flex 
          items-center 
          bg-[#3a3a3a]
          border-[#5a5a5a]
          border-t-[1px] 
          lg:hidden
        "
      >
        {routes.map((route) => (
          <MobileItem 
            key={route.href} 
            href={route.href} 
            active={route.active} 
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
        <nav 
          className={clsx(`
            group 
            flex 
            gap-x-3 
            text-sm 
            leading-6 
            font-semibold 
            w-full 
            justify-center 
            items-center
            text-[#367b71]
            hover:text-white 
            hover:bg-[#4a4a4a]
            cursor-pointer
        `
        )}>
            <div 
              onClick={() => setIsOptionOpen(true)} 
            >
              <Avatar user={currentUser!} />
            </div>
          </nav>
      </div>
    </>
   );
}
 
export default MobileFooter;