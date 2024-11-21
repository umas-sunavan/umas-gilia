'use client';

import { useState, useEffect, useCallback } from 'react';

import { Stack } from '@mui/system';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocalStorage } from 'src/hooks/use-local-storage';

import { useGetChatroomsMessages } from 'src/api/chat';
import { useGetTrains, useGetTrainLabels } from 'src/api/trainTemplate';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import EmptyContent from 'src/components/empty-content/empty-content';

import { TrainMessage } from 'src/types/train';
import { ChatroomMessage } from 'src/types/chatroom';

import TrainNav from '../train-nav';
import TrainList from '../train-list';
import TrainHeader from '../train-header';
import TrainDetails from '../train-details';

// ----------------------------------------------------------------------

const LABEL_INDEX = 'inbox';

export default function TrainContentView() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedLabelId = searchParams.get('label') || LABEL_INDEX;

  const selectedTrainId = searchParams.get('id') || '';

  const selectedChatroomId = searchParams.get('chatroomId') || '';

  const mdUp = useResponsive('up', 'md');

  const settings = useSettingsContext();

  const openNav = useBoolean();

  const openMail = useBoolean();

  const openCompose = useBoolean();

  const { labels, labelsLoading } = useGetTrainLabels();

  const { trains } = useGetTrains(selectedLabelId);
  const { chatroomMessages } = useGetChatroomsMessages();
  const [trainsMapChatrooms, setTrainsMapChatrooms] = useState<
    { train: TrainMessage; chatroom: ChatroomMessage }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const _trains = Object.values(trains.byId);
    const _trainsMapChatrooms = _trains.map((train) => {
      const chatrooms = Object.values(chatroomMessages.byId);
      const chatroom = chatrooms.find((_chatroom) =>
        _chatroom.messages.some((message) => message.id === train.message_id)
      );
      if (!chatroom) {
        alert('chatroom not found');
        return {
          train,
          chatroom: {
            chatroom_id: 'string;',
            chatroom_name: 'string;',
            chatroom_simulation: true,
            user_id: 'string;',
            messages: [],
            chatters: [],
          },
        };
      }
      return { train, chatroom };
    });
    setTrainsMapChatrooms(_trainsMapChatrooms);
  }, [chatroomMessages.byId, trains.byId]);

  // useEffect(() => {

  // }, [chatroomMessages.byId, trains.byId]);

  const trainLoading = false;
  const trainError = false;

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
            : `${paths.dashboard.mail}`;
        router.push(href);
      }
    },
    [openNav, router, mdUp]
  );

  const handleClickTrain = useCallback(
    (id: string) => {
      if (!mdUp) {
        openMail.onFalse();
      }
      const href =
        selectedLabelId !== LABEL_INDEX
          ? `${paths.dashboard.mail}?id=${id}&label=${selectedLabelId}`
          : `${paths.dashboard.mail}?id=${id}`;
      router.push(href);
    },
    [mdUp, selectedLabelId, router, openMail]
  );

  const [selectedTrainMapChatroom, setSelectedTrainMapChatroom] = useState<
    | {
        train: TrainMessage;
        chatroom: ChatroomMessage;
      }
    | undefined
  >(undefined);

  const { state, update } = useLocalStorage('scroll', {});
  useEffect(() => {
    console.log(state.y);

    window.scrollTo(0, +(state.y || '0'));
  }, [selectedLabelId, selectedTrainId, selectedChatroomId, state]);

  useEffect(() => {
    const _selectedTrainMapChatroom = trainsMapChatrooms.find(
      (train) => `${train.train.id}` === selectedTrainId
    );
    setSelectedTrainMapChatroom(_selectedTrainMapChatroom);
  }, [selectedTrainId, trainsMapChatrooms]);
  useEffect(() => {
    if (!selectedTrainMapChatroom) return;
    const href =
      selectedLabelId !== LABEL_INDEX
        ? `${paths.dashboard.mail}?id=${selectedTrainId}&label=${selectedLabelId}&chatroomId=${selectedTrainMapChatroom.chatroom.chatroom_id}`
        : `${paths.dashboard.mail}?id=${selectedTrainId}&chatroomId=${selectedTrainMapChatroom.chatroom.chatroom_id}`;
    router.push(href);
  }, [router, selectedLabelId, selectedTrainId, selectedTrainMapChatroom]);

  useEffect(() => {
    if (trainError) {
      router.push(paths.dashboard.mail);
    }
  }, [trainError, router]);

  useEffect(() => {
    if (!trainsMapChatrooms.length) return;
    const firstTrainId = trainsMapChatrooms[0].train.id;
    if (!selectedTrainId && firstTrainId) {
      handleClickTrain(`${firstTrainId}`);
    }
  }, [trainsMapChatrooms, handleClickTrain, selectedTrainId]);

  // useEffect(() => {
  //   if (openCompose.value) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  // }, [openCompose.value]);

  const renderLoading = (
    <LoadingScreen
      sx={{
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    />
  );

  const renderEmpty = (
    <EmptyContent
      title={`Nothing in ${selectedLabelId}`}
      description="This folder is empty"
      imgUrl="/assets/icons/empty/ic_folder_empty.svg"
      sx={{
        borderRadius: 1.5,
        maxWidth: { md: 320 },
        bgcolor: 'background.default',
      }}
    />
  );

  const renderMailNav = (
    <TrainNav
      update={update}
      loading={labelsLoading}
      openNav={openNav.value}
      onCloseNav={openNav.onFalse}
      //
      labels={labels}
      selectedLabelId={selectedLabelId}
      handleClickLabel={handleClickLabel}
      //
      onToggleCompose={handleToggleCompose}
    />
  );

  const renderMailList = (
    <TrainList
      update={update}
      trainChatterChats={trainsMapChatrooms}
      loading={loading}
      //
      openMail={openMail.value}
      onCloseMail={openMail.onFalse}
      onClickMail={handleClickTrain}
      //
      selectedLabelId={selectedLabelId}
      selectedMailId={selectedTrainId}
    />
  );

  const renderMailDetails = (
    <>
      {!trainsMapChatrooms.length || !selectedTrainMapChatroom ? (
        <EmptyContent
          imgUrl="/assets/icons/empty/ic_email_disabled.svg"
          sx={{
            borderRadius: 1.5,
            bgcolor: 'background.default',
            ...(!mdUp && {
              display: 'none',
            }),
          }}
        />
      ) : (
        <TrainDetails
          trainMapChatroom={selectedTrainMapChatroom}
          renderLabel={(id: string) => labels.filter((label) => label.id === id)[0]}
        />
      )}
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack
        spacing={1}
        sx={{
          p: 1,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.neutral',
        }}
      >
        {!mdUp && (
          <TrainHeader
            onOpenNav={openNav.onTrue}
            onOpenMail={!trainsMapChatrooms.length ? null : openMail.onTrue}
          />
        )}

        <Stack
          spacing={1}
          direction="row"
          sx={{
            minHeight: { md: 720 },
            height: { xs: 800, md: '72vh' },
          }}
        >
          {renderMailNav}

          {!trainsMapChatrooms.length ? renderEmpty : renderMailList}

          {trainLoading ? renderLoading : renderMailDetails}
        </Stack>
      </Stack>
    </Container>
  );
}
