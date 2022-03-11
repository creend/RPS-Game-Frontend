import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import Header from '../components/Header/Header';

const GamePage = React.lazy(() => import('./GamePage'));
const Home = React.lazy(() => import('./Home'));

const Root = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<CustomLoader fallbackLoader />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game/:id" element={<GamePage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Root;
