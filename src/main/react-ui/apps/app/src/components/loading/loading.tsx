import React, { useEffect, useState } from 'react';
import './loading.scss';

const Loading = () => {
  const [start] = useState(Date.now());
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setTimeout(() => {
      setTime(Date.now());
    }, 2000);
  }, []);

  if (time - start > 2000) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-indicator" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return <div />;
};

export default Loading;
