import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot
import GlobalStyle from './styles/globalstyle';
import Routes from './routes';


// Substitua ReactDOM.render por createRoot
createRoot(document.getElementById('root')).render(
  <>
    <Routes />
    <GlobalStyle />
  </>,
);





