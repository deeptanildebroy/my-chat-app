import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import EmojiPicker from "./Emoji/EmojiPicker";
import { FaPaperclip } from "react-icons/fa";
import { fileUpload } from "../utils/uploadFile";
import { useMessage } from "../context/MessageContext";
import RenderFilePreview from "../services/RenderFilePreview";
import TextToSign from "../services/TexttoSign";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const { selectedChatId } = useChat();
  const { sendMessage } = useMessage();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const handleSendMessage = async () => {
    let fileUrl = null;
    let fileType = null;

    if (file) {
      fileUrl = await fileUpload(selectedChatId, currentUser.displayName, file);
      fileType = file.type.split("/")[0];
    }

    await sendMessage(
      selectedChatId,
      currentUser.displayName,
      message,
      fileUrl,
      fileType
    );
    setMessage("");
    setFile(null);
  };

  const handleTranslationComplete = async (translationImages) => {
    await sendMessage(
      selectedChatId,
      currentUser.displayName,
      "",
      null,
      null,
      translationImages
    );
  };

  return (
    <div className="flex items-center">
      <input
        className="hidden"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <FaPaperclip
        onClick={() => document.querySelector('input[type = "file"]').click()}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Type your message..."
      />
      {file && (
        <>
          <RenderFilePreview file={file} />
        </>
      )}
      <div style={{ position: "relative" }}>
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        {showEmojiPicker && (
          <div style={{ position: "absolute", bottom: "40px", right: "0px" }}>
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
      <button
        onClick={handleSendMessage}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
      <TextToSign
        text={message}
        onTranslationComplete={handleTranslationComplete}
      />
    </div>
  );
};

export default MessageInput;
