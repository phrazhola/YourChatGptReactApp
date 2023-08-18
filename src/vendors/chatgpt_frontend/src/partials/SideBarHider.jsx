import React from 'react';

const SideBarHider = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <div className="pt-3 lg:inline-flex justify-end mt-auto">
      <div className="px-3 py-2">
        <button onClick={() => setSideBarOpen(!sideBarOpen)}>
          <span className="" data-state="closed">
            <a className="flex p-3 gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 h-11 w-11 flex-shrink-0 items-center justify-center">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              <span
                style={{
                  position: 'absolute',
                  border: '0px',
                  width: '1px',
                  height: '1px',
                  padding: '0px',
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0px, 0px, 0px, 0px)',
                  whiteSpace: 'nowrap',
                  overflowWrap: 'normal',
                }}
              >
                Hide sidebar
              </span>
            </a>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideBarHider;
