import { useSearchParams } from 'next/navigation';
import { Dispatch, useState, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, Typography, dialogClasses } from '@mui/material';

import { useEmployee } from 'src/hooks/use-employee';

import Row from 'src/components/acs-row/row';
import Column from 'src/components/acs-column/column';

import { Message } from 'src/types/message';

import Iconify from '../iconify';

// ----------------------------------------------------------------------
interface Props {
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default ({ setShowOptions, show, setShow }: Props) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get('chatroomId') || '';
  const [correction, setCorrection] = useState<Message | null>(null!);
  const { employee } = useEmployee();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={show}
      onClose={() => setShowOptions(false)}
      transitionDuration={{
        enter: theme.transitions.duration.shortest,
        exit: 0,
      }}
      PaperProps={{
        sx: {
          overflow: 'scroll',
        },
      }}
      sx={{
        [`& .${dialogClasses.container}`]: {
          alignItems: 'flex-start',
        },
      }}
    >
      <Box sx={{ p: 5, borderBottom: `solid 1px ${theme.palette.divider}` }}>
        <Column spacing={3} sx={{ width: 1 }}>
          <Row alignItems="center" justifyContent="space-between">
            <Row alignItems="center">
              <Button
                onClick={() => {
                  setShowOptions(true);
                  setTimeout(() => setShow(false), 100);
                }}
              >
                <Iconify key="country.label" icon="carbon:chevron-left" width="2.2rem" />
              </Button>
              <Typography variant="h4">教工讀生之後的回答方式</Typography>
            </Row>
            <Button
              onClick={() => {
                setShowOptions(false);
                setShow(false);
              }}
            >
              <Iconify key="country.label" icon="carbon:close" width="2.2rem" />
            </Button>
          </Row>
          <Row>
            <Typography variant="body1">
              不好意思，工讀生的訊息一旦送出，就無法收回。但您仍可以手動留言給客戶：「不好意思，我這邊糾正顏鈞諺（工讀生）的說法，他才剛來還不懂。」
            </Typography>
          </Row>
          <Button
            sx={{ m: '0 1rem' }}
            type="submit"
            variant="contained"
            onClick={() => {
              setShow(false);
            }}
          >
            <Typography variant="body1" sx={{ m: 'auto', w: 1 }}>
              留言給客戶
            </Typography>
          </Button>
        </Column>
      </Box>
    </Dialog>
  );
};
