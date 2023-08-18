import React from 'react';

const SideBarOpener = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <div
      className="absolute left-2 z-10 md:inline-block"
      data-projection-id="34"
      style={{ opacity: 0.7 }}
    >
      <span className="" data-state="closed">
        <button
          aria-label="Show sidebar"
          onClick={() => setSideBarOpen(!sideBarOpen)}
          className="flex p-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border bg-gray-800 dark:bg-gray-800 border-black/10 dark:border-white/20 hover:bg-gray-500 dark:hover:bg-gray-700 h-11"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white dark:text-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
      </span>
    </div>
  );
};

export default SideBarOpener;
