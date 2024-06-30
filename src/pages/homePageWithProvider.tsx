import React from 'react';
import Home from './home';
import { UpdateProvider } from '../context/updateContext'; 

const HomePageWithProvider: React.FC = () => {
  return (
    <UpdateProvider>
      <Home />
    </UpdateProvider>
  );
};

export default HomePageWithProvider;
