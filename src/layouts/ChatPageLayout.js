import React, { useEffect, useState } from 'react'
import PageLayout from './PageLayout'
import PageTitle from '../components/common/PageTitle/PageTitle'
import styles from './styles/ChatPageLayout.module.scss';
import ChatHead from '../pages/Chat/Components/ChatHead';
import { useHttpHook } from '../hooks/useHttpHook';
import { socket } from '../socket';

const ChatPageLayout = ({ children, socketMessage }) => {
  const [chatRooms, setChatRooms] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const getResposeData = (data) => {
    setChatRooms(data?.chatRooms)
  }
  const { sendRequest, loading, error } = useHttpHook()

  useEffect(() => {
    sendRequest({ url: '/chat-rooms/all' }, getResposeData)
  }, [sendRequest])


  //list of online users 
  useEffect(() => {
    socket.on("getUsers", (users) => {
      setOnlineUsers(users)
    });
  }, [])

  //creating a new array with online users
  const roomsWithOnlineUses = chatRooms?.length > 0 ? chatRooms.map((rooms) => {
    return {
      ...rooms,
      isOnline: onlineUsers.find((user) => user?.userId === rooms?.user?._id)
    }
  }) : null

  return (
    <PageLayout>
      <section className={styles.chat_page_wrapper}>
        <PageTitle title='Messages' showBtn={false} />
        <div className={styles.messages_container_main}>
          <div className={styles.conversation_list}>
            {!loading && !error && roomsWithOnlineUses?.length > 0 ? roomsWithOnlineUses.map((room) => (
              <ChatHead
                key={room?._id}
                sender={room?.user?.name}
                senderId={room?.user?._id}
                lastMessage={room?.message}
                time={room?.createdAt}
                avater={room?.user?.image}
                roomId={room?._id}
                isOnline={room?.isOnline}
                socketMessage={socketMessage}
              />
            )) : null}
          </div>
          <div className={styles.messages_wrapper}>
            {children}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default ChatPageLayout;