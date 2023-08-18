import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  assistantPath,
  homePath,
} from '../common/paths';
import chatIcon from '../images/chat-icon.png';
import homeIcon from '../images/home-icon.svg';
import logo from '../images/logo.png';
import settingsIcon from '../images/settings-icon.png';
import PopupWindow from './PopupWindow';
import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen, setPageProps }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  const [homeActive, setHomeActive] = useState(false);
  const [assistantActive, setAssistantActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);

    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const path = window.location.pathname ?? '/';
    resetPageProps();
    resetActive();
    setFeatures(path);
  });

  const handleOnClick = (event, path) => {
    event.preventDefault();

    resetPageProps();
    resetActive();

    setFeatures(path);

    window.history.pushState({}, '', window.location.origin + path);
  };

  const resetPageProps = () => {
    setPageProps.setHomePage(false);
    setPageProps.setAssistantPage(false);
  };

  const resetActive = () => {
    setHomeActive(false);
    setAssistantActive(false);
  };

  const setFeatures = (path) => {
    if (path.includes('home') || path === '/') {
      setPageProps.setHomePage(true);
      setHomeActive(true);
    } else if (path.includes('assistant')) {
      setPageProps.setAssistantPage(true);
      setAssistantActive(true);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const onClickConnect = (e) => {
    e.preventDefault();
    openPopup();
  };

  const onClickGitHub = (e) => {
    e.preventDefault();
    const url = "https://github.com/phrazhola/YourChatGptReactApp";
    window.open(url, "_blank");
  }

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 sidebar-bg-color p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Logo */}
          <NavLink
            end
            to="/"
            className="block"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <img className="shrink-0 w-10" src={logo} alt="logo" />
          </NavLink>
          <span className="anim-text-flow website-title lg:hidden lg:sidebar-expanded:block 2xl:block">
            YourChatGPT
          </span>
        </div>
        {/* Close button */}
        <div className="flex justify-end">
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Home */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  homeActive && 'active-sidebar-bg-color'
                }`}
              >
                <NavLink
                  end
                  to={assistantPath}
                  className={`block text-slate-200 truncate transition duration-150 ${
                    assistantActive
                      ? 'hover:text-slate-200'
                      : 'hover:text-white'
                  }`}
                  onClick={(event) => {
                    handleOnClick(event, homePath);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <img
                        className="shrink-0 h-6 w-6"
                        src={homeIcon}
                        alt="homeIcon"
                      />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Overview
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Chatbot */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  assistantActive && 'active-sidebar-bg-color'
                }`}
              >
                <NavLink
                  end
                  to={assistantPath}
                  className={`block text-slate-200 truncate transition duration-150 ${
                    assistantActive
                      ? 'hover:text-slate-200'
                      : 'hover:text-white'
                  }`}
                  onClick={(event) => {
                    handleOnClick(event, assistantPath);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <img
                        className="shrink-0 h-6 w-6"
                        src={chatIcon}
                        alt="chatIcon"
                      />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Chatbot
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3">
              {/* Connect */}
              <SidebarLinkGroup activecondition={pathname.includes('connect')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('connect')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              className="shrink-0 h-6 w-6"
                              src={settingsIcon}
                              alt="settingsIcon"
                            />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Connect
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/contactus"
                              className={
                                'block transition duration-150 truncate text-slate-400 hover:text-slate-200'
                              }
                              onClick={onClickConnect}
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Contact Us
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={'block transition duration-150 truncate text-slate-400 hover:text-slate-200'
                              }
                              onClick={onClickGitHub}
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                GitHub
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current text-gray-400 sidebar-expanded:rotate-180"
              >
                <path d="M16.59 7.41L18 6 24 12 18 18 16.59 16.59 20.17 12z" />
                <path d="M6.59 7.41L8 6 14 12 8 18 6.59 16.59 10.17 12z" />
              </svg>
            </button>
          </div>
        </div>

        {showPopup && <PopupWindow onClose={closePopup} />}
      </div>
    </div>
  );
}

export default Sidebar;
