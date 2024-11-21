import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Scrollbar from 'src/components/scrollbar';

import { ITrainLabel } from 'src/types/trainLabels';

import TrainNavItem from './train-nav-item';
import { MailNavItemSkeleton } from './train-skeleton';

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  openNav: boolean;
  onCloseNav: VoidFunction;
  //
  labels: ITrainLabel[];
  selectedLabelId: string;
  handleClickLabel: (labelId: string) => void;
  //
  onToggleCompose: VoidFunction;
  update: (key: string, value: string) => void;
};

export default function TrainNav({
  loading,
  openNav,
  onCloseNav,
  //
  labels,
  selectedLabelId,
  handleClickLabel,
  //
  onToggleCompose,
  update,
}: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <MailNavItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {labels.map((label) => (
        <TrainNavItem
          key={label.id}
          label={label}
          selected={selectedLabelId === label.id}
          onClickNavItem={() => {
            update('y', window.scrollY.toString());
            handleClickLabel(label.id);
          }}
        />
      ))}
    </>
  );

  const renderContent = (
    <>
      <Typography
        sx={{
          p: { xs: 3.5, md: 2.5 },
        }}
      >
        客服類別
      </Typography>

      <Scrollbar>
        <Stack>
          {loading && renderSkeleton}

          {!!labels.length && renderList}
        </Stack>
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 200,
        flexShrink: 0,
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 260,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
