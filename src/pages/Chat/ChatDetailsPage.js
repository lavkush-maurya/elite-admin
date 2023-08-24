import React, { useEffect, useState } from 'react'
import ChatPageLayout from '../../layouts/ChatPageLayout';
import ConversationDetails from './Components/ConversationDetails';
import { useParams } from 'react-router-dom';
import { useHttpHook } from '../../hooks/useHttpHook';
import { socket } from '../../socket';

const ChatDetailsPage = () => {
  const [messages, setMessages] = useState([])
  const { roomId } = useParams();
  const [socketMessage, setSocketMessage] = useState(null)

  const getResponseData = (data) => {
    setMessages(data?.messages)
  }
  const { sendRequest, loading, hasError } = useHttpHook()

  useEffect(() => {
    sendRequest({ url: `/messages/${roomId}` }, getResponseData)
  }, [roomId, sendRequest])


  // listen for incoming messages
  useEffect(() => {
    socket.on("getMessage", (message) => {

      if (message) {
        setSocketMessage(message)
        const notification = new Audio('/assets/Notification.mp3');
        notification.play();
      }
      if (roomId === message.chatRoom) {
        setMessages(prevMsgs => [...prevMsgs, message])
      }

    });
    // clean up event listener
    return () => socket.off("getMessage");
  }, [roomId])

  return (
    <ChatPageLayout socketMessage={socketMessage}  >
      <ConversationDetails
        messages={messages}
        loading={loading}
        error={hasError}
        roomId={roomId}
        setMessages={setMessages}
      />
    </ChatPageLayout>
  )
}

export default ChatDetailsPage;