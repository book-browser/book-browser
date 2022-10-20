import GenreBadge from 'components/genre-badge/genre-badge';
import React from 'react';
import { Book } from 'types/book';
import MDEditor from '@uiw/react-md-editor';
import './book-details.scss';
import { Link } from 'react-router-dom';

export declare type BookDetailsProps = {
  book: Book;
};

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details">
      <img className="book-details-thumbnail" alt="thumbnail" src={`/api/book/${book.id}/thumbnail`} />
      <div className="flex-grow-1">
        <h1 className="heading-main">{book.title}</h1>
        {book.seriesId && (
          <p>
            <strong>Series: </strong> <Link to={`/series/${book.seriesId}`}>{book.seriesTitle}</Link>
          </p>
        )}
        <p>
          {book.creators.map((creator, index) => (
            <span key={creator.partyId}>
              <Link to={`/parties/${creator.partyId}`}>{creator.fullName}</Link>
              {index !== book.creators.length - 1 && ', '}
            </span>
          ))}
        </p>
        <MDEditor.Markdown source={book.description} />
      </div>
      <div className="side">
        <div className="mb-3">
          <div className="mb-2">
            <strong>Details</strong>
          </div>
          <div className="mb-2">
            <div>{`Release Date: ${book.releaseDate?.toLocaleDateString() || 'N/A'}`}</div>
          </div>
          <hr />
          <div className="mb-2">
            Genres:
            {book.genres.length === 0 && ' N/A'}
            {book.genres.map((genre) => (
              <GenreBadge key={genre.id} genre={genre} />
            ))}
          </div>
        </div>

        {book.links.length > 0 && (
          <>
            <span>
              <strong>Relevant Links</strong>
            </span>
            <div className="mb-4">
              {book.links.map((link) => (
                <div key={link.url}>
                  <a href={link.url} rel="noreferrer" target="_blank">
                    {link.description}
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
