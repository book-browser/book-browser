import SeriesCard from 'components/series-card/series-card';
import React from 'react';
import { Series } from 'types/series';
import './series-list.scss';

export interface SeriesListProps {
  seriesList: Series[]
}

const SeriesList = ({
  seriesList
}: SeriesListProps) => {
  return (
    <div className="series-list">
      {seriesList.map((series) => (
        <SeriesCard series={series} key={series.id} />
      ))}
    </div>
  );
};

export default SeriesList;