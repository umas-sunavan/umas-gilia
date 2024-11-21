export type TranscriptData = {
  length: number;
  sections: TranscriptSection[];
};
export type TranscriptSection = {
  sectionTitle: string;
  sectionTranscripts: Transcript[];
};
export type Transcript = {
  id: number;
  time: string;
  timeInSeconds: number;
  text: string;
};
