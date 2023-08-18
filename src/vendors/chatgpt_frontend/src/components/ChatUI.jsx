import React from 'react';

import ChatInput from './ChatInput';
import Message from './Message';

const ChatUI = ({
  sideBarOpen,
  messages,
  inputMessage,
  completionMessage,
  disableButton,
  setInputMessage,
  sendMessage,
  isAssistantTyping,
  messagesEndRef,
  showRegenerateButton,
  chats,
}) => {
  const handleRetry = () => {
    const lastSentMsg = localStorage.getItem('lastSentMsg');
    sendMessage(lastSentMsg);
  };

  return (
    <div className={sideBarOpen ? 'chat-ui' : 'chat-ui-w-full'}>
      <div
        className={
          messages.length == 0
            ? 'flex items-center justify-center h-screen'
            : 'chat-messages'
        }
      >
        <div className="flex flex-col items-center justify-center text-white">
          {messages.length === 0 && (
            <div className="text-4xl p-10">
              Your AI Assistant powered by OpenAI
            </div>
          )}
          {chats.length === 0 && (
            <div className="text-2xl mt-4 text-gray-200">
              Start with creating a new chat
            </div>
          )}
        </div>

        {/* messages */}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* typing animation */}
        {isAssistantTyping && completionMessage == '' && (
          <div className="message assistant">
            <div className="typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        {/* completion message stream */}
        {completionMessage != '' && (
          <div className="message assistant">
            <Message
              message={{
                message_id: '',
                role: 'assistant',
                create_time: new Date(),
                content: completionMessage,
                finish_reason: '',
                parent_id: '',
                children: [],
              }}
            />
          </div>
        )}

        {/* regenerate button */}
        {showRegenerateButton && (
          <div className="flex items-center justify-center h-full">
            <button
              className="px-4 py-2 bg-teal-900 text-white rounded-lg hover:bg-teal-800"
              onClick={handleRetry}
            >
              Regenerate response
            </button>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {chats.length > 0 && (
        <div className="chat-input-container">
          <ChatInput
            inputMessage={inputMessage}
            disableButton={disableButton}
            setInputMessage={setInputMessage}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default ChatUI;
