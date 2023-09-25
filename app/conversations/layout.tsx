import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList 
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}