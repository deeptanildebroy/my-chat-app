import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

const SearchUser = () => {
  const { currentUser } = useAuth();
  const { users, fetchUsers, setSelectedUser } = useUser();
  const [searchKey, setSearchKey] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = fetchUsers(currentUser); // Fetch users when component mounts
    return () => unsub;
  }, [currentUser, fetchUsers]);

  useEffect(() => {
    if (searchKey.trim() !== "") {
      const filteredSuggestions = users.filter((user) =>
        user.username.toLowerCase().includes(searchKey.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchKey, users]);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set selected user in context
    setSearchKey(""); // Clear search input
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="p-4 relative flex flex-col">
      <div className="mb-4">
        <input
          className="text-gray-700 font-bold p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Search User"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div className="">
        {suggestions.length > 0 ? (
          suggestions.map((user) => (
            <div
              key={user.uid}
              className="flex items-center p-3 mb-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectUser(user)}
            >
              <div className="text-gray-800">{user.username}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No matching users found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
