// App.js
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/index';
import { useIsAuthenticated } from './Utils/Auth';

function App() {
  useIsAuthenticated();
  
    

  return <RouterProvider router={router} />;
  
}

export default App;