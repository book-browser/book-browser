import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { Routing } from 'pages/routing';
import { store } from 'slices/store';
import { useGetCurrentUser, } from 'hooks/user.hook';
import { useEffect } from 'react';
import { useReferenceData } from 'hooks/reference-data.hook';

const Main = () => {
  const { execute: getCurrentUser } = useGetCurrentUser();
  const { data: referenceData } = useReferenceData();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (referenceData) {
    return (
      <Routing />
    );
  }
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

