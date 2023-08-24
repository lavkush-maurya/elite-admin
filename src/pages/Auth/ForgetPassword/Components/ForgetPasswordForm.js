import React, { useContext } from 'react';
import Typography from '../../../../components/common/Typography/Typography';
import Button from '../../../../components/common/Button/Button';
import { LinearProgress } from '@mui/material';
import styles from "../styles/ForgetPasswordForm.module.scss";
import Input from '../../../../components/common/Input/Input';
import { Context } from '../../../../store/Context';

const ForgetPasswordForm = (
   {
      email,
      onSubmitHandler,
      error,
      loading,
      onChangeHandler
   }
) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   return (
      <div className={darkMood ? `${styles.form_wrappre} ${"dark_mood_secondary"}` : `${styles.form_wrappre} ${"light_mood_secondary"}`}>
         <div className={styles.loading_progress}>
            {loading &&
               <LinearProgress
                  color="secondary"
                  sx={{
                     borderRadius: "8px 8px 0 0"
                  }} />
            }
         </div>
         <Typography variant={"h4"} color={darkMood ? "paragraph" : "primary"}>Forgot your password?</Typography>
         <form onSubmit={onSubmitHandler}>
            <Typography variant={"small"} color={darkMood ? "paragraph" : "primary"}>
               Enter your email address below to reset your password
            </Typography>
            <div className={styles.input_wraper}>
               <Input
                  error={error ? true : false}
                  name={"email"}
                  type={"email"}
                  full size={"small"}
                  label={"Email"}
                  required={true}
                  value={email}
                  onChange={onChangeHandler}
                  errorMessage={error ? error.message : ""}
               />
            </div>
            <Button type={"submit"} variant={darkMood ? "blue_btn" : "primary"}>
               Submit
            </Button>
         </form>
      </div>
   )
}

export default ForgetPasswordForm;