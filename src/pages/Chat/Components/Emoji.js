import React, { useContext } from 'react'
import styles from '../styles/Emoji.module.scss';
import { emojiArray } from '../../../staticData/staticData';
import { Context } from '../../../store/Context';

const Emoji = ({ onEmojiSelect }) => {
  const { state } = useContext(Context);
  const { darkMood } = state;
  return (
    <div className={darkMood ? `${styles.emoji_container} ${'dark_mood_secondary'}` : `${styles.emoji_container} ${'light_mood_secondary'}`}>
      {emojiArray.map((emoji) => (
        <button key={emoji.name}
          emoji={emoji}
          onClick={() => onEmojiSelect(emoji.code)}>
          {emoji.code}
        </button>
      ))}
    </div>
  )
}

export default Emoji;