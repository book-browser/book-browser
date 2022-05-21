import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { findAll, getById } from "services/series.service";
import { Series } from "types/series";

export declare type SeriesControlProps = {
  name?: string;
  value?: number;
  isInvalid?: boolean;
  onChange?: (name: string, seriesId: number) => void;
  onBlur?: (name: string) => void;
};

declare type SeriesOption = {
  value: number,
  label: string,
  series: Series
}

const mapSeriesToSeriesOption = (series: Series) => ({
  value: series.id,
  label: series.title,
  series
} as SeriesOption);

export const SeriesControl = ({
  name,
  value,
  isInvalid,
  onChange,
  onBlur
}: SeriesControlProps) => {
  const [currentValue, setCurrentValue] = useState<SeriesOption>();

  const loadOptions = async (query: string) => {
    const seriesList = await findAll({ query });
    return seriesList.items.map(mapSeriesToSeriesOption);
  }

  useEffect(() => {
    const fetchData = async () => {
      setCurrentValue(mapSeriesToSeriesOption(await getById(value)));
    }
    if (value !== currentValue?.value) {
      fetchData();
    }
  }, [value]);

  return (
    <AsyncSelect
      value={currentValue}
      // defaultValue={}
      name={name}
      cacheOptions
      loadOptions={loadOptions}
      onChange={(data: SeriesOption) => {
        setCurrentValue(data);
        onChange(name, data.value);
      }}
      onBlur={() => onBlur(name)}
      styles={{
        control: styles => ({
          ...styles,
          borderColor: isInvalid ? '#dc3545' : styles.borderColor,
          '&:hover': {
            borderColor: isInvalid ? '#dc3545': styles['&:hover'].borderColor,
          }
        })
      }}
    
    />
  );
}

export default SeriesControl;