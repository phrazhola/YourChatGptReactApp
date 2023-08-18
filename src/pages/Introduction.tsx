import React from 'react';

import '../css/additional-styles/introduction.css';
import BackGround from '../partials/BackGround';
import CardCarousel from '../vendors/embla_carousel/src/components';
import JsonDisplay, { chatHistoryJson, userJson } from '../partials/JsonDisplay';

const Introduction: React.FC = () => {
  return (
    <div className="intro-page">
      <div className="background">
        <BackGround />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="flex flex-col col-span-full sm:col-span-4 introduction-box">
          <div className="p-5">
            <p className="text-white font-medium text-2xl mb-4">
              YourChatGPT
            </p>
            <ul className="list-disc list-inside pl-4 pt-8 text-white">YourChatGPT is a versatile AI chatbot solution that harnesses the capabilities of the ChatGPT API. Crafted to simplify your journey, it enables you to create a tailored ChatGPT clone effortlessly.</ul>
          </div>
        </div>
        <div className="flex flex-col col-span-full sm:col-span-8 introduction-box">
          <div className="p-5">
            <p className="text-white font-medium mb-2 text-xl">Highlights</p>
            <ul className="list-disc list-inside pl-4 pt-8 text-white">
              <li><strong>Structured Code:</strong> The codebase is well-organized, making it easy to understand and customize for different styles and use cases.</li>
              <li><strong>Extensible API:</strong> The API is designed with extensibility in mind, offering flexibility for future enhancements.</li>
              <li><strong>Scalability:</strong> The architecture supports scalability, with a clear separation between the frontend UI and backend API.</li>
              <li><strong>Plug-and-Play:</strong> The solution is ready to use, requiring only API key setup.</li>
              <li><strong>Security First:</strong> The system prioritizes security by ensuring your OpenAI API key remains secure on the client side.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-12">
          <div className="flex-grow flex justify-end">
            <CardCarousel />
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-8 introduction-box">
          <div className="p-5">
            <p className="text-white font-medium mb-2 text-xl">Data Structure</p>
            <ul className="list-disc list-inside pl-4 text-white">
              <li>
                It encompasses three main entities: <code className="key-word">User</code>, <code className="key-word">Chat</code> and <code className="key-word">ChatHistory</code>. The design follows a denormalized approach to store information efficiently and enable fast retrieval of data.
              </li>
            </ul>
            <ul className="list-disc list-inside pl-4 text-white mt-4">
              <strong className='mt-2'>User Entity:</strong>
              <li>Each user is uniquely identified by an <code className="key-word">id</code> and <code className="key-word">user_id</code>.</li>
              <li>The <code className="key-word">chats</code> array contains all chats the user has created.</li>

            </ul>
            <ul className="list-disc list-inside pl-4 text-white mt-4">
              <strong className='mt-2'>Chat Entity:</strong>
              <li>Each chat is identified by its <code className="key-word">chat_id</code>.</li>
              <li>Each chat includes its <code className="key-word">chat_id</code>, <code className="key-word">title</code>, <code className="key-word">create_time</code>, and <code className="key-word">update_time</code>.</li>

            </ul>
            <ul className="list-disc list-inside pl-4 text-white mt-4">
              <strong className='mt-2'>Chat History Entity:</strong>
              <li>Each chat history entry has an <code className="key-word">id</code> and <code className="key-word">chat_id</code>.</li>
              <li>The chat history object contains a <code className="key-word">message_mapping</code> that maps unique message IDs to detailed message information.</li>
              <li>Each message includes its <code className="key-word">message_id</code>, <code className="key-word">role</code> (user or assistant), <code className="key-word">create_time</code>, <code className="key-word">content</code> (dialogue content), <code className="key-word">finish_reason</code>, <code className="key-word">parent_id</code> (last message) and <code className="key-word">children</code> (replies).</li>
              <li>The <code className="key-word">last_updated_msg</code> field stores the ID of the last updated message.</li>
              <li>The <code className="key-word">back_ref</code> field links the chat history to the respective user.</li>
            </ul>

          </div>
        </div>
        <div className="flex flex-col col-span-full sm:col-span-4 introduction-title">
          <div className="flex-grow flex justify-start">
            <div className="p-5 mt-auto">
              <p className="text-white font-medium text-3xl mb-4">
                Well-designed and Extensible
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-4 introduction-title">
          <div className="flex-grow flex justify-start">
            <div className="p-5 mt-auto">
              <p className="text-white font-medium text-3xl mb-4">
                Data Example
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-full sm:col-span-8 introduction-box">
          <div className="p-5">
            <p className="text-white font-medium text-xl mb-4">
              User Entity
            </p>
            <JsonDisplay data={userJson} className="json-display" />
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-10 introduction-box">
          <div className="p-5">
            <p className="text-white font-medium text-xl mb-4">
              ChatHistory Entity
            </p>
            <JsonDisplay data={chatHistoryJson} className="json-display" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Introduction;
