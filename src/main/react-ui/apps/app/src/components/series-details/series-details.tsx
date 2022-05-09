import BookList from 'components/book-list/book-list';
import React from 'react';
import { Series } from 'types/series';
import MDEditor from "@uiw/react-md-editor";
import './series-details.scss';
import GenreBadge from 'components/genre-badge/genre-badge';
import { Genre } from 'types/genre';
import { Link } from 'react-router-dom';

interface SeriesDetailsProps {
  series: Series
}

const SeriesDetails = ({
  series
}: SeriesDetailsProps) => {
  return (
    <div className="series-details">
      {series.hasBanner && <img className="details-banner" alt="banner" src={`/api/series/${series.id}/banner`} />}
      {!series.hasBanner && series.hasThumbnail && <div className="d-flex"><img className="details-thumbnail m-auto" alt="banner" src={`/api/series/${series.id}/thumbnail`} /></div>}
      <h1 className="heading-main">{series.title}</h1>
      <p>
        {series.creators.map((creator, index) => (
          <span key={creator.id}>
            <Link to={`/creator/${creator.id}`}>{creator.fullName}</Link>
            {index !== series.creators.length - 1 && ', '}
          </span>
        ))}
      </p>
      <MDEditor.Markdown source={series.description} />
      <div className="side mt-3">
        <span><strong>Details</strong></span>
        <div className="mb-4">
          <hr />
          <div className="mb-2">
            Genres: 
            {series.genres.length === 0 && ' N/A'}
            {series.genres.map((genre) => <GenreBadge key={genre} genre={{ name: genre } as Genre} variant="series" />)}
          </div>
          {series.links.length > 0 && (
          <>
            <span><strong>Relevant Links</strong></span>
            <div className="mb-4">
              {series.links.map((link) => (
                <div key={link.url}>
                  <Link to={{ pathname: link.url }} target="_blank">{link.description}</Link>
                </div>
              ))}
            </div>
          </>
        )}
        </div>       
      </div>

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