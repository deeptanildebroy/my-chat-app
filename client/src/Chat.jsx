/* eslint-disable react/prop-types */
import { useState, useMemo, useRef, useEffect } from "react";
import "./Chat.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesContainerRef = useRef(null);

  const messageData = {
    id: Date.now(),
    room: room,
    author: username,
    message: currentMessage,
    time:
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  };

  const sendMessage = () => {
    if (currentMessage !== "") {
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useMemo(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);


  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>{room} </p>
      </div>
      <div className="chat-body" ref={messagesContainerRef}>
        <div className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={messageContent.id}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className="message-wrapper">
                  <div className="messageContent-wrapper">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="scroll-button" onClick={scrollToTop}>
            &#8593;
          </button>
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
