import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { TrainMapChatroom } from 'src/types/trainChatterChat';

import TrainItem from './train-item';
import { TrainItemSkeleton } from './train-skeleton';

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  trainChatterChats: TrainMapChatroom[];
  //
  openMail: boolean;
  onCloseMail: VoidFunction;
  onClickMail: (id: string) => void;
  //
  selectedLabelId: string;
  selectedMailId: string;
  update: (key: string, value: string) => void;
};

export default function TrainList({
  loading,
  trainChatterChats,
  //
  openMail,
  onCloseMail,
  onClickMail,
  //
  selectedLabelId,
  selectedMailId,
  update,
}: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <TrainItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = trainChatterChats.map((trainChatterChat) => (
    <TrainItem
      key={trainChatterChat.train.id}
      trainChatterChat={trainChatterChat}
      selected={`${trainChatterChat.train.id}` === selectedMailId}
      onClick={() => {
        update('y', window.scrollY.toString());
        onClickMail(`${trainChatterChat.train.id}`);
      }}
    />
  ));

  const renderContent = (
    <>
      <Stack sx={{ p: 2 }}>
        {mdUp ? (
          <TextField
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {selectedLabelId}
          </Typography>
        )}
      </Stack>

      <Scrollbar sx={{ px: 2 }}>
        {loading && renderSkeleton}

        {!!trainChatterChats.length && renderList}
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 320,
        flexShrink: 0,
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openMail}
      onClose={onCloseMail}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 320,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
