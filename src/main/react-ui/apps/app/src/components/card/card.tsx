import React, { ComponentProps, ReactNode } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import classnames from 'classnames';
import './card.scss';

export declare type CardProps = ComponentProps<typeof BootstrapCard> & {
  orientation?: 'vertical' | 'horizontal';
};

export const Card = ({ orientation = 'vertical', ...cardProps }: CardProps) => {
  const className = classnames(cardProps.className, { 'card-horizontal': orientation === 'horizontal' });
  return <BootstrapCard {...cardProps} className={className} />;
};

const CardThumbnail = ({ children }: { children: ReactNode }) => {
  return <div className="card-thumbnail">{children}</div>;
};

Card.Img = BootstrapCard.Img;
Card.Thumbnail = CardThumbnail;
Card.Title = BootstrapCard.Title;
Card.Subtitle = BootstrapCard.Subtitle;
Card.Body = BootstrapCard.Body;
Card.Link = BootstrapCard.Link;
Card.Text = BootstrapCard.Text;
Card.Header = BootstrapCard.Header;
Card.Footer = BootstrapCard.Footer;
