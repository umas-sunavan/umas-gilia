import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';

import { TrainMapChatroom } from 'src/types/trainChatterChat';

// ----------------------------------------------------------------------

type Props = ListItemButtonProps & {
  trainChatterChat: TrainMapChatroom;
  selected: boolean;
};

export default function TrainItem({ trainChatterChat, selected, sx, ...other }: Props) {
  const { train, chatroom } = trainChatterChat;
  const [mainCategory, subCategory] = train.category.split(' - ');
  const firstChatterId = chatroom.messages.sort((a, b) => a.create_at - b.create_at)[0].chatter_id;
  const firstChatter = chatroom.chatters.find((chatter) => chatter.id === firstChatterId);
  const isUnread = true;
  return (
    <ListItemButton
      sx={{
        p: 1,
        mb: 0.5,
        borderRadius: 1,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
        ...sx,
      }}
      {...other}
    >
      <>
        <ListItemText
          primary="工讀生面對的情境"
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body1',
            fontSize: '0.85rem',
            color: 'text.secondary',
          }}
          secondary={`${subCategory || '問題'}`}
          secondaryTypographyProps={{
            noWrap: true,
            component: 'span',
            variant: isUnread ? 'subtitle2' : 'body2',
            color: isUnread ? 'text.primary' : 'text.secondary',
          }}
        />

        <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
          <Typography
            noWrap
            variant="body2"
            component="span"
            sx={{
              mb: 1.5,
              fontSize: 12,
              color: 'text.disabled',
            }}
          >
            {chatroom.messages.length &&
              formatDistanceToNowStrict(new Date(chatroom.messages.slice(-1)[0].create_at), {
                addSuffix: false,
              })}
          </Typography>

          {!!isUnread && (
            <Box
              sx={{
                bgcolor: 'info.main',
                width: 8,
                height: 8,
                borderRadius: '50%',
              }}
            />
          )}
        </Stack>
      </>
    </ListItemButton>
  );
}
