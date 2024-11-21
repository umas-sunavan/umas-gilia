import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { BoxProps, StackProps } from '@mui/system';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

const Column = forwardRef<HTMLDivElement, StackProps>(({ children, ...other }, ref) => (
  <Stack {...other} sx={{ ...other.sx, display: 'flex', flexDirection: 'column' }} ref={ref}>
    {children}
  </Stack>
));

export default Column;
