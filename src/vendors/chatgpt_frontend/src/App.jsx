import React, { useEffect, useRef, useState } from 'react';

import ChatHistoryBar from './components/ChatHistoryBar';
import ChatUI from './components/ChatUI';

import {
  BACKEND_ENDPOINT,
  PROFILE_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
} from '../../../common/constants';
import './App.css';
import SetChatTitlePopup from './partials/SetChatTitlePopup';

import axios from 'axios';
import Cookies from 'js-cookie';
import { getEeid } from './utils/getEeid';

const baseURL = BACKEND_ENDPOINT;

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [completionMsg, setCompletionMsg] = useState('');
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const userId = getUserIdFromCookie();

    if (selectedChatId && userId) {
      fetchMessages(selectedChatId, userId);
    } else {
      setMessages([]);
    }

    setShowRegenerateButton(false);
  }, [selectedChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  // Get the profile from the cookie
  const getUserProfileFromCookie = () => {
    const serializedProfile = Cookies.get(PROFILE_COOKIE_NAME);
    const profile = serializedProfile ? JSON.parse(serializedProfile) : null;
    return profile;
  };

  const getUserIdFromCookie = () => {
    const serializedId = Cookies.get(USER_ID_COOKIE_NAME);
    const userId = serializedId ? JSON.parse(serializedId) : null;
    setCustomerId(userId);
    return userId;
  };

  const setUserIdCookie = (userId) => {
    const serializedId = JSON.stringify(userId);
    Cookies.set(USER_ID_COOKIE_NAME, serializedId, {
      expires: 1,
    });
  };

  const fetchChats = async () => {
    try {
      const profile = getUserProfileFromCookie();
      const eeid = await getEeid(profile.email);
      const response = await axios.get(
        `${baseURL}/chats?eeid=${eeid}`,
      );
      setChats(response.data.chats ?? []);
      setSelectedChatId(
        response.data.chats ? response.data.chats[0].chat_id : null,
      );
      setUserIdCookie(response.data.user_id);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId, userId) => {
    try {
      const response = await axios.get(`${baseURL}/chats/${userId}/${chatId}`);
      const messageMapping = response.data.messages_mapping;
      const messageList = Object.keys(messageMapping)
        .map((key) => messageMapping[key])
        .sort((a, b) => new Date(a.create_time) - new Date(b.create_time));
      setMessages(messageList);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (input) => {
    setDisableButton(true);
    setMessages([
      ...messages,
      {
        message_id: '',
        role: 'user',
        create_time: new Date(),
        content: input ?? inputMessage,
        finish_reason: '',
        parent_id: '',
        children: [],
      },
    ]);
    localStorage.setItem('lastSentMsg', input ?? inputMessage);
    setInputMessage('');
    setIsAssistantTyping(true);

    try {
      // Simulate a delay for the typewriting effect
      const delay = 1000 + Math.random() * 1000; // Random delay between 1-2 seconds
      const userId = getUserIdFromCookie();

      setTimeout(async () => {
        try {
          const response = await fetch(`${baseURL}/completion`, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/event-stream',
            },
            body: JSON.stringify({
              user_id: userId,
              chat_id: selectedChatId,
              message: {
                role: 'user',
                content: input ?? inputMessage,
              },
            }),
          });

          const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const data = value.toString();
            const regex = /data:(.*)/g;
            let match;

            while ((match = regex.exec(data)) !== null) {
              const extractedValue = match[1];
              setCompletionMsg((prevSentence) => prevSentence + extractedValue);
            }
          }

          setCompletionMsg('');
          fetchMessages(selectedChatId, userId);
          setShowRegenerateButton(false);
        } catch (error) {
          console.error('Error sending message:', error);
          setMessages([
            ...messages,
            {
              message_id: 'uuid8',
              role: 'assistant',
              create_time: new Date(),
              content: '⚠️ Networking Error. Please retry :)',
              finish_reason: 'finished',
              parent_id: '',
              children: [],
            },
          ]);
          setShowRegenerateButton(true);
        } finally {
          setIsAssistantTyping(false);
          setDisableButton(false);
        }
      }, delay);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createNewChat = () => {
    openSetTitlePopup();
  };

  const openSetTitlePopup = () => {
    setPopupOpen(true);
  };

  const closeSetTitlePopup = () => {
    setPopupOpen(false);
    setTitle('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleConfirmTitle = async (e) => {
    e.preventDefault();

    try {
      const profile = getUserProfileFromCookie();
      const eeid = await getEeid(profile.email);
      const response = await axios.post(`${baseURL}/chat`, {
        eeid: eeid,
        title: title,
      });

      setChats([{ chat_id: response.data.chat_id, title: title }, ...chats]);
      setSelectedChatId(response.data.chat_id);
      setUserIdCookie(response.data.user_id);
      setPopupOpen(false);
    } catch (error) {
      console.error('Error creating a new chat:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <ChatHistoryBar
          sideBarOpen={sideBarOpen}
          setSideBarOpen={setSideBarOpen}
          createNewChat={createNewChat}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          chats={chats}
          disableButton={disableButton}
          userId={customerId}
        />
        <ChatUI
          sideBarOpen={sideBarOpen}
          messages={messages}
          inputMessage={inputMessage}
          completionMessage={completionMsg}
          disableButton={disableButton}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          isAssistantTyping={isAssistantTyping}
          messagesEndRef={messagesEndRef}
          showRegenerateButton={showRegenerateButton}
          chats={chats}
        />
        {popupOpen && (
          <SetChatTitlePopup
            title={title}
            handleTitleChange={handleTitleChange}
            handleConfirmTitle={handleConfirmTitle}
            onClose={closeSetTitlePopup}
          />
        )}
      </div>
    </div>
  );
}

export default App;
