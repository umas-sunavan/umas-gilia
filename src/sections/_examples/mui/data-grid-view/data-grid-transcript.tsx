import { useState, useEffect, useCallback } from 'react';

import { Theme, SxProps } from '@mui/system';
import {
  DataGrid,
  GridColDef,
  GridCellModes,
  useGridApiRef,
  GridCellParams,
  GridCellModesModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';

import { Transcript } from 'src/types/transcript';

type Props = {
  data: Transcript[];
  cursorOnTranscript: Transcript | null;
  handleRowSelectionModelChange: (newSelection: GridRowSelectionModel) => void;
  onCellChange: (params: GridCellParams) => void;
};

const DATAGRID_STYLES: SxProps<Theme> = {
  '.MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within': {
    outlineColor: 'none',
    borderColor: 'primary.main',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderOffset: '-2px',
    borderRadius: '8px',
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-row.Mui-selected [data-field="text"]': {
    outlineColor: 'primary.main',
    borderColor: 'primary.main',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderOffset: '-2px',
    borderRadius: '8px',
  },
};

export default function DataGridTranscript({
  data,
  cursorOnTranscript,
  handleRowSelectionModelChange,
  onCellChange,
}: Props) {
  const apiRef = useGridApiRef();
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

  const handleCellClick = useCallback(
    (params: GridCellParams) => {
      if (params.isEditable) {
        setCellModesModel((prevModel) => ({
          // Revert the mode of the other cells from other rows
          ...Object.keys(prevModel).reduce(
            (acc, id) => ({
              ...acc,
              [id]: Object.keys(prevModel[id]).reduce(
                (acc2, field) => ({
                  ...acc2,
                  [field]: { mode: GridCellModes.View },
                }),
                {}
              ),
            }),
            {}
          ),
          [params.id]: {
            // Revert the mode of other cells in the same row
            ...Object.keys(prevModel[params.id] || {}).reduce(
              (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
              {}
            ),
            [params.field]: { mode: GridCellModes.Edit },
          },
        }));
      }
      if (onCellChange) {
        onCellChange(params);
      }
    },
    [onCellChange]
  );

  const handleCellModesModelChange = useCallback((newModel: GridCellModesModel) => {
    setCellModesModel(newModel);
  }, []);

  const columns: GridColDef[] = [
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'text', headerName: 'Text', flex: 1, editable: true },
  ];

  useEffect(() => {
    if (cursorOnTranscript && apiRef.current) {
      apiRef.current.setRowSelectionModel([cursorOnTranscript.id]);
    }
  }, [apiRef, cursorOnTranscript, data]);

  return (
    <DataGrid
      cellModesModel={cellModesModel}
      onCellModesModelChange={handleCellModesModelChange}
      onCellClick={handleCellClick}
      onRowSelectionModelChange={handleRowSelectionModelChange}
      apiRef={apiRef}
      editMode="cell"
      rows={data}
      columns={columns}
      hideFooter
      hideFooterPagination
      columnHeaderHeight={0}
      sx={DATAGRID_STYLES}
    />
  );
}
