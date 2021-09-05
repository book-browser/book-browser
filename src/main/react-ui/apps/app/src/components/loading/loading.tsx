import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="spinner-border loading-indicator" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loading;