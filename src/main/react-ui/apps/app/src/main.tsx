import { useReferenceData } from 'hooks/reference-data.hook';
import { useGetCurrentUser } from 'hooks/user.hook';
import { Routing } from 'pages/routing';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'slices/store';

const Main = () => {
  const { loading: loadingUser, execute: getCurrentUser } = useGetCurrentUser();
  const { data: referenceData } = useReferenceData();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (referenceData && !loadingUser) {
    return <Routing />;
  }
  return null;
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
