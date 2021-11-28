import BookList from 'components/book-list/book-list';
import React from 'react';
import { Series } from 'types/series';
import './series-details.scss';

interface SeriesDetailsProps {
  series: Series
}

const SeriesDetails = ({
  series
}: SeriesDetailsProps) => {
  return (
    <div className="series-details">
      <img className="series-details-banner" src={`/api/series/${series.id}/banner`} />
      <h1 className="heading-main">{series.title}</h1>
      <p>{series.description}</p>
      {series.books.length > 0 && (
        <>
          <h2 className="heading-section">Books</h2>
          <BookList books={series.books} />
        </>
      )}
      
    </div>
  );
}

export default SeriesDetails;