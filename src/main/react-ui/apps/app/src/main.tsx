import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { Routing } from 'pages/routing';
import { store } from 'slices/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
