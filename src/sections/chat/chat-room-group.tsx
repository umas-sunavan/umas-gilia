import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEmployee } from 'src/hooks/use-employee';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { Chatter } from 'src/types/chatter';

import ChatRoomParticipantDialog from './chat-room-participant-dialog';

// ----------------------------------------------------------------------

type Props = {
  chatters: Chatter[];
};

export default function ChatRoomGroup({ chatters }: Props) {
  const [selected, setSelected] = useState<Chatter | null>(null);
  const { employee } = useEmployee();
  const collapse = useBoolean(true);

  const handleOpen = useCallback((chatter: Chatter) => {
    setSelected(chatter);
  }, []);

  const handleClose = () => {
    setSelected(null);
  };

  const totalParticipants = chatters.length;

  const renderBtn = (
    <ListItemButton
      onClick={collapse.onToggle}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: 40,
        flexShrink: 0,
        flexGrow: 'unset',
        typography: 'overline',
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Box component="span" sx={{ flexGrow: 1 }}>
        對話中的成員（{totalParticipants}）
      </Box>
      <Iconify
        width={16}
        icon={collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </ListItemButton>
  );

  const renderContent = (
    <Scrollbar sx={{ height: 56 * 4 }}>
      {chatters.map((chatter) => {
        const isEmployee = chatter.id === employee.id;
        return (
          <ListItemButton key={chatter.id} onClick={() => handleOpen(chatter)}>
            <Badge variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar alt={chatter.name} src={isEmployee ? employee.photoURL : chatter.image} />
            </Badge>

            <ListItemText
              sx={{ ml: 2 }}
              primary={chatter.name}
              secondary={isEmployee ? '工讀生' : '顧客'}
              primaryTypographyProps={{
                noWrap: true,
                typography: 'subtitle2',
              }}
              secondaryTypographyProps={{
                noWrap: true,
                component: 'span',
                typography: 'caption',
              }}
            />
          </ListItemButton>
        );
      })}
    </Scrollbar>
  );

  return (
    <>
      {renderBtn}

      <div>
        <Collapse in={collapse.value}>{renderContent}</Collapse>
      </div>

      {selected && (
        <ChatRoomParticipantDialog chatter={selected} open={!!selected} onClose={handleClose} />
      )}
    </>
  );
}
