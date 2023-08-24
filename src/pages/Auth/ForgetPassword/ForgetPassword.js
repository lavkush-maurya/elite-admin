import React, { useState } from 'react';
import AuthPageLayout from "../../../layouts/AuthPageLayout";
import ForgetPasswordForm from './Components/ForgetPasswordForm';
import styles from "./styles/ForgetPassword.module.scss";
import { useHttpHook } from "../../../hooks/useHttpHook";
import { toast } from 'react-hot-toast';
import SuccessMessage from "./Components/SuccessMessage";

const ForgetPassword = () => {
   const [email, setEmail] = useState("");
   const [showSuccessMessage, setShowSuccessMessage] = useState(false)

   //Get Response data from server
   const getResponseData = (data) => {
      if (data.success) {
         toast.dismiss()
         toast.success("Please Check your Email")
         setShowSuccessMessage(true)
      }
   }

   //Distracturing useHttpHook()
   const { hasError, loading, sendRequest, setHasError } = useHttpHook();

   //onChange Handler 
   const onChangeHandler = (e) => {
      setEmail(e.target.value)
      if (e.target.value !== "") {
         setHasError(null)
      }
   }
   //Form submit Handler
   const onSubmitHandler = (e) => {
      e.preventDefault()
      sendRequest(
         {
            url: "auth/forget/password",
            method: "POST",
            postData: {
               email
            }
         },
         getResponseData
      )
   }
   return (
      <AuthPageLayout>
         <div className={styles.forget_password_page_wrapper}>
            {showSuccessMessage ?
               <SuccessMessage emailAddress={email} />
               :
               <ForgetPasswordForm
                  email={email}
                  onSubmitHandler={onSubmitHandler}
                  error={hasError}
                  loading={loading}
                  onChangeHandler={onChangeHandler} />
            }
         </div>

      </AuthPageLayout>
   )
}

export default ForgetPassword;