import React, { useContext } from 'react'
import "./styles/AuthPageLayout.module.scss";
import Typography from '../components/common/Typography/Typography';
import styles from "./styles/AuthPageLayout.module.scss";
import Footer from '../components/Footer/Footer';
import { Context } from '../store/Context';

const AuthPageLayout = ({ children }) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   return (
      <>
         <header className={darkMood ? `${styles.header_section} ${"dark_mood_secondary"}` : `${styles.header_section} ${"light_mood_secondary"}`}>
            <Typography variant={"subtitle"} color={darkMood ? "paragraph" : "primary"}>Elite Fashion Admin Dashboard</Typography>
         </header>
         <div className={styles.login_info}>
            <Typography>Email: kobir.h.ritu@gmail.com</Typography>
            <Typography>Password: 12345678</Typography>
         </div>
         <main className={darkMood ? `${styles.main_layout_wrapper} ${"dark_mood_main"}` : `${styles.main_layout_wrapper} ${"light_mood_main"}`}>
            {children}
         </main>
         <Footer />
      </>
   )
}

export default AuthPageLayout;