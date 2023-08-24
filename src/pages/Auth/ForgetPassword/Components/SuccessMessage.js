import React from 'react';
import Typography from '../../../../components/common/Typography/Typography';
import Button from '../../../../components/common/Button/Button';
import { Link } from 'react-router-dom';
import Icons from '../../../../components/common/Icons/Icons';
import styles from "../styles/SuccessMessage.module.scss"

const SuccessMessage = ({ emailAddress }) => {
   return (
      <div className={styles.success_message_wrapper}>
         <Typography variant={"h4"}>
            Password Reset Email Sent!
            <Icons name={"checked"} color={"#116954"} />
         </Typography>
         <div>
            <Typography variant={"small"} color={"paragraph"}>
               We have sent a password reset email to the email address associated with your Account: <span className={styles.email}> {emailAddress}</span> Please check your inbox and follow the instructions to reset your password.
            </Typography>
         </div>
         <div className={styles.back_btn}>
            <Link to={"/"}>
               <Button
                  variant={"rounded"}>
                  Back
               </Button>
            </Link>
         </div>
      </div>
   )
}

export default SuccessMessage;