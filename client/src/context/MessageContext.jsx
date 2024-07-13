import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase/config";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (chatId) => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });
    return unsubscribe;
  };

  const sendMessage = async (chatId, username, message,fileUrl = null,fileType = null,files = []) => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        message,
        fileUrl,
        fileType,
        files,
        author: username,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const deleteMessage = async (chatId, messageId) => {
    try {
      const docRef = doc(db, "chats", chatId, "messages", messageId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  const editMessage = async (chatId, messageId, newMessageContent) => {
    try {
      const docRef = doc(db, "chats", chatId, "messages", messageId);
      await updateDoc(docRef, {
        message: newMessageContent,
        editedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error editing message: ", error);
    }
  };

  const values = {
    messages,
    fetchMessages,
    sendMessage,
    deleteMessage,
    editMessage,
  };

  return (
    <MessageContext.Provider value={values}>{children}</MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
