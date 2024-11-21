import _ from 'lodash';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { useEmployee } from 'src/hooks/use-employee';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import { Chatter } from 'src/types/chatter';
import { ChatroomMessage } from 'src/types/chatroom';

// ----------------------------------------------------------------------

type Props = {
  chatters: Chatter[];
  messages: ChatroomMessage;
};

export default function ChatHeaderDetail({ chatters, messages }: Props) {
  const group = chatters.length > 1;
  const { employee } = useEmployee();

  console.log(` ChatHeaderDetailchatters`, chatters);

  const chatter = chatters[0];

  const chatterAvatar = chatter.image;

  const askerMessages = messages.messages.filter((m) => m.chatter_id === chatter.id);

  const renderGroup = (
    <AvatarGroup
      max={3}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 32,
          height: 32,
        },
      }}
    >
      {chatters.map((_chatter) => (
        <Avatar
          key={_chatter.id}
          alt={_chatter.name}
          src={_chatter.id === employee.id ? employee.photoURL : chatterAvatar}
        />
      ))}
    </AvatarGroup>
  );

  const lastMessageCreatedAt = _.get(askerMessages, '[askerMessages.length - 1].create_at');

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      <Badge variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar src={chatterAvatar} alt={chatter.name} />
      </Badge>

      <ListItemText
        primary={chatter.name}
        secondary={fToNow(lastMessageCreatedAt)}
        secondaryTypographyProps={{
          component: 'span',
        }}
      />
    </Stack>
  );

  return (
    <>
      {group ? renderGroup : renderSingle}

      <Stack flexGrow={1} />

      <IconButton>
        <Iconify icon="solar:phone-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="solar:videocamera-record-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </>
  );
}
