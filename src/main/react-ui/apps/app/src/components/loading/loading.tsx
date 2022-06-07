import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="spinner-border loading-indicator" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
