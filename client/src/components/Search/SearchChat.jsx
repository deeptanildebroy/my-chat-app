import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

const SearchChat = () => {
    const [searchTerm,setSearchTerm] = useState('');
    const [searchResults,setSearchResults] = useState([]);
    const {currentUser} = useAuth();
    const {chats,fetchChats} = useChat();

    useEffect(() => {
      if (!currentUser) return;
      const unsubscribe = fetchChats(currentUser.displayName);
      return () => unsubscribe;
    }, [currentUser]);

    useEffect(() => {
      if (searchTerm) {
        const filteredSuggestions = chats.filter((user) =>
          chat.members.filter(mem => mem !== currentUser.displayName).toLowerCase().includes(searchkey.toLowerCase())
        );
        setSearchResults(filteredSuggestions);
      } else 
        setSearchResults([]);
    }, [searchTerm,chats]);
    
  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4 relative flex flex-col">
      <div className="">
        <input
          className=" text-gray-500 font-bold mb-4"
          placeholder="Search User"
          value={searchkey}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-4">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="flex items-center p-2 mb-2 bg-gray-100 rounded-md"
            onClick={(e) => e.preventDefault()}
          >
            <div className="text-gray-500">{}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchChat