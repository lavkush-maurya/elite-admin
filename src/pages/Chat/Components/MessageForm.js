import React, { useState } from 'react'
import Button from '../../../components/common/Button/Button';
import Icons from '../../../components/common/Icons/Icons';
import { socket } from '../../../socket';
import Typography from '../../../components/common/Typography/Typography';
import styles from '../styles/MessageForm.module.scss';
import { useHttpHook } from '../../../hooks/useHttpHook';
import Emoji from './Emoji';
import { AnimatePresence, motion } from 'framer-motion'


const MessageForm = ({ roomId, receiver, messages, loggedInUserId, darkMood }) => {
  const [text, setText] = useState('')
  const [isEror, setIsError] = useState(null)
  const [toggleEmoji, setToggleEmoji] = useState(false);

  //Emoji select handler
  const handleEmojiSelect = (emojiCode) => {
    setText((value) => value + emojiCode);
  };

  //toggle emoji handler 
  const toggleEmojiHandler = () => {
    setToggleEmoji(!toggleEmoji)
  }

  //onChage Handler 
  const handleTextChange = (e) => {
    setText(e.target.value)
    if (e.target.value !== '') {
      setIsError(null)
    }
  }

  //this function will hold the response sent from server.
  const getResponseData = (data) => {
    if (data) {
      messages.push(data?.newMessage)
    }
  }

  //custom hook to send request to server 
  const { sendRequest, loading: textSubmitLoading } = useHttpHook()

  //onSubmit handler 
  const handleTextMessage = (e) => {
    e.preventDefault()
    if (!roomId) {
      return setIsError('Please choose a person to engage in conversation!')
    }
    const data = {
      message: text,
      sender: loggedInUserId,
      receiver,
    }
    sendRequest({
      url: `/new/message/${roomId}`,
      method: 'POST',
      postData: data
    }, getResponseData)
    //emit socket event 
    socket.emit("sendMessage", data);
    setText('')
    setToggleEmoji(false)

  }
  return (
    <div className={styles.message_from_wrapper}>
      <AnimatePresence>
        {toggleEmoji &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className={styles.emoji_wrapper}
          >
            <Emoji onEmojiSelect={handleEmojiSelect} />
          </motion.div>
        }
      </AnimatePresence>
      <form onSubmit={handleTextMessage} className={darkMood ? `${styles.dark_mood_color}` : ''}>
        <input
          type="text"
          placeholder='Message'
          required name='message'
          autoComplete='off'
          value={text}
          onChange={handleTextChange}
          className={isEror ? styles.input_error_styles : ''}
        />
        <div className={styles.emoji_icon_button}>
          <Button variant='icon-btn-normal' onClick={toggleEmojiHandler}>
            <Icons name='emoji' color='#9fa7b6' />
          </Button>
        </div>
        <Button
          disabled={textSubmitLoading}
          type='submit'
          variant='variant-icon-btn-normal'
        >
          <Icons name='send' color='#9fa7b6' />
        </Button>
        {isEror && <div className={styles.error_message_wrapper}>  <Typography variant='small' color='red'>{isEror}</Typography></div>}
      </form>
    </div>
  )
}

export default MessageForm;