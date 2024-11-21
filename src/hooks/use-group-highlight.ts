import { useState, useEffect } from 'react';

import { timeToSeconds } from 'src/utils/format-time';

import { Transcript, TranscriptData } from 'src/types/transcript';

type Props = {
  transcriptData: TranscriptData | null;
  groupBySecondThreshold: number;
};

type GrouppedTranscript = {
  start: number;
  end: number;
  transcripts: Transcript[];
};

export function useGroupHighlight({ transcriptData, groupBySecondThreshold }: Props) {
  const [highlightGroups, setHighlightGroups] = useState<GrouppedTranscript[]>([]);

  useEffect(() => {
    if (transcriptData) {
      const groups = transcriptData?.sections
        .flatMap((section) => section.sectionTranscripts)
        .reduce((acc, _transcript, index, array) => {
          if (index === 0) {
            acc.push({
              start: timeToSeconds(_transcript.time),
              end: timeToSeconds(_transcript.time),
              transcripts: [_transcript],
            });
            return acc;
          }
          const lastGroup = acc[acc.length - 1];
          const lastScript = array[index - 1];
          const lastSeconds = lastScript ? timeToSeconds(lastScript.time) : 0;
          const currentSeconds = timeToSeconds(_transcript.time);
          const groupped = currentSeconds - lastSeconds < groupBySecondThreshold;
          // console.log(transcript.time, lastScript?.time, groupped);
          if (groupped) {
            lastGroup.transcripts.push(_transcript);
            lastGroup.end = lastSeconds + groupBySecondThreshold;
          } else {
            acc.push({
              start: currentSeconds,
              end: currentSeconds,
              transcripts: [_transcript],
            });
          }
          return acc;
        }, [] as GrouppedTranscript[]);
      setHighlightGroups(groups);
    }
  }, [transcriptData, groupBySecondThreshold]);

  return {
    highlightGroups,
  };
}
