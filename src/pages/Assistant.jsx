import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatGPTEmbed from '../partials/assistant/ChatGPTEmbed';

const Assistant = ({ profile }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <ChatGPTEmbed />
    </>
  );
};

export default Assistant;
