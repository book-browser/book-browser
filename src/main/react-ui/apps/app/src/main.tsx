import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { Routing } from 'pages/routing';
import { store } from 'slices/store';
import { useGetCurrentUser, } from 'hooks/user.hook';
import { useEffect } from 'react';

const Main = () => {
  const { execute: getCurrentUser } = useGetCurrentUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Routing />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

