import React, { useEffect } from "react";
import SearchUser from "../Search/SearchUser";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const DirectChat = () => {
  const { currentUser } = useAuth();
  const { chats, createNewChat, fetchChats , fetchChatExist} = useChat();
  const { selectedUser ,setSelectedUser } = useUser();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const users = [currentUser.displayName, selectedUser.username];
    const chatExist = chats.some((chat) =>
      chat.members.includes(selectedUser.username)
    );

    if (chatExist) {
      const existngChatId = await fetchChatExist(users);
      navigate(`/home/chat/${existngChatId}`)
      setSelectedUser(null)
    } else {
      const chatid = await createNewChat(users);
      navigate(`/home/chat/${chatid}`);
      setSelectedUser(null)
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = fetchChats(currentUser.displayName);
    return () => unsubscribe;
  }, [currentUser]);

  return (
    <div className="max-w-lg mx-auto mt-8 px-4 py-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Direct Chat</h2>
      <SearchUser />
      <div className="mt-4">
        <h1 className="text-lg font-semibold mb-2">Member Selected:</h1>
        <p className="text-gray-700">{selectedUser?.username}</p>
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
        onClick={handleCreate}
      >
        Create/Get
      </button>
    </div>
  );
};

export default DirectChat;
