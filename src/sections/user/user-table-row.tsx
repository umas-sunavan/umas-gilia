import { format, subDays, formatDistance } from 'date-fns';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEmployee } from 'src/hooks/use-employee';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import zhTW from '../../utils/date-fns-zhtw';
import { ChatroomMessage } from '../../types/chatroom';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: ChatroomMessage;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();
  const { employee } = useEmployee();
  const { chatroom_simulation, chatroom_id, messages, chatters } = row;
  const chatterIds = chatters.filter((chatter) => chatter.id !== employee.id);
  const firstChatterId = chatterIds[0].id;
  // const { chatters } = useChatters(chatterIds);

  const lastAsk = messages.findLast((m) => m.chatter_id === firstChatterId);
  const lastReply = messages.findLast((m) => m.chatter_id === employee.id);
  const lastAskText = lastAsk?.text || '(顧客尚未詢問)';
  const lastReplyText = lastReply?.text || '(工讀生尚未回答)';
  const lastAskChatter = chatters.find((c) => c.id === lastAsk?.chatter_id);
  const lastReplyChatter = chatters.find((c) => c.id === lastReply?.chatter_id);

  const avatarUrl = lastAskChatter?.image || lastAskChatter?.image;

  const users = chatters.map((chatter) => chatter.nickname).join(', ');
  const ignore = chatters.some((chatter) => chatter.ignore);
  const messageStartTime = messages[0]
    ? new Date(messages[0].create_at).toLocaleString('zh-TW', {
        hour12: false,
      })
    : '尚未開始';
  const messageEndTime = messages[0]
    ? new Date(messages.slice(-1)[0].create_at).toLocaleString('zh-TW', {
        hour12: false,
      })
    : '尚未開始';
  const confirm = useBoolean();

  const popover = usePopover();

  const href = `${paths.dashboard.chat}?chatroomId=${chatroom_id}`;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center', verticalAlign: 'center' }}>
          <Stack
            flexDirection="row"
            style={{
              alignItems: 'center',
              padding: '0.5rem',
            }}
          >
            <Button
              href={href}
              color="inherit"
              variant="text"
              sx={{ mr: 2, borderRadius: '10rem', minWidth: 0 }}
            >
              <Avatar alt={avatarUrl} src={avatarUrl} />
            </Button>
            <Button href={href} color="inherit" variant="text" sx={{ textAlign: 'left' }}>
              <ListItemText
                primary={users}
                secondary={chatroom_simulation}
                primaryTypographyProps={{ typography: 'body2' }}
                secondaryTypographyProps={{
                  component: 'span',
                  color: 'text.disabled',
                }}
              />
            </Button>
          </Stack>
        </TableCell>

        <TableCell sx={{ p: '0.5rem', verticalAlign: 'top' }}>
          <Button
            href={href}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 'inherit',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              borderTopLeftRadius: '2px',
              backgroundColor: theme.palette.success.main,
              color: theme.palette.common.black,
              textAlign: 'left',
            }}
          >
            {lastAskText}
          </Button>
        </TableCell>

        <TableCell sx={{ p: '0.5rem', verticalAlign: 'bottom' }}>
          <Button
            href={href}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 'inherit',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              borderBottomRightRadius: '2px',
              backgroundColor: theme.palette.success.main,
              color: theme.palette.common.black,
              textAlign: 'left',
            }}
          >
            {lastReplyText}
          </Button>
        </TableCell>

        <TableCell sx={{}}>{format(new Date(messageStartTime), 'MM/dd HH:mm')}</TableCell>
        <TableCell sx={{}}>
          {formatDistance(subDays(new Date(), 3), new Date(messageEndTime), {
            addSuffix: true,
            locale: zhTW,
          })}
        </TableCell>

        <TableCell>
          <Label variant="soft" color={!ignore ? 'success' : 'warning'}>
            {!ignore ? '對話中' : '已中斷對話'}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'warning.main' }}
        >
          <Iconify icon="solar:call-cancel-rounded-bold" />
          中斷對話
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
