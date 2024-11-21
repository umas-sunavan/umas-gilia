import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import { useEmployee } from 'src/hooks/use-employee';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import { OptionDialog } from 'src/components/option-dialogs';

import { IMailLabel } from 'src/types/mail';
import { Message } from 'src/types/message';
import { TrainMessage } from 'src/types/train';
import { ChatroomMessage } from 'src/types/chatroom';

import ChatMessageItem from '../chat/chat-message-item';
// ----------------------------------------------------------------------

type Props = {
  trainMapChatroom: {
    train: TrainMessage;
    chatroom: ChatroomMessage;
  };
  renderLabel: (id: string) => IMailLabel;
};

export default function TrainDetails({ trainMapChatroom, renderLabel }: Props) {
  const { train, chatroom } = trainMapChatroom;
  const { employee } = useEmployee();
  const [quote, setQuote] = useState('');

  const variants = {
    init: { opacity: 0, y: 50 },
    anim: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const findAskMatch = train.text.match('當用戶說：「(.+?)」');
  const ask = findAskMatch ? findAskMatch[1] : undefined;
  const askMessage = chatroom.messages.find((message) => message.text === ask);
  const renderAskMessage = askMessage && (
    <m.div
      key="ask"
      variants={variants}
      initial="init"
      animate="anim"
      transition={{ delay: 0.1 * 0 }}
    >
      <ChatMessageItem
        setOpenDialog={() => {}}
        setQuote={() => {}}
        showSide={false}
        message={askMessage}
        chatters={[]}
        onOpenLightbox={() => {}}
      />
    </m.div>
  );

  const findDontSayMatch = train.text.match('而你回覆「(.+)」，你不應該這樣說。');
  const dontSay = findDontSayMatch ? findDontSayMatch[1] : undefined;
  const dontSayMessage = chatroom.messages.find((message) => message.text === dontSay);
  const renderDontSayMessage = dontSayMessage && (
    <m.div
      key="dontSay"
      variants={variants}
      initial="init"
      animate="anim"
      transition={{ delay: 0.1 * 1 }}
    >
      <ChatMessageItem
        lineThrough
        setOpenDialog={() => {}}
        setQuote={() => {}}
        showSide={false}
        message={dontSayMessage}
        chatters={[]}
        onOpenLightbox={() => {}}
      />
    </m.div>
  );

  const findShouldSayMatch = train.text.match('」，你不應該這樣說。(.+)');
  const shouldSay = findShouldSayMatch ? findShouldSayMatch[1] : undefined;
  const shouldSayMessage: Message = {
    id: 'should-say',
    chatter_id: employee.id,
    create_at: new Date().getTime(),
    text: shouldSay || '',
    type: 'text',
    correction: [],
  };
  const renderShouldSayMessage = shouldSayMessage && (
    <m.div
      key="shouldSay"
      variants={variants}
      initial="init"
      animate="anim"
      transition={{ delay: 0.1 * 2 }}
    >
      <ChatMessageItem
        setOpenDialog={() => {}}
        setQuote={() => {}}
        showSide={false}
        message={shouldSayMessage}
        chatters={[]}
        onOpenLightbox={() => {}}
      />
    </m.div>
  );

  useEffect(() => {
    setQuote(dontSay || '');
  }, [dontSay]);

  const [openOptionsDialog, setOpenOptionsDialog] = useState(false);

  if (!trainMapChatroom) {
    return (
      <EmptyContent
        title="No Conversation Selected"
        description="Select a conversation to read"
        imgUrl="/assets/icons/empty/ic_email_selected.svg"
        sx={{
          borderRadius: 1.5,
          bgcolor: 'background.default',
        }}
      />
    );
  }

  const renderContent = (
    <Box
      sx={{
        p: 3,
        flexGrow: 1,
        overflow: { xs: 'auto', md: 'hidden' },
      }}
    >
      <Scrollbar>
        <Button
          variant="soft"
          sx={{ mb: 1.5, p: 1.5, width: 1, justifyContent: 'left' }}
          color="primary"
        >
          <Typography textAlign="left">
            這是一位模擬顧客。
            <br />
            以後工讀生面對以下問題，會往這個方向回答：
          </Typography>
        </Button>
        <AnimatePresence>
          {renderAskMessage}
          {renderDontSayMessage}
          {renderShouldSayMessage}
        </AnimatePresence>
      </Scrollbar>
    </Box>
  );

  return (
    <Stack
      flexGrow={1}
      sx={{
        width: 1,
        minWidth: 0,
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    >
      {renderContent}

      <Stack
        sx={{
          px: 1,
          pt: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Button
          variant="contained"
          sx={{ justifyContent: 'space-between' }}
          onClick={() => setOpenOptionsDialog(true)}
        >
          <Typography textAlign="start">訓練</Typography>
          <Iconify icon="feather:chevron-right" />
        </Button>
      </Stack>
      <OptionDialog
        isSimulation
        quote={quote}
        skipOptions
        setShowOptions={setOpenOptionsDialog}
        showOptions={openOptionsDialog}
      />
    </Stack>
  );
}
