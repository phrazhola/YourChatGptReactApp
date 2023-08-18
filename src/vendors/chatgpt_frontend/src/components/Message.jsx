import React from 'react';

import { formatMessageContent } from '../utils/formatMessage';

const Message = ({ message }) => {
  return (
    <div
      className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
      dangerouslySetInnerHTML={{
        __html: formatMessageContent(message.content),
      }}
    />
  );
};

export default Message;
