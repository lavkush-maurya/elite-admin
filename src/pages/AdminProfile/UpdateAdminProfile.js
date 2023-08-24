import React, { useContext, useState, useCallback } from 'react'
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/UpdataAdminProfile.module.scss";
import PageTitle from '../../components/common/PageTitle/PageTitle';
import Input from '../../components/common/Input/Input';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import { Context } from '../../store/Context';
import Button from '../../components/common/Button/Button';
import { useHttpHook } from "../../hooks/useHttpHook";
import Icons from '../../components/common/Icons/Icons';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import { LinearProgress } from '@mui/material';
import Typography from '../../components/common/Typography/Typography';

const UpdateAdminProfile = () => {
   const { state } = useContext(Context);
   const { authToken, darkMood } = state;
   const [profileValue, setProfileValue] = useState(
      {
         name: authToken?.userPayload?.name,
         email: authToken?.userPayload?.email
      }
   );
   const [image, setImage] = useState("");
   const [imageUrl, setImageUrl] = useState(authToken?.userPayload?.imageUrl);
   const [uploadError] = useState(null);
   const navigate = useNavigate()

   //File Upload Handler
   const onDrop = useCallback(acceptedFiles => {
      setImage(acceptedFiles[0])
      setImageUrl(URL.createObjectURL(acceptedFiles[0]))
   }, []);

   //Remove Profile Image
   const removeProfilePic = () => {
      setImageUrl("")

   }

   //Get response data form server
   const getResponseData = (data) => {
      if (data.success) {
         toast.dismiss()
         toast.success("Profile Updated");
         navigate("/admin/profile")
      }
   }

   //useHttpHook
   const { error, sendRequest, loading } = useHttpHook()

   //onChange Handler 
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setProfileValue({ ...profileValue, [name]: value });
   }

   //Form Submit Handler 
   const submitHandler = (e) => {
      e.preventDefault();
      sendRequest(
         {
            url: `/admin/update/profile/${authToken?.userPayload?._id}`,
            method: "POST",
            postData: {
               email: profileValue.email,
               name: profileValue.name,
               image,
            }
         },
         getResponseData
      )
   }

   return (
      <PageLayout>
         <section className={styles.update_profile_main}>
            <PageTitle title={"Update Profile"} showBtn={false} />
            <div className={darkMood ? `${styles.update_profile_form} ${"dark_mood_secondary"}` : `${styles.update_profile_form} ${"light_mood_secondary"}`}>
               {loading &&
                  <div className={styles.loading_line}>
                     <LinearProgress
                        color="secondary"
                        sx={{
                           borderRadius: "8px 8px 0 0"
                        }}
                     />
                  </div>
               }
               <form onSubmit={submitHandler} className={loading ? `${styles.opacity}` : ""}>
                  <DragAndDrop
                     type={"Profile"}
                     onDrop={onDrop}
                     hasError={uploadError}
                  />
                  {imageUrl &&
                     <div className={styles.uploaded_image}>
                        <Button
                           variant={"icon-btn-normal"}
                           onClick={removeProfilePic}>
                           <Icons name={"cancel"} color={"#cc2121"} />
                        </Button>
                        <img src={imageUrl} alt="" />
                     </div>
                  }
                  <Input
                     size={"normal"}
                     type={"text"}
                     name={"name"}
                     error={error ? true : false}
                     helperText={error ? error.message : ""}
                     required={true}
                     full={true}
                     onChange={onChangeHandler}
                     value={profileValue.name}
                  />
                  <Input
                     size={"normal"}
                     type={"email"}
                     name={"email"}
                     error={error ? true : false}
                     onChange={onChangeHandler}
                     helperText={error ? error.message : ""}
                     required={true}
                     full={true}
                     value={profileValue.email}
                  />
                  <Button
                     type={"submit"}
                     variant={"blue_btn"}>
                     Save Update
                  </Button>
               </form>
               <div className={styles.form_link}>
                  <Link to={"/forget-password"}>
                     <Typography
                        variant={"body"}
                        color={darkMood ? "white" : "blue"}>
                        Update Password?
                     </Typography>
                  </Link>
               </div>
            </div>
         </section>
      </PageLayout>
   )
}

export default UpdateAdminProfile;