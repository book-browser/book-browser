import { useReferenceData } from 'hooks/reference-data.hook';
import { useGetCurrentUser } from 'hooks/user.hook';
import { Routing } from 'pages/routing';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'slices/store';

const Main = () => {
  const { execute: getCurrentUser } = useGetCurrentUser();
  const { data: referenceData } = useReferenceData();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

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
