import React from 'react';
import Routes from './Route/Routes';
import { BrowserRouter } from 'react-router-dom';
import Error from './Component/Error';

function App() {
  return (
    <BrowserRouter>
      <Error>
        <Routes />
      </Error>
    </BrowserRouter>
  );
}

export default App;
