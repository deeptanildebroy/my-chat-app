import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

const GroupList = () => {
  const { currentUser } = useAuth();
  const { groups, fetchGroups } = useChat();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // const handleClick = (chatId) => {
  //   setSelectedChatId(chatId)
  // }

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = fetchGroups(currentUser.displayName);
    return () => unsubscribe;
  }, [currentUser]);

  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4 relative flex flex-col">
      <div className="">
        <p className="text-gray-500 font-bold mb-4">CHATS</p>
        {groups.map((group) => (
          <div key={group.id} className="flex items-center p-2 mb-2 bg-gray-100 rounded-md">
            <div className="w-8 h-8 bg-gray-500 rounded-full mr-4">
                <img src='' alt=''/>
            </div>
            <p className="text-gray-500">{group.name}</p>
            <p className="text-gray-300">{group.lastmessage}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4">
        <button 
          className="w-12 h-12 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center shadow-lg"
          onClick={toggleOpen}
        >
          +
        </button>
      </div>
      {isOpen && (
        <div className="absolute bottom-20 right-4 flex flex-col space-y-2">
          <div className="p-4 bg-white rounded-md shadow-lg">
            <button>New Chat</button>
          </div>
          <div className="p-4 bg-white rounded-md shadow-lg">
            <button>New Group Chat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
