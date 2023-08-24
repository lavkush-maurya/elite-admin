import React, { useContext, useEffect, useState } from 'react'
import Typography from '../../../components/common/Typography/Typography';
import Message from './Message';
import styles from '../styles/ConversationDetails.module.scss';
import { Context } from '../../../store/Context';
import MessageForm from './MessageForm';
import { useHttpHook } from '../../../hooks/useHttpHook';

const ConversationDetails = ({ messages = [], loading, error, roomId }) => {
  const [chatRooms, setChatRooms] = useState([])
  const { state } = useContext(Context);
  const { authToken, darkMood } = state;
  const { userPayload } = authToken;
  //Chat room Response from server.
  const getResposeData = (data) => {
    setChatRooms(data?.chatRooms)
  }
  const { sendRequest } = useHttpHook()

  useEffect(() => {
    sendRequest({ url: '/chat-rooms/all' }, getResposeData)
  }, [sendRequest])


  //Finding message sender from messages Array so it can be usefull when sent a new message, as message receiver.
  const findSender = chatRooms.find(room => room?._id === roomId);

  //Sorting the messages array to show the latest messages in UI
  const sortedMessages = messages.slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))

  return (
    <div className={darkMood ? `${'dark_mood_secondary'} ${styles.conversation_details}` : `${'light_mood_secondary'} ${styles.conversation_details}`}>
      {/* userDetails */}
      {findSender && <div className={styles.message_sender_details}>
        <img src={findSender?.user?.image || "/assets/user.png"} alt="user" />
        <div className={styles.sender_info}>
          <Typography variant='smBold700' color={darkMood ? "paragraph" : "primary"}>
            {findSender?.user?.name}
          </Typography>
          <Typography variant='small' color="paragraph">
            {findSender?.user?.email}
          </Typography>
        </div>
      </div>}
      {/* messages */}
      <div className={styles.message_list}>
        {sortedMessages?.length > 0 ? sortedMessages.map((message) => (
          <Message
            isAdmin={message?.sender?._id === userPayload?._id || message?.sender === userPayload?._id ? true : false}
            message={message?.message}
            key={message?._id}
            time={message?.createdAt}
          />
        )) :
          <div className={styles.not_found_message}>
            {!loading && !error && <Typography variant='body' color='red'>
              Please choose a person to engage in conversation.
            </Typography>}
          </div>
        }
      </div>
      {/* form */}
      <MessageForm
        messages={messages}
        roomId={roomId}
        receiver={findSender?.user?._id}
        loggedInUserId={userPayload?._id}
        darkMood={darkMood}
      />
    </div>
  )
}

export default ConversationDetails;