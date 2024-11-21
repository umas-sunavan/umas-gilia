import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { BoxProps } from '@mui/system';

// ----------------------------------------------------------------------

const Row = forwardRef<HTMLDivElement, BoxProps>(({ children, ...other }, ref) => (
  <Box {...other} sx={{ ...other.sx, display: 'flex', flexDirection: 'row' }}>
    {children}
  </Box>
));

export default Row;
