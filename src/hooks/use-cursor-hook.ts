import { useState, useEffect, useCallback } from 'react';

import { GridRowSelectionModel } from '@mui/x-data-grid';

import { timeToSeconds } from 'src/utils/format-time';

import { Transcript, TranscriptData } from 'src/types/transcript';

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  transcriptData: TranscriptData | null;
};

export function useCursorHook({ videoRef, transcriptData }: Props) {
  const [timeCursor, setTimeCursor] = useState<number>(0);
  const [cursorOnTranscript, setCursorOnTranscript] = useState<Transcript | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeCursor;
      const transcripts = transcriptData?.sections.flatMap((section) => section.sectionTranscripts);
      const _cursorOnTranscript = transcripts?.find((t) => timeToSeconds(t.time) === timeCursor);
      setCursorOnTranscript(_cursorOnTranscript || null);
    }
  }, [timeCursor, transcriptData?.sections, videoRef]);

  const handleRowSelectionModelChange = useCallback(
    (newSelection: GridRowSelectionModel) => {
      const _transcript = transcriptData?.sections.flatMap((section) => section.sectionTranscripts)[
        newSelection[0] as number
      ];
      if (_transcript) {
        setCursorOnTranscript(_transcript);
        setTimeCursor(timeToSeconds(_transcript.time));
      }
      setCursorOnTranscript(null);
    },
    [setCursorOnTranscript, setTimeCursor, transcriptData?.sections]
  );

  return {
    timeCursor,
    setTimeCursor,
    cursorOnTranscript,
    setCursorOnTranscript,
    handleRowSelectionModelChange,
  };
}
