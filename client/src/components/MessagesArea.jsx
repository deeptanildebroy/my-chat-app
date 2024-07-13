import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import formatDate from "../utils/formatDate";
import { useParams } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import RenderFile from "../services/RenderFile";
import RenderContent from "../services/RenderContent";

const MessagesArea = () => {
  const { chatid } = useParams();
  const { currentUser } = useAuth();
  const { messages, fetchMessages } = useMessage();

  useEffect(() => {
    if (chatid) {
      const unsubscribe = fetchMessages(chatid);
      return () => unsubscribe;
    }
  }, [chatid]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => {
        const isCurrentUser = msg.author === currentUser.displayName;
        return (
          <div
            key={msg.id}
            className={`p-4 rounded-lg shadow-md ${
              isCurrentUser
                ? "bg-white text-gray-800 mr-auto"
                : "bg-blue-500 text-white ml-auto"
            } max-w-md break-words`}
          >
            <h1 className="text-lg">{msg.message}</h1>
            <p className="text-sm items-end">{formatDate(msg.createdAt)}</p>
            {msg.fileUrl && msg.fileType && (
              <>
                <RenderFile message={msg}/>
              </>
            )}
            {msg.files?.map((file) => (
            <>
              <RenderContent file={file} />
            </>))
            }
          </div>
        );
      })}
    </div>
  );
};

export default MessagesArea;
