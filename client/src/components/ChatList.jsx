import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { chats, fetchChats, selectedChatId, setSelectedChatId ,setSelectedChat} = useChat();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (chat,chatId) => {
    setSelectedChatId(chatId);
    setSelectedChat(chat);
    navigate(`/home/chat/${chatId}`);
  };

  const handleCreateChat = () => {
    //naviagate to direct chat route
    navigate("/home/newchat");
  };

  const handleCreateGroupChat = () => {
    //navigate to group chat route
    navigate("/home/newgroupchat");
  };

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = fetchChats(currentUser.displayName);
    return () => unsubscribe;
  }, [currentUser]);

  return (
    <div className="w-1/3 bg-gray-100 h-screen p-4 relative flex flex-col">
      <div>
        <p className="text-gray-500 font-bold mb-4">CHATS</p>
        {chats.map((chat) => chat.id !== selectedChatId ? (
          <div
            key={chat.id}
            className="flex items-center p-2 mb-2 bg-gray-100 rounded-md"
            onClick={() => handleClick(chat,chat.id)}
          >
            <div className="w-8 h-8 bg-gray-500 rounded-full mr-4">
              <img src="" alt="" />
            </div>
            <p className="text-gray-500">{chat.members.filter((user) => user !== currentUser.displayName)}</p>
          </div>
        ):(
          <div
            key={chat.id}
            className="flex items-center p-2 mb-2 bg-blue-700 rounded-md"
            onClick={() => handleClick(chat.id)}
          >
            <div className="w-8 h-8 bg-gray-500 rounded-full mr-4">
              <img src="" alt="" />
            </div>
            <p className="text-white">{chat.members.filter((user) => user !== currentUser.displayName)}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4">
        <button
          className="w-12 h-12 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center shadow-lg"
          onClick={toggleOpen}
        >
          <span>&#43;</span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute bottom-20 right-4 flex flex-col space-y-2">
          <div className="p-4 bg-white rounded-md shadow-lg">
            <button onClick={handleCreateChat}>New Chat</button>
          </div>
          <div className="p-4 bg-white rounded-md shadow-lg">
            <button onClick={handleCreateGroupChat}>New Group Chat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
