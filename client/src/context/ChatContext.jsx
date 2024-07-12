import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase/config";

// Create a Chat context
const ChatContext = React.createContext();

// ChatProvider component to provide chat-related state and functions
export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [selectedChat, setSelectedChat] = useState({});

  // Fetch chats for the current user and listen for real-time updates
  const fetchChats = async (currentusername) => {
    const chatcollectionRef = collection(db, "chats");
    const q = await query(
      chatcollectionRef,
      where("members", "array-contains", currentusername)
    );

    const unsubscribe = onSnapshot(q, (querysnapshot) => {
      const chatArray = querysnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatArray);
    });

    return unsubscribe;
  };

  // Create a new chat with specified users
  const createNewChat = async (users) => {
    try {
      const chatDoc = await addDoc(collection(db, "chats"), {
        members: users,
        pinned: false,
        archived: false,
        createdAt: serverTimestamp(),
      });
      return chatDoc.id;
    } catch (error) {
      console.error("Error while creating Chat", error);
    }
  };

  // Delete a chat
  const deleteChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "chats", chatId);
      await deleteDoc(chatDocRef);
    } catch (error) {
      console.error("Error while deleting Chat", error);
    }
  };

  // Archive a chat
  const archiveChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, { archived: true });
    } catch (error) {
      console.error("Error while archiving Chat", error);
    }
  };

  // Unarchive a chat
  const unarchiveChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, { archived: false });
    } catch (error) {
      console.error("Error while unarchiving Chat", error);
    }
  };

  // Pin a chat
  const pinChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, { pinned: true });
    } catch (error) {
      console.error("Error while pinning Chat", error);
    }
  };

  // Unpin a chat
  const unpinChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, { pinned: false });
    } catch (error) {
      console.error("Error while unpinning Chat", error);
    }
  };

  // Values to be provided via context
  const values = {
    chats,
    selectedChatId,
    setSelectedChatId,
    selectedChat,
    setSelectedChat,
    createNewChat,
    fetchChats,
    archiveChat,
    unarchiveChat,
    pinChat,
    unpinChat,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

// Custom hook to use the Chat context
export const useChat = () => useContext(ChatContext);
