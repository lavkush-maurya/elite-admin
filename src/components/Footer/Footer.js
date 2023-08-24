import React, { useContext } from 'react';
import styles from "./styles/Footer.module.scss";
import Typography from '../common/Typography/Typography';
import Icons from '../common/Icons/Icons';
import { Context } from "../../store/Context";

const Footer = () => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   return (
      <footer className={darkMood ? "dark_mood_secondary" : "light_mood_secondary"}>
         <div className={styles.footer_content_wrapper}>
            <Typography variant={"small"}>&copy; {new Date().getFullYear()} Kabir Hossain | All Rights Reserved. </Typography>
            <div className={styles.footer_icons_wrapper}>
               <a
                  href="https://www.facebook.com/kabir.ritu"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <Icons name={"facebook"} color={"#3b5998"} />
               </a>
               <a
                  href="https://www.linkedin.com/in/kabir-hossain-07a69b238/" target="_blank"
                  rel="noopener noreferrer"
               >
                  <Icons name={"linkedIn"} color={"#0072b1"} />
               </a>
               <a
                  href="https://github.com/kobir1989"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <Icons name={"github"} color={"#171515"} />
               </a>
            </div>
         </div>
      </footer>
   )
}

export default Footer;