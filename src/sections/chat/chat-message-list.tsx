import { useState } from 'react';

import { useResponsive } from 'src/hooks/use-responsive';

import Row from 'src/components/acs-row/row';
import Scrollbar from 'src/components/scrollbar';
import Column from 'src/components/acs-column/column';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import OptionDialog from 'src/components/option-dialogs/option-dialogs';

import { Message } from 'src/types/message';
import { Chatter } from 'src/types/chatter';

import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  messages: Message[];
  chatters: Chatter[];
};

export default function ChatMessageList({ messages = [], chatters }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const slides = messages
    .filter((message) => message.type === 'image')
    .map((message) => ({ src: message.text }));
  const [quote, setQuote] = useState('');
  const [openOptionsDialog, setOpenOptionsDialog] = useState(false);
  const lightbox = useLightBox(slides);
  console.log('messages in ChatMessageList: ', messages);
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Scrollbar ref={messagesEndRef}>
        <Row gap="1rem">
          <Column
            width={mdUp ? 'calc(100% - 8.5rem)' : 1}
            sx={{
              pl: 3,
              py: 5,
              height: 1,
            }}
          >
            {messages.map((message, i) => (
              <ChatMessageItem
                setOpenDialog={setOpenOptionsDialog}
                setQuote={setQuote}
                showSide={mdUp}
                key={`key-${message.create_at}-${i}`}
                message={message}
                chatters={chatters}
                onOpenLightbox={() => lightbox.onOpen(message.text)}
              />
            ))}
          </Column>
          <Column width={mdUp ? '8.5rem' : 0} sx={{ backgroundColor: '#161c2482' }} />
        </Row>
      </Scrollbar>
      <OptionDialog
        isSimulation={false}
        quote={quote}
        setShowOptions={setOpenOptionsDialog}
        showOptions={openOptionsDialog}
        skipOptions={false}
      />
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}
