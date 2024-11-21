import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useEmployee } from 'src/hooks/use-employee';

import Iconify from 'src/components/iconify';

import { Chatter } from 'src/types/chatter';
import { Message } from 'src/types/message';

import { useGetMessage } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  message: Message;
  chatters: Chatter[];
  onOpenLightbox: (value: string) => void;
};

export default function ChatMessageSideItem({ message, chatters, onOpenLightbox }: Props) {
  const { employee } = useEmployee();

  const { me, hasImage } = useGetMessage({
    message,
  });

  const { text, create_at } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        visibility: 'hidden',
        mb: 1,
      }}
    >
      &nbsp;
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        // visibility: 'hidden',
      }}
    >
      {hasImage ? (
        <Box
          component="img"
          alt="attachment"
          src={text}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
          }}
        />
      ) : (
        text
      )}
    </Stack>
  );

  const renderActions = (
    <Stack
      direction="row"
      className="message-actions"
      sx={{
        pt: 0.5,
        opacity: 0,
        top: '100%',
        left: 0,
        position: 'absolute',
        visibility: 'hidden',
      }}
    >
      <IconButton size="small">
        <Iconify icon="" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="" width={16} />
      </IconButton>
    </Stack>
  );

  const messageChatter = chatters.find((c) => c.id === message.chatter_id);

  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      {!me && (
        <Avatar
          alt={messageChatter?.nickname}
          src={messageChatter?.image}
          sx={{ width: 32, height: 32, mr: 2, visibility: 'hidden' }}
        />
      )}

      <Stack alignItems="flex-end">
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {me && (
            <Box width={1} position="absolute" sx={{ ml: 2, alignSelf: 'start' }}>
              <Button variant="contained">訓練這句話</Button>
            </Box>
          )}
          {renderBody}
          {renderActions}
        </Stack>
      </Stack>
    </Stack>
  );
}
