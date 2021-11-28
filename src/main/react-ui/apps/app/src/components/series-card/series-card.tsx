import React from 'react';
import { Series } from 'types/series';
import './series-card.scss';
import { Link } from 'react-router-dom';

export interface SeriesCardProps {
  series: Series
}

const SeriesCard = ({
  series
}: SeriesCardProps) => {
  return (
    <div className="series-card">
      <Link to={`/series/${series.id}`}>
          <img className="series-card-img" src={`/api/series/${series.id}/banner`} />
      </Link>

      <div className="book-card-title">
        <Link to={`/series/${series.id}`}>{series.title}</Link>
      </div>
    </div>
  );
}

export default SeriesCard;