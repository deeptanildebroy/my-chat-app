import React from "react";

const RenderFile = ({ message }) => {
  if (message.fileUrl) {
    switch (message.fileType) {
      case "image":
        return (
          <img
            src={message.fileUrl}
            alt="uploaded content"
            className="max-w-full max-h-72 mt-2"
          />
        );
      case "video":
        return (
          <video controls className="max-w-full max-h-72 mt-2">
            <source src={message.fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "application":
        return (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 block"
          >
            Download File
          </a>
        );
      default:
        return (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 block"
          >
            Open File
          </a>
        );
    }
  }
};

export default RenderFile;
