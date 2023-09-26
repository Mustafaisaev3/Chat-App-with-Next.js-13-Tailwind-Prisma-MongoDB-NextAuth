import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Body from "@/components/conversations/conversation/Body";
import Form from "@/components/conversations/conversation/Form";
import Header from "@/components/conversations/conversation/Header";
import EmptyState from "@/components/EmtyState";



interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}

export default ChatId;