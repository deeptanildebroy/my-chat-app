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
  
  // Create a GroupChat context
  const GroupChatContext = React.createContext();
  
  // GroupChatProvider component to provide group chat-related state and functions
  export const GroupChatProvider = ({ children }) => {
    const [groupChats, setGroupChats] = useState([]);
    const [selectedGroupChatId, setSelectedGroupChatId] = useState(null);
  
    // Fetch group chats for the current user and listen for real-time updates
    const fetchGroupChats = async (currentUsername) => {
      const groupChatCollectionRef = collection(db, "groupChats");
      const q = await query(
        groupChatCollectionRef,
        where("members", "array-contains", currentUsername)
      );
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const groupChatArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroupChats(groupChatArray);
      });
  
      return unsubscribe;
    };
  
    // Create a new group chat with specified users
    const createNewGroupChat = async (users, groupName) => {
      try {
        const groupChatDoc = await addDoc(collection(db, "groupChats"), {
          members: users,
          groupName: groupName,
          pinned: false,
          archived: false,
          createdAt: serverTimestamp(),
        });
        return groupChatDoc.id;
      } catch (error) {
        console.error("Error while creating Group Chat", error);
      }
    };
  
    // Archive a group chat
    const archiveGroupChat = async (groupChatId) => {
      try {
        const groupChatDocRef = doc(db, "groupChats", groupChatId);
        await updateDoc(groupChatDocRef, { archived: true });
      } catch (error) {
        console.error("Error while archiving Group Chat", error);
      }
    };
  
    // Unarchive a group chat
    const unarchiveGroupChat = async (groupChatId) => {
      try {
        const groupChatDocRef = doc(db, "groupChats", groupChatId);
        await updateDoc(groupChatDocRef, { archived: false });
      } catch (error) {
        console.error("Error while unarchiving Group Chat", error);
      }
    };
  
    // Pin a group chat
    const pinGroupChat = async (groupChatId) => {
      try {
        const groupChatDocRef = doc(db, "groupChats", groupChatId);
        await updateDoc(groupChatDocRef, { pinned: true });
      } catch (error) {
        console.error("Error while pinning Group Chat", error);
      }
    };
  
    // Unpin a group chat
    const unpinGroupChat = async (groupChatId) => {
      try {
        const groupChatDocRef = doc(db, "groupChats", groupChatId);
        await updateDoc(groupChatDocRef, { pinned: false });
      } catch (error) {
        console.error("Error while unpinning Group Chat", error);
      }
    };
  
    // Delete a group chat
    const deleteGroupChat = async (groupChatId) => {
      try {
        const groupChatDocRef = doc(db, "groupChats", groupChatId);
        await deleteDoc(groupChatDocRef);
      } catch (error) {
        console.error("Error while deleting Group Chat", error);
      }
    };
  
    // Values to be provided via context
    const values = {
      groupChats,
      selectedGroupChatId,
      createNewGroupChat,
      fetchGroupChats,
      archiveGroupChat,
      unarchiveGroupChat,
      pinGroupChat,
      unpinGroupChat,
      deleteGroupChat,
    };
  
    return <GroupChatContext.Provider value={values}>{children}</GroupChatContext.Provider>;
  };
  
  // Custom hook to use the GroupChat context
  export const useGroupChat = () => useContext(GroupChatContext);
  