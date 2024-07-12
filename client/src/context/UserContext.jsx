import React, { useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functionalities
import { db } from "../firebase/config"; // Assuming you have Firebase configuration set up

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUsers = async (currentUser) => {
    try {
      const userCollectionRef = collection(db, "users");
      const q = query(userCollectionRef, where("uid", "!=", currentUser.uid));
      const usersSnapshot = await getDocs(q);
      const usersData = usersSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const values = {
    users,
    fetchUsers,
    selectedUser,
    setSelectedUser,
    selectedUsers,
    setSelectedUsers,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
