import { useEffect } from 'react';

import { generateVTT } from 'src/utils/generate-vtt';

import { TranscriptData } from 'src/types/transcript';

export function useVideoCaptions(
  videoRef: React.RefObject<HTMLVideoElement>,
  transcriptData: TranscriptData | null
) {
  useEffect(() => {
    if (transcriptData && videoRef.current) {
      const vttContent = generateVTT(transcriptData.sections.flatMap((s) => s.sectionTranscripts));

      // Create blob URL with proper MIME type
      const blob = new Blob([vttContent], { type: 'text/vtt' });
      const vttUrl = URL.createObjectURL(blob);

      // Find or create track element
      let track = videoRef.current.querySelector('track');
      if (!track) {
        track = document.createElement('track');
        track.kind = 'captions';
        track.label = 'English';
        track.srclang = 'en'; // Fixed property name
        track.default = true;
        videoRef.current.appendChild(track);
      }

      // Update track source
      track.src = vttUrl;

      // Cleanup
      return () => {
        URL.revokeObjectURL(vttUrl);
      };
    }
    return undefined;
  }, [transcriptData, videoRef]);
}
