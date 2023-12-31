'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import clsx from "clsx";
import { pusherClient } from "@/libs/pusher";
import { find } from 'lodash'
import { User } from "@prisma/client";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";

import GroupChatModal from "../modals/GroupChatModal";
import ConversationBox from "./ConversationBox";
import { MdOutlineGroupAdd } from 'react-icons/md'

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  initialItems, 
  users
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:remove', removeHandler)
    }
  }, [pusherKey, router]);

  return (
    <>
      <GroupChatModal 
        users={users} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
      <aside className={clsx(`
          fixed 
          inset-y-0 
          pb-20
          lg:pb-0
          lg:left-20 
          lg:w-80 
          lg:block
          overflow-y-auto  
          bg-[#3a3a3a]
        `, isOpen ? 'hidden' : 'block w-full left-0')
      }>
          <div className="px-5">
            <div className="flex justify-between mb-4 pt-4">
              <div className="text-2xl font-bold text-white">
                Messages
              </div>
              <div 
                onClick={() => setIsModalOpen(true)} 
                className="
                  rounded-full 
                  p-2 
                  bg-[#367b71]
                  text-gray-600 
                  cursor-pointer 
                  hover:opacity-75 
                  transition
                "
              >
                <MdOutlineGroupAdd size={20} color='white' />
              </div>
            </div>
            {items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))}
          </div>
      </aside>
    </>
    
  )
}
 
export default ConversationList;