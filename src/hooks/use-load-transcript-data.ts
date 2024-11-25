import { useState, useCallback } from 'react';

import { TranscriptData } from 'src/types/transcript';

export function useLoadTranscriptData() {
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [file, setFile] = useState<File | string | null>(null);

  const handleDropSingleFile = useCallback((_acceptedFiles: File[]) => {
    const newFile = _acceptedFiles[0];
    const formData = new FormData();
    formData.append('video_file', newFile);
    if (newFile) {
      setFile(newFile);
      const name = newFile.name.replace(/\.[^.]+$/, '');
      console.log(name);
      fetch(`/api/getTranscript`, {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(590000),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(setTranscriptData);
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
