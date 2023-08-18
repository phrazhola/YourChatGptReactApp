import React, { useState } from 'react';

import { BACKEND_ENDPOINT } from '../../../../common/constants';

import axios from 'axios';

const DeleteButton = ({ chatId, userId }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_ENDPOINT}/${chatId}?user_id=${userId}`);

      window.location.reload();
    } catch (err) {
      throw Error(err);
    }
  };

  return (
    <>
      {showConfirm ? (
        <div className="flex z-10 text-gray-300">
          <div className="mt-auto mr-2">Delete</div>
          <div className="p-1 hover:text-white" onClick={handleDelete}>
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div
            className="p-1 hover:text-white"
            onClick={() => setShowConfirm(false)}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      ) : (
        <div
          className="p-1 text-gray-300 hover:text-white"
          onClick={() => setShowConfirm(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
