import { useSearchParams } from 'next/navigation';
import { Dispatch, useState, useEffect, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, TextField, Typography, dialogClasses } from '@mui/material';

import { useGetChatroomsMessages } from 'src/api/chat';

import Row from 'src/components/acs-row/row';
import Iconify from 'src/components/iconify';
import Column from 'src/components/acs-column/column';

import ChatMessageItem from 'src/sections/chat/chat-message-item';

import { Message } from 'src/types/message';

// ----------------------------------------------------------------------
interface Props {
  quote: string;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  showOptions: boolean;
  setShowGotcha: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  isSimulation: boolean;
}

export default ({
  quote,
  setShowOptions,
  showOptions,
  show,
  setShow,
  setShowGotcha,
  isSimulation,
}: Props) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const selectedChatroomId = searchParams.get('chatroomId') || '';
  const { chatroomMessages } = useGetChatroomsMessages();
  const { messages, chatters } = chatroomMessages.byId[selectedChatroomId] || {};
  const [answer, setAnswer] = useState<Message | null>(null!);
  const [ask, setAsk] = useState<Message | null>(null!);
  const [correction, setCorrection] = useState<Message | null>(null!);
  useEffect(() => {
    if (!messages?.length) return;
    const answerIndex = messages.findIndex((m) => m.text === quote);
    const _answer = messages[answerIndex];
    setAnswer(_answer);
    const _ask = messages[answerIndex - 1];
    setAsk(_ask);
  }, [messages, quote]);

  const snippet = (
    <Row alignItems="end" gap="1rem">
      <Stack bgcolor="#151A20" p={3} borderRadius={4} gap="1rem" width={1}>
        <Row width={1}>
          {isSimulation && (
            <Button
              variant="soft"
              sx={{ p: 1.5, width: 1, justifyContent: 'left' }}
              color="primary"
            >
              <Typography textAlign="left">
                這是一位模擬顧客。
                <br />
                以後工讀生面對以下問題，會往這個方向回答：
              </Typography>
            </Button>
          )}
        </Row>
        <Column>
          {ask && (
            <ChatMessageItem
              hideActions
              setOpenDialog={() => {}}
              setQuote={() => {}}
              showSide={false}
              message={ask}
              chatters={chatters}
              onOpenLightbox={() => {}}
            />
          )}
          {answer && (
            <ChatMessageItem
              lineThrough
              hideActions
              setOpenDialog={() => {}}
              setQuote={() => {}}
              showSide={false}
              message={answer}
              chatters={chatters}
              onOpenLightbox={() => {}}
            />
          )}
          {correction && (
            <ChatMessageItem
              hideActions
              setOpenDialog={() => {}}
              setQuote={() => {}}
              showSide={false}
              message={correction}
              chatters={chatters}
              onOpenLightbox={() => {}}
            />
          )}
        </Column>
      </Stack>
    </Row>
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={show}
      onClose={() => setShowOptions(false)}
      transitionDuration={{
        enter: theme.transitions.duration.shortest,
        exit: 0,
      }}
      PaperProps={{
        sx: {
          overflow: 'scroll',
        },
      }}
      sx={{
        [`& .${dialogClasses.container}`]: {
          alignItems: 'flex-start',
        },
      }}
    >
      <Box sx={{ p: 5, borderBottom: `solid 1px ${theme.palette.divider}` }}>
        <Column spacing={3} sx={{ width: 1 }}>
          <Row alignItems="center" justifyContent="space-between">
            <Row alignItems="center">
              <Button
                onClick={() => {
                  setShowOptions(true);
                  setTimeout(() => setShow(false), 100);
                }}
              >
                <Iconify key="country.label" icon="carbon:chevron-left" width="2.2rem" />
              </Button>
              <Typography variant="h4">教工讀生之後的回答方式</Typography>
            </Row>
            <Button
              onClick={() => {
                setShowOptions(false);
                setShow(false);
              }}
            >
              <Iconify key="country.label" icon="carbon:close" width="2.2rem" />
            </Button>
          </Row>
          {snippet}
          {answer && (
            <TextField
              label="應該這樣說..."
              value={correction?.text}
              onChange={(e) => {
                setCorrection({ ...answer, text: e.target.value });
              }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setShowGotcha(true);
              setTimeout(() => setShow(false), 100);
            }}
          >
            <Typography variant="body1" sx={{ m: 'auto', w: 1 }}>
              教工讀生這麼說
            </Typography>
          </Button>
        </Column>
      </Box>
    </Dialog>
  );
};
