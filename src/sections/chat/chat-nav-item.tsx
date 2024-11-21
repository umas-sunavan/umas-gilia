import { formatDistanceToNowStrict } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useLocalStorage } from 'src/hooks/use-local-storage';

import zhTW from 'src/utils/date-fns-zhtw';

import { Chatter } from 'src/types/chatter';
import { ChatroomMessage } from 'src/types/chatroom';

import { useGetNavItem } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  collapse: boolean;
  onCloseMobile: VoidFunction;
  conversation: ChatroomMessage;
};

const STORAGE_KEY = 'read';
export default function ChatNavItem({
  selected,
  collapse,
  conversation: chatroomMessage,
  onCloseMobile,
}: Props) {
  const { state, update } = useLocalStorage(STORAGE_KEY, []);
  const { user } = useMockedUser();
  const [unreadCount, setUnreadCount] = useState(0);

  const lastReadAt =
    (state.messagesLastReadAt && state.messagesLastReadAt[chatroomMessage.chatroom_id]) || 0;

  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const { group, displayName, displayText, chatters, lastActivity, hasOnlineInGroup } =
    useGetNavItem({
      chatroomMessage,
      currentUserId: `${user?.id}`,
    });

  const chatter: Chatter = chatters[0];
  const { name: chatters_name, image: avatarUrl } = chatter;

  useEffect(() => {
    const count = chatroomMessage.messages.filter(
      (message) => message.create_at > lastReadAt
    ).length;
    setUnreadCount(count);
  }, [chatroomMessage, lastReadAt]);

  const updateLastRead = useCallback(() => {
    const messagesLastReadAt = { ...state.read };
    messagesLastReadAt[chatroomMessage.chatroom_id] = new Date().getTime();
    update('messagesLastReadAt', messagesLastReadAt);
  }, [chatroomMessage.chatroom_id, state.read, update]);

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }
      updateLastRead();
      router.push(`${paths.dashboard.chat}?chatroomId=${chatroomMessage.chatroom_id}`);
    } catch (error) {
      console.error(error);
    }
  }, [chatroomMessage.chatroom_id, mdUp, onCloseMobile, router, updateLastRead]);

  const renderGroup = (
    <Badge
      variant={hasOnlineInGroup ? 'online' : 'invisible'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
        {chatters.slice(0, 2).map((_chatter) => (
          <Avatar key={_chatter.id} alt={_chatter.name} src={_chatter.image} />
        ))}
      </AvatarGroup>
    </Badge>
  );

  const renderSingle = (
    <Badge variant="standard" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Avatar alt={chatters_name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge color="error" overlap="circular" badgeContent={0}>
        {group ? renderGroup : renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={displayName}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={displayText}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: unreadCount ? 'subtitle2' : 'body2',
              color: unreadCount ? 'text.primary' : 'text.secondary',
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
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
                locale: zhTW,
              })}
            </Typography>

            {!!unreadCount && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: 'info.main',
                  borderRadius: '50%',
                }}
              />
            )}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}
