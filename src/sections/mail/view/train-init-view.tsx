'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import { Avatar, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEmployee } from 'src/hooks/use-employee';
import { useResponsive } from 'src/hooks/use-responsive';

import { useGetLabels } from 'src/api/mail';

import Row from 'src/components/acs-row/row';
import Column from 'src/components/acs-column/column';
import { useSettingsContext } from 'src/components/settings';

import TrainCompose from '../train-compose';
import TrainContentView from './train-content-view';
import TrainInitMessages from './train-init-messages';
import TrainInitTemplates from './train-init-templates';

// ----------------------------------------------------------------------

const LABEL_INDEX = 'inbox';

export default function TrainInitView() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedLabelId = searchParams.get('label') || LABEL_INDEX;

  const selectedMailId = searchParams.get('id') || '';

  const mdUp = useResponsive('up', 'md');

  const settings = useSettingsContext();

  const openNav = useBoolean();

  const openMail = useBoolean();

  const openCompose = useBoolean();

  const { labels, labelsLoading } = useGetLabels();

  // const { mails, mailsLoading, mailsError, mailsEmpty } = useGetMails(selectedLabelId);

  // const { mail, mailLoading, mailError } = useGetMail(selectedMailId);

  // const firstMailId = mails.allIds[0] || '';

  const handleToggleCompose = useCallback(() => {
    if (openNav.value) {
      openNav.onFalse();
    }
    openCompose.onToggle();
  }, [openCompose, openNav]);

  const handleClickLabel = useCallback(
    (labelId: string) => {
      if (!mdUp) {
        openNav.onFalse();
      }

      if (labelId) {
        const href =
          labelId !== LABEL_INDEX
            ? `${paths.dashboard.mail}?label=${labelId}`
            : paths.dashboard.mail;
        router.push(href);
      }
    },
    [openNav, router, mdUp]
  );

  useEffect(() => {
    if (openCompose.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openCompose.value]);

  const { employee } = useEmployee();

  const variants = {
    init: { opacity: 0, y: 50 },
    anim: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const selectedVariants = {
    init: { opacity: 0, y: 50 },
    anim: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const avatar = (
    <div>
      <Column mb="3rem" gap="1rem">
        <Avatar
          sx={{ cursor: 'pointer', width: 144, height: 144, borderRadius: 1 }}
          src={employee.photoURL}
          alt={employee.displayName}
        >
          {employee.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </Column>
    </div>
  );

  const animation = true;
  const [selected, setSelected] = useState('');

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Row
          alignItems="center"
          sx={{
            mb: { xs: 1, md: 1 },
          }}
        >
          <Typography variant="h4">訓練工讀生</Typography>
          {selected && (
            <m.div variants={selectedVariants} initial="init" animate="anim">
              <Typography variant="h4">{selected && `成為${selected}的客服`}</Typography>
            </m.div>
          )}
          {selected && (
            <m.div variants={selectedVariants} initial="init" animate="anim">
              <Button
                sx={{ m: 2, visibility: selected ? 'initial' : 'hidden' }}
                onClick={() => setSelected('')}
              >
                更換類別
              </Button>
            </m.div>
          )}
        </Row>
        <Row>
          {avatar}
          <TrainInitMessages
            selected={selected}
            variants={variants}
            selectedVariants={selectedVariants}
          />
        </Row>
        <Row>
          <TrainInitTemplates selected={selected} setSelected={setSelected} variants={variants} />
        </Row>
      </Container>
      <AnimatePresence>
        {selected && (
          <m.div
            variants={selectedVariants}
            initial="init"
            exit="exit"
            animate="anim"
            transition={{ delay: animation ? 2 : 0 }}
          >
            <TrainContentView />
          </m.div>
        )}
      </AnimatePresence>

      {openCompose.value && <TrainCompose onCloseCompose={openCompose.onFalse} />}
    </>
  );
}
