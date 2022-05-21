import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { Routing } from 'pages/routing';
import { store } from 'slices/store';
import { useGetCurrentUser } from 'hooks/user.hook';
import { useEffect } from 'react';
import { useReferenceData } from 'hooks/reference-data.hook';

// import { visit } from 'unist-util-visit';

const Main = () => {
  const { execute: getCurrentUser } = useGetCurrentUser();
  const { data: referenceData } = useReferenceData();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (referenceData) {
    return <Routing />;
  }
  return null;
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
);
