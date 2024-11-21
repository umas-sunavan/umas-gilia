'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { m, Variants, AnimatePresence } from 'framer-motion';

import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import Row from 'src/components/acs-row/row';
import Iconify from 'src/components/iconify';
import Column from 'src/components/acs-column/column';

// ----------------------------------------------------------------------

const LABEL_INDEX = 'inbox';

interface Props {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  variants: Variants;
}

export default function TrainInitTemplates({ selected, setSelected, variants }: Props) {
  const [kinds] = useState<{ name: string; icon: string }[]>([
    { name: '咖啡廳', icon: 'feather:coffee' },
    { name: '電子商務', icon: 'feather:briefcase' },
    { name: '餐廳', icon: 'feather:coffee' },
    { name: '占卜/風水/靈學', icon: 'feather:eye' },
    { name: '美甲店', icon: 'feather:package' },
    { name: '自產自銷農林魚牧', icon: 'feather:shopping-cart' },
    { name: '自由教練、瑜伽老師', icon: 'feather:disc' },
  ]);

  return (
    <Grid
      container
      display="grid"
      gap="1rem"
      width={1}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      justifyContent={{
        md: 'space-between',
      }}
    >
      <AnimatePresence>
        {(selected ? [] : kinds).map((kind, i) => (
          <m.div
            key={`kind-${kind.name || ''}`}
            variants={variants}
            initial="init"
            animate="anim"
            exit="exit"
            transition={{ delay: !selected ? i * 0.05 : 0.6 }}
          >
            <Button
              variant="contained"
              sx={{ p: 2, width: 1, borderRadius: 2 }}
              onClick={() => setSelected(kind.name)}
            >
              <Column sx={{ width: 1, gap: '1rem', height: 1 }}>
                <Row justifyContent="space-between">
                  <Iconify width={28} icon={kind.icon} />
                  <Iconify width={28} icon="feather:chevron-right" />
                </Row>
                <Typography sx={{ textAlign: 'left ' }}>{kind.name}</Typography>
              </Column>
            </Button>
          </m.div>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
