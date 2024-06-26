import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from "react-ga4";
import { AppMain } from './AppMain';
import { store } from './store';


ReactGA.initialize("G-GQHETJGSYQ");

ReactGA.send({ hitType: "pageview", page: window.location.pathname});



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
        <AppMain />
      </BrowserRouter>
  </Provider>
)
