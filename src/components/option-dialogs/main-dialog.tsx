import { Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Dialog, Typography, dialogClasses } from '@mui/material';

import { useEmployee } from 'src/hooks/use-employee';

import Row from 'src/components/acs-row/row';
import Iconify from 'src/components/iconify';
import Column from 'src/components/acs-column/column';

// ----------------------------------------------------------------------
interface Props {
  quote: string;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  showOptions: boolean;
  setShowTrain: Dispatch<SetStateAction<boolean>>;
  setShowGotToAskBossDialog: Dispatch<SetStateAction<boolean>>;
  setShowGotToMuteDialog: Dispatch<SetStateAction<boolean>>;
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
}

export default ({
  quote,
  setShowOptions,
  showOptions,
  setShowTrain,
  setShowGotToAskBossDialog,
  setShowGotToMuteDialog,
  setShowEditDialog,
}: Props) => {
  const theme = useTheme();
  const { employee } = useEmployee();
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={showOptions}
      onClose={() => setShowOptions(false)}
      transitionDuration={{
        enter: theme.transitions.duration.shortest,
        exit: 0,
      }}
      PaperProps={{
        sx: {
          overflow: 'unset',
        },
      }}
      sx={{
        [`& .${dialogClasses.container}`]: {
          alignItems: 'flex-start',
        },
      }}
    >
      <Box sx={{ p: 5, borderBottom: `solid 1px ${theme.palette.divider}` }}>
        <Column spacing={0.5} sx={{ mb: 2, mt: 0, width: 1 }}>
          <Row alignItems="center" justifyContent="space-between">
            <Typography variant="h4" sx={{ m: 0 }}>
              訓練工讀生
            </Typography>
            <Button
              onClick={() => {
                setShowOptions(false);
              }}
            >
              <Iconify key="country.label" icon="carbon:close" width="2.2rem" />
            </Button>
          </Row>
          <Button
            sx={{ p: '1rem' }}
            onClick={() => {
              setTimeout(() => setShowOptions(false), 100);
              setShowTrain(true);
            }}
          >
            <Column width={1}>
              <Typography textAlign="start" variant="h6">
                修正回答方式
              </Typography>
              <Typography color={theme.palette.info.main} textAlign="start" variant="subtitle1">
                叫工讀生之後換個方式回答
              </Typography>
            </Column>
            <Iconify key="country.label" icon="carbon:chevron-right" width="1.4rem" mr="1rem" />
          </Button>
          <Button
            sx={{ p: '1rem' }}
            onClick={() => {
              setTimeout(() => setShowOptions(false), 100);
              setShowGotToAskBossDialog(true);
            }}
          >
            <Column width={1}>
              <Typography textAlign="start" variant="h6">
                叫工讀生之後這種回答就交給我就好
              </Typography>
              <Typography color={theme.palette.info.main} textAlign="start" variant="subtitle1">
                工讀生之後會回答：「抱歉，我再問一下老闆可以嗎？」
              </Typography>
            </Column>
            <Iconify key="country.label" icon="carbon:chevron-right" width="1.4rem" mr="1rem" />
          </Button>
          <Button
            sx={{ p: '1rem' }}
            onClick={() => {
              setTimeout(() => setShowOptions(false), 100);
              setShowGotToMuteDialog(true);
            }}
          >
            <Column width={1}>
              <Typography textAlign="start" variant="h6">
                不要回覆這個客人
              </Typography>
              <Typography color={theme.palette.info.main} textAlign="start" variant="subtitle1">
                您可以接手這個對話，再適時把對話還給工讀生
              </Typography>
            </Column>
            <Iconify key="country.label" icon="carbon:chevron-right" width="1.4rem" mr="1rem" />
          </Button>
          <Button
            sx={{ p: '1rem' }}
            onClick={() => {
              setTimeout(() => setShowOptions(false), 100);
              setShowEditDialog(true);
            }}
          >
            <Column width={1}>
              <Typography textAlign="start" variant="h6">
                更改這句話
              </Typography>
            </Column>
            <Iconify key="country.label" icon="carbon:chevron-right" width="1.4rem" mr="1rem" />
          </Button>
          <Row alignItems="end" m="1rem" gap="1rem">
            <Stack>
              <Typography textAlign="right" variant="body2" color={theme.palette.info.main}>
                「{quote}」
              </Typography>
              <Typography textAlign="right" variant="body2">
                ～{employee.displayName}
              </Typography>
            </Stack>
            <Avatar
              sx={{ cursor: 'pointer', width: 72, height: 72, borderRadius: 1 }}
              src={employee.photoURL}
              alt={employee.displayName}
            >
              {employee.displayName?.charAt(0).toUpperCase()}
            </Avatar>
          </Row>
        </Column>
      </Box>
    </Dialog>
  );
};
