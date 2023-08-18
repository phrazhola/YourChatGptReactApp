import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import {
  assistantPath,
  homePath,
  loginPath,
  mainPath,
} from './common/paths';
import './css/style.scss';
import LoginPage from './partials/login/LoginPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path={mainPath} element={<Home />} />
        <Route exact path={homePath} element={<Home />} />
        <Route exact path={assistantPath} element={<Home />} />
        <Route exact path={loginPath} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
