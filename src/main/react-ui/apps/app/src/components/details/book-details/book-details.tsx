import GenreBadge from 'components/genre-badge/genre-badge';
import React from 'react';
import { Book } from 'types/book';
import MDEditor from '@uiw/react-md-editor';
import './book-details.scss';
import { Link } from 'react-router-dom';
import Heading from 'components/navigation/heading/heading';
import ExternalLink from 'components/navigation/external-link/external-link';

export type BookDetailsProps = {
  book: Book;
};

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="book-details">
      <img className="book-details-thumbnail" alt="thumbnail" src={book.thumbnailUrl} />
      <div className="flex-grow-1">
        <Heading as="h1">{book.title}</Heading>
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
                  <ExternalLink href={link.url}>{link.description}</ExternalLink>
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
