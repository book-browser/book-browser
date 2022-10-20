import LinkIcon from '@mui/icons-material/Link';
import React, { AllHTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './heading.scss';

export type HeadingProps = AllHTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3' | 'h4';
  children: string;
};

export const Heading = ({ as: HeadingComponent, children, ...remainingProps }: HeadingProps) => {
  const location = useLocation();
  return (
    <HeadingComponent {...remainingProps}>
      <span>{children}</span>
      {HeadingComponent !== 'h1' && remainingProps.id && (
        <Link to={`${location.pathname}#${remainingProps.id}`} className="heading-link">
          <LinkIcon />
        </Link>
      )}
    </HeadingComponent>
  );
};

export default Heading;
