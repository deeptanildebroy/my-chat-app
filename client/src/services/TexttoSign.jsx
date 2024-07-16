import React, { useState } from "react";
import signLanguageTranslations from "../data/signLanguageTranslations.js";

const TextToSign = ({ text, onTranslationComplete }) => {
  const [translationImages, setTranslationImages] = useState([]);

  const handleTranslate = () => {
    if(text.trim()){
    const translation = text
      .toUpperCase()
      .split("")
      .map((char) => {
        return signLanguageTranslations.find((item) => item.text === char);
      })
      .filter((item) => item !== undefined);
    setTranslationImages(translation);
    onTranslationComplete(translation);
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        onClick={handleTranslate}
      >
        Translate
      </button>
    </>
  );
};

export default TextToSign;
