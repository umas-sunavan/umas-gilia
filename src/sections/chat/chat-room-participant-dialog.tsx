import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import { useEmployee } from 'src/hooks/use-employee';

import Iconify from 'src/components/iconify';

import { Chatter } from 'src/types/chatter';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  chatter: Chatter;
};

export default function ChatRoomParticipantDialog({ chatter, open, onClose }: Props) {
  const { employee } = useEmployee();
  const isEmployee = chatter.id === employee.id;
  const avatar = isEmployee ? employee.photoURL : chatter.image;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>

      <DialogContent sx={{ py: 5, px: 3, display: 'flex' }}>
        <Avatar alt={chatter.name} src={avatar} sx={{ width: 96, height: 96, mr: 3 }} />

        <Stack spacing={1}>
          <Typography variant="caption" sx={{ color: 'primary.main' }}>
            {isEmployee ? '你的工讀生' : '顧客'}
          </Typography>

          <Typography variant="subtitle1">{chatter.name}</Typography>

          <Stack direction="row" sx={{ typography: 'caption', color: 'text.disabled' }}>
            <Iconify
              icon="mingcute:location-fill"
              width={16}
              sx={{ flexShrink: 0, mr: 0.5, mt: '2px' }}
            />
            從{employee.displayName}的 Line 讀取的對話資料
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
