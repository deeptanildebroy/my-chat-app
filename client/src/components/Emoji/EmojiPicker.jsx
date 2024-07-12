import React, { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const EmojiPicker = ({ onSelect }) => {
  return (
    <Picker data={data} onEmojiSelect={onSelect} />
  );
};

export default EmojiPicker;