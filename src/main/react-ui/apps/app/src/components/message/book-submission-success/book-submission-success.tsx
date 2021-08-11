import React from 'react';
import { Nav } from 'react-bootstrap';
import { Book } from 'types/book';
import Message from '../message';
import { Link } from 'react-router-dom';


export interface BookSubmissionSuccessProps {
  book: Book
}

const BookSubmissionSuccess = ({ book }: BookSubmissionSuccessProps) => {
  return (
    <Message
      variant="success"
      title="Success"
      lead="Your submission has been successful!"
    >
      <Nav className="justify-content-between">
        <Nav.Item>
          <Nav.Link as={Link} to="/home">Return Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/book/${book.id}`}>View Submission</Nav.Link>
        </Nav.Item>
      </Nav>
    </Message>
  )
}

export default BookSubmissionSuccess;