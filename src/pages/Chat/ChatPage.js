import React from 'react'
import ChatPageLayout from '../../layouts/ChatPageLayout';
import ConversationDetails from './Components/ConversationDetails';

const ChatPage = () => {
  return (
    <ChatPageLayout>
      <ConversationDetails />
    </ChatPageLayout>
  )
}

export default ChatPage;