import React from 'react'
import ReactDOM from "react-dom";
import styles from "./styles/Modal.module.scss";
import { motion } from "framer-motion"
const portalElement = document.getElementById("portal");

const container = {
   hidden: { opacity: 1, scale: 0 },
   visible: {
      opacity: 1,
      scale: 1,
      transition: {
         delayChildren: 0.2,
         staggerChildren: 0.1
      }
   }
}
const Backdrop = (props) => {
   return (
      <motion.div
         variants={container}
         className={styles.backdrop}
         onClick={props.onClose}>
      </motion.div>
   );
};

const ModalOverlay = ({ children }) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ default: { ease: "linear" } }}
         className={styles.overlay}>
         <div>{children}</div>
      </motion.div>
   );
};
const Modal = ({ onClose, children, height }) => {
   return (
      <>
         {ReactDOM.createPortal(
            <Backdrop onClose={onClose} />,
            portalElement
         )}
         {ReactDOM.createPortal(
            <ModalOverlay height={height}>{children}</ModalOverlay>,
            portalElement
         )}
      </>
   );
}

export default Modal;