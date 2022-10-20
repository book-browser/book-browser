import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React from 'react';

export type ExternalLinkProps = React.AllHTMLAttributes<HTMLAnchorElement> & {
  children: string;
};

export const ExternalLink = ({ children, ...remainingProps }: ExternalLinkProps) => {
  return (
    <a {...remainingProps} rel="noreferrer" target="_blank">
      <span className="me-1">{children}</span>
      <OpenInNewIcon />
    </a>
  );
};

export default ExternalLink;
