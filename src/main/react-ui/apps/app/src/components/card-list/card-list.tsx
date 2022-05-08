import React from 'react';
import './card-list.scss';

export const CardList: React.FC = ({ children }) => {
  return (
    <div className="card-list">{children}</div>
  );
};

export default CardList;