import { Dispatch, SetStateAction } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useEmployee } from 'src/hooks/use-employee';

import zhTW from 'src/utils/date-fns-zhtw';

import Iconify from 'src/components/iconify';
import Row from 'src/components/acs-row/row';

import { Chatter } from 'src/types/chatter';
import { Message } from 'src/types/message';

import { useGetMessage } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  message: Message;
  chatters: Chatter[];
  onOpenLightbox: (value: string) => void;
  showSide: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setQuote: Dispatch<SetStateAction<string>>;
  hideActions?: boolean;
  lineThrough?: boolean;
  showInfo?: boolean;
};

export default function ChatMessageItem({
  message,
  chatters,
  onOpenLightbox,
  showSide,
  setOpenDialog,
  setQuote,
  hideActions = false,
  lineThrough = false,
  showInfo = true,
}: Props) {
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
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${employee.displayName},`} &nbsp;
      {formatDistanceToNowStrict(new Date(create_at), {
        addSuffix: true,
        locale: zhTW,
      })}
    </Typography>
  );

  const renderBody = (
    <Row
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        textDecoration: lineThrough ? 'line-through' : 'initial',
        typography: 'body1',
        ...(me && {
          color: 'grey.800',
          bgcolor: 'primary.light',
          filter: lineThrough ? 'grayscale(100%)' : 'unset',
        }),
        ...(!me && {
          bgcolor: '#0e110e',
        }),
        ...(hasImage && {
          p: 0,
          bgcolor: 'transparent',
        }),
      }}
    >
      {hasImage ? (
        <Box
          component="img"
          alt="attachment"
          src={text}
          onClick={() => onOpenLightbox(text)}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        />
      ) : (
        text
      )}
      {showSide && me && (
        <Stack sx={{ position: 'relative' }}>
          <Box
            position="absolute"
            width="6rem"
            sx={{ ml: '2rem', transform: 'translate(1rem, -12px)' }}
          >
            <Button
              color="primary"
              variant="soft"
              onClick={() => {
                setOpenDialog(true);
                setQuote(text);
              }}
            >
              訓練這句話
            </Button>
          </Box>
        </Stack>
      )}
    </Row>
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
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        ...(me && {
          left: 'unset',
          right: 0,
        }),
      }}
    >
      <IconButton size="small">
        <Iconify icon="solar:reply-bold" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="eva:smiling-face-fill" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
      </IconButton>
    </Stack>
  );

  const messageChatter = chatters.find((c) => c.id === message.chatter_id);
  const avatar = messageChatter?.image;

  return (
    <Stack
      direction="row"
      justifyContent={me ? 'flex-end' : 'unset'}
      sx={{ mb: hideActions ? 1 : 5 }}
    >
      {!me && <Avatar alt={avatar} src={avatar} sx={{ width: 32, height: 32, mr: 2 }} />}

      <Stack alignItems="flex-end">
        {showInfo && renderInfo}
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
          {renderBody}
          {!hideActions && renderActions}
        </Stack>
      </Stack>
    </Stack>
  );
}
