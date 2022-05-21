import React from 'react';
import './card-list.scss';

export const CardList = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-list">{children}</div>;
};

export default CardList;
