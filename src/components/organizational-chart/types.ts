import { TreeProps } from 'react-organizational-chart';

import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

type VariantValue = 'simple' | 'standard' | 'group';

export type ItemProps = {
  name: string;
  group?: string;
  role?: string | null;
  avatarUrl?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
};

export type ListProps = {
  data: ItemProps;
  depth: number;
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};

export type SubListProps = {
  data: ItemProps[];
  depth: number;
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};

export type OrganizationalChartProps = Partial<TreeProps> & {
  data: {
    name: string;
    children: ItemProps[];
  };
  variant?: VariantValue;
  sx?: SxProps<Theme>;
};