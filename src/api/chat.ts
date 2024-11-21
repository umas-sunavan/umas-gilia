import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints, chatsFetcher } from 'src/utils/axios';

import { ChatroomMessage } from 'src/types/chatroom';
import {
  IChatMessage,
  IChatParticipant,
  IChatConversation,
  IChatroomMessages,
  IChatConversations,
} from 'src/types/chat';

// ----------------------------------------------------------------------

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetContacts() {
  const URL = [endpoints.chat, { params: { endpoint: 'contacts' } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      contacts: (data?.contacts as IChatParticipant[]) || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !data?.contacts.length,
    }),
    [data?.contacts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetChatroomsMessages() {
  const URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  const { data, isLoading, error, isValidating } = useSWR<ChatroomMessage[]>(
    URL,
    chatsFetcher,
    options
  );

  const memoizedValue = useMemo(() => {
    const byId = keyBy(data, 'chatroom_id') || {};
    const allIds = Object.keys(byId) || [];

    return {
      chatroomMessages: {
        byId,
        allIds,
      } as IChatroomMessages,
      loading: isLoading,
      conversationsError: error,
      conversationsValidating: isValidating,
      conversationsEmpty: !isLoading && !allIds.length,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMessages(conversationId: string) {
  const URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, chatsFetcher, options);
  const dataFilterById = data?.filter((chatroom) => chatroom.chatroom_id === conversationId);
  const memoizedValue = useMemo(
    () => ({
      messages: dataFilterById?.length ? dataFilterById[0].messages : [],
      chatters: dataFilterById?.length ? dataFilterById[0].chatters : [],
      messagesLoading: isLoading,
      messagesError: error,
      messagesValidating: isValidating,
    }),
    [dataFilterById, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function sendMessage(conversationId: string, messageData: IChatMessage) {
  const CONVERSATIONS_URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  const CONVERSATION_URL = [
    endpoints.chat,
    {
      params: { conversationId, endpoint: 'conversation' },
    },
  ];

  /**
   * Work on server
   */
  // const data = { conversationId, messageData };
  // await axios.put(endpoints.chat, data);

  /**
   * Work in local
   */
  mutate(
    CONVERSATION_URL,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (currentData: any) => {
      const { conversation: currentConversation } = currentData;

      const conversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, messageData],
      };

      return {
        conversation,
      };
    },
    false
  );

  /**
   * Work in local
   */
  mutate(
    CONVERSATIONS_URL,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (currentData: any) => {
      const { conversations: currentConversations } = currentData;

      const conversations: IChatConversation[] = currentConversations.map(
        (conversation: IChatConversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, messageData],
              }
            : conversation
      );

      return {
        conversations,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createConversation(conversationData: IChatConversation) {
  const URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  /**
   * Work on server
   */
  const data = { conversationData };
  const res = await axios.post(endpoints.chat, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (currentData: any) => {
      const conversations: IChatConversation[] = [...currentData.conversations, conversationData];
      return {
        ...currentData,
        conversations,
      };
    },
    false
  );

  return res.data;
}

// ----------------------------------------------------------------------

export async function clickConversation(conversationId: string) {
  const URL = endpoints.chat;

  /**
   * Work on server
   */
  // await axios.get(URL, { params: { conversationId, endpoint: 'mark-as-seen' } });

  /**
   * Work in local
   */
  mutate(
    [
      URL,
      {
        params: { endpoint: 'conversations' },
      },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (currentData: any) => {
      const conversations: IChatConversations = currentData.conversations.map(
        (conversation: IChatConversation) =>
          conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
      );

      return {
        ...currentData,
        conversations,
      };
    },
    false
  );
}
