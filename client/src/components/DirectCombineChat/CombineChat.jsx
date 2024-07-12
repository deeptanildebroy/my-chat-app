import React from 'react'
import ChatList from '../ChatList'
import Messages from '../MessageScreen/Messages'
import { useChat } from '../../context/ChatContext'

function CombineChat() {
  const { selectedChatId } = useChat()
  return (
    <div className='w-full flex flex-row h-screen'>
      <ChatList/>
      {selectedChatId && (<Messages/>)}   
    </div>
  )
}

export default CombineChat