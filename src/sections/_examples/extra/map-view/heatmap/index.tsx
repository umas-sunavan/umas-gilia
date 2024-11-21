import Map, { Layer, Source } from 'react-map-gl';
import { memo, useMemo, useState, useEffect } from 'react';

import { MapBoxProps } from 'src/components/map';

import ControlPanel from './control-panel';
import { heatmapLayer } from './map-style';

// ----------------------------------------------------------------------

function MapHeatmap({ ...other }: MapBoxProps) {
  const [allDays, useAllDays] = useState(true);

  const [timeRange, setTimeRange] = useState([0, 0]);

  const [selectedTime, selectTime] = useState(0);

  const [earthquakes, setEarthQuakes] = useState();

  useEffect(() => {
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
      .then((resp) => resp.json())
      .then((json) => {
        const { features } = json;

        const endTime = features[0].properties.time;

        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);

        setEarthQuakes(json);

        selectTime(endTime);
      })
      .catch((error) => console.error('Could not load data', error));
  }, []);

  type EarthquakeFeature = {
    type: string;
    properties: {
      time: number;
    };
  };

  type EarthquakeData = {
    type: string;
    features: EarthquakeFeature[];
  };

  const data: EarthquakeData | undefined = useMemo(
    () => earthquakes,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [earthquakes, allDays, selectedTime]
  );

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3,
        }}
        {...other}
        projection={undefined}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </Map>

      <ControlPanel
        startTime={timeRange[0]}
        endTime={timeRange[1]}
        selectedTime={selectedTime}
        allDays={allDays}
        onChangeTime={selectTime}
        onChangeAllDays={useAllDays}
      />
    </>
  );
}

export default memo(MapHeatmap);

// ----------------------------------------------------------------------
