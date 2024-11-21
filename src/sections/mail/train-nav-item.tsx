import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { ITrainLabel } from 'src/types/trainLabels';

// ----------------------------------------------------------------------

const LABEL_ICONS = {
  all: 'fluent:mail-24-filled',
  inbox: 'solar:inbox-bold',
  trash: 'solar:trash-bin-trash-bold',
  drafts: 'solar:file-text-bold',
  spam: 'solar:danger-bold',
  sent: 'iconamoon:send-fill',
  starred: 'eva:star-fill',
  important: 'material-symbols:label-important-rounded',
  social: 'solar:tag-horizontal-bold-duotone',
  promotions: 'solar:tag-horizontal-bold-duotone',
  forums: 'solar:tag-horizontal-bold-duotone',
};

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  label: ITrainLabel;
  onClickNavItem: VoidFunction;
};

export default function TrainNavItem({ selected, label, onClickNavItem, ...other }: Props) {
  const { unreadCount, color, name } = label;

  return (
    <ListItemButton
      disableRipple
      onClick={onClickNavItem}
      sx={{
        borderRadius: 1,
        px: { xs: 3.5, md: 2.5 },
        height: 40,
        gap: 1.5,
        color: 'text.primary',
        ...(selected && {
          color: 'text.primary',
          bgcolor: 'grey.900',
        }),
        '&:hover': {
          bgcolor: 'grey.700',
        },
      }}
      {...other}
    >
      <img src={`/assets/icons/app/${label.icon}`} alt={label.name} />
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          textTransform: 'capitalize',
          typography: selected ? 'subtitle2' : 'body2',
        }}
      />

      {!!unreadCount && <Typography variant="caption">{unreadCount}</Typography>}
    </ListItemButton>
  );
}
