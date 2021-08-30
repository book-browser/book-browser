import React from 'react';
import { Book } from 'types/book';
import { Link } from 'react-router-dom';
import './book-details.scss';
import { Breadcrumb, Button } from 'react-bootstrap';
import GenreBadge from 'components/genre-badge/genre-badge';
import EditIcon from '@material-ui/icons/Edit';

interface BookProps {
  book: Book
}

export const BookDetails = ({
  book
}: BookProps) => {
  return (
    <div>
      <div className="book-details-header">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{book.title}</Breadcrumb.Item>
      </Breadcrumb>
      
        <Button as={Link} to={`/book/${book.id}/edit`} className="ml-auto" variant="primary"><EditIcon /> Edit</Button>
      </div>
      <div className="book-details-body">
        <img className="book-details-thumbnail" src={`/api/book/${book.id}/thumbnail`} />
        <div className="flex-grow-1">
          <h2>{book.title}</h2>
          <p>
            {book.creators.map((creator, index) => (
              <span key={creator.id}>
                <Link to={`/creator/${creator.id}`}>{creator.fullName}</Link>
                {index !== book.creators.length - 1 && ', '}
              </span>
            ))}
          </p>
          
          {book.description.split('\n').map((part, index) => <p key={index}>{part}</p>)}
        </div>
        <div className="side">
          <span><strong>Details</strong></span>
          <div className="mb-4">
            <div className="mb-2">
              Genres: 
              {book.genres.map((genre) => <GenreBadge key={genre.id} genre={genre} />)}
            </div>
          </div>

          <span><strong>Relevant Links</strong></span>
          <div className="mb-4">
            {book.links.map((link) => (
              <div key={link.id}>
                <Link to={{ pathname: link.url }} target="_blank">{link.description}</Link>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}