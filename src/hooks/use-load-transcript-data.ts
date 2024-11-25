import { useState, useCallback } from 'react';

import { TranscriptData } from 'src/types/transcript';

export function useLoadTranscriptData() {
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [file, setFile] = useState<File | string | null>(null);

  const handleDropSingleFile = useCallback(async (_acceptedFiles: File[]) => {
    const newFile = _acceptedFiles[0];
    const formData = new FormData();
    formData.append('video_file', newFile);
    if (newFile) {
      setFile(newFile);
      const name = newFile.name.replace(/\.[^.]+$/, '');
      console.log(name);
      const response = await fetch(
        'https://asia-east1-opay-donation-list.cloudfunctions.net/umas-gilia-transcriber',
        {
          method: 'POST',
          body: formData,
          signal: AbortSignal.timeout(590000),
        }
      );
      const transcript = (await response.json()) as TranscriptData;
      let id = 0;
      transcript.sections.map((s) =>
        s.sectionTranscripts.map((t) => {
          id += 1;
          return { ...t, id };
        })
      );
      setTranscriptData(transcript);
    }
  }, []);

  return {
    transcriptData,
    isLoading,
    error,
    file,
    setFile,
    handleDropSingleFile,
    setTranscriptData,
  };
}
