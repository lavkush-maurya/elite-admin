import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "../common/Typography/Typography";
import Icons from "../common/Icons/Icons";
import Avatar from "@mui/material/Avatar";
import Button from "../common/Button/Button";
import styles from "./styles/Navbar.module.scss";
import { Context } from "../../store/Context";
import { logout, setDarkMood, setShowSearchModal } from "../../store/Action";
import { socket } from "../../socket"
import { toast } from 'react-hot-toast';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ClickAwayListener } from '@mui/material';

// Import the relativeTime plugin
dayjs.extend(relativeTime);

const Navbar = ({ setToggleSidebar }) => {
   const [showDropdown, setShowDropdown] = useState(false);
   const [newMessage, setNewMessage] = useState({ roomId: '', count: 0 })
   const [showNotification, setShowNotification] = useState(false);
   const [orderNotification, setOrderNotification] = useState([])
   const { state, dispatch } = useContext(Context);
   const { darkMood, authToken } = state;
   const navigate = useNavigate()

   //Menu Toggle handler for small screens
   const menuToggleHandler = () => {
      setToggleSidebar(true);
   };

   //Toggle notification dropdown
   const toggleNotifications = () => {
      setShowNotification(!showNotification);
   }

   //Toggle Admin profile info dropdown
   const toggleAdminInfo = () => {
      setShowDropdown(!showDropdown)
   }

   // listen for order notification
   useEffect(() => {
      socket.on("order_created", (data) => {
         toast.dismiss()
         toast.success("New Order Received")
         setOrderNotification([...orderNotification, data])
      });
      // clean up event listener
      return () => socket.off("order_created");
   }, [orderNotification]);

   // listen for incoming messages
   useEffect(() => {
      socket.on("getMessage", (message) => {
         if (message) {
            setNewMessage(prev => {
               return {
                  roomId: message?.chatRoom,
                  count: prev.count + 1
               }
            })
         }
      });
      // clean up event listener
      return () => socket.off("getMessage");
   }, [])

   //Chat navigation handler 
   const handleChatNavigation = () => {
      setNewMessage({
         roomId: "",
         count: 0
      })
      navigate(newMessage?.roomId === '' ? '/chat' : `/chat/details/${newMessage?.roomId}`)
   }

   return (
      <nav className={darkMood ? `${styles.navbar} ${"dark_mood_secondary"}` : `${styles.navbar} ${"light_mood_secondary"}`}>
         <div className={styles.menue_btn} onClick={menuToggleHandler}>
            <Button variant={"icon-btn-bg"}>
               <Icons name={"menue"} size={"2.1rem"} color={"#7d879c"} />
            </Button>
         </div>
         <Link to={"https://elite-fashion.vercel.app/"}>
            <div className={styles.website_link}>
               <Icons name={"earth"} color={darkMood ? "#9fa7b6" : "#3b3841"} />
               <Typography variant={"h5"} color={darkMood ? "paragraph" : "primary"}>
                  Browse Elite Fashion
               </Typography>
            </div>
         </Link>
         <div className={styles.nav_buttons_wrapper}>
            <Button variant={darkMood ? "icon-btn-bg-dark" : "icon-btn-bg"}
               onClick={() => { dispatch(setShowSearchModal(true)) }}>
               <Icons name={"search"} color={"#7d879c"} />
            </Button>
            <div className={styles.chat_link}>
               <Button
                  variant={darkMood ? "icon-btn-bg-dark" : "icon-btn-bg"}
                  onClick={handleChatNavigation}
               >
                  <Icons name={"chatIcon"} color={"#7d879c"} />
                  <span className={styles.message_count}>{newMessage?.count}</span>
               </Button>
            </div>
            <div className={styles.notification_wrapper}>
               <Button
                  variant={darkMood ? "icon-btn-bg-dark" : "icon-btn-bg"}
                  onClick={toggleNotifications}
               >
                  <Icons name={"notification"} color={"#7d879c"} />
               </Button>
               {/*NOTIFICATIONS START*/}
               <AnimatePresence>
                  {showNotification && (
                     <ClickAwayListener
                        onClickAway={() => setShowNotification(false)}
                     >
                        <motion.div
                           initial={{ opacity: 0, transition: { duration: 0.1 } }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0, transition: { duration: 0.1 } }}
                           className={darkMood ? `${styles.notification_dropdown_wrapper} ${"dark_mood_popup"}` : `${styles.notification_dropdown_wrapper} ${"light_mood_secondary"}`}
                        >
                           <Typography
                              variant={"h6"}
                              color={"red"}>
                              New ({orderNotification?.length || 0})
                           </Typography>
                           {orderNotification && orderNotification?.length ? orderNotification.map((order) => (
                              <Link
                                 to={`/order-details/${order?._id}`}
                                 key={order?._id}>
                                 <div className={styles.notifications}>
                                    <Icons name={"addOrder"} color={"#2c74b3"} />
                                    <div className={styles.notifications_title}>
                                       <Typography
                                          variant={"body"}
                                          color={darkMood ? "white" : "primary"}>
                                          New Order Received
                                       </Typography>
                                       <Typography
                                          variant={"small"}
                                          color={"light-gray"}>
                                          {dayjs(order?.createdAt).fromNow()}
                                       </Typography>
                                    </div>
                                 </div>
                              </Link>

                           )) : <div className={styles.notifications}>
                              <Typography
                                 variant={"body"}
                                 color={darkMood ? "white" : "primary"}>
                                 No new order!
                              </Typography>
                           </div>}
                        </motion.div>
                     </ClickAwayListener>
                  )}
               </AnimatePresence>
               {/*NOTIFICATIONS END*/}
            </div>
            <Button variant={darkMood ? "icon-btn-bg-dark" : "icon-btn-bg"}
               onClick={() => { dispatch(setDarkMood(!darkMood)) }}>
               <Icons name={darkMood ? "lightMood" : "darkMood"} color={"#7d879c"} />
            </Button>
            {/* <Icons name={ } /> */}
            <div className={styles.avater_wrapper}>
               <Button
                  variant={darkMood ? "icon-btn-bg-dark" : "icon-btn-bg"}
                  onClick={toggleAdminInfo}
               >
                  <Avatar
                     sx={{ width: '2rem', height: '2rem' }}
                     alt="avatar.jpg"
                     src={authToken?.userPayload?.imageUrl || "/assets/avatar.jpg"} />
               </Button>

               {/* DROPDOWN START*/}
               <AnimatePresence>
                  {showDropdown && (
                     <ClickAwayListener
                        onClickAway={() => setShowDropdown(false)}
                     >
                        <motion.div
                           initial={{ opacity: 0, transition: { duration: 0.1 } }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0, transition: { duration: 0.1 } }}
                           className={darkMood ? `${styles.dropdown_wrapper} ${"dark_mood_popup"}` : `${styles.dropdown_wrapper} ${"light_mood_secondary"}`}

                        >
                           <div className={styles.admin_details}>
                              <Typography
                                 variant={"body"}
                                 color={darkMood ? "white" : "primary"}>
                                 Kabir Hossain
                              </Typography>
                              <Typography
                                 variant={"small"}
                                 color={darkMood ? "paragraph" : "primary"}>
                                 Admin
                              </Typography>
                           </div>
                           <ul>
                              <li>
                                 <Link to={"/admin/profile"}>
                                    <Typography
                                       variant={"small"}
                                       color={darkMood ? "white" : "primary"}>
                                       Profile
                                    </Typography>
                                 </Link>
                              </li>
                              <li>
                                 <Link to={"/admin/profile/update"}>
                                    <Typography
                                       variant={"small"}
                                       color={darkMood ? "white" : "primary"}>
                                       Settings
                                    </Typography>
                                 </Link>
                              </li>
                              <li>
                                 <Button
                                    variant={"icon-btn-normal"}
                                    onClick={() => {
                                       dispatch(logout());
                                    }}
                                 >
                                    <Typography
                                       variant={"small"}
                                       color={darkMood ? "white" : "primary"}>
                                       Logout
                                    </Typography>
                                 </Button>
                              </li>
                           </ul>
                        </motion.div>
                     </ClickAwayListener>
                  )}
               </AnimatePresence>
               {/*DROPDOWN END*/}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
