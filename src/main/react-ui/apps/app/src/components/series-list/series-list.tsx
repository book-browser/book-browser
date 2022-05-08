import CardList from 'components/card-list/card-list';
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
    <CardList>
      {seriesList.map((series) => (
        <SeriesCard series={series} key={series.id} />
      ))}
    </CardList>
  );
};

export default SeriesList;