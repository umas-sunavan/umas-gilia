'use client';

import { m, Variants, AnimatePresence } from 'framer-motion';

import Stack from '@mui/material/Stack';

import { useEmployee } from 'src/hooks/use-employee';

import ChatMessageItem from 'src/sections/chat/chat-message-item';

// ----------------------------------------------------------------------

interface Props {
  selected: string;
  variants: Variants;
  selectedVariants: Variants;
}
export default function TrainInitMessages({ selected, variants, selectedVariants }: Props) {
  const { employee } = useEmployee();

  return (
    <>
      <AnimatePresence>
        {!selected && (
          <m.div
            variants={variants}
            initial="init"
            animate="anim"
            exit="exit"
            transition={{ delay: 1 }}
          >
            <Stack sx={{ ml: 2, position: 'absolute', width: 'max-content' }}>
              <ChatMessageItem
                showInfo={false}
                hideActions
                setOpenDialog={() => {}}
                setQuote={() => {}}
                showSide={false}
                message={{
                  id: '1',
                  chatter_id: employee.id,
                  create_at: new Date().getTime(),
                  text: '老闆您好！我是你的私人客服工讀生顏鈞諺，請問老闆，你需我回答哪一種店家呢？',
                  type: 'text',
                  correction: [],
                }}
                chatters={[]}
                onOpenLightbox={() => {}}
              />
            </Stack>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selected && (
          <m.div
            variants={selectedVariants}
            initial="init"
            animate="anim"
            exit="exit"
            transition={{ delay: selected ? 1.2 : 0 }}
          >
            <Stack sx={{ ml: 2, position: 'absolute', width: 'max-content' }}>
              <ChatMessageItem
                showInfo={false}
                hideActions
                setOpenDialog={() => {}}
                setQuote={() => {}}
                showSide={false}
                message={{
                  id: '2',
                  chatter_id: employee.id,
                  create_at: new Date().getTime(),
                  text: `好的老闆，我將好好當個${selected}的客服，以下情境是當有客人問時，我會這樣回的對話。您隨時可以在這裡訓練我。`,
                  type: 'text',
                  correction: [],
                }}
                chatters={[]}
                onOpenLightbox={() => {}}
              />
            </Stack>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
