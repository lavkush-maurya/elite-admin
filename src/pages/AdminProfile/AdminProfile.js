import React, { useContext } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/AdminProfile.module.scss";
import PageTitle from '../../components/common/PageTitle/PageTitle';
import Typography from '../../components/common/Typography/Typography';
import { Context } from '../../store/Context';

const AdminProfile = () => {
   const { state } = useContext(Context);
   const { authToken, darkMood } = state;
   return (
      <PageLayout>
         <section className={styles.profile_wrapper}>
            <PageTitle
               title={"Admin Profile"}
               btnTitle={"Edit Profile"}
               linkTo={"/admin/profile/update"}
            />
            <div className={darkMood ? `${styles.profile_details} ${"dark_mood_secondary"}` : `${styles.profile_details} ${"light_mood_secondary"}`}>
               <img
                  src={authToken?.userPayload?.imageUrl || "/assets/avatar.jpg"} alt="profilePic" />
               <ul>
                  <li className={darkMood ? "dark_mood_main" : "light_mood_main"}>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>
                        Name:
                     </Typography>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>{authToken?.userPayload?.name}
                     </Typography>
                  </li>
                  <li className={darkMood ? "dark_mood_main" : "light_mood_main"}>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>
                        Role:
                     </Typography>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>
                        Admin
                     </Typography>
                  </li>
                  <li className={darkMood ? "dark_mood_main" : "light_mood_main"}>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>
                        Email:
                     </Typography>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>{authToken?.userPayload?.email}
                     </Typography>
                  </li>
                  <li className={darkMood ? "dark_mood_main" : "light_mood_main"}>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>
                        Password:
                     </Typography>
                     <Typography
                        variant={"widgetTitle"}
                        color={darkMood ? "paragraph" : "dark_gray"}>
                        ********
                     </Typography>
                  </li>
               </ul>
            </div>
         </section>
      </PageLayout>

   )
}

export default AdminProfile;