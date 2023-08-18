import React from 'react';

import SideBarHider from '../partials/SideBarHider';
import SideBarOpener from '../partials/SideBarOpener';
import ChatHistory from './ChatHistory';

const ChatHistoryBar = ({
  sideBarOpen,
  setSideBarOpen,
  createNewChat,
  setSelectedChatId,
  selectedChatId,
  chats,
  disableButton,
  userId,
}) => {
  return sideBarOpen ? (
    <div className="chat-history-container">
      <button
        className="new-chat-button hover:bg-neutral-800"
        onClick={createNewChat}
        disabled={disableButton}
      >
        + New Chat
      </button>
      <ChatHistory
        chats={chats}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        disableButton={disableButton}
        userId={userId}
      />
      <SideBarHider sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
    </div>
  ) : (
    <SideBarOpener sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
  );
};

export default ChatHistoryBar;
