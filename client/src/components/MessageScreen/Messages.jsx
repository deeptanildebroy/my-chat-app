import React from 'react';
import MessagesArea from '../MessagesArea';
import MessageInput from '../MessageInput';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

const Messages = () => {
  const { selectedChat } = useChat();
  const { currentUser } = useAuth()
  return (
    <div className="w-2/3 flex flex-col h-screen">
      <div className="h-12 bg-white shadow-sm flex items-center justify-between px-4">
  <div className="flex items-center space-x-2">
    <h1 className="text-gray-800 text-lg font-semibold">
      {selectedChat.members
        ?.filter((user) => user !== currentUser.displayName)
        .join(", ")}
    </h1>
  </div>
  <div>
    {/* Add additional header elements if needed */}
  </div>
</div>
      <div className="flex-1 overflow-y-auto p-4">
        <MessagesArea />
      </div>
      <div className="p-4 bg-white shadow-md">
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
 