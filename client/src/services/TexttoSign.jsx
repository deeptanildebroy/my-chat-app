import React, { useState } from 'react';
import signLanguageTranslations from '../data/signLanguageTranslations.js';

const TextToSign = () => {
  const [text, setText] = useState('');
  const [translationImages, setTranslationImages] = useState([]);

  const handleTranslate = () => {
    const translation = text.toUpperCase().split('').map(char => {
      return signLanguageTranslations.find(item => item.text === char);
    }).filter(item => item !== undefined);
    setTranslationImages(translation);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold p-4">Text to Sign Language Translation</h2>
      <textarea
        className="w-full p-4 border border-gray-300 focus:outline-none focus:border-blue-500 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        onClick={handleTranslate}
      >
        Translate
      </button>
      <div className="p-4 translation-images">
        {translationImages.map((item, index) => (
          <img key={index} src={item.imageUrl} alt={item.text} className="w-24 h-24 object-cover mr-2 rounded-lg shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default TextToSign;
