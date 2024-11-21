import { useState, useCallback } from 'react';

import { TranscriptData } from 'src/types/transcript';

export function useLoadTranscriptData() {
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [file, setFile] = useState<File | string | null>(null);

  const MOCK_DELAY = 5000;

  const handleDropSingleFile = useCallback((_acceptedFiles: File[]) => {
    const newFile = _acceptedFiles[0];
    if (newFile) {
      setFile(newFile);
      const name = newFile.name.replace(/\.[^.]+$/, '');
      console.log(name);
      setTimeout(() => {
        fetch(`/api/getTranscript`)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            return res;
          })
          .then(setTranscriptData);
      }, MOCK_DELAY);
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
