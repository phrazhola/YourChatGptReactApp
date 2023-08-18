import React from 'react';

import DeleteButton from '../partials/DeleteButton';

const ChatHistory = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  disableButton,
  userId,
}) => {
  return (
    <div className="chat-history">
      {chats
        ?.sort((a, b) => new Date(b.update_time) - new Date(a.update_time))
        .map((chat, _) => (
          <div key={chat.chat_id} className="chat-button-wrapper">
            <button
              className={`chat ${
                selectedChatId === chat.chat_id ? 'selected' : ''
              }`}
              onClick={() => setSelectedChatId(chat.chat_id)}
              disabled={disableButton}
            >
              <div className="w-full">
                <div className="truncate">{chat.title}</div>
              </div>
              {selectedChatId === chat.chat_id && (
                <DeleteButton chatId={chat.chat_id} userId={userId} />
              )}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ChatHistory;
