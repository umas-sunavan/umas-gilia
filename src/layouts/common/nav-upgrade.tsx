import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Dialog, dialogClasses } from '@mui/material';

import { useEmployee } from 'src/hooks/use-employee';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { employee } = useEmployee();
  const { user } = useMockedUser();
  const theme = useTheme();
  const [openContactDev, setOpenContactDev] = useState(false);

  const handleFireEmployee = () => {
    setOpenContactDev(true);
  };

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src="/assets/images/tommy.jpg"
            alt={user?.displayName}
            sx={{ width: 48, height: 48 }}
          >
            {user?.displayName?.charAt(0).toUpperCase()}
          </Avatar>

          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            老闆你好！
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {employee.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            這是你的客服工讀生
          </Typography>
        </Stack>

        <Button
          LinkComponent="button"
          variant="contained"
          onClick={handleFireEmployee}
          rel="noopener"
        >
          辭退
        </Button>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openContactDev}
          onClose={() => setOpenContactDev(false)}
          transitionDuration={{
            enter: theme.transitions.duration.shortest,
            exit: 0,
          }}
          PaperProps={{
            sx: {
              mt: 15,
              overflow: 'unset',
            },
          }}
          sx={{
            [`& .${dialogClasses.container}`]: {
              alignItems: 'flex-start',
            },
          }}
        >
          <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
            <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
              <Typography variant="h3">對工讀生不滿意嗎？</Typography>

              <Typography variant="body1">
                您可以聯絡 umas@valleydeer.com
                來更換您的工讀生，我們的客服（這次不是AI了）將會替您診斷，並且協助您訓練更好的工讀生。或者取消訂閱。
              </Typography>
            </Stack>
          </Box>
        </Dialog>
      </Stack>
    </Stack>
  );
}
