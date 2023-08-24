import React from 'react'
import styles from '../styles/Message.module.scss';
import Typography from '../../../components/common/Typography/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const Message = ({ isAdmin, message, time }) => {
  const messageTimeFromNow = dayjs(time).fromNow();
  return (
    <div className={isAdmin ? `${styles.message_align_right}` : `${styles.message_align_left}`}>
      <div className={isAdmin ? `${styles.message_blue_bg}` : `${styles.message_gray_bg}`}>
        <Typography variant='small' color={isAdmin ? 'white' : 'black'}>
          {message}
        </Typography>
      </div>
      <span className={isAdmin ? `${styles.time_right}` : `${styles.time_left}`}>
        {messageTimeFromNow}
      </span>
    </div>
  )
}

export default Message;