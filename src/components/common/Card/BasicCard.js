import React, { useContext } from 'react'
import styles from "./styles/BasicCard.module.scss";
import Typography from '../Typography/Typography';
import { Context } from "../../../store/Context";

const BasicCard = ({ children, title = "", showTitle = true }) => {
   const { state } = useContext(Context);
   const { darkMood } = state;

   return (
      <div className={darkMood ? `${styles.basic_card_wrapper} ${"dark_mood_secondary"}` : `${styles.basic_card_wrapper} ${"light_mood_secondary"}`}>
         {showTitle && <div className={styles.section_title_wrapper}>
            <Typography variant={"subtitle"} color={"paragraph"}>{title}</Typography>
         </div>}
         {children}
      </div>
   )
}

export default BasicCard;