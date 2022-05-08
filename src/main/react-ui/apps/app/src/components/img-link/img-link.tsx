import React from 'react';
import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './img-link.scss';

export declare type ImgLinkProps = ComponentProps<Link> & {
  imgProps: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
};

export const ImgLink = ({ imgProps, ...linkProps }: ImgLinkProps) => {
  const className = classnames(linkProps.className, 'img-link'); 
  return (
    <Link {...linkProps} className={className}>
      <img {...imgProps} />
    </Link>
  )
}