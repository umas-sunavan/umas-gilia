'use client';

import { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { GridCellParams } from '@mui/x-data-grid';
import { Button, CardHeader, Typography, CardContent } from '@mui/material';

import { useCursorHook } from 'src/hooks/use-cursor-hook';
import { useVideoCaptions } from 'src/hooks/use-video-captions';
import { useGroupHighlight } from 'src/hooks/use-group-highlight';
import { useLoadTranscriptData } from 'src/hooks/use-load-transcript-data';

import { generateVTT } from 'src/utils/generate-vtt';

import { HEADER } from 'src/layouts/config-layout';

import Scrollbar from 'src/components/scrollbar';
import Column from 'src/components/acs-column/column';
import { useSettingsContext } from 'src/components/settings';
import UploadVideo from 'src/components/upload/upload-video';

import DataGridTranscript from 'src/sections/_examples/mui/data-grid-view/data-grid-transcript';

import { Transcript } from 'src/types/transcript';

export default function OverviewAppView() {
  const settings = useSettingsContext();

  const { transcriptData, file, setFile, handleDropSingleFile, setTranscriptData } =
    useLoadTranscriptData();
  const { highlightGroups } = useGroupHighlight({ transcriptData, groupBySecondThreshold: 3 });

  const timeline = useRef<HTMLDivElement>(null);

  const [timelineWidth, setTimelineWidth] = useState(0);

  const GROUP_BY_SECOND_THRESHOLD = 3;
  const PX_PER_SECOND = (transcriptData?.length || 0) / timelineWidth;
  const MIN_HIGHLIGHT_WIDTH = GROUP_BY_SECOND_THRESHOLD * PX_PER_SECOND;

  const videoRef = useRef<HTMLVideoElement>(null);
  const { setTimeCursor, cursorOnTranscript, handleRowSelectionModelChange } = useCursorHook({
    videoRef,
    transcriptData,
  });

  // Calculate timeline width
  useEffect(() => {
    if (timeline.current?.clientWidth) {
      setTimelineWidth(timeline.current?.clientWidth);
    }
  }, [timeline.current?.clientWidth]);

  // Use the captions hook
  useVideoCaptions(videoRef, transcriptData);

  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file && file instanceof Blob) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
    }
  }, [file]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = objectUrl || '/assets/video/SampleVideo.mp4';
    }
  }, [objectUrl]);

  const handleCellChange = (params: GridCellParams) => {
    if (!transcriptData) return;
    const newTranscriptData = JSON.parse(JSON.stringify(transcriptData));
    setTranscriptData(newTranscriptData);
    if (params.field === 'text') {
      console.log('Text cell value:', params.value);
    }
  };

  const handleTranscriptUpdate = (updatedTranscript: Transcript) => {
    if (transcriptData) {
      const newTranscriptData = {
        ...transcriptData,
        sections: transcriptData.sections.map((section) => ({
          ...section,
          sectionTranscripts: section.sectionTranscripts.map((transcript) =>
            transcript.id === updatedTranscript.id ? updatedTranscript : transcript
          ),
        })),
      };

      // Update your state or call your update API here
      console.log('Updated transcript:', updatedTranscript);
      console.log('New transcript data:', newTranscriptData);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Column gap={3}>
        {!transcriptData && (
          <Grid xs={12} md={12}>
            <Card>
              <CardHeader title="Upload Single File" />
              <CardContent>
                <UploadVideo
                  file={file}
                  onDrop={handleDropSingleFile}
                  onDelete={() => setFile(null)}
                  onUpload={() => console.log('onUpload')}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
        {!!transcriptData && (
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card>
                <Scrollbar sx={{ height: `calc(90vh - ${HEADER.H_DESKTOP}px)` }}>
                  <CardHeader title="Transcript" sx={{ mb: 2 }} />
                  <Column p={2} gap={2}>
                    {transcriptData.sections.map((section, index) => (
                      <Box key={index}>
                        <Typography variant="h6">{section.sectionTitle}</Typography>
                        <DataGridTranscript
                          data={section.sectionTranscripts}
                          cursorOnTranscript={cursorOnTranscript}
                          onCellChange={handleCellChange}
                          handleRowSelectionModelChange={handleRowSelectionModelChange}
                        />
                      </Box>
                    ))}
                  </Column>
                </Scrollbar>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <video width="100%" controls ref={videoRef}>
                <source src={objectUrl || '/assets/video/SampleVideo.mp4'} type="video/mp4" />
                <track
                  kind="captions"
                  src={generateVTT(transcriptData.sections.flatMap((s) => s.sectionTranscripts))}
                  label="English"
                  srcLang="en"
                  default
                />
              </video>
              <Grid
                ref={timeline}
                xs={12}
                md={12}
                bgcolor="#212B36"
                sx={{
                  borderRadius: 1,
                }}
                width="100%"
                display="grid"
                gridTemplateColumns={`repeat(${Math.floor(transcriptData.length)}, 1fr)`}
              >
                {highlightGroups.map((group, index) => (
                  <Grid
                    key={index}
                    gridColumn={`${group.start + 1} / ${group.end + 1}`}
                    gridRow="1/2"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setTimeCursor(group.start)}
                      sx={{
                        width: '100%',
                        minWidth: `${MIN_HIGHLIGHT_WIDTH}px`,
                        padding: 0,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Column>
    </Container>
  );
}
