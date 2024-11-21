import { Transcript } from 'src/types/transcript';

export function generateVTT(transcripts: Transcript[]): string {
  const vttContent = ['WEBVTT', '', '']; // Add extra newline after header

  transcripts.forEach((transcript, index) => {
    const nextTranscript = transcripts[index + 1];
    const startTime = formatVTTTime(transcript.time);
    const endTime = nextTranscript
      ? formatVTTTime(nextTranscript.time)
      : formatVTTTime(addSeconds(transcript.time, 2));

    vttContent.push(
      `${startTime} --> ${endTime}`,
      `${transcript.text}`,
      '' // Empty line between entries
    );
  });

  return vttContent.join('\n');
}

function formatVTTTime(timeString: string): string {
  // Convert HH:MM:SS to HH:MM:SS.000
  return `${timeString}.000`;
}

function addSeconds(timeString: string, seconds: number): string {
  const [hours, minutes, secs] = timeString.split(':').map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + secs + seconds;

  const newHours = Math.floor(totalSeconds / 3600);
  const newMinutes = Math.floor((totalSeconds % 3600) / 60);
  const newSeconds = totalSeconds % 60;

  return [
    newHours.toString().padStart(2, '0'),
    newMinutes.toString().padStart(2, '0'),
    newSeconds.toString().padStart(2, '0'),
  ].join(':');
}
