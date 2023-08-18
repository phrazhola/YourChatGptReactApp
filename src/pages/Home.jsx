import { googleLogout } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';

import { PROFILE_COOKIE_NAME, TOKEN_COOKIE_NAME } from '../common/constants';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import Assistant from './Assistant';
import Introduction from './Introduction';
import githubIcon from '../images/github-mark-white.svg';

import Cookies from 'js-cookie';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [homePage, setHomePage] = useState(false);
  const [assistantPage, setAssistantPage] = useState(false);
  const [profile, setProfile] = useState(null);

  const setPageProps = {
    setHomePage: setHomePage,
    setAssistantPage: setAssistantPage,
  };

  const setFeatures = (path) => {
    if (path.includes('home') || path === '/') {
      setHomePage(true);
    } else if (path.includes('assistant')) {
      setAssistantPage(true);
    }
  };

  const resetFestures = () => {
    setHomePage(false);
    setAssistantPage(false);
  };

  const logout = () => {
    setProfile(null);
    removeTokenCookie();
    googleLogout();
  };

  // Get the profile from the cookie
  const getProfileFromCookie = () => {
    const serializedProfile = Cookies.get(PROFILE_COOKIE_NAME);
    const profile = serializedProfile ? JSON.parse(serializedProfile) : null;
    return profile;
  };

  // Remove the token cookie
  const removeTokenCookie = () => {
    console.log('remove cookie');
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove(PROFILE_COOKIE_NAME);
  };

  useEffect(() => {
    const pathname = window.location.pathname ?? '/';
    setFeatures(pathname);
  });

  useEffect(() => {
    setProfile(getProfileFromCookie());
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setPageProps={setPageProps}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          profile={profile}
          logout={logout}
        />

        <main>
          <div
            className={
              assistantPage
                ? 'h-full w-full max-w-full mx-auto'
                : 'px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'
            }
          >
            {homePage && <Introduction />}
            {assistantPage && <Assistant profile={profile} />}
          </div>
          
          {homePage &&
            <footer className="bg-cyan-700 text-white py-4 text-center mt-10 opacity-90">
              <div className="flex justify-center items-center">
                <a href="https://github.com/phrazhola/YourChatGptReactApp" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub Icon" className="w-6 h-6" />
                </a>
              </div>
            </footer>
          }
        </main>
      </div>
    </div>
  );
}

export default Home;
