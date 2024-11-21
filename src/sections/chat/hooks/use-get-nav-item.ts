import { useEmployee } from 'src/hooks/use-employee';

import { ChatroomMessage } from 'src/types/chatroom';

// ----------------------------------------------------------------------

type Props = {
  currentUserId: string;
  chatroomMessage: ChatroomMessage;
};

export default function useGetNavItem({ currentUserId, chatroomMessage: conversation }: Props) {
  const { messages, chatters } = conversation;
  const { employee } = useEmployee();

  const chattersInConversation = chatters.filter((participant) => participant.id !== currentUserId);

  const lastMessage = messages[messages.length - 1];

  const group = chattersInConversation.length > 2;

  const displayName = chattersInConversation.map((participant) => participant.name).join(', ');

  const hasOnlineInGroup = group
    ? chattersInConversation.map((item) => 'online').includes('online')
    : false;

  let displayText = '';

  if (lastMessage) {
    const sender = lastMessage.chatter_id === employee.id ? `${employee.displayName}: ` : '';

    const message = lastMessage.text === 'image' ? 'Sent a photo' : lastMessage.text;

    displayText = `${sender}${message}`;
  }

  return {
    group,
    displayName,
    displayText,
    chatters: chattersInConversation,
    lastActivity: lastMessage.create_at,
    hasOnlineInGroup,
  };
}
