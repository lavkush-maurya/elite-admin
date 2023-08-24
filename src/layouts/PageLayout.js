import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles/PageLayout.module.scss";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import LinearProgress from '@mui/material/LinearProgress';
import { Context } from "../store/Context";
import SearchModal from "../components/searchModal/SearchModal";
import { socket } from '../socket';

const PageLayout = ({ children }) => {
   const [toggleSidebar, setToggleSidebar] = useState(window.innerWidth >= 1280 ? true : false);
   const [pageLoaing, setPageLoading] = useState(true);
   const { state } = useContext(Context);
   const { authToken } = state;
   const { showSearchModal, darkMood } = state;

   const handleBackdropClick = () => {
      if (toggleSidebar) {
         setToggleSidebar(false);
      }
   };

   useEffect(() => {
      setToggleSidebar(window.innerWidth >= 1280);
      //Window resize handler
      const handleResize = () => setToggleSidebar(window.innerWidth >= 1280);
      window.addEventListener("resize", handleResize);
      //Page Loading handler
      const onPageLoad = () => {
         setPageLoading(false);
      };
      // Check if the page has already loaded
      if (document.readyState === 'complete') {
         onPageLoad();
      } else {
         window.addEventListener('load', onPageLoad);
         // Remove the event listener when component unmounts
         return () => window.removeEventListener('load', onPageLoad);
      }
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   useEffect(() => {
      socket.on("connect", () => {
         console.log(socket.id, "connected");
         socket.emit("addUser", authToken?.userPayload?._id);
      });
      // clean up event listener
      return () => socket.off("getMessage");
   }, [authToken?.userPayload?._id])

   return (
      <div className={darkMood ? `${styles.page_layout_wrapper} ${"dark_mood_main"}` : `${styles.page_layout_wrapper} ${"light_mood_main"}`}>
         <AnimatePresence>
            {showSearchModal && <SearchModal />}
         </AnimatePresence>
         <AnimatePresence>
            {toggleSidebar &&
               <>
                  <motion.div
                     initial={{ opacity: 0, transition: { duration: 0.1 } }} animate={{ opacity: 1, }}
                     exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                     transition={{ default: { ease: "easeInOut" } }}
                     className={styles.backdrop}
                     onClick={handleBackdropClick}>
                  </motion.div>
                  <motion.div
                     initial={{ x: window.innerWidth > 1280 ? "0%" : "-100%", transition: { duration: 0.2, ease: "easeInOut" } }}
                     animate={{ x: 0 }}
                     exit={{ x: window.innerWidth > 1280 ? "0%" : "-100%", transition: { duration: 0.2 } }}
                     transition={{ default: { ease: "easeInOut" } }}
                     className={darkMood ? `${styles.sidebar_wrapper} ${"dark_mood_main"}` : `${styles.sidebar_wrapper} ${styles.navy_background}`}>
                     <Sidebar />
                  </motion.div>
               </>
            }
         </AnimatePresence>
         {pageLoaing &&
            <div className={styles.page_loading_animation}>
               <LinearProgress color="secondary" />
            </div>
         }
         <div
            className={styles.page_content_wrapper}>
            <Navbar setToggleSidebar={setToggleSidebar} />
            <motion.div
               initial={{ opacity: 0, transition: { duration: 0.2 } }}
               animate={{ opacity: 1, }}
               exit={{ opacity: 0, transition: { duration: 0.2 } }}
               transition={{ default: { ease: "linear" } }}
               className={styles.main_layout_wrapper}>
               {children}
            </motion.div>
            <Footer />
         </div>
      </div>
   );
};

export default PageLayout;
