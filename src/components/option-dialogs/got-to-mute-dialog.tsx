import { useSearchParams } from 'next/navigation';
import { Dispatch, useState, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Dialog, Typography, dialogClasses } from '@mui/material';

import { useEmployee } from 'src/hooks/use-employee';

import Row from 'src/components/acs-row/row';
import Column from 'src/components/acs-column/column';

import ChatMessageItem from 'src/sections/chat/chat-message-item';

import { Message } from 'src/types/message';

import Iconify from '../iconify';

// ----------------------------------------------------------------------
interface Props {
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default ({ setShowOptions, show, setShow }: Props) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get('chatroomId') || '';
  const [correction, setCorrection] = useState<Message | null>(null!);
  const { employee } = useEmployee();

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
          <Row>
            <Column m="1.6rem 1rem" gap="1rem">
              <Avatar
                sx={{ cursor: 'pointer', width: 144, height: 144, borderRadius: 1 }}
                src={employee.photoURL}
                alt={employee.displayName}
              >
                {employee.displayName?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2">{employee.displayName}</Typography>
            </Column>
            <Stack width="fit-content">
              <ChatMessageItem
                hideActions
                setOpenDialog={() => {}}
                setQuote={() => {}}
                showSide={false}
                message={{
                  id: '0',
                  chatter_id: employee.id,
                  create_at: new Date().getTime(),
                  text: '好的老闆，在您下一步指示之前，我都不會主動回覆這位顧客。',
                  type: 'text',
                  correction: [],
                }}
                chatters={[]}
                onOpenLightbox={() => {}}
              />
            </Stack>
          </Row>
          <Button
            sx={{ m: '0 1rem' }}
            type="submit"
            variant="contained"
            onClick={() => {
              setShow(false);
            }}
          >
            <Typography variant="body1" sx={{ m: 'auto', w: 1 }}>
              訓練完成
            </Typography>
          </Button>
        </Column>
      </Box>
    </Dialog>
  );
};
