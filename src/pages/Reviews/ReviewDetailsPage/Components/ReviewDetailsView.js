import { Rating } from '@mui/material';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import BasicCard from "../../../../components/common/Card/BasicCard";
import Icons from '../../../../components/common/Icons/Icons';
import Typography from '../../../../components/common/Typography/Typography';
import styles from "../styles/ReviewDetailsView.module.scss";
import Button from '../../../../components/common/Button/Button';
import { Context } from '../../../../store/Context';
import { useHttpHook } from '../../../../hooks/useHttpHook';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ReviewDetailsView = ({ review }) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   const navigate = useNavigate()
   const getResponseData = (data) => {
      if (data.success) {
         toast.dismiss()
         toast.success("Review Removed");
         navigate("/reviews/list")
      }
   }
   const { sendRequest } = useHttpHook()

   const deleteHandler = () => {
      sendRequest(
         {
            url: `/review/delete/${review._id}`,
            method: "DELETE"
         },
         getResponseData
      )
   }
   return (
      <BasicCard showTitle={false}>
         <div className={styles.review_details_main_flex}>
            <div className={darkMood ? `${styles.delete_btn} ${"dark_mood_secondary"}` : `${styles.delete_btn} ${"light_mood_secondary"}`}>
               <Button variant={"icon-btn"} onClick={deleteHandler}>
                  <Icons name={"delete"} color={"#cc2121"} />
               </Button>
            </div>
            <div className={styles.user_details}>
               <img src={review?.user?.image || '/assets/avater.png'} alt="user" />
               <Typography
                  variant={"body"}
                  color={darkMood ? "paragraph" : "primary"}>
                  {review?.user?.name}
               </Typography>
            </div>
            <div className={styles.comment_and_ratings}>
               <div className={styles.rating}>
                  <Rating value={parseInt(review?.rating)} />
                  <Typography
                     variant={"small"}
                     color={darkMood ? "paragraph" : "primary"}>
                     Rated ({review?.rating}) Star.
                  </Typography>
               </div>
               <div className={styles.date}>
                  <Typography
                     variant={"small"}
                     color={darkMood ? "paragraph" : "primary"}>
                     {dayjs(review?.createdAt).format("MMM D, YYYY h:mm A")}
                  </Typography>
               </div>
               <div className={styles.comments_wrapper}>
                  <Typography
                     variant={"body"}
                     color={darkMood ? "paragraph" : "primary"}>
                     {review?.comment}
                  </Typography>
               </div>
            </div>
         </div>

      </BasicCard>
   )
}

export default ReviewDetailsView;